// rlocus_core.js 회귀 게이트 — numpy 독립 계산(tests/rlocus_ref.py, 다른 경로)과 대조.
// 실행: node tests/test_rlocus_core.mjs   (레포 .venv 의 numpy 사용)
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RL = require(path.join(ROOT, "apps/course-control/lab/rlocus_core.js"));
const PY = path.join(ROOT, ".venv/bin/python");

const CASES = [
  { name: "s(s+2)", N: [1], D: [1, 2, 0], K: 5, t: [0.3, 1, 2, 4] },
  { name: "s(s+2)(s+5)", N: [1], D: RL.fromRoots([RL.C(0), RL.C(-2), RL.C(-5)]), K: 30, t: [0.5, 1, 3, 6] },
  { name: "(s+3)/s(s+1)(s+2)", N: [1, 3], D: RL.fromRoots([RL.C(0), RL.C(-1), RL.C(-2)]), K: 4, t: [0.5, 2, 5] },
  { name: "1/(s+1)(s^2+2s+5)", N: [1], D: RL.polyMul([1, 1], [1, 2, 5]), K: 10, t: [0.5, 1.5, 4] },
  { name: "(s+2)/(s^2+2s+2)(s+4)", N: [1, 2], D: RL.polyMul([1, 2, 2], [1, 4]), K: 8, t: [0.4, 1, 3] },
  { name: "(s+1)/s^2(s+9)", N: [1, 1], D: [1, 9, 0, 0], K: 27, t: [0.5, 2, 5] },
  { name: "1/(s+1)(s+2)(s+3)(s+4)", N: [1], D: RL.fromRoots([-1, -2, -3, -4].map(x => RL.C(x))), K: 20, t: [0.5, 2, 6] },
];

const ref = JSON.parse(execFileSync(PY, [path.join(ROOT, "tests/rlocus_ref.py")], { input: JSON.stringify(CASES) }).toString());
let fail = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fail++; console.log("  ✖", msg); } };
const near = (a, b, tol) => Math.abs(a - b) <= tol * (1 + Math.abs(b));

for (const c of CASES) {
  const r = ref[c.name];
  console.log("▶", c.name);
  const as = RL.asymptotes(c.N, c.D);
  if (r.asym) ok(as && near(as.center, r.asym.center, 1e-9) && as.count === r.asym.count, `점근선 중심 ${as && as.center} vs ${r.asym.center}`);
  const bp = RL.breakPoints(c.N, c.D);
  // 독립 탐색은 실수축 위 K(σ)>0 극값 전부(근궤적 구간 밖 극값 포함 가능) — JS 결과가 그 안에 다 있어야 하고, 개수가 같아야 한다
  ok(bp.length === r.break.length, `이탈점 개수 ${bp.length} vs ${r.break.length} (${JSON.stringify(bp)} / ${JSON.stringify(r.break)})`);
  bp.forEach((b, i) => r.break[i] && ok(near(b.s, r.break[i].s, 1e-4) && near(b.K, r.break[i].K, 1e-4), `이탈점 ${b.s},${b.K} vs ${r.break[i].s},${r.break[i].K}`));
  const jw = RL.jwCross(c.N, c.D).filter(x => x.w > 1e-6);
  const jr = r.jw.filter(x => x.w > 1e-6);
  ok(jw.length === jr.length, `허수축 교차 개수 ${JSON.stringify(jw)} vs ${JSON.stringify(jr)}`);
  jw.forEach((x, i) => jr[i] && ok(near(x.K, jr[i].K, 1e-6) && near(x.w, jr[i].w, 1e-4), `교차 K,ω ${x.K},${x.w} vs ${jr[i].K},${jr[i].w}`));
  const dep = RL.angles(c.N, c.D).filter(a => a.kind === "departure").map(a => a.deg);
  ok(dep.length === r.dep.length, `출발각 개수 ${dep} vs ${r.dep}`);
  dep.forEach((d, i) => { const e = Math.abs(((d - r.dep[i]) + 540) % 360 - 180); ok(e < 0.05, `출발각 ${d} vs ${r.dep[i]}`); });
  if (r.step) {
    const s = RL.step(c.N, c.D, c.K, Math.max(...c.t), 20000);
    c.t.forEach((t, i) => {
      let j = 1; while (j < s.t.length - 1 && s.t[j] < t) j++;
      const f = (t - s.t[j - 1]) / (s.t[j] - s.t[j - 1]), y = s.y[j - 1] + f * (s.y[j] - s.y[j - 1]);   // 표본 사이 선형 보간
      ok(Math.abs(y - r.step[i]) < 2e-5, `계단응답 t=${t}: ${y} vs ${r.step[i]}`);
    });
  }
  // 근궤적 자체: 모든 표본 점이 특성식의 근이어야(잔차) — K 가 거대한 끝은 상대 잔차로
  const L = RL.locus(c.N, c.D, 10);
  let worst = 0;
  for (let k = 0; k < L.K.length; k += 7) for (const br of L.branches) {
    const p = RL.charPoly(c.N, c.D, L.K[k]); const v = RL.polyEval(p, br[k]);
    const scale = p.reduce((m, x) => m + Math.abs(x), 0) * Math.max(1, Math.hypot(br[k].re, br[k].im)) ** (p.length - 1);
    worst = Math.max(worst, Math.hypot(v.re, v.im) / scale);
  }
  ok(worst < 1e-9, `근궤적 잔차 ${worst}`);
  // 가지가 이어져 있는가(화면 반경 10 의 3% 이상 점프 없음, 무한대로 가는 가지는 제외)
  let jump = 0;
  for (const br of L.branches) for (let k = 1; k < br.length; k++) {
    if (Math.hypot(br[k].re, br[k].im) > 30) break;
    jump = Math.max(jump, Math.hypot(br[k].re - br[k - 1].re, br[k].im - br[k - 1].im));
  }
  ok(jump < 0.3, `가지 연속성 최대 점프 ${jump}`);
}
// 크기 조건: 근궤적 위 한 점에서 gainAt 이 그 K 를 돌려줘야
{
  const N = [1], D = [1, 2, 0], s = RL.C(-1, 2);   // K=5 일 때 폐루프 극점 -1±2j
  const g = RL.gainAt(N, D, s);
  ok(near(g.K, 5, 1e-12) && Math.abs(g.angleErr) < 1e-9, `gainAt ${g.K}, ${g.angleErr}`);
}
console.log(fail ? `❌ ${fail}/${n} 실패` : `✅ ${n}개 전부 통과`);
process.exit(fail ? 1 : 0);
