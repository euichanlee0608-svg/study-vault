# 일반물리II 문제은행 (course-phys152)

일반물리II(PHYS152, Go Dongwook — 강의노트 정본+Halliday 12판) **중간범위** 문제풀이 앱. HW 50% 미만=F 규정에 맞춰 L2~L3가 Halliday HW급 중심.

구성(정석식): 개념(+「정석」 핵심 박스) → 수식·유도 → 필수예제(완전 풀이) → 드릴 L1~L4
(L3 응용·L4 시험급 중심 배분 6·12·14·8) · 파라메트릭 리롤 · 오답노트 · 모의고사.
진도·자가채점: `vault:course-phys152:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | course outline·노트 01/02 비전 판독 → 주차표·평가 실측(`pipeline/sources/강의자료분석.md`, 원문 미전재) + Halliday 12판 골격 |
| VERIFY | 공용 게이트 `_course_kit/verify_core.py` — solver(런타임 동일 JS) 시드 샘플 50개/문제를 `verify_ind.py`의 sympy/numpy 독립 재계산(별도 경로)과 전수 대조. 통과분만 탑재 |
| GENERATE | `_course_kit/build_core.py` — 게이트 통과 후 엔진 템플릿+content.py+problems/u*.js 단일 HTML 조립 |
| OUTPUT | 단일 HTML SPA (259 KB ≤ 400 KB 예산) |

## 재빌드

```
cd apps/course-phys152/pipeline && ../../../.venv/bin/python build.py
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산),
콘텐츠는 `content.py`, 공용 화면/게이트는 `apps/_course_kit/`.

## 단원별 수량 현황 (게이트 2026-09-03 자동 기록)

| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(6·12·14·8) |
|---|---|---|---|---|---|---|
| U1 쿨롱 법칙·전기장 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U2 연속분포·가우스 법칙 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U3 전위 (Electric Potential) | 6 | 12 | 14 | 8 | 40 | ✅ |
| U4 축전기·유전체 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U5 전류·저항·DC 회로 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U6 자기장과 자기력 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U7 전류의 자기장 | 6 | 12 | 14 | 8 | 40 | ✅ |

총 280문제 · 검산 샘플 N=50/문제

## 상태

- 중간범위 U1~U7 (퀴즈1 = U1~U4 범위). 기말범위(유도·EM파·상대론·양자화)는 C2에서.
- 상수: k=8.99×10⁹, ε₀=8.85×10⁻¹², e=1.602×10⁻¹⁹, µ₀=4π×10⁻⁷ 통일.
