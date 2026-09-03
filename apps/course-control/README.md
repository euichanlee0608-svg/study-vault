# 자동제어 문제은행 (course-control)

자동제어(MECH387, Nise 8판) **중간범위** 문제풀이 앱 — 모델링→라플라스→전달함수→블록선도→상태공간(얕게)→시간응답→Routh 안정성.

구성(정석식): 개념(+「정석」 핵심 박스) → 수식·유도 → 필수예제(완전 풀이) → 드릴 L1~L4
(L3 응용·L4 시험급 중심 배분 6·12·14·8) · 파라메트릭 리롤 · 오답노트 · 모의고사.
진도·자가채점: `vault:course-control:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | Lec0 Syllabus·Lec1 비전 판독 → 주차표·평가·범위 분석(`pipeline/sources/강의자료분석.md`, 원문 미전재) + Nise 8판 골격 |
| VERIFY | 공용 게이트 `_course_kit/verify_core.py` — solver(런타임 동일 JS) 시드 샘플 50개/문제를 `verify_ind.py`의 sympy/numpy 독립 재계산(별도 경로)과 전수 대조. 통과분만 탑재 |
| GENERATE | `_course_kit/build_core.py` — 게이트 통과 후 엔진 템플릿+content.py+problems/u*.js 단일 HTML 조립 |
| OUTPUT | 단일 HTML SPA (290 KB ≤ 700 KB 예산) |

## 재빌드

```
cd apps/course-control/pipeline && ../../../.venv/bin/python build.py
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산),
콘텐츠는 `content.py`, 공용 화면/게이트는 `apps/_course_kit/`.

## 단원별 수량 현황 (게이트 2026-09-03 자동 기록)

| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(6·12·14·8) |
|---|---|---|---|---|---|---|
| U1 선수 리프레셔 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U2 라플라스 변환 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U3 전달함수·모델링 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U4 블록선도 간략화 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U5 상태공간·선형화 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U6 시간응답 (1·2차계) | 6 | 12 | 14 | 8 | 40 | ✅ |
| U7 안정성·Routh-Hurwitz | 6 | 12 | 14 | 8 | 40 | ✅ |

총 280문제 · 검산 샘플 N=50/문제

## 상태

- 중간범위 U1~U7. 기말범위(정상상태 오차·근궤적·보드·나이퀴스트·보상기)는 C2에서.
- HW 20%가 랜덤 2문제 채점 → L2~L3(HW급)을 성실히 도는 것이 점수 직결.
