# 전전개 문제은행 (course-eecirc)

전자전기공학개론(Rizzoni 7판) **중간범위** 문제풀이 앱 — Course Mastery 아키타입 파일럿(C0).
개념(CONCEPT) → 유도(DERIVE) → 예제(WORKED) → 4단계 문제(DRILL: L1~L4) · 파라메트릭 리롤 ·
오답노트 · 모의고사. 진도·자가채점은 `vault:course-eecirc:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | 기출 스캔 3부 비전 판독 → **유형·배점·스타일 분석만** 기록(`pipeline/sources/기출분석.md`, 원문 미전재) + Rizzoni 범위 골격 |
| VERIFY | **검산 게이트 `verify_problems.py`** — solver(런타임과 동일 JS)를 시드 샘플 50개/문제로 실행, `verify_ind.py`의 sympy/numpy **독립 재계산(별도 경로)** 과 전수 대조. 구조·힌트·해설·유도 차원/극한 체크 포함. 통과분만 탑재 |
| GENERATE | `pipeline/build.py` — 게이트 통과 확인 후 `engine_template.html` + `content.py` + `problems/u*.js` 를 단일 HTML로 조립 |
| OUTPUT | 단일 HTML SPA (169 KB ≤ 400 KB 예산) |

## 재빌드

```
cd apps/course-eecirc/pipeline
../../../.venv/bin/python build.py     # 게이트 실패 시 빌드 중단
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산 등록),
콘텐츠는 `content.py`, 화면은 `engine_template.html`을 고치고 재빌드.

## 단원별 수량 현황 (게이트 2026-09-03 자동 기록)

| 단원 | L1 | L2 | L3 | L4 | 계 | 하한(40) |
|---|---|---|---|---|---|---|
| U1 회로 기초 | 10 | 15 | 10 | 5 | 40 | ✅ |
| U2 저항 회로망 | 10 | 15 | 10 | 5 | 40 | ✅ |
| U3 절점·망로 해석 | 10 | 15 | 10 | 5 | 40 | ✅ |
| U4 회로 정리 (테브난·중첩) | 10 | 15 | 10 | 5 | 40 | ✅ |

총 160문제 · 검산 샘플 N=50/문제 · 게이트 통과 시각 기록은 README 참조

## C0 진행 상태

- ✅ U1 회로 기초 · U2 저항 회로망 · U3 절점·망로 · U4 회로 정리 — 각 40문제, 검산 통과
- ⏳ **U5 축전기·인덕터·페이저 · U6 1차 과도 · U7 주파수응답·필터** — 다음 증분(중간 2주 전까지 하한 충족, §13.2)
- ⏳ 전전개 중간고사 날짜 공지 시 `apps.json`의 `exams`에 기입 → 허브 D-day 자동 표시
