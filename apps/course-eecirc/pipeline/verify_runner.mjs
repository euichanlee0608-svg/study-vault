/* 검산 러너 — 문제은행의 solver(런타임과 동일 코드)를 시드 샘플로 실행해 JSON 출력.
 * 사용: node verify_runner.mjs [N] > runner_out.json */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const N = parseInt(process.argv[2] || '50', 10);

/* 문제은행 로드 — 브라우저와 동일하게 전역에서 평가 */
const files = ['_helpers.js', ...fs.readdirSync(path.join(DIR, 'problems'))
  .filter(f => /^u\d+\.js$/.test(f)).sort()]
  .map(f => path.join(DIR, 'problems', f).replace('problems/_helpers.js', 'problems/_helpers.js'));
for (const f of files) (0, eval)(fs.readFileSync(f, 'utf8'));

/* mulberry32 — 재현 가능한 시드 난수 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashId(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

function draw(spec, rnd) {
  if (spec.choices) return spec.choices[Math.floor(rnd() * spec.choices.length)];
  const steps = Math.round((spec.max - spec.min) / spec.step);
  return spec.min + spec.step * Math.floor(rnd() * (steps + 1));
}
function sample(prob, rnd) {
  for (let tries = 0; tries < 500; tries++) {
    const p = {};
    for (const [k, spec] of Object.entries(prob.params)) p[k] = draw(spec, rnd);
    if (!prob.constraint || prob.constraint(p)) return p;
  }
  throw new Error(prob.id + ': constraint를 500회 내에 만족 못 함');
}

const out = { units: [], problems: [] };
for (const unit of globalThis.SV_BANK) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const prob of unit.problems) {
    counts[prob.level] = (counts[prob.level] || 0) + 1;
    const rec = {
      id: prob.id, unit: unit.id, level: prob.level, type: prob.type,
      tags: prob.tags || [], src: prob.src || '',
      nHints: (prob.hints || []).length,
      hasExpl: !!prob.expl,
    };
    // statement 렌더 확인 (함수형은 첫 샘플로)
    try {
      const rnd = mulberry32(hashId(prob.id));
      const p0 = prob.params ? sample(prob, rnd) : {};
      const st = typeof prob.statement === 'function' ? prob.statement(p0) : prob.statement;
      rec.statementLen = String(st || '').length;
    } catch (e) { rec.statementErr = String(e.message || e); }
    if (prob.type === 'mc') {
      rec.nChoices = (prob.choices || []).length;
      rec.answerIdx = prob.answer;
      rec.distinctChoices = new Set(prob.choices || []).size;
    } else if (prob.type === 'tf') {
      rec.answerBool = typeof prob.answer === 'boolean' ? prob.answer : null;
    } else if (prob.type === 'derive') {
      rec.nSteps = (prob.steps || []).length;
      rec.lastStep = (prob.steps || []).slice(-1)[0] || '';
    } else if (prob.type === 'num') {
      const rnd = mulberry32(hashId(prob.id));
      rec.samples = [];
      const nRuns = prob.params ? N : 1;
      for (let i = 0; i < nRuns; i++) {
        const p = prob.params ? sample(prob, rnd) : {};
        try {
          const r = prob.solve(p);
          rec.samples.push({ p, ans: r.ans, unit: r.unit, nSteps: (r.steps || []).length });
        } catch (e) {
          rec.samples.push({ p, err: String(e.message || e) });
        }
      }
    }
    out.problems.push(rec);
  }
  out.units.push({ id: unit.id, no: unit.no, title: unit.title, counts });
}
process.stdout.write(JSON.stringify(out));
