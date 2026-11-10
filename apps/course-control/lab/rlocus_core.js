/* rlocus_core.js — 근궤적 계산(브라우저·node 공용, 의존성 없음).
   다항식은 실계수 배열, 최고차항부터: s^2+3s+2 → [1,3,2].
   개루프 G(s)H(s) = K·N(s)/D(s), 폐루프 특성식 D(s)+K·N(s)=0.
   tests/test_rlocus_core.mjs 가 numpy 독립 계산과 대조한다 — 여기를 고치면 그 테스트를 다시 돌린다. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.RL = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  // ---------- 복소수 ----------
  function C(re, im) { return { re: re, im: im || 0 }; }
  function add(a, b) { return C(a.re + b.re, a.im + b.im); }
  function sub(a, b) { return C(a.re - b.re, a.im - b.im); }
  function mul(a, b) { return C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
  function div(a, b) { var d = b.re * b.re + b.im * b.im; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); }
  function abs(a) { return Math.hypot(a.re, a.im); }
  function arg(a) { return Math.atan2(a.im, a.re); }

  // ---------- 다항식 ----------
  function trim(p) { var i = 0; while (i < p.length - 1 && Math.abs(p[i]) < 1e-14) i++; return p.slice(i); }
  function deg(p) { return trim(p).length - 1; }
  function polyAdd(a, b) {
    var n = Math.max(a.length, b.length), out = [];
    for (var i = 0; i < n; i++) {
      var x = a[a.length - n + i] || 0, y = b[b.length - n + i] || 0;
      out.push((i >= n - a.length ? x : 0) + (i >= n - b.length ? y : 0));
    }
    return trim(out);
  }
  function polyScale(a, k) { return a.map(function (x) { return x * k; }); }
  function polyMul(a, b) {
    var out = new Array(a.length + b.length - 1).fill(0);
    for (var i = 0; i < a.length; i++) for (var j = 0; j < b.length; j++) out[i + j] += a[i] * b[j];
    return out;
  }
  function polyDer(a) { var n = a.length - 1, out = []; for (var i = 0; i < n; i++) out.push(a[i] * (n - i)); return out.length ? out : [0]; }
  function polyEval(a, s) { var r = C(0, 0); for (var i = 0; i < a.length; i++) r = add(mul(r, s), C(a[i], 0)); return r; }
  function polyEvalReal(a, x) { var r = 0; for (var i = 0; i < a.length; i++) r = r * x + a[i]; return r; }
  /** 근(복소 켤레 쌍 포함) → 실계수 다항식. */
  function fromRoots(rs) {
    var p = [C(1, 0)];
    rs.forEach(function (r) {
      var q = p.concat([C(0, 0)]);
      for (var i = 1; i < q.length; i++) q[i] = sub(q[i], mul(r, p[i - 1]));
      p = q;
    });
    return p.map(function (c) { return Math.abs(c.re) < 1e-13 ? 0 : c.re; });
  }

  /** 다항식 근 — Aberth–Ehrlich. init 를 주면 그 근에서 출발(근궤적의 가지 추적용). */
  function roots(p, init) {
    p = trim(p);
    var n = p.length - 1;
    if (n < 1) return [];
    var a = p.map(function (x) { return x / p[0]; });
    var z;
    // 이전 근에서 출발 — 실수 근만 넣으면 반복이 실수축에 갇혀 이탈점 뒤의 복소 쌍을 못 따라가므로 허수 흔들림을 준다
    if (init && init.length === n) z = init.map(function (r, k) { var e = 1e-4 * (1 + abs(r)); return C(r.re + e * 0.37, r.im + (k % 2 ? e : -e)); });
    else {
      var R = 0; for (var i = 1; i <= n; i++) R = Math.max(R, Math.pow(Math.abs(a[i]), 1 / i));
      R = 1 + R;
      z = []; for (var k = 0; k < n; k++) z.push(C(R * Math.cos(2 * Math.PI * k / n + 0.4), R * Math.sin(2 * Math.PI * k / n + 0.4)));
    }
    var da = polyDer(a);
    for (var it = 0; it < 500; it++) {
      var maxd = 0;
      for (var k2 = 0; k2 < n; k2++) {
        var pv = polyEval(a, z[k2]), dv = polyEval(da, z[k2]);
        if (abs(pv) === 0) continue;
        var ratio = div(pv, dv), s = C(0, 0);
        for (var j = 0; j < n; j++) if (j !== k2) {
          var dz = sub(z[k2], z[j]);
          if (abs(dz) < 1e-300) dz = C(1e-12, 1e-12);
          s = add(s, div(C(1, 0), dz));
        }
        var w = div(ratio, sub(C(1, 0), mul(ratio, s)));
        if (!isFinite(w.re) || !isFinite(w.im)) w = C(1e-6 * (k2 + 1), 1e-6);
        z[k2] = sub(z[k2], w);
        maxd = Math.max(maxd, abs(w) / (1 + abs(z[k2])));
      }
      if (maxd < 1e-14) break;
    }
    // 실근으로 수렴했는데 허수부가 수치 잡음인 것 정리
    return z.map(function (r) { return Math.abs(r.im) < 1e-9 * (1 + Math.abs(r.re)) ? C(r.re, 0) : r; });
  }

  // ---------- 근궤적 ----------
  function charPoly(N, D, K) { return polyAdd(D, polyScale(N, K)); }

  /** 이전 근과 최소 이동으로 짝짓기(가지 추적). */
  function match(prev, cur) {
    var used = new Array(cur.length).fill(false), out = [];
    prev.forEach(function (p) {
      var best = -1, bd = Infinity;
      cur.forEach(function (c, j) { if (!used[j]) { var d = abs(sub(p, c)); if (d < bd) { bd = d; best = j; } } });
      used[best] = true; out.push(cur[best]);
    });
    return out;
  }

  /** K 를 0 → 크게 훑으며 가지들을 만든다. view = 화면 반경(정밀도 기준). 반환: {K:[...], branches:[[C...]...]} */
  function locus(N, D, view) {
    N = trim(N); D = trim(D);
    var R = view || 10, n = deg(D);
    var Ks = [0], prev = roots(D), sets = [prev.slice()];
    var K = 1e-6, Kend = 1e9;
    var zeros = roots(N);
    function done(rs) {
      return rs.every(function (r) {
        if (abs(r) > 4 * R) return true;
        return zeros.some(function (z) { return abs(sub(r, z)) < 2e-3 * R; });
      });
    }
    function step(Ka, ra, Kb, depth) {
      var rb = match(ra, roots(charPoly(N, D, Kb), ra));
      var jump = 0; for (var i = 0; i < n; i++) jump = Math.max(jump, abs(sub(ra[i], rb[i])));
      if (jump > 0.015 * R && depth < 9) {
        var Km = Math.sqrt(Ka * Kb) || Kb / 2;
        var rm = step(Ka, ra, Km, depth + 1);
        return step(Km, rm, Kb, depth + 1);
      }
      Ks.push(Kb); sets.push(rb);
      return rb;
    }
    var cur = prev;
    while (K < Kend) {
      cur = step(Ks[Ks.length - 1], cur, K, 0);
      if (K > 1e-3 && done(cur)) break;
      K *= 1.08;
    }
    var branches = [];
    for (var b = 0; b < n; b++) branches.push(sets.map(function (rs) { return rs[b]; }));
    return { K: Ks, branches: branches };
  }

  /** 점근선 — 중심 σa = (Σp − Σz)/(n−m), 각 (2k+1)·180°/(n−m). */
  function asymptotes(N, D) {
    var ps = roots(D), zs = roots(N), q = ps.length - zs.length;
    if (q <= 0) return null;
    var sp = ps.reduce(function (s, r) { return s + r.re; }, 0), sz = zs.reduce(function (s, r) { return s + r.re; }, 0);
    var angles = []; for (var k = 0; k < q; k++) angles.push((2 * k + 1) * 180 / q);
    return { center: (sp - sz) / q, angles: angles, count: q };
  }

  /** 실수축 이탈·유입점 — D'N − DN' = 0 의 실근 중 K = −D/N > 0 인 것. */
  function breakPoints(N, D) {
    var P = polyAdd(polyMul(polyDer(D), N), polyScale(polyMul(D, polyDer(N)), -1));
    if (deg(P) < 1) return [];
    return roots(P).filter(function (r) { return Math.abs(r.im) < 1e-7 * (1 + Math.abs(r.re)); }).map(function (r) {
      var x = r.re, nv = polyEvalReal(N, x);
      if (Math.abs(nv) < 1e-12) return null;
      var K = -polyEvalReal(D, x) / nv;
      return K > 1e-9 ? { s: x, K: K } : null;
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).filter(function (b, i, arr) {
      return i === 0 || Math.abs(b.s - arr[i - 1].s) > 1e-6 * (1 + Math.abs(b.s));   // 중근(세 가지가 만나는 점) 중복 제거
    });
  }

  /** s = jω 를 넣은 다항식의 실부·허부(ω 다항식). */
  function jwParts(p) {
    var n = p.length - 1, re = new Array(n + 1).fill(0), im = new Array(n + 1).fill(0);
    for (var i = 0; i <= n; i++) {
      var k = n - i, c = p[i];        // c·(jω)^k
      switch (k % 4) { case 0: re[i] += c; break; case 1: im[i] += c; break; case 2: re[i] -= c; break; case 3: im[i] -= c; break; }
    }
    return { re: trim(re), im: trim(im) };
  }

  /** 허수축 교차 — D(jω)+K·N(jω)=0 의 ω ≥ 0, K > 0. */
  function jwCross(N, D) {
    var d = jwParts(D), nn = jwParts(N);
    // Im(D·conj N) = Di·Nr − Dr·Ni = 0
    var P = polyAdd(polyMul(d.im, nn.re), polyScale(polyMul(d.re, nn.im), -1));
    var cand = [];
    if (deg(P) < 1) return [];
    roots(P).forEach(function (r) {
      if (Math.abs(r.im) > 1e-7 * (1 + Math.abs(r.re)) || r.re < -1e-9) return;
      var w = Math.max(0, r.re);
      var Dv = polyEval(D, C(0, w)), Nv = polyEval(N, C(0, w));
      var nn2 = Nv.re * Nv.re + Nv.im * Nv.im;
      if (nn2 < 1e-18) return;
      var K = -(Dv.re * Nv.re + Dv.im * Nv.im) / nn2;
      if (K > 1e-9 && abs(add(Dv, mul(C(K, 0), Nv))) < 1e-6 * (1 + abs(Dv))) cand.push({ w: w, K: K });
    });
    cand.sort(function (a, b) { return a.K - b.K; });
    var out = [];
    cand.forEach(function (c) { if (!out.some(function (o) { return Math.abs(o.w - c.w) < 1e-6 && Math.abs(o.K - c.K) < 1e-6 * (1 + c.K); })) out.push(c); });
    return out;
  }

  function wrap180(a) { a = ((a + 180) % 360 + 360) % 360 - 180; return a === -180 ? 180 : a; }
  /** 복소 극점의 출발각·복소 영점의 도착각(도, 허부 > 0 인 것만). */
  function angles(N, D) {
    var ps = roots(D), zs = roots(N), deg2 = 180 / Math.PI, out = [];
    ps.forEach(function (p, i) {
      if (p.im <= 1e-9) return;
      var th = 180;
      ps.forEach(function (q, j) { if (j !== i) th -= arg(sub(p, q)) * deg2; });
      zs.forEach(function (z) { th += arg(sub(p, z)) * deg2; });
      out.push({ kind: "departure", at: p, deg: wrap180(th) });
    });
    zs.forEach(function (z, i) {
      if (z.im <= 1e-9) return;
      var th = 180;
      ps.forEach(function (q) { th += arg(sub(z, q)) * deg2; });
      zs.forEach(function (w, j) { if (j !== i) th -= arg(sub(z, w)) * deg2; });
      out.push({ kind: "arrival", at: z, deg: wrap180(th) });
    });
    return out;
  }

  /** 점 s 에서의 이득(크기 조건)과 각도 조건 오차(도). */
  function gainAt(N, D, s) {
    var Dv = polyEval(D, s), Nv = polyEval(N, s);
    var g = div(Nv, Dv);                      // G(s)/K
    var angErr = wrap180(arg(g) * 180 / Math.PI - 180);
    return { K: abs(Dv) / abs(Nv), angleErr: angErr };
  }

  /** 실수축 위 근궤적 구간 — 오른쪽 실 극점+영점 개수가 홀수인 곳. */
  function realSegments(N, D, xmin) {
    var pts = roots(D).concat(roots(N)).filter(function (r) { return Math.abs(r.im) < 1e-9; }).map(function (r) { return r.re; }).sort(function (a, b) { return b - a; });
    var segs = [];
    for (var i = 0; i < pts.length; i += 2) segs.push([i + 1 < pts.length ? pts[i + 1] : xmin, pts[i]]);
    return segs;
  }

  // ---------- 폐루프 계단응답 ----------
  /** T(s) = K·N/(D+K·N) 의 단위 계단응답 — 가제어 정준형 + RK4. */
  function step(N, D, K, tEnd, nPts) {
    var den = charPoly(N, D, K), num = trim(polyScale(N, K));
    var n = den.length - 1, a0 = den[0];
    den = den.map(function (x) { return x / a0; }); num = num.map(function (x) { return x / a0; });
    var b = new Array(n + 1 - num.length).fill(0).concat(num);   // 길이 n+1
    var d0 = b[0], c = [];
    for (var i = 1; i <= n; i++) c.push(b[i] - d0 * den[i]);     // c[i-1] ↔ s^(n-i)
    var x = new Array(n).fill(0);                                 // x[0]=y_n-1 ... 정준형: x' = A x + B u
    function f(x) {
      var dx = new Array(n);
      for (var i = 0; i < n - 1; i++) dx[i] = x[i + 1];
      var last = 1;                                               // u = 1
      for (var j = 0; j < n; j++) last -= den[n - j] * x[j];
      dx[n - 1] = last;
      return dx;
    }
    function out(x) { var y = d0; for (var j = 0; j < n; j++) y += c[n - 1 - j] * x[j]; return y; }
    var ps = roots(den), fast = ps.reduce(function (m, r) { return Math.max(m, abs(r)); }, 1);
    var dt = Math.min(tEnd / nPts, 0.05 / fast), t = 0, ts = [0], ys = [out(x)], nextT = tEnd / nPts;
    while (t < tEnd - 1e-12) {
      var h = Math.min(dt, tEnd - t);
      var k1 = f(x), x2 = x.map(function (v, i) { return v + h / 2 * k1[i]; });
      var k2 = f(x2), x3 = x.map(function (v, i) { return v + h / 2 * k2[i]; });
      var k3 = f(x3), x4 = x.map(function (v, i) { return v + h * k3[i]; });
      var k4 = f(x4);
      x = x.map(function (v, i) { return v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]); });
      t += h;
      if (t >= nextT - 1e-12 || t >= tEnd - 1e-12) { ts.push(t); ys.push(out(x)); nextT += tEnd / nPts; }
      if (!isFinite(x[0]) || Math.abs(out(x)) > 1e6) break;
    }
    var yss = polyEvalReal(den, 0) !== 0 ? polyEvalReal(b, 0) / polyEvalReal(den, 0) : NaN;
    return { t: ts, y: ys, yss: yss, poles: ps };
  }

  /** 계단응답 실측 지표 — 최대 오버슈트(%)·2% 정착시간. */
  function stepMetrics(r) {
    var yss = r.yss, ymax = -Infinity, ts = NaN;
    r.y.forEach(function (v) { if (v > ymax) ymax = v; });
    if (!isFinite(yss) || Math.abs(yss) < 1e-12) return { os: NaN, ts: NaN };
    for (var i = r.y.length - 1; i >= 0; i--) if (Math.abs(r.y[i] - yss) > 0.02 * Math.abs(yss)) { ts = r.t[Math.min(i + 1, r.t.length - 1)]; break; }
    if (isNaN(ts)) ts = 0;
    return { os: Math.max(0, (ymax - yss) / Math.abs(yss) * 100), ts: ts };
  }

  /** 지배극점(실부가 가장 큰 것) 2차 근사 — ζ, ωn, %OS, Ts. */
  function dominant(ps) {
    var top = ps.slice().sort(function (a, b) { return b.re - a.re; })[0];
    if (!top) return null;
    var wn = abs(top), z = wn > 0 ? -top.re / wn : 1;
    var os = (z > 0 && z < 1) ? Math.exp(-z * Math.PI / Math.sqrt(1 - z * z)) * 100 : 0;
    return { pole: top, zeta: z, wn: wn, os: os, ts: top.re < 0 ? 4 / -top.re : Infinity };
  }

  return { C: C, roots: roots, fromRoots: fromRoots, polyEval: polyEval, polyMul: polyMul, trim: trim, deg: deg,
    charPoly: charPoly, locus: locus, asymptotes: asymptotes, breakPoints: breakPoints, jwCross: jwCross,
    angles: angles, gainAt: gainAt, realSegments: realSegments, step: step, stepMetrics: stepMetrics, dominant: dominant };
});
