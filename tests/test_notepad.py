#!/usr/bin/env python3
"""Study Vault 메모장 회귀 게이트 — 실제 크롬에서 열고·쓰고·끌고·줄이고·새로고침한다.
데스크톱(1280x800)과 모바일(390x844) 두 뷰포트. 실패는 비0 종료.

shared/notepad.js 나 shared/progress.js 를 고치면 이걸 돌린다 (tests/README.md 참고).
"""
import json, subprocess, time, urllib.request, os, sys, websocket

PORT = 9394
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 레포 최상위
SCRATCH = os.environ.get("TMPDIR", "/tmp") + "/vault_np_test"
PAGES = [
    ("hub", f"{ROOT}/index.html", "hub"),
    ("course-eecirc", f"{ROOT}/apps/course-eecirc/index.html", "course-eecirc"),
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

# 창을 끌고 크기를 바꾸는 동작을 포인터 이벤트로 재현한다(핸들러가 pointer* 를 듣는다)
DRAG = """
function drag(el, dx, dy){
  const r = el.getBoundingClientRect();
  const x = r.left + Math.min(8, r.width/2), y = r.top + Math.min(8, r.height/2);
  const mk = (t, cx, cy) => new PointerEvent(t, {bubbles:true, cancelable:true, pointerId:1,
      pointerType:'mouse', clientX:cx, clientY:cy, buttons:1});
  el.dispatchEvent(mk('pointerdown', x, y));
  el.dispatchEvent(mk('pointermove', x+dx, y+dy));
  el.dispatchEvent(mk('pointerup',  x+dx, y+dy));
}
"""

FAILS = []
def check(page, name, ok, detail=""):
    mark = "✅" if ok else "❌"
    print(f"  {mark} {name}" + (f"  — {detail}" if detail and not ok else ""))
    if not ok: FAILS.append(f"{page}: {name} {detail}")

def load(path):
    """탐색 후 메모장이 주입될 때까지 기다린다(주입 스크립트는 한 번 더 왕복한다)."""
    cmd("Page.navigate", url="file://" + path)
    for _ in range(40):
        time.sleep(0.25)
        if ev("!!(window.VaultNotepad && document.getElementById('vault-np'))") is True:
            time.sleep(0.25)   # 초기 배치까지
            return True
    return False

for label, path, want_id in PAGES:
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
            vaultApi: !!(window.Vault && window.Vault.progress && window.Vault.exportAll),
            scope: window.VaultNotepad && window.VaultNotepad.appId,
            openAtStart: document.getElementById('vault-np').getAttribute('data-open'),
            ls: (() => { try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; }
                         catch(e){ return false; } })()
        }))()""")
        if not isinstance(r, dict) or r.get("_error"):
            check(label, f"{view} 주입", False, str(r)); continue
        check(label, "메모장 버튼 주입됨(HTML 수정 없이)", r["fab"] and r["win"])
        check(label, "진도 모듈(Vault API) 그대로", r["vaultApi"])
        check(label, f"메모 범위 = {want_id}", r["scope"] == want_id, f"실제 {r['scope']}")
        ls_ok = r["ls"]

        # 열기 → 입력 → 저장
        r2 = ev("""(async () => {
            document.getElementById('vault-np-fab').click();
            const win = document.getElementById('vault-np'), ta = document.getElementById('vault-np-ta');
            const opened = win.getAttribute('data-open') === '1';
            const cs = getComputedStyle(win), tacs = getComputedStyle(ta);
            ta.value = '테스트 풀이 1 + 1 = 2';
            ta.dispatchEvent(new Event('input', {bubbles:true}));
            await new Promise(r => setTimeout(r, 700));
            const key = 'vault:notepad:' + window.VaultNotepad.appId;
            let saved = null; try { saved = localStorage.getItem(key); } catch(e) {}
            return {opened, position: cs.position, zIndex: cs.zIndex,
                    taFont: parseFloat(tacs.fontSize), saved,
                    stat: document.getElementById('vault-np-stat').textContent,
                    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth};
        })()""")
        check(label, "버튼으로 켜짐", r2.get("opened") is True)
        check(label, "스크롤 따라다님(position:fixed)", r2.get("position") == "fixed")
        check(label, "다른 UI 위에 뜸(z-index>51)", int(r2.get("zIndex") or 0) > 51, str(r2.get("zIndex")))
        check(label, "자동 저장됨", (r2.get("saved") or "").startswith("테스트 풀이") if ls_ok else True,
              f"stat={r2.get('stat')}")
        check(label, "가로 스크롤 없음", (r2.get("overflowX") or 0) <= 0, f"{r2.get('overflowX')}px")
        if mobile:
            check(label, "모바일 입력 16px 이상(iOS 확대 방지)", (r2.get("taFont") or 0) >= 16,
                  f"{r2.get('taFont')}px")

        # 이동 / 크기 조절
        if not mobile:
            r3 = ev(DRAG + """(() => {
                const win = document.getElementById('vault-np');
                const b0 = win.getBoundingClientRect();
                drag(document.getElementById('vault-np-bar'), -120, -60);
                const b1 = win.getBoundingClientRect();
                drag(document.getElementById('vault-np-grip'), 90, 70);
                const b2 = win.getBoundingClientRect();
                return {moved: Math.round(b0.left - b1.left), movedY: Math.round(b0.top - b1.top),
                        dw: Math.round(b2.width - b1.width), dh: Math.round(b2.height - b1.height)};
            })()""")
            check(label, "제목줄로 창 이동", r3.get("moved") == 120 and r3.get("movedY") == 60, str(r3))
            check(label, "모서리로 크기 조절", r3.get("dw") == 90 and r3.get("dh") == 70, str(r3))
        else:
            r3 = ev(DRAG + """(() => {
                const win = document.getElementById('vault-np');
                const h0 = win.getBoundingClientRect().height;
                drag(document.getElementById('vault-np-bar'), 0, -100);   // 위로 끌면 커진다
                return {dh: Math.round(win.getBoundingClientRect().height - h0)};
            })()""")
            check(label, "시트 높이 조절(위로 끌기)", r3.get("dh") == 100, str(r3))

        # 접기 / 닫기
        r4 = ev("""(() => {
            document.getElementById('vault-np-fold').click();
            const folded = getComputedStyle(document.getElementById('vault-np-ta')).display === 'none';
            document.getElementById('vault-np-fold').click();
            document.getElementById('vault-np-close').click();
            return {folded, closed: document.getElementById('vault-np').getAttribute('data-open') === '0'};
        })()""")
        check(label, "접기", r4.get("folded") is True)
        check(label, "닫기", r4.get("closed") is True)

        # 새로고침 후 메모·창 상태가 남는가
        if ls_ok:
            load(path)
            r5 = ev("""(() => {
                const ta = document.getElementById('vault-np-ta');
                let win = null; try { win = JSON.parse(localStorage.getItem('vault:notepad:win')||'{}'); } catch(e){}
                return {text: ta.value, open: document.getElementById('vault-np').getAttribute('data-open'),
                        w: win.w, h: win.h, mh: win.mh};
            })()""")
            check(label, "새로고침해도 메모 남음", (r5.get("text") or "").startswith("테스트 풀이"))
            check(label, "닫아 둔 상태 기억", r5.get("open") == "0")

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
