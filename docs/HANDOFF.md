# 출제 인수인계 (Study Vault 과목앱)

새 세션은 레포 루트에서 **`python3 apps/_course_kit/vault_ops.py status`** 로 아래 자동 섹션을 갱신·출력한다.
규약은 `docs/PROBLEM_SPEC.md`. 손으로 쓰는 곳은 맨 아래 "메모"뿐이다.

<!-- AUTO:BEGIN -->
_자동 생성 — `vault_ops.py` 가 명령마다 덮어쓴다. 손으로 고치지 말 것. 갱신 2026-09-14 23:16_

### ▶ 진행 중 작업 (끊긴 세션은 여기서 이어간다)
- **course-bio** — 생명과학 신설(방안 C): 개념과목 게이트(ref 필수·블라인드 풀이·과목별 하한) + 1~5강 문제은행·개념 (시작 2026-09-14 22:47)
  - 2026-09-14 23:00 인프라: 게이트 개념모드(meta.gate floor·ref필수·blind_errors·SV_STRICT)+러너 blind export/sig+SPEC §10+테스트 4건, 기존 4과목 회귀 PASS. course-bio 골격·coverage 27키워드·content 1~5강. 배치 u1 L1·L4 9문항 게이트 PASS(블라인드 대기)
  - 2026-09-14 23:04 배치 u1 L2 8 · u2 L1·L4 9 · u3 L1·L4 9 작성, 게이트 PASS(블라인드 대기)
  - 2026-09-14 23:06 배치 u4 L1·L4 9 · u5 L1·L4 9 작성, 게이트 PASS(블라인드 대기)
  - 2026-09-14 23:07 배치 u1 L3 7(u1 완성 24) · u2 L2 8 작성 + 엔진 빈 레이어 숨김·ref 배지, 게이트 PASS. u1 블라인드 에이전트 발주
  - 2026-09-14 23:10 배치 u2 L3 7(u2 완성 24) · u3 L2 8 작성, 게이트 PASS. u2 블라인드 에이전트 발주
  - 2026-09-14 23:12 배치 u3 L3 7(u3 완성 24) · u4 L2 8 작성. 블라인드 u1·u2 수령(각 24, null 0) → 게이트 대조. u3 블라인드 발주
  - 2026-09-14 23:14 배치 u4 L3 7(u4 완성 24) · u5 L2 8 작성. 블라인드 u1·u2 대조 48건 불일치 0. u4 블라인드 발주
  - 2026-09-14 23:15 배치 u5 L3 7 → 전 단원 완성 120문항. 블라인드 u3 수령(24, null 0). u5 블라인드 발주, u4 진행 중
  - 2026-09-14 23:16 블라인드 u4·u5 수령(각 24, null 0). 커버리지 미달 2건(탄소골격·막진화설) → u2-l2-09·u3-l2-09 추가, 해당 2문항 블라인드 발주

### 📥 드라이브 자료 대장
- 변화 없음 — 등록된 자료가 모두 반영됐다

<details><summary>읽은 자료 15건 · 제외 1건</summary>

- `1강_원자분자물_교재요약.pdf` · course-bio · read · 2026-09-14 22:47 — 5p 텍스트 전량 판독(2026-09-14) → sources/강의자료분석.md
- `2026Fall_확률및랜덤과정_WEEK1.pdf` · course-prob · used · 2026-09-14 18:31 — 9p 판독(2026-09-03) → sources/강의자료분석.md, U1~U6 240문항 · coverage.json 16키워드
- `2강_탄소와거대유기화합물_교재요약.pdf` · course-bio · read · 2026-09-14 22:47 — 8p 텍스트 전량 판독
- `3강_세포_교재요약.pdf` · course-bio · read · 2026-09-14 22:47 — 9p 텍스트 전량 판독
- `4강_세포의연결_교재요약.pdf` · course-bio · read · 2026-09-14 22:47 — 7p 텍스트 전량 판독
- `5강_물질대사서론_교재요약.pdf` · course-bio · read · 2026-09-14 22:47 — 6p 텍스트 전량 판독
- `Orientation-2026.pdf` · course-eecirc · used · 2026-09-14 21:58 — 27p 텍스트 판독(2026-09-14) → sources/강의자료분석.md·coverage.json 25키워드, U1 +10문항·개념 §5
- `Screenshot_20260902_224558_LearningX Student.jpg` · course-ml · used · 2026-09-14 18:31 — LearningX 강의계획서 판독(2026-09-02) → sources/강의자료분석.md, U1~U6 240문항
- `Screenshot_20260902_224604_LearningX Student.jpg` · course-ml · used · 2026-09-14 18:31 — LearningX 강의계획서 판독(2026-09-02)
- `Screenshot_20260914_224405_LearningX Student.jpg` · course-bio · read · 2026-09-14 22:47 — LearningX 생명과학 07분반 수업계획서(주차별 16주) 판독 — 시험기간·형식은 잘림
- `[MECH387] Lec0_Syllabus.pdf` · course-control · used · 2026-09-14 18:31 — 11p 판독(2026-09-03) → sources/강의자료분석.md, U1~U7 280문항
- `[MECH387] Lec1_Introduction.pdf` · course-control · used · 2026-09-14 18:31 — 26p 판독(2026-09-03) → sources/강의자료분석.md
- `전전개 기말 기출.pdf` · course-eecirc · used · 2026-09-14 18:31 — 기말 문제지 유형 분석(2026-09-02)
- `전전개 기출.pdf` · course-eecirc · used · 2026-09-14 18:31 — 중간 1세트 유형 분석(2026-09-02) → sources/기출분석.md
- `전전개 기출_1.pdf` · course-eecirc · used · 2026-09-14 18:31 — 기말 교정본 유형 분석(2026-09-02)

</details>

### 📚 과목별 현황 (각 앱 quantity_table.md)

| 과목 | 문제 | 경고(하한·커버리지) | coverage.json |
|---|---|---|---|
| course-bio | 122 | 0 | ✅ |
| course-control | 280 | 0 | ✗ |
| course-eecirc | 318 | 0 | ✅ |
| course-ml | 240 | 0 | ✗ |
| course-prob | 240 | 0 | ✅ |

### 🧾 최근 기록
- 2026-09-14 18:31 · course-ml · used: Screenshot_20260902_224558_LearningX Student.jpg — LearningX 강의계획서 판독(2026-09-02) → sources/강의자료분석.md, U1~U6 240문항
- 2026-09-14 18:31 · course-ml · used: Screenshot_20260902_224604_LearningX Student.jpg — LearningX 강의계획서 판독(2026-09-02)
- 2026-09-14 18:31 · course-eecirc · used: 전전개 기출.pdf — 중간 1세트 유형 분석(2026-09-02) → sources/기출분석.md
- 2026-09-14 18:31 · course-eecirc · used: 전전개 기출_1.pdf — 기말 교정본 유형 분석(2026-09-02)
- 2026-09-14 18:31 · course-eecirc · used: 전전개 기말 기출.pdf — 기말 문제지 유형 분석(2026-09-02)
- 2026-09-14 18:31 · course-eecirc · unread: Orientation-2026.pdf — 전전개 오리엔테이션 27p — 표지만 확인, 범위·평가 미판독
- 2026-09-14 18:32 · - · skip: CHAPTER 2 basic quantum mechanics-2026.pdf — 수강취소 과목(나노공학 추정) 자료 — 아니면 mark 로 과목 지정
- 2026-09-14 21:58 · course-eecirc · used: Orientation-2026.pdf — 27p 텍스트 판독(2026-09-14) → sources/강의자료분석.md·coverage.json 25키워드, U1 +10문항·개념 §5
- 2026-09-14 21:58 · course-eecirc · 전전개 Orientation 반영 완료: 308→318문항, coverage 25키워드 전부 충족, 빌드 PASS(N=50)
- 2026-09-14 22:47 · course-bio · read: 1강_원자분자물_교재요약.pdf — 5p 텍스트 전량 판독(2026-09-14) → sources/강의자료분석.md
- 2026-09-14 22:47 · course-bio · read: 2강_탄소와거대유기화합물_교재요약.pdf — 8p 텍스트 전량 판독
- 2026-09-14 22:47 · course-bio · read: 3강_세포_교재요약.pdf — 9p 텍스트 전량 판독
- 2026-09-14 22:47 · course-bio · read: 4강_세포의연결_교재요약.pdf — 7p 텍스트 전량 판독
- 2026-09-14 22:47 · course-bio · read: 5강_물질대사서론_교재요약.pdf — 6p 텍스트 전량 판독
- 2026-09-14 22:47 · course-bio · read: Screenshot_20260914_224405_LearningX Student.jpg — LearningX 생명과학 07분반 수업계획서(주차별 16주) 판독 — 시험기간·형식은 잘림
<!-- AUTO:END -->

## 메모 (손으로 쓰는 곳 — 판단·범위·다음 할 일)

### 과목별 출제 범위
- **course-prob** 확률및랜덤과정 — 중간범위 U1~U6 240문항(WEEK1 개요 기준). 중간 10/21. coverage.json 있음(WEEK1 키워드 16개, 전부 충족).
  후반기(연속시간 마르코프·출생사망·대기행렬)는 기말용으로 아직 없음.
- **course-control** 자동제어 — 중간범위 U1~U7 280문항(Lec0·Lec1 기준). 중간 10/22. coverage.json 없음.
- **course-eecirc** 전전개 — U1~U7 318문항(기출 3부 유형 + Orientation 주차표). 중간 8주차(날짜 미공지), 평가 중간40·기말40·과제10·퀴즈출석10, 실험 3회.
  coverage.json 25키워드 전부 충족(2026-09-14). 기말(OP-amp·반도체·신호시스템)은 아직 없음. 강의노트는 Blackboard 게시 예정 → 올라오면 주차별 키워드 추가.
- **course-ml** 기계학습 — 중간범위 U1~U6 240문항(강의계획서 스크린샷 기준). 중간 날짜 미공지. coverage.json 없음.
- **course-bio** 생명과학(07분반) — **개념 과목 모드**(SPEC §10). 1~5강 = u1~u5 각 24문항(L1 5·L2 8·L3 7·L4 4), 전 문항 ref + 블라인드 풀이 대조.
  강 번호 = 단원 번호라 6강 자료가 오면 u6 신설. 수업계획서상 3주차 후반(세포호흡·광합성)부터 미수령.
  **미확인**: 시험 형식·중간 주차·평가 비율·교수·교재(계획서 캡처가 잘림) — 확인되면 exams·유형 비중 조정.
  자료 오류 의심 9건은 `sources/강의자료분석.md` 표 — 새 강도 같은 원칙(명백한 오기는 정답을 과학 기준으로, 해설에 표기).

### 다음 할 일
1. 새 자료가 올라오면 SPEC §1 순서대로: 분석 md → coverage.json → mark → ⚠️ 키워드만 출제.
2. coverage.json 없는 3과목은 그 과목을 다시 만질 때 기존 `sources/*.md` 키워드로 먼저 작성한다.
3. 기존 1,068문항은 재계산 분리 규약(SPEC §5) 이전 작성분 — 자료로 오류가 드러난 문항만 재작성.
