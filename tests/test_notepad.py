#!/usr/bin/env python3
"""Study Vault 필기장 회귀 게이트 — 실제 크롬에서 펜으로 긋고·지우고·끌고·줄이고·새로고침한다.
데스크톱(1280x800)과 모바일(390x844) 두 뷰포트. 실패는 비0 종료.

이 메모장은 손글씨(캔버스)이고 '일부러 저장하지 않는다' — 새로고침하면 지워지는 것까지 검사한다.
shared/notepad.js 나 shared/progress.js 를 고치면 이걸 돌린다 (tests/README.md 참고).
"""
import json, subprocess, time, urllib.request, os, sys, websocket

PORT = 9394
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 레포 최상위
SCRATCH = os.environ.get("TMPDIR", "/tmp") + "/vault_np_test"
PAGES = [
    ("hub", f"{ROOT}/index.html"),
    ("course-eecirc", f"{ROOT}/apps/course-eecirc/index.html"),
]

proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}",
    "--remote-allow-origins=*", f"--user-data-dir={SCRATCH}/profnp", "--no-first-run",
    "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "about:blank"],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for _ in range(60):
    try:
        t = [x for x in json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")) if x["type"] == "page"]
        if t: break
    except Exception: pass
    time.sleep(.4)
else:
    print("크롬 기동 실패"); sys.exit(1)

ws = websocket.create_connection(t[0]["webSocketDebuggerUrl"], suppress_origin=True); _id = [0]
def cmd(m, **p):
    _id[0] += 1; ws.send(json.dumps({"id": _id[0], "method": m, "params": p}))
    while True:
        r = json.loads(ws.recv())
        if r.get("id") == _id[0]: return r.get("result", {})
def ev(e):
    r = cmd("Runtime.evaluate", expression=e, returnByValue=True, awaitPromise=True)
    if "exceptionDetails" in r:
        return {"_error": str(r["exceptionDetails"].get("exception", {}).get("description", ""))[:200]}
    return r["result"].get("value")
cmd("Page.enable"); cmd("Runtime.enable")

# 펜·손가락 입력과 창 끌기를 포인터 이벤트로 재현한다
HELPERS = """
function pev(el, type, cx, cy, kind, pressure){
  el.dispatchEvent(new PointerEvent(type, {bubbles:true, cancelable:true, pointerId:1, isPrimary:true,
      pointerType:kind||'pen', pressure:(pressure===undefined?0.5:pressure), clientX:cx, clientY:cy, buttons:1}));
}
// 캔버스 위에 한 획 긋기 (기본은 펜)
function stroke(kind){
  const cv = document.getElementById('vault-np-cv'), r = cv.getBoundingClientRect();
  const x = r.left + 30, y = r.top + 30;
  pev(cv, 'pointerdown', x, y, kind);
  for (let i = 1; i <= 12; i++) pev(cv, 'pointermove', x + i*8, y + (i%2?6:14), kind);
  pev(cv, 'pointerup', x + 96, y + 14, kind);
}
// 그려진 픽셀 수 (투명하지 않은 점)
function inkPixels(){
  const cv = document.getElementById('vault-np-cv');
  const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
  let n = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
  return n;
}
function drag(el, dx, dy){
  const r = el.getBoundingClientRect();
  const x = r.left + Math.min(8, r.width/2), y = r.top + Math.min(8, r.height/2);
  const mk = (t, cx, cy) => new PointerEvent(t, {bubbles:true, cancelable:true, pointerId:2,
      pointerType:'mouse', clientX:cx, clientY:cy, buttons:1});
  el.dispatchEvent(mk('pointerdown', x, y));
  el.dispatchEvent(mk('pointermove', x+dx, y+dy));
  el.dispatchEvent(mk('pointerup',  x+dx, y+dy));
}
"""

FAILS = []
def check(page, name, ok, detail=""):
    print(("  ✅ " if ok else "  ❌ ") + name + (f"  — {detail}" if detail and not ok else ""))
    if not ok: FAILS.append(f"{page}: {name} {detail}")

def load(path):
    """탐색 후 필기장이 주입될 때까지 기다린다(주입 스크립트는 한 번 더 왕복한다)."""
    cmd("Page.navigate", url="file://" + path)
    for _ in range(40):
        time.sleep(0.25)
        if ev("!!(window.VaultNotepad && document.getElementById('vault-np'))") is True:
            time.sleep(0.25)
            return True
    return False

for label, path in PAGES:
    if not os.path.exists(path):
        FAILS.append(f"{label}: 파일 없음"); continue

    for view, (w, h, mobile) in (("데스크톱", (1280, 800, False)), ("모바일", (390, 844, True))):
        cmd("Emulation.setDeviceMetricsOverride", width=w, height=h,
            deviceScaleFactor=2 if mobile else 1, mobile=mobile)
        load(path)
        print(f"\n[{label} · {view}]")

        r = ev("""(() => ({
            fab: !!document.getElementById('vault-np-fab'),
            win: !!document.getElementById('vault-np'),
            canvas: !!document.getElementById('vault-np-cv'),
            vaultApi: !!(window.Vault && window.Vault.progress && window.Vault.exportAll),
            openAtStart: document.getElementById('vault-np').getAttribute('data-open')
        }))()""")
        if not isinstance(r, dict) or r.get("_error"):
            check(label, f"{view} 주입", False, str(r)); continue
        check(label, "필기장 주입됨(HTML 수정 없이)", r["fab"] and r["win"] and r["canvas"])
        check(label, "진도 모듈(Vault API) 그대로", r["vaultApi"])
        check(label, "처음엔 닫혀 있음", r["openAtStart"] == "0")

        r2 = ev(HELPERS + """(() => {
            document.getElementById('vault-np-fab').click();
            const win = document.getElementById('vault-np'), cv = document.getElementById('vault-np-cv');
            const cs = getComputedStyle(win), cvs = getComputedStyle(cv);
            const before = inkPixels();
            stroke('pen');
            return {opened: win.getAttribute('data-open') === '1', position: cs.position, zIndex: cs.zIndex,
                    touchAction: cvs.touchAction, before, after: inkPixels(),
                    strokes: window.VaultNotepad.strokeCount(),
                    lsKeys: Object.keys(localStorage).filter(k => k.indexOf('notepad') >= 0),
                    fabHidden: getComputedStyle(document.getElementById('vault-np-fab')).display === 'none',
                    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth};
        })()""")
        check(label, "버튼으로 켜짐", r2.get("opened") is True)
        check(label, "스크롤 따라다님(position:fixed)", r2.get("position") == "fixed")
        check(label, "다른 UI 위에 뜸(z-index>51)", int(r2.get("zIndex") or 0) > 51, str(r2.get("zIndex")))
        check(label, "펜으로 그어짐", (r2.get("before") == 0) and (r2.get("after") or 0) > 0
              and r2.get("strokes") == 1, f"before={r2.get('before')} after={r2.get('after')}")
        check(label, "필기 중 페이지가 안 밀림(touch-action:none)", r2.get("touchAction") == "none",
              str(r2.get("touchAction")))
        check(label, "저장소에 아무것도 안 쌓임", r2.get("lsKeys") == [], str(r2.get("lsKeys")))
        check(label, "가로 스크롤 없음", (r2.get("overflowX") or 0) <= 0, f"{r2.get('overflowX')}px")
        if mobile:
            check(label, "시트 열면 버튼 숨김", r2.get("fabHidden") is True)
        else:
            check(label, "데스크톱은 열어도 버튼 보임", r2.get("fabHidden") is False)

        # 손바닥(손가락) 오터치 방지 — 펜을 쓴 뒤엔 손가락 입력을 무시한다
        r3 = ev(HELPERS + """(() => {
            const n0 = window.VaultNotepad.strokeCount();
            stroke('touch');
            return {n0, n1: window.VaultNotepad.strokeCount()};
        })()""")
        check(label, "펜 쓴 뒤 손바닥 오터치 무시", r3.get("n0") == r3.get("n1"), str(r3))

        # 되돌리기 / 지우개 / 전체 지우기
        r4 = ev(HELPERS + """(() => {
            const drawn = inkPixels();
            document.getElementById('vault-np-undo').click();
            const afterUndo = inkPixels();
            stroke('pen');
            const redrawn = inkPixels();
            document.getElementById('vault-np-era').click();
            const eraserOn = document.getElementById('vault-np-era').getAttribute('data-on') === '1';
            stroke('pen');                       // 같은 자리를 지우개로 덧그림
            const afterErase = inkPixels();
            document.getElementById('vault-np-pen').click();
            document.getElementById('vault-np-clear').click();
            return {drawn, afterUndo, redrawn, eraserOn, afterErase, cleared: inkPixels(),
                    strokes: window.VaultNotepad.strokeCount()};
        })()""")
        check(label, "되돌리기", (r4.get("afterUndo") or 0) == 0, str(r4))
        check(label, "지우개 모드 전환", r4.get("eraserOn") is True)
        check(label, "지우개로 지워짐", (r4.get("afterErase") or 0) < (r4.get("redrawn") or 0),
              f"{r4.get('redrawn')} → {r4.get('afterErase')}")
        check(label, "전체 지우기", r4.get("cleared") == 0 and r4.get("strokes") == 0, str(r4))

        # 창 이동 / 크기 조절 — 크기를 바꿔도 글씨가 남아야 한다
        if not mobile:
            r5 = ev(HELPERS + """(() => {
                const win = document.getElementById('vault-np');
                stroke('pen');
                const before = inkPixels();
                const b0 = win.getBoundingClientRect();
                drag(document.getElementById('vault-np-bar'), -120, -60);
                const b1 = win.getBoundingClientRect();
                drag(document.getElementById('vault-np-grip'), 90, 70);
                const b2 = win.getBoundingClientRect();
                return {moved: Math.round(b0.left - b1.left), movedY: Math.round(b0.top - b1.top),
                        dw: Math.round(b2.width - b1.width), dh: Math.round(b2.height - b1.height),
                        before, after: inkPixels()};
            })()""")
            check(label, "제목줄로 창 이동", r5.get("moved") == 120 and r5.get("movedY") == 60, str(r5))
            check(label, "모서리로 크기 조절", r5.get("dw") == 90 and r5.get("dh") == 70, str(r5))
            check(label, "크기 바꿔도 글씨 유지", (r5.get("after") or 0) > 0,
                  f"{r5.get('before')} → {r5.get('after')}")
        else:
            r5 = ev(HELPERS + """(() => {
                const win = document.getElementById('vault-np');
                stroke('pen');
                const h0 = win.getBoundingClientRect().height;
                drag(document.getElementById('vault-np-bar'), 0, -100);   // 위로 끌면 커진다
                return {dh: Math.round(win.getBoundingClientRect().height - h0), after: inkPixels()};
            })()""")
            check(label, "시트 높이 조절(위로 끌기)", r5.get("dh") == 100, str(r5))
            check(label, "높이 바꿔도 글씨 유지", (r5.get("after") or 0) > 0, str(r5))

        r6 = ev("""(() => {
            document.getElementById('vault-np-close').click();
            return document.getElementById('vault-np').getAttribute('data-open') === '0';
        })()""")
        check(label, "닫기", r6 is True)

        # 새로고침하면 지워진다 (이 메모장의 핵심 성질)
        load(path)
        r7 = ev(HELPERS + """(() => {
            window.VaultNotepad.open();
            return {strokes: window.VaultNotepad.strokeCount(), ink: inkPixels(),
                    open0: document.getElementById('vault-np').getAttribute('data-open'),
                    lsKeys: Object.keys(localStorage).filter(k => k.indexOf('notepad') >= 0)};
        })()""")
        check(label, "새로고침하면 필기가 지워짐", r7.get("strokes") == 0 and r7.get("ink") == 0, str(r7))
        check(label, "새로고침 후에도 저장소 깨끗함", r7.get("lsKeys") == [], str(r7.get("lsKeys")))

try:
    ws.close()
finally:
    proc.terminate()

print("\n" + "=" * 60)
if FAILS:
    print(f"실패 {len(FAILS)}건")
    for f in FAILS: print("  -", f)
    sys.exit(1)
print("전부 통과")
