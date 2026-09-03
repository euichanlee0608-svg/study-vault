# 기계학습 문제은행 (course-ml)

기계학습(COSE362, 김현철) **중간범위** 문제풀이 앱 — 손계산(정보이득·지니·NB·혼동행렬) 중심 + 개념 판별 + 알고리즘 비교.

구성(정석식): 개념(+「정석」 핵심 박스) → 수식·유도 → 필수예제(완전 풀이) → 드릴 L1~L4
(L3 응용·L4 시험급 중심 배분 6·12·14·8) · 파라메트릭 리롤 · 오답노트 · 모의고사.
진도·자가채점: `vault:course-ml:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | LearningX 강의계획서 스크린샷 판독 → 요목·평가 분석(`pipeline/sources/강의자료분석.md`, 원문 미전재) + 표준 커리큘럼(Mitchell·ESL 골격) |
| VERIFY | 공용 게이트 `_course_kit/verify_core.py` — solver(런타임 동일 JS) 시드 샘플 50개/문제를 `verify_ind.py`의 sympy/numpy 독립 재계산(별도 경로)과 전수 대조. 통과분만 탑재 |
| GENERATE | `_course_kit/build_core.py` — 게이트 통과 후 엔진 템플릿+content.py+problems/u*.js 단일 HTML 조립 |
| OUTPUT | 단일 HTML SPA (217 KB ≤ 400 KB 예산) |

## 재빌드

```
cd apps/course-ml/pipeline && ../../../.venv/bin/python build.py
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산),
콘텐츠는 `content.py`, 공용 화면/게이트는 `apps/_course_kit/`.

## 단원별 수량 현황 (게이트 2026-09-03 자동 기록)

| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(6·12·14·8) |
|---|---|---|---|---|---|---|
| U1 ML 개요·개념학습 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U2 회귀·선형모델 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U3 평가방법 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U4 결정트리 I (엔트로피·정보이득) | 6 | 12 | 14 | 8 | 40 | ✅ |
| U5 결정트리 II (지니·가지치기) | 6 | 12 | 14 | 8 | 40 | ✅ |
| U6 베이즈·나이브 베이즈 | 6 | 12 | 14 | 8 | 40 | ✅ |

총 240문제 · 검산 샘플 N=50/문제

## 상태

- 중간범위 U1~U6. 기말범위(KNN·SVM·신경망·앙상블·비지도)와 텀프로젝트 전략 절은 C2에서.
- 중간고사 날짜(8주) 공지 시 apps.json exams 기입.
