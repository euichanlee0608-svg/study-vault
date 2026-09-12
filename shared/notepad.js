/* Study Vault 떠 있는 필기장 — 화면을 따라다니는 손글씨 메모판 (v3)
 * 터치펜(스타일러스)으로 쓰는 판이다. 타이핑이 아니라 그리기.
 * 일부러 저장하지 않는다: 새로고침하면 내용이 사라지는 임시 메모다(localStorage 미사용).
 * 획은 좌표로 들고 있다가 다시 그린다 — 창 크기를 바꿔도 글씨가 뭉개지지 않는다.
 * 로드: progress.js 가 자기 옆에서 이 파일을 끌어온다 — 페이지 HTML 은 건드리지 않는다.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc || global.VaultNotepad) return;

  var MIN_W = 260, MIN_H = 200, MIN_MH = 160;
  var PEN_W = 2, ERASER_W = 18;
  var st = { open: false, x: null, y: null, w: 380, h: 420, mh: null };  // 메모리에만 산다

  var strokes = [];      // [{erase, color, pts:[{x,y,w}]}]  — 창 좌표계(CSS px)
  var cur = null;        // 그리는 중인 획
  var erasing = false;
  var sawPen = false;    // 펜을 한 번이라도 봤으면 손가락(손바닥) 입력은 무시한다

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
    ' border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.18);word-break:keep-all}',
    '#vault-np[data-open="1"]{display:flex}',

    '#vault-np-bar{display:flex;align-items:center;gap:6px;padding:7px 9px;cursor:move;user-select:none;',
    ' background:var(--surf2,#F4F1EC);border-bottom:1px solid var(--line,#E4DFD7);touch-action:none}',
    '#vault-np-ttl{flex:1;min-width:0;font-size:12px;font-weight:700;color:var(--ink2,#57514B);',
    ' white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',

    '#vault-np-tools{display:flex;align-items:center;gap:5px;padding:5px 8px;',
    ' border-bottom:1px solid var(--line,#E4DFD7)}',
    '.vault-np-btn{border:1px solid var(--line,#E4DFD7);background:none;color:var(--ink2,#57514B);',
    ' cursor:pointer;border-radius:6px;padding:3px 9px;font-size:11.5px;line-height:1.3;font-family:inherit}',
    '.vault-np-btn:hover{color:var(--ink,#1C1A18);border-color:var(--line2,#D2CBC1)}',
    '.vault-np-btn[data-on="1"]{background:var(--acc-bg,#FBEDE6);border-color:var(--acc,#B4491C);',
    ' color:var(--acc,#B4491C);font-weight:700}',
    '#vault-np-close{margin-left:auto;border-color:transparent;font-size:14px;padding:2px 7px}',

    '#vault-np-cv{flex:1;width:100%;display:block;touch-action:none;cursor:crosshair;',
    ' background:transparent}',

    '#vault-np-grip{position:absolute;right:0;bottom:0;width:18px;height:18px;cursor:nwse-resize;touch-action:none}',
    '#vault-np-grip::before{content:"";position:absolute;right:4px;bottom:4px;width:8px;height:8px;',
    ' border-right:2px solid var(--line2,#D2CBC1);border-bottom:2px solid var(--line2,#D2CBC1)}',

    '@media (max-width:640px){',
    ' #vault-np-fab{right:auto;left:14px;bottom:calc(74px + env(safe-area-inset-bottom))}',
    ' #vault-np{left:8px;right:8px;width:auto !important;top:auto !important;',
    '  bottom:calc(66px + env(safe-area-inset-bottom));border-radius:12px}',
    ' .vault-np-btn{padding:5px 10px;font-size:12px}',
    ' #vault-np-grip{display:none}',
    ' #vault-np-bar{cursor:ns-resize}',
    '}'
  ].join('\n');

  var fab, win, bar, cv, ctx, grip, penBtn, eraBtn;

  function build() {
    var style = doc.createElement('style');
    style.id = 'vault-np-css';
    style.textContent = CSS;
    doc.head.appendChild(style);

    fab = doc.createElement('button');
    fab.id = 'vault-np-fab';
    fab.type = 'button';
    fab.textContent = '✍️';
    fab.title = '필기장 (Alt+N)';
    fab.setAttribute('aria-label', '필기장 켜기/끄기');

    win = doc.createElement('section');
    win.id = 'vault-np';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', '손글씨 메모');
    win.innerHTML =
      '<div id="vault-np-bar">' +
        '<span id="vault-np-ttl">필기 · 새로고침하면 지워집니다</span>' +
      '</div>' +
      '<div id="vault-np-tools">' +
        '<button class="vault-np-btn" id="vault-np-pen" type="button" data-on="1">펜</button>' +
        '<button class="vault-np-btn" id="vault-np-era" type="button">지우개</button>' +
        '<button class="vault-np-btn" id="vault-np-undo" type="button">되돌리기</button>' +
        '<button class="vault-np-btn" id="vault-np-clear" type="button">전체 지우기</button>' +
        '<button class="vault-np-btn" id="vault-np-close" type="button" title="닫기">×</button>' +
      '</div>' +
      '<canvas id="vault-np-cv"></canvas>' +
      '<div id="vault-np-grip" title="크기 조절"></div>';

    doc.body.appendChild(fab);
    doc.body.appendChild(win);

    bar = doc.getElementById('vault-np-bar');
    cv = doc.getElementById('vault-np-cv');
    ctx = cv.getContext('2d');
    grip = doc.getElementById('vault-np-grip');
    penBtn = doc.getElementById('vault-np-pen');
    eraBtn = doc.getElementById('vault-np-era');
  }

  /* ── 캔버스: 화면 배율에 맞춰 잡고, 획을 다시 그린다 ─────────── */
  function inkColor() {
    try {
      var c = getComputedStyle(doc.documentElement).getPropertyValue('--ink').trim();
      return c || '#1C1A18';
    } catch (e) { return '#1C1A18'; }
  }

  function fitCanvas() {
    var r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var dpr = global.devicePixelRatio || 1;
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    redraw();
  }

  function drawStroke(s) {
    if (s.pts.length < 2) {                       // 점 하나만 찍은 경우
      var p = s.pts[0];
      ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = s.color;
    for (var i = 1; i < s.pts.length; i++) {
      var a = s.pts[i - 1], b = s.pts[i];
      ctx.lineWidth = (a.w + b.w) / 2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  function redraw() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.restore();
    for (var i = 0; i < strokes.length; i++) drawStroke(strokes[i]);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ── 그리기 ──────────────────────────────────────────────── */
  function widthOf(e) {
    if (erasing) return ERASER_W;
    // 필압을 지원하는 펜이면 굵기에 반영한다. 마우스·손가락은 고정 굵기.
    if (e.pointerType === 'pen' && e.pressure > 0) return PEN_W * (0.45 + 1.3 * e.pressure);
    return PEN_W;
  }
  function pointFrom(e, rect) {
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, w: widthOf(e) };
  }

  function wireCanvas() {
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'pen') sawPen = true;
      if (e.pointerType === 'touch' && sawPen) return;   // 손바닥 오터치 방지
      if (e.isPrimary === false) return;
      var rect = cv.getBoundingClientRect();
      cur = { erase: erasing, color: erasing ? '#000' : inkColor(), pts: [pointFrom(e, rect)] };
      strokes.push(cur);
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
      drawStroke(cur);
      ctx.globalCompositeOperation = 'source-over';
      e.preventDefault();
    });

    cv.addEventListener('pointermove', function (e) {
      if (!cur) return;
      var rect = cv.getBoundingClientRect();
      // 펜은 한 프레임에 여러 점이 들어온다 — 다 쓰면 선이 훨씬 매끄럽다
      var evs = (typeof e.getCoalescedEvents === 'function') ? e.getCoalescedEvents() : null;
      var list = (evs && evs.length) ? evs : [e];
      for (var i = 0; i < list.length; i++) {
        var p = pointFrom(list[i], rect);
        var prev = cur.pts[cur.pts.length - 1];
        if (Math.abs(p.x - prev.x) < 0.4 && Math.abs(p.y - prev.y) < 0.4) continue;
        cur.pts.push(p);
        ctx.globalCompositeOperation = cur.erase ? 'destination-out' : 'source-over';
        ctx.strokeStyle = cur.color;
        ctx.lineWidth = (prev.w + p.w) / 2;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      e.preventDefault();
    });

    function end() { cur = null; }
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', end);
  }

  /* ── 배치 ────────────────────────────────────────────────── */
  function layout() {
    var vw = global.innerWidth, vh = global.innerHeight;
    if (isMobile()) {
      st.mh = clamp(st.mh || Math.round(vh * 0.45), MIN_MH, Math.round(vh * 0.8));
      win.style.height = st.mh + 'px';
      win.style.left = win.style.top = win.style.width = '';
    } else {
      st.w = clamp(st.w, MIN_W, Math.max(MIN_W, vw - 24));
      st.h = clamp(st.h, MIN_H, Math.max(MIN_H, vh - 24));
      st.x = clamp(st.x == null ? vw - st.w - 20 : st.x, 0, Math.max(0, vw - st.w));
      st.y = clamp(st.y == null ? Math.max(12, vh - st.h - 80) : st.y, 0, Math.max(0, vh - 40));
      win.style.width = st.w + 'px';
      win.style.height = st.h + 'px';
      win.style.left = st.x + 'px';
      win.style.top = st.y + 'px';
    }
    fitCanvas();
  }

  function setOpen(on) {
    st.open = !!on;
    win.setAttribute('data-open', on ? '1' : '0');
    fab.setAttribute('data-on', on ? '1' : '0');
    // 모바일 시트는 버튼 자리를 덮는다 — 열려 있는 동안은 버튼을 숨기고 ×로 닫는다
    fab.style.display = (on && isMobile()) ? 'none' : '';
    if (on) layout();
  }

  function setErasing(on) {
    erasing = !!on;
    penBtn.setAttribute('data-on', on ? '0' : '1');
    eraBtn.setAttribute('data-on', on ? '1' : '0');
  }

  /* ── 끌기 / 크기 조절 (마우스·터치·펜 공용) ───────────────── */
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
        fitCanvas();                 // 크기가 바뀌었으면 획을 다시 그린다
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
    penBtn.addEventListener('click', function () { setErasing(false); });
    eraBtn.addEventListener('click', function () { setErasing(true); });
    doc.getElementById('vault-np-undo').addEventListener('click', function () {
      strokes.pop(); redraw();
    });
    doc.getElementById('vault-np-clear').addEventListener('click', function () {
      strokes = []; redraw();
    });

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

    dragify(grip, function (dx, dy, s) {
      if (isMobile()) return;
      st.w = clamp(s.w + dx, MIN_W, Math.max(MIN_W, global.innerWidth - st.x));
      st.h = clamp(s.h + dy, MIN_H, Math.max(MIN_H, global.innerHeight - st.y));
      win.style.width = st.w + 'px';
      win.style.height = st.h + 'px';
    });

    wireCanvas();

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
    toggle: function () { setOpen(!st.open); },
    clear: function () { strokes = []; redraw(); },
    strokeCount: function () { return strokes.length; }
  };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
