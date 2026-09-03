/* 문제은행 공용 헬퍼 — 브라우저(런타임)와 node(검산 러너) 양쪽에서 동일 코드 실행 (이중 구현 금지) */
(function (g) {
  'use strict';
  g.SV_BANK = g.SV_BANK || [];
  var SVH = {
    /* 유효숫자 정리 (부동소수 노이즈 제거). 표시용 — ans에는 절대 쓰지 말 것 */
    fmt: function (x, sig) {
      if (typeof x !== 'number' || !isFinite(x)) return String(x);
      if (x === 0) return '0';
      var v = Number(x.toPrecision(sig || 4));
      return String(v);
    },
    /* SI 접두 표기 (표시용) */
    si: function (x, unit, sig) {
      if (x === 0) return '0 ' + unit;
      var a = Math.abs(x);
      var P = [[1e9,'G'],[1e6,'M'],[1e3,'k'],[1,''],[1e-3,'m'],[1e-6,'µ'],[1e-9,'n'],[1e-12,'p']];
      for (var i = 0; i < P.length; i++) {
        if (a >= P[i][0] * 0.9999) return SVH.fmt(x / P[i][0], sig) + ' ' + P[i][1] + unit;
      }
      return SVH.fmt(x, sig) + ' ' + unit;
    },
    par: function (a, b) { return a * b / (a + b); },        // 병렬 저항
    par3: function (a, b, c) { return 1 / (1/a + 1/b + 1/c); },
    deg: function (rad) { return rad * 180 / Math.PI; },
    rad: function (d) { return d * Math.PI / 180; },
    /* 복소수 최소 연산 (페이저용) */
    cx: function (re, im) { return { re: re, im: im }; },
    cadd: function (a, b) { return { re: a.re + b.re, im: a.im + b.im }; },
    csub: function (a, b) { return { re: a.re - b.re, im: a.im - b.im }; },
    cmul: function (a, b) { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; },
    cdiv: function (a, b) {
      var d = b.re * b.re + b.im * b.im;
      return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
    },
    cmag: function (a) { return Math.hypot(a.re, a.im); },
    cang: function (a) { return Math.atan2(a.im, a.re) * 180 / Math.PI; }, // deg
    cpar: function (a, b) { return SVH.cdiv(SVH.cmul(a, b), SVH.cadd(a, b)); },
    /* 2x2 / 3x3 실계수 선형계 풀이 (절점/망로 검산·풀이 공용) */
    solve2: function (a11, a12, b1, a21, a22, b2) {
      var D = a11 * a22 - a12 * a21;
      return [ (b1 * a22 - a12 * b2) / D, (a11 * b2 - b1 * a21) / D ];
    },
    solve3: function (A, b) { // A: 3x3 배열, b: [3]
      var d = SVH.det3(A);
      function rep(A, i, b) {
        var M = A.map(function (r) { return r.slice(); });
        for (var r = 0; r < 3; r++) M[r][i] = b[r];
        return M;
      }
      return [SVH.det3(rep(A,0,b))/d, SVH.det3(rep(A,1,b))/d, SVH.det3(rep(A,2,b))/d];
    },
    det3: function (A) {
      return A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])
           - A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])
           + A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
    }
  };
  g.SVH = SVH;
})(typeof window !== 'undefined' ? window : globalThis);
