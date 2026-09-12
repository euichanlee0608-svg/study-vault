/* Study Vault 공용 메모장 — 창처럼 옮기고 크기 조절하는 떠 있는 팝업 (v1)
 * 원칙: 서버·계정 없음. progress.js 와 같은 localStorage 본체 + 메모리 폴백(조용히).
 * 키: vault:notepad:<appId> = 메모 본문 (앱별로 따로 쌓인다)
 *     vault:notepad:win     = {"x","y","w","h","mh","open","fold"} (창 상태는 앱 공통)
 * 로드: progress.js 가 자기 옆에서 이 파일을 끌어온다 — 페이지 HTML 은 건드리지 않는다.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc || global.VaultNotepad) return;

  var mem = {};
  function lsGet(k) {
    try { var v = global.localStorage.getItem(k); return v === null ? (k in mem ? mem[k] : null) : v; }
    catch (e) { return k in mem ? mem[k] : null; }
  }
  function lsSet(k, v) {
    mem[k] = v;
    try { global.localStorage.setItem(k, v); } catch (e) { /* 조용히 메모리 폴백 */ }
  }

  /* ── 어느 앱에서 열렸나 (메모를 앱별로 나누는 기준) ──────────── */
  function appId() {
    var segs = global.location.pathname.split('/').filter(Boolean);
    var i = segs.indexOf('apps');
    return (i >= 0 && segs[i + 1]) ? segs[i + 1] : 'hub';
  }
  function scopeLabel() {
    var t = (doc.title || '').split(/[·—|(]/)[0].trim();
    if (!t) return appId();
    return t.length > 20 ? t.slice(0, 19) + '…' : t;
  }

  var ID = appId();
  var TEXT_KEY = 'vault:notepad:' + ID;
  var WIN_KEY = 'vault:notepad:win';
  var MIN_W = 260, MIN_H = 180, MIN_MH = 150;

  var st;
  try { st = JSON.parse(lsGet(WIN_KEY) || '{}') || {}; } catch (e) { st = {}; }
  function saveWin() { lsSet(WIN_KEY, JSON.stringify(st)); }

  function isMobile() {
    try { return global.matchMedia('(max-width:640px)').matches; } catch (e) { return false; }
  }

  /* ── 스타일 (사이트 디자인 토큰을 그대로 쓰고, 없으면 폴백 색) ── */
  var CSS = [
    '#vault-np-fab{position:fixed;z-index:60;right:20px;bottom:calc(20px + env(safe-area-inset-bottom));',
    ' width:46px;height:46px;border-radius:50%;border:1px solid var(--line2,#D2CBC1);cursor:pointer;',
    ' background:var(--surf,#fff);color:var(--ink,#1C1A18);font-size:19px;line-height:1;padding:0;',
    ' box-shadow:var(--shadow,0 2px 10px rgba(0,0,0,.12));display:flex;align-items:center;justify-content:center}',
    '#vault-np-fab:hover{border-color:var(--acc,#B4491C)}',
    '#vault-np-fab[data-on="1"]{background:var(--acc-bg,#FBEDE6);border-color:var(--acc,#B4491C)}',

    '#vault-np{position:fixed;z-index:61;display:none;flex-direction:column;overflow:hidden;',
    ' background:var(--surf,#fff);color:var(--ink,#1C1A18);border:1px solid var(--line2,#D2CBC1);',
    ' border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.18);word-break:keep-all;overflow-wrap:anywhere}',
    '#vault-np[data-open="1"]{display:flex}',

    '#vault-np-bar{display:flex;align-items:center;gap:6px;padding:8px 10px;cursor:move;user-select:none;',
    ' background:var(--surf2,#F4F1EC);border-bottom:1px solid var(--line,#E4DFD7);touch-action:none}',
    '#vault-np-ttl{flex:1;min-width:0;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.vault-np-btn{border:1px solid transparent;background:none;color:var(--ink2,#57514B);cursor:pointer;',
    ' border-radius:6px;padding:3px 7px;font-size:13px;line-height:1.15;min-width:26px;font-family:inherit}',
    '.vault-np-btn:hover{background:var(--surf,#fff);border-color:var(--line,#E4DFD7);color:var(--ink,#1C1A18)}',

    '#vault-np-tools{display:flex;align-items:center;gap:6px;padding:6px 10px;',
    ' border-bottom:1px solid var(--line,#E4DFD7)}',
    '#vault-np-tools .vault-np-btn{font-size:11.5px;padding:3px 8px;border-color:var(--line,#E4DFD7)}',
    '#vault-np-stat{margin-left:auto;font-size:11px;color:var(--ink3,#8A8177);white-space:nowrap}',

    '#vault-np-ta{flex:1;width:100%;box-sizing:border-box;resize:none;border:0;outline:none;padding:10px 12px;',
    ' background:transparent;color:inherit;font-size:14px;line-height:1.65;',
    ' font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}',

    '#vault-np-grip{position:absolute;right:0;bottom:0;width:18px;height:18px;cursor:nwse-resize;touch-action:none}',
    '#vault-np-grip::before{content:"";position:absolute;right:4px;bottom:4px;width:8px;height:8px;',
    ' border-right:2px solid var(--line2,#D2CBC1);border-bottom:2px solid var(--line2,#D2CBC1)}',

    '#vault-np[data-fold="1"] #vault-np-tools,#vault-np[data-fold="1"] #vault-np-ta,',
    '#vault-np[data-fold="1"] #vault-np-grip{display:none}',

    '@media (max-width:640px){',
    ' #vault-np-fab{right:auto;left:14px;bottom:calc(74px + env(safe-area-inset-bottom))}',
    ' #vault-np{left:8px;right:8px;width:auto !important;top:auto !important;',
    '  bottom:calc(66px + env(safe-area-inset-bottom));border-radius:12px}',
    ' #vault-np-ta{font-size:16px}',
    ' #vault-np-grip{display:none}',
    ' #vault-np-bar{cursor:ns-resize}',
    '}'
  ].join('\n');

  var fab, win, bar, ttl, ta, stat, grip;

  function build() {
    var style = doc.createElement('style');
    style.id = 'vault-np-css';
    style.textContent = CSS;
    doc.head.appendChild(style);

    fab = doc.createElement('button');
    fab.id = 'vault-np-fab';
    fab.type = 'button';
    fab.textContent = '📝';
    fab.title = '메모장 켜기/끄기 (Alt+N)';
    fab.setAttribute('aria-label', '메모장 켜기/끄기');

    win = doc.createElement('section');
    win.id = 'vault-np';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', '메모장');
    win.innerHTML =
      '<div id="vault-np-bar">' +
        '<span id="vault-np-ttl"></span>' +
        '<button class="vault-np-btn" id="vault-np-fold" type="button" title="접기">–</button>' +
        '<button class="vault-np-btn" id="vault-np-close" type="button" title="닫기">×</button>' +
      '</div>' +
      '<div id="vault-np-tools">' +
        '<button class="vault-np-btn" id="vault-np-copy" type="button">복사</button>' +
        '<button class="vault-np-btn" id="vault-np-clear" type="button">지우기</button>' +
        '<span id="vault-np-stat"></span>' +
      '</div>' +
      '<textarea id="vault-np-ta" spellcheck="false" ' +
        'placeholder="풀이를 여기에 적어 두세요. 자동으로 저장됩니다."></textarea>' +
      '<div id="vault-np-grip" title="크기 조절"></div>';

    doc.body.appendChild(fab);
    doc.body.appendChild(win);

    bar = doc.getElementById('vault-np-bar');
    ttl = doc.getElementById('vault-np-ttl');
    ta = doc.getElementById('vault-np-ta');
    stat = doc.getElementById('vault-np-stat');
    grip = doc.getElementById('vault-np-grip');
    ttl.textContent = '메모 · ' + scopeLabel();
  }

  /* ── 배치: 데스크톱은 자유 위치, 모바일은 아래 시트 ─────────── */
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function layout() {
    var vw = global.innerWidth, vh = global.innerHeight;
    if (isMobile()) {
      var mh = clamp(st.mh || Math.round(vh * 0.45), MIN_MH, Math.round(vh * 0.8));
      st.mh = mh;
      win.style.height = mh + 'px';
      win.style.left = win.style.top = win.style.width = '';
      return;
    }
    var w = clamp(st.w || 380, MIN_W, Math.max(MIN_W, vw - 24));
    var h = clamp(st.h || 440, MIN_H, Math.max(MIN_H, vh - 24));
    var x = clamp(st.x == null ? vw - w - 20 : st.x, 0, Math.max(0, vw - w));
    var y = clamp(st.y == null ? Math.max(12, vh - h - 80) : st.y, 0, Math.max(0, vh - 40));
    st.w = w; st.h = h; st.x = x; st.y = y;
    win.style.width = w + 'px';
    win.style.height = h + 'px';
    win.style.left = x + 'px';
    win.style.top = y + 'px';
    win.style.bottom = '';
  }

  /* ── 열고 닫기 ───────────────────────────────────────────── */
  function setOpen(on) {
    st.open = !!on;
    win.setAttribute('data-open', on ? '1' : '0');
    fab.setAttribute('data-on', on ? '1' : '0');
    // 모바일 시트는 버튼 자리를 덮는다 — 열려 있는 동안은 버튼을 숨기고 헤더의 ×로 닫는다
    fab.style.display = (on && isMobile()) ? 'none' : '';
    if (on) { layout(); ta.focus(); }
    saveWin();
  }
  function setFold(on) {
    st.fold = !!on;
    win.setAttribute('data-fold', on ? '1' : '0');
    if (!isMobile()) win.style.height = on ? 'auto' : st.h + 'px';
    else win.style.height = on ? 'auto' : st.mh + 'px';
    saveWin();
  }

  /* ── 저장 (입력 멈추고 400ms 뒤) ─────────────────────────── */
  var timer = null;
  function touchStat(msg) {
    stat.textContent = msg;
  }
  function counts() {
    var v = ta.value;
    return v.length ? v.length + '자' : '';
  }
  function scheduleSave() {
    touchStat('입력 중…');
    if (timer) global.clearTimeout(timer);
    timer = global.setTimeout(function () {
      lsSet(TEXT_KEY, ta.value);
      touchStat(counts() ? '저장됨 · ' + counts() : '저장됨');
    }, 400);
  }

  /* ── 드래그 / 크기 조절 (마우스·터치 공용) ───────────────── */
  function dragify(handle, onMove) {
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('.vault-np-btn')) return;
      var sx = e.clientX, sy = e.clientY;
      var s = { x: st.x, y: st.y, w: st.w, h: st.h, mh: st.mh };
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      function move(ev) { onMove(ev.clientX - sx, ev.clientY - sy, s); }
      function up() {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        saveWin();
      }
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
      e.preventDefault();
    });
  }

  function wire() {
    fab.addEventListener('click', function () { setOpen(!st.open); });
    doc.getElementById('vault-np-close').addEventListener('click', function () { setOpen(false); });
    doc.getElementById('vault-np-fold').addEventListener('click', function () { setFold(!st.fold); });
    bar.addEventListener('dblclick', function (e) {
      if (!(e.target.closest && e.target.closest('.vault-np-btn'))) setFold(!st.fold);
    });

    doc.getElementById('vault-np-copy').addEventListener('click', function () {
      var done = function () { touchStat('복사됨'); };
      try {
        if (global.navigator.clipboard) { global.navigator.clipboard.writeText(ta.value).then(done, fallback); }
        else fallback();
      } catch (e) { fallback(); }
      function fallback() {
        ta.select();
        try { doc.execCommand('copy'); done(); } catch (e2) { touchStat('복사 실패'); }
      }
    });

    doc.getElementById('vault-np-clear').addEventListener('click', function () {
      if (!ta.value || global.confirm('이 앱의 메모를 지웁니다. 계속할까요?')) {
        ta.value = '';
        lsSet(TEXT_KEY, '');
        touchStat('지움');
        ta.focus();
      }
    });

    ta.addEventListener('input', scheduleSave);
    // 페이지 단축키와 섞이지 않게 (창 밖으로 키 이벤트를 흘리지 않는다)
    ta.addEventListener('keydown', function (e) { e.stopPropagation(); });

    // 데스크톱: 제목줄로 이동 / 모바일: 제목줄을 위아래로 끌어 높이 조절
    dragify(bar, function (dx, dy, s) {
      if (isMobile()) {
        var vh = global.innerHeight;
        st.mh = clamp((s.mh || Math.round(vh * 0.45)) - dy, MIN_MH, Math.round(vh * 0.8));
        if (!st.fold) win.style.height = st.mh + 'px';
        return;
      }
      var vw = global.innerWidth, vhh = global.innerHeight;
      st.x = clamp(s.x + dx, 0, Math.max(0, vw - st.w));
      st.y = clamp(s.y + dy, 0, Math.max(0, vhh - 40));
      win.style.left = st.x + 'px';
      win.style.top = st.y + 'px';
    });

    // 데스크톱: 오른쪽 아래 모서리로 크기 조절
    dragify(grip, function (dx, dy, s) {
      if (isMobile()) return;
      st.w = clamp(s.w + dx, MIN_W, Math.max(MIN_W, global.innerWidth - st.x));
      st.h = clamp(s.h + dy, MIN_H, Math.max(MIN_H, global.innerHeight - st.y));
      win.style.width = st.w + 'px';
      win.style.height = st.h + 'px';
    });

    global.addEventListener('resize', function () {
      if (st.open) layout();
      fab.style.display = (st.open && isMobile()) ? 'none' : '';
    });

    doc.addEventListener('keydown', function (e) {
      if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'n' || e.key === 'N' || e.key === 'ㅜ')) {
        e.preventDefault();
        setOpen(!st.open);
      }
    });
  }

  function init() {
    build();
    wire();
    ta.value = lsGet(TEXT_KEY) || '';
    touchStat(counts() ? '저장됨 · ' + counts() : '');
    layout();
    setFold(!!st.fold);
    win.setAttribute('data-open', st.open ? '1' : '0');
    fab.setAttribute('data-on', st.open ? '1' : '0');
    fab.style.display = (st.open && isMobile()) ? 'none' : '';
    if (st.open) layout();
  }

  global.VaultNotepad = {
    open: function () { setOpen(true); },
    close: function () { setOpen(false); },
    toggle: function () { setOpen(!st.open); },
    appId: ID
  };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
