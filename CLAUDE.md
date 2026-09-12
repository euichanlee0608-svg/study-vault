# study-vault 프로젝트 지침

- **규약 정본은 `docs/PIPELINE.md`** (EXTRACT→VERIFY→GENERATE→OUTPUT). 앱 추가 절차도 거기에.
- **`apps.json`의 `id`는 불변** — localStorage 키(`vault:<id>:*`)와 폴더명에 쓰인다. 바꾸면 사용자 진도가 유실된다.
- **생성기가 있는 앱은 HTML 직접 수정 금지** — 각 앱 README의 재빌드 방법을 따른다.
  - mil-onboarding: 드라이브 `StudyVault_준비/pipeline_mil/` (레포 밖 — 논문 전문 포함이라 공개 레포에 못 넣음). 단, 레포의 `index.html`에는 Vault 이식 패치(`shared/progress.js` 연동·모바일 탭바)가 얹혀 있어 재빌드 시 같은 패치를 다시 적용해야 한다(앱 README 참고).
  - course-*: 앱 폴더 안 `pipeline/` — **`verify_problems.py` 게이트 통과 없이 빌드 금지**, 검산 통과 문제만 탑재.
- **저작권**: public 레포다. 교수 강의노트·교재·기출 원문 전재 금지 — 재서술·수치 변경 창작만. 기출은 유형 분석에만 사용.
- 진도 병합은 OR(읽음은 지워지지 않는 방향), drill은 상위 상태 유지. `shared/progress.js` 수정 시
  전용 회귀 테스트 파일 없음(레포·스크래치 모두 부재) — 수동으로 병합 동작 재확인.
- **공용 메모장은 `shared/notepad.js`** (풀이용 떠 있는 창 — 이동·크기조절·접기, 앱별로 따로 저장).
  키는 `vault:notepad:<appId>`(본문)·`vault:notepad:win`(창 상태). **페이지 HTML 에 `<script>` 를 넣지
  않는다** — 생성기 산출물을 직접 못 고치므로 `shared/progress.js` 맨 끝 로더가 자기 옆에서 끌어온다.
  그래서 `progress.js` 의 파일명·경로를 바꾸면 메모장이 통째로 사라진다(로더가 이름으로 찾는다).
  둘 중 하나라도 고치면 `tests/test_notepad.py` 를 통과시킨다(`tests/README.md` 에 실행법).
- 반응형(course-*·mil-onboarding): 데스크톱 ≥960px 사이드바형 / 모바일 <960px 하단 탭바(44px 터치 타깃, safe-area, 본문 16px+). 허브(index.html)·optimal-design은 다른 모바일 레이아웃.
- 배포: GitHub Pages (main / root). `.nojekyll` 필수.
