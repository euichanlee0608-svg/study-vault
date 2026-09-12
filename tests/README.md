# tests

## test_notepad.py — 공용 메모장 회귀 게이트

`shared/notepad.js` 또는 `shared/progress.js`(끝의 메모장 로더 포함)를 고치면 **반드시** 돌린다.
실제 크롬을 띄워 데스크톱(1280×800)·모바일(390×844) 두 뷰포트에서 페이지 2종(허브·course-eecirc)을
열고 다음을 확인한다 — 주입 여부, 진도 모듈(`window.Vault`) 무손상, 메모 범위(appId), 켜기/끄기,
`position:fixed`, z-index, 자동 저장, 가로 스크롤 0, 모바일 입력 16px, 창 이동·크기 조절,
접기, 새로고침 후 메모·창 상태 유지.

```bash
# 준비 (한 번만) — 시스템 파이썬을 더럽히지 않는다(전역 지침 10.5)
python3 -m venv /tmp/cdpvenv && /tmp/cdpvenv/bin/pip -q install websocket-client

/tmp/cdpvenv/bin/python tests/test_notepad.py     # 전부 통과하면 종료코드 0
```

크롬 경로는 스크립트 상단 `CHROME` 상수에 있다(맥 기본 설치 경로).
