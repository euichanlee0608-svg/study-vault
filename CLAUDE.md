# study-vault 프로젝트 지침

- **규약 정본은 `docs/PIPELINE.md`** (EXTRACT→VERIFY→GENERATE→OUTPUT). 앱 추가 절차도 거기에.
- **`apps.json`의 `id`는 불변** — localStorage 키(`vault:<id>:*`)와 폴더명에 쓰인다. 바꾸면 사용자 진도가 유실된다.
- **생성기가 있는 앱은 HTML 직접 수정 금지** — 각 앱 README의 재빌드 방법을 따른다.
  - mil-onboarding: 드라이브 `StudyVault_준비/pipeline_mil/` (레포 밖 — 논문 전문 포함이라 공개 레포에 못 넣음)
  - course-*: 앱 폴더 안 `pipeline/` — **`verify_problems.py` 게이트 통과 없이 빌드 금지**, 검산 통과 문제만 탑재.
- **저작권**: public 레포다. 교수 강의노트·교재·기출 원문 전재 금지 — 재서술·수치 변경 창작만. 기출은 유형 분석에만 사용.
- 진도 병합은 OR(읽음은 지워지지 않는 방향), drill은 상위 상태 유지. `shared/progress.js` 수정 시
  `test_progress.js`(세션 스크래치에 있던 17케이스 패턴)를 다시 돌려 회귀 확인.
- 반응형: 데스크톱 ≥960px 사이드바형 / 모바일 <960px 하단 탭바(44px 터치 타깃, safe-area, 본문 16px+).
- 배포: GitHub Pages (main / root). `.nojekyll` 필수.
