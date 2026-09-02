# MIL 온보딩 노트

서병석 랩(고려대 기계공학부 Materials Innovation Lab) 합류 전 학습 노트 —
기초 개념 12강 + 논문 노트 22편 + 진행중 연구 7건 (읽음 체크 41항목).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 | 산출물 위치 |
|---|---|---|
| EXTRACT | 보유 논문 PDF 15편 전문 추출(pypdf) + 초록 + Crossref 서지 메타 + 랩 홈페이지 공개 정보 | 드라이브 `개인 연구/StudyVault_준비/pipeline_mil/` — `txt/`(전문 15편), `abs/`(초록), `papers.json`, `crossref.json` ※ 논문 전문 포함이라 레포 미포함 |
| VERIFY | 본문 수치를 추출 텍스트와 대조, 4등급 근거 배지(`원문 대조`/`공식 문서·초록 기반`/`교과서 상식`/`추정(명시)`) | 앱 본문 내 배지 |
| GENERATE | `pipeline_mil/build_app2.py` + 콘텐츠 6파일(`c_concepts.py`·`c_papers1~3.py`·`c_wip.py`·`c_misc.py`) — 순수 표준 라이브러리 | 같은 드라이브 폴더 |
| OUTPUT | 단일 HTML SPA (해시 라우팅, 뷰 8개) | `index.html` |

## 재빌드 방법

```
cd <드라이브>/개인 연구/StudyVault_준비/pipeline_mil/
python build_app2.py     # 의존성 없음 (pypdf 불필요)
```

**콘텐츠 수정은 HTML 직접 수정 금지** — `c_*.py`를 고치고 재빌드가 정석(생성기 소스가 정본).
단, 이 레포의 `index.html`에는 Vault 이식 패치(전체 문서 래퍼·`shared/progress.js` 연동·
`mil_read`→`vault:mil-onboarding:progress` 1회 마이그레이션·모바일 하단 탭바)가 적용되어 있으므로,
재빌드 시 같은 패치를 다시 적용해야 한다.

- itemId 체계: `c-<id>`(개념 12) / `p-<no>`(논문 22) / `w-<no>`(WIP 7) — 총 41개, 불변.
