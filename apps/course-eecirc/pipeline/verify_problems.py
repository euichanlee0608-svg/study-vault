#!/usr/bin/env python3
"""검산 게이트 (기획서 §13.3, 타협 불가) — 빌드 전 실행, 실패 시 빌드 중단.

1) 구조 검증: id 유일성·형식, 유형별 필수 필드, 선택지 무결성, 힌트·해설, 근거 등급.
2) 수치 검증: node 러너가 실행한 solver(=앱 런타임과 동일 코드) 결과를,
   이 파일의 INDEPENDENT 레지스트리(sympy/numpy 독립 재계산, 풀이 스텝과 별도 경로)와
   시드 샘플 N개 전수 대조. 등록 안 된 수치 문제는 그 자체로 FAIL(검산 없는 탑재 금지).
3) 유도(derive) 검증: 스텝 수 + 말미 차원/극한 체크 존재.
4) 수량 현황표: 단원×난이도 하한(10/15/10/5) 대비 — 경고이며 README에 기록(§13.2).

사용: .venv/bin/python verify_problems.py [N=50]
출력: 리포트 + quantity_table.md (build.py가 README에 반영)
"""
import json, subprocess, sys, math, os
from pathlib import Path

import sympy as sp

DIR = Path(__file__).parent
N = sys.argv[1] if len(sys.argv) > 1 else "50"
RTOL, ATOL = 1e-9, 1e-12
FLOOR = {1: 10, 2: 15, 3: 10, 4: 5}
SRC_OK = {"교재 표준", "창작 문제(검산됨)", "기출 유형", "강의자료 대조"}

from verify_ind import IND

# ---------------------------------------------------------------- 게이트 본체
def close(a, b):
    if isinstance(a, bool) or isinstance(b, bool): return a == b
    return math.isfinite(a) and math.isfinite(b) and abs(a-b) <= max(ATOL, RTOL*max(abs(a), abs(b)))

def main():
    r = subprocess.run(["node", str(DIR/"verify_runner.mjs"), N],
                       capture_output=True, text=True, cwd=DIR)
    if r.returncode != 0:
        print("❌ 러너 실패:\n" + r.stderr[:2000]); sys.exit(1)
    data = json.loads(r.stdout)
    errs, warns = [], []
    ids = [p["id"] for p in data["problems"]]
    if len(ids) != len(set(ids)):
        dup = sorted({i for i in ids if ids.count(i) > 1})
        errs.append(f"id 중복: {dup}")

    import re
    for p in data["problems"]:
        pid = p["id"]
        if not re.fullmatch(r"u\d+-l[1-4]-\d{2}", pid):
            errs.append(f"{pid}: id 형식 위반")
        if p.get("statementErr"):
            errs.append(f"{pid}: statement 실행 오류 — {p['statementErr']}")
        elif p.get("statementLen", 0) < 10:
            errs.append(f"{pid}: statement 너무 짧음")
        if p.get("src") not in SRC_OK:
            errs.append(f"{pid}: 근거 등급 누락/오기 '{p.get('src')}'")
        t = p["type"]
        if t == "mc":
            if p.get("nChoices", 0) < 3: errs.append(f"{pid}: 선택지 {p.get('nChoices')}개(<3)")
            if not isinstance(p.get("answerIdx"), int) or not (0 <= p["answerIdx"] < p.get("nChoices", 0)):
                errs.append(f"{pid}: 정답 인덱스 무효")
            if p.get("distinctChoices") != p.get("nChoices"): errs.append(f"{pid}: 중복 선택지")
            if not p.get("hasExpl"): errs.append(f"{pid}: 해설(expl) 없음")
        elif t == "tf":
            if p.get("answerBool") is None: errs.append(f"{pid}: 진위 정답 없음")
            if not p.get("hasExpl"): errs.append(f"{pid}: 해설 없음")
        elif t == "derive":
            if p.get("nSteps", 0) < 4: errs.append(f"{pid}: 유도 스텝 {p.get('nSteps')}개(<4)")
            last = p.get("lastStep", "")
            if ("차원" not in last) and ("극한" not in last):
                errs.append(f"{pid}: 유도 말미에 차원/극한 체크 없음 (§13.3)")
            if p.get("nHints", 0) < 1: errs.append(f"{pid}: 힌트 없음")
        elif t == "num":
            if p.get("nHints", 0) < 1: errs.append(f"{pid}: 힌트 없음")
            fn = IND.get(pid)
            if fn is None:
                errs.append(f"{pid}: 독립 재계산 미등록 — 검산 없는 문제는 탑재 금지"); continue
            for s in p.get("samples", []):
                if "err" in s:
                    errs.append(f"{pid}: solver 예외 {s['err']} (params={s['p']})"); break
                if (s.get("nSteps") or 0) < 2:
                    errs.append(f"{pid}: 풀이 스텝 {s.get('nSteps')}개(<2)"); break
                try:
                    ref = fn(s["p"])
                except AssertionError as e:
                    errs.append(f"{pid}: 물리 타당성 위반 {e} (params={s['p']})"); break
                got = s["ans"]
                if isinstance(ref, dict):
                    if not isinstance(got, dict) or set(ref) != set(got):
                        errs.append(f"{pid}: ans 키 불일치 {got} vs {list(ref)}"); break
                    bad = [k for k in ref if not close(got[k], ref[k])]
                    if bad:
                        errs.append(f"{pid}: 수치 불일치 {bad} solver={got} 독립={ref} (params={s['p']})"); break
                else:
                    if isinstance(got, dict) or not close(got, ref):
                        errs.append(f"{pid}: 수치 불일치 solver={got} 독립={ref} (params={s['p']})"); break
        else:
            errs.append(f"{pid}: 알 수 없는 type '{t}'")

    # 수량 현황표 (경고 + md 기록)
    lines = ["| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(40) |", "|---|---|---|---|---|---|---|"]
    for u in data["units"]:
        c = {int(k): v for k, v in u["counts"].items()}
        tot = sum(c.values())
        short = [f"L{l} {c.get(l,0)}/{FLOOR[l]}" for l in FLOOR if c.get(l, 0) < FLOOR[l]]
        mark = "✅" if not short else "⚠️ " + ", ".join(short)
        lines.append(f"| U{u['no']} {u['title']} | {c.get(1,0)} | {c.get(2,0)} | {c.get(3,0)} | {c.get(4,0)} | {tot} | {mark} |")
        if short: warns.append(f"U{u['no']}: 하한 미달 {short}")
    total = sum(sum(int(v) for v in u["counts"].values()) for u in data["units"])
    lines.append(f"\n총 {total}문제 · 검산 샘플 N={N}/문제 · 게이트 통과 시각 기록은 README 참조")
    (DIR/"quantity_table.md").write_text("\n".join(lines), encoding="utf-8")

    nnum = sum(1 for p in data["problems"] if p["type"] == "num")
    nsamp = sum(len(p.get("samples", [])) for p in data["problems"])
    print(f"문제 {total}개 (수치 {nnum} · 샘플 검산 {nsamp}회)")
    for w in warns: print("⚠️ ", w)
    if errs:
        print(f"\n❌ FAIL — {len(errs)}건:")
        for e in errs[:40]: print("  -", e)
        sys.exit(1)
    print("✅ PASS — 전 문제 구조·수치 검산 통과")

if __name__ == "__main__":
    main()
