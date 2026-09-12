/* Study Vault 떠 있는 메모장 — 화면을 따라다니는 간이 필기장 (v2)
 * 일부러 저장하지 않는다: 새로고침하면 내용이 사라지는 임시 메모다(localStorage 미사용).
 * 로드: progress.js 가 자기 옆에서 이 파일을 끌어온다 — 페이지 HTML 은 건드리지 않는다.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc || global.VaultNotepad) return;

  var MIN_W = 240, MIN_H = 160, MIN_MH = 140;
  var st = { open: false, x: null, y: null, w: 340, h: 380, mh: null };  // 메모리에만 산다

  function isMobile() {
    try { return global.matchMedia('(max-width:640px)').matches; } catch (e) { return false; }
  }
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

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

    '#vault-np-bar{display:flex;align-items:center;gap:6px;padding:7px 9px;cursor:move;user-select:none;',
    ' background:var(--surf2,#F4F1EC);border-bottom:1px solid var(--line,#E4DFD7);touch-action:none}',
    '#vault-np-ttl{flex:1;min-width:0;font-size:12px;font-weight:700;color:var(--ink2,#57514B);',
    ' white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#vault-np-close{border:1px solid transparent;background:none;color:var(--ink2,#57514B);cursor:pointer;',
    ' border-radius:6px;padding:2px 7px;font-size:14px;line-height:1.15;font-family:inherit}',
    '#vault-np-close:hover{background:var(--surf,#fff);border-color:var(--line,#E4DFD7);color:var(--ink,#1C1A18)}',

    '#vault-np-ta{flex:1;width:100%;box-sizing:border-box;resize:none;border:0;outline:none;padding:10px 12px;',
    ' background:transparent;color:inherit;font-size:14px;line-height:1.65;',
    ' font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}',

    '#vault-np-grip{position:absolute;right:0;bottom:0;width:18px;height:18px;cursor:nwse-resize;touch-action:none}',
    '#vault-np-grip::before{content:"";position:absolute;right:4px;bottom:4px;width:8px;height:8px;',
    ' border-right:2px solid var(--line2,#D2CBC1);border-bottom:2px solid var(--line2,#D2CBC1)}',

    '@media (max-width:640px){',
    ' #vault-np-fab{right:auto;left:14px;bottom:calc(74px + env(safe-area-inset-bottom))}',
    ' #vault-np{left:8px;right:8px;width:auto !important;top:auto !important;',
    '  bottom:calc(66px + env(safe-area-inset-bottom));border-radius:12px}',
    ' #vault-np-ta{font-size:16px}',
    ' #vault-np-grip{display:none}',
    ' #vault-np-bar{cursor:ns-resize}',
    '}'
  ].join('\n');

  var fab, win, bar, ta, grip;

  function build() {
    var style = doc.createElement('style');
    style.id = 'vault-np-css';
    style.textContent = CSS;
    doc.head.appendChild(style);

    fab = doc.createElement('button');
    fab.id = 'vault-np-fab';
    fab.type = 'button';
    fab.textContent = '📝';
    fab.title = '메모장 (Alt+N)';
    fab.setAttribute('aria-label', '메모장 켜기/끄기');

    win = doc.createElement('section');
    win.id = 'vault-np';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', '메모장');
    win.innerHTML =
      '<div id="vault-np-bar">' +
        '<span id="vault-np-ttl">메모 · 새로고침하면 지워집니다</span>' +
        '<button id="vault-np-close" type="button" title="닫기">×</button>' +
      '</div>' +
      '<textarea id="vault-np-ta" spellcheck="false" placeholder="여기에 끄적이세요."></textarea>' +
      '<div id="vault-np-grip" title="크기 조절"></div>';

    doc.body.appendChild(fab);
    doc.body.appendChild(win);

    bar = doc.getElementById('vault-np-bar');
    ta = doc.getElementById('vault-np-ta');
    grip = doc.getElementById('vault-np-grip');
  }

  /* 배치: 데스크톱은 자유 위치, 모바일은 탭바 위 바닥 시트 */
  function layout() {
    var vw = global.innerWidth, vh = global.innerHeight;
    if (isMobile()) {
      st.mh = clamp(st.mh || Math.round(vh * 0.42), MIN_MH, Math.round(vh * 0.8));
      win.style.height = st.mh + 'px';
      win.style.left = win.style.top = win.style.width = '';
      return;
    }
    st.w = clamp(st.w, MIN_W, Math.max(MIN_W, vw - 24));
    st.h = clamp(st.h, MIN_H, Math.max(MIN_H, vh - 24));
    st.x = clamp(st.x == null ? vw - st.w - 20 : st.x, 0, Math.max(0, vw - st.w));
    st.y = clamp(st.y == null ? Math.max(12, vh - st.h - 80) : st.y, 0, Math.max(0, vh - 40));
    win.style.width = st.w + 'px';
    win.style.height = st.h + 'px';
    win.style.left = st.x + 'px';
    win.style.top = st.y + 'px';
  }

  function setOpen(on) {
    st.open = !!on;
    win.setAttribute('data-open', on ? '1' : '0');
    fab.setAttribute('data-on', on ? '1' : '0');
    // 모바일 시트는 버튼 자리를 덮는다 — 열려 있는 동안은 버튼을 숨기고 헤더의 ×로 닫는다
    fab.style.display = (on && isMobile()) ? 'none' : '';
    if (on) { layout(); ta.focus(); }
  }

  /* 끌기 / 크기 조절 (마우스·터치 공용) */
  function dragify(handle, onMove) {
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('button')) return;
      var sx = e.clientX, sy = e.clientY;
      var s = { x: st.x, y: st.y, w: st.w, h: st.h, mh: st.mh };
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      function move(ev) { onMove(ev.clientX - sx, ev.clientY - sy, s); }
      function up() {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
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

    // 페이지 단축키와 섞이지 않게 (창 밖으로 키 이벤트를 흘리지 않는다)
    ta.addEventListener('keydown', function (e) { e.stopPropagation(); });

    // 데스크톱: 제목줄로 이동 / 모바일: 제목줄을 위아래로 끌어 높이 조절
    dragify(bar, function (dx, dy, s) {
      if (isMobile()) {
        st.mh = clamp((s.mh || st.mh) - dy, MIN_MH, Math.round(global.innerHeight * 0.8));
        win.style.height = st.mh + 'px';
        return;
      }
      st.x = clamp(s.x + dx, 0, Math.max(0, global.innerWidth - st.w));
      st.y = clamp(s.y + dy, 0, Math.max(0, global.innerHeight - 40));
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
    win.setAttribute('data-open', '0');
    fab.setAttribute('data-on', '0');
  }

  global.VaultNotepad = {
    open: function () { setOpen(true); },
    close: function () { setOpen(false); },
    toggle: function () { setOpen(!st.open); }
  };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
