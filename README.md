# Study Vault

개인 학습용 웹앱을 한 곳에 모은 저장창고 — 허브 1 + 학습앱 N, GitHub Pages 정적 호스팅.
폰/컴퓨터 어디서든 이어서 학습하고, 진도는 브라우저 localStorage에 저장된다(서버·계정 없음).

- **허브**: `index.html` — `apps.json`을 읽어 앱 카드·진도·이어서 보기 렌더. 진도 내보내기/가져오기/폰으로 보내기 링크.
- **진도 모듈**: `shared/progress.js` — `Vault.progress/meta/drill/exportAll/importMerge`. 키: `vault:<appId>:*`.
- **규약**: 모든 학습앱은 `docs/PIPELINE.md`의 4단계 파이프라인(EXTRACT→VERIFY→GENERATE→OUTPUT)을 따르고,
  각 앱 `README.md`에 파이프라인 기록을 남긴다.
- **앱 추가**: `apps/<id>/` 폴더 + `README.md` + progress.js 연동 + `apps.json` 1항목 — 허브 코드는 불변.
