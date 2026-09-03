# 전전개 문제은행 (course-eecirc)

전자전기공학개론(Rizzoni 7판) **중간범위** 문제풀이 앱 — Course Mastery 아키타입.

구성(정석식): 개념(+「정석」 핵심 박스) → 수식·유도 → 필수예제(완전 풀이) → 드릴 L1~L4
(L3 응용·L4 시험급 중심 배분 6·12·14·8) · 파라메트릭 리롤 · 오답노트 · 모의고사.
진도·자가채점: `vault:course-eecirc:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | 기출 스캔 3부 비전 판독 → 유형·배점·스타일 분석만 기록(`pipeline/sources/기출분석.md`, 원문 미전재) + Rizzoni 범위 골격 |
| VERIFY | 공용 게이트 `_course_kit/verify_core.py` — solver(런타임 동일 JS) 시드 샘플 50개/문제를 `verify_ind.py`의 sympy/numpy 독립 재계산(별도 경로)과 전수 대조. 통과분만 탑재 |
| GENERATE | `_course_kit/build_core.py` — 게이트 통과 후 엔진 템플릿+content.py+problems/u*.js 단일 HTML 조립 |
| OUTPUT | 단일 HTML SPA (333 KB ≤ 700 KB 예산) |

## 재빌드

```
cd apps/course-eecirc/pipeline && ../../../.venv/bin/python build.py
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산),
콘텐츠는 `content.py`, 공용 화면/게이트는 `apps/_course_kit/`.

## 단원별 수량 현황 (게이트 2026-09-03 자동 기록)

| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(6·12·14·8) |
|---|---|---|---|---|---|---|
| U1 회로 기초 | 10 | 15 | 14 | 8 | 47 | ✅ |
| U2 저항 회로망 | 10 | 15 | 14 | 8 | 47 | ✅ |
| U3 절점·망로 해석 | 10 | 15 | 14 | 8 | 47 | ✅ |
| U4 회로 정리 (테브난·중첩) | 10 | 15 | 14 | 8 | 47 | ✅ |
| U5 축전기·인덕터·페이저 | 6 | 12 | 14 | 8 | 40 | ✅ |
| U6 1차 과도응답 (RC·RL) | 6 | 12 | 14 | 8 | 40 | ✅ |
| U7 주파수응답·필터 | 6 | 12 | 14 | 8 | 40 | ✅ |

총 308문제 · 검산 샘플 N=50/문제

## 상태

- U1~U7 중간범위 전체 + 정석급 개편(L3·L4 증강) 적용
- 전전개 중간고사 날짜 공지 시 `apps.json`의 `exams`에 기입 → 허브 D-day 자동 표시
