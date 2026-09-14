# 과목앱 출제 규약 (정본)

> course-* 앱에서 문제를 만들 때 이 문서만 읽으면 된다 — **코드(`verify_core.py`·`verify_runner.mjs`)를
> 다시 읽어 규칙을 추론하지 않는다.** 규칙이 바뀌면 코드와 이 문서를 같은 커밋에서 고친다.
> 범용 4단계(EXTRACT→VERIFY→GENERATE→OUTPUT)는 `PIPELINE.md`, 작업 상태는 `HANDOFF.md`.

**원칙: Claude 가 출제를 전담한다. 믿는 근거는 Claude 가 아니라 게이트다.**
시험 범위의 근거는 사용자가 드라이브 `공유 파일함/3학년2학기/` 에 올리는 자료뿐이다.

## 1. 작업 개시·체크포인트·종료 (세션이 끊겨도 이어가게)

1. **개시** — 레포 루트에서 `python3 apps/_course_kit/vault_ops.py status`.
   출력(= `HANDOFF.md` 자동 섹션)과 `HANDOFF.md` 의 손메모만 읽는다.
   - `▶ 진행 중 작업` 이 있으면 **새로 시작하지 말고 거기서 이어간다**. 그 과목 게이트를 먼저 돌려
     FAIL 난 id = 끝나지 않은 문항이다.
   - `🆕 새 파일` · `✏️ 수정됨` · `⏳ 안 읽음` 이 이번에 읽을 자료다. 그 밖의 자료는 다시 열지 않는다.
2. **자료를 읽으면** — 과목 `pipeline/sources/*.md` 에 분석(원문 전재 금지) → `coverage.json` 키워드 추가/수정 →
   `vault_ops.py mark "<파일>" --course <id> --status read --note "무엇을 뽑았나"`.
   문제·커버리지까지 반영을 끝낸 자료는 `--status used`. 과목과 무관하면 `--status skip`.
3. **출제 시작** — `vault_ops.py task start <course> "<목표>"` (예: `"W2 반영: U3 조건부균등 미달 보강"`).
4. **체크포인트 단위 = 한 단원의 한 레벨 묶음(최대 10문항)**. 한 묶음이 끝날 때마다:
   파일 저장 → `python3 verify_problems.py 10`(빠른 게이트) → `vault_ops.py task step "U3 L3 08~12 작성, 게이트 PASS"`
   → 로컬 커밋. **여러 묶음을 모아서 한 번에 기록하지 않는다** — 끊기면 기록 없는 작업은 사라진 것으로 친다.
5. **종료** — `../../../.venv/bin/python build.py`(N=50 게이트 포함) → `vault_ops.py task done "<결과>"` → 커밋.
   푸시는 사용자가 명시할 때만.

## 2. 파일 구조 (과목 `apps/course-<x>/pipeline/`)

| 파일 | 무엇 |
|---|---|
| `problems/u<N>.js` | 단원 하나 = `SV_BANK.push({id:'uN', no, title, titleEn, scope, problems:[...]})` |
| `verify_ind.py` | 수치문제 독립 재계산 레지스트리 `IND[id] = fn(params) -> 값 또는 dict` |
| `coverage.json` | 시험범위 키워드 ↔ 태그 (§6) |
| `content.py` | 개념 레이어 (§8) |
| `sources/*.md` | EXTRACT 분석 기록 (원문 미전재) |
| `meta.json` · `build.py` · `verify_problems.py` | 앱 설정 · 빌드 · 게이트 shim (거의 안 만짐) |
| `quantity_table.md` | **게이트가 쓴다** — 손대지 않는다 |

## 3. 문항 스키마

공통: `id:'uN-lL-NN'`(레벨 내 2자리 순번, 불변) · `level:1~4` · `type` · `tags:[...]` · `src`(§4) · `statement`(10자+).
수식은 LaTeX `\\( \\)`, 숫자 포맷은 `SVH.fmt`.

| type | 필수 | 게이트가 FAIL 내는 조건 |
|---|---|---|
| `num` | `params:{k:{choices:[..]}` 또는 `{min,max,step}`, `unit}` · `constraint(p)?` · `statement(p)` · `solve(p)→{ans, unit, steps}` · `hints` | `IND` 미등록 · 샘플 중 solver 예외 · steps<2 · 독립값과 불일치(rtol 1e-9) · dict 키 불일치 · hints 없음 |
| `mc` | `choices`(3+, 중복 없음) · `answer`(인덱스) · `expl` | 선택지<3 · 인덱스 무효 · 중복 · 해설 없음 |
| `tf` | `answer:true/false` · `expl` | 정답 누락 · 해설 없음 |
| `derive` | `steps`(4+, **마지막 스텝에 "차원" 또는 "극한" 체크**) · `hints` | 스텝<4 · 말미 체크 없음 · 힌트 없음 |

- 게이트는 **`num` 만 내용을 검산**한다. `mc`·`tf` 는 형식만 본다 → 계산으로 답이 정해지는 건 `num` 으로 만든다.
  `mc`·`tf` 는 개념 구별·함정용으로만.
- 샘플은 id 시드 고정(mulberry32)이라 재현된다. `constraint` 는 500회 안에 만족 가능해야 한다.
- `verify_ind.py` 에서 물리·확률적으로 불가능한 파라미터는 `assert` 로 막는다(게이트가 "타당성 위반"으로 보고).

## 4. 근거 등급 `src` (게이트 허용 4종)

| `src` | 뜻 | `PIPELINE.md` 공통 등급 |
|---|---|---|
| `강의자료 대조` | 올린 강의자료의 정의·예제 유형과 대조함 | 원문 대조 |
| `기출 유형` | 기출의 유형·배점·스타일을 따름(문항 원문 X) | 원문 대조(유형) |
| `교재 표준` | 표준 교재 상식 수준 정의·성질 | 교과서 상식 |
| `창작 문제(검산됨)` | 창작 수치문제 — `num` 게이트 통과가 근거 | 추정 아님(검산) |

새 자료로 만든 문항은 가능하면 `강의자료 대조`. 근거 없는 사실은 싣지 않는다.

## 5. 독립 재계산은 다른 에이전트가 쓴다 (맹점 분리)

같은 작성자가 `solve` 와 `IND` 를 둘 다 쓰면 같은 오해(정의·부호·단위)로 둘 다 틀린 채 통과한다.

- 본 세션이 문항(`statement`·`params`·`solve`)을 쓴다.
- **재계산은 Sonnet급 서브에이전트**가 쓴다. 넘기는 것: 문항 id · `statement` 문장(샘플 파라미터로 렌더한 것 1개) ·
  `params` 이름·범위 · `ans` 형태(스칼라/dict 키) · 관련 강의자료 분석 발췌. **`solve` 본문은 넘기지 않는다.**
  에이전트는 `verify_ind.py` 에 `reg(id)` 항목만 추가한다(solve 와 다른 경로 권장: 급수·행렬·sympy·폐형식 등).
- 게이트 불일치 시 **IND 를 solver 에 맞춰 고치지 않는다.** 자료·정의로 어느 쪽이 틀렸는지 판정해 그쪽을 고친다.
- 2026-09-14 이전 1,068문항은 이 분리 이전 작성분이다. 자료로 오류가 드러난 문항만 이 절차로 재작성한다.

## 6. 시험범위 커버리지 `coverage.json`

```json
{"keywords": [{"kw": "포아송과정의 중첩", "unit": "u4", "match": ["중첩"], "min": 3, "src": "<드라이브 파일명> <위치>"}]}
```
- 키워드 = 강의자료가 **시험에 나온다고 신호한 것**(개요 키워드·주차 주제·"중요"·과제·기출). 자료를 읽을 때마다 추가한다.
- 게이트는 `unit` 안에서 `tags` 가 `match` 중 하나를 부분일치(공백 무시)하는 문항 수를 세고 `min` 미만이면 ⚠️(FAIL 아님).
  `unit` 생략 시 전 단원.
- **출제 순서 = ⚠️ 키워드부터.** 커버리지를 채우려면 문항 `tags` 에 해당 말을 넣는다(태그만 바꿔 숫자 맞추기 금지 — 실제 그 개념을 묻는 문항이어야).

## 7. 난이도 하한 (단원당, 미달은 ⚠️)

L1 개념확인 **6** · L2 기본계산 **12** · L3 응용 **14** · L4 시험급 **8** (= 40+). 확장은 L3·L4 쪽으로.
시험 형식(객관식·단답·서술)은 `sources/*.md` 의 평가 정보에 맞춰 type 비중을 정한다.

## 8. 개념 레이어 `content.py`

`{"id":"course","bigpicture":...}` 과목 큰그림 + 단원별 `bigpic`(큰그림) · `whyq`(❓ 문제 상황) · `intuit` ·
칩 `tagx`/`tagm`/`tagc` · `exambox`(시험 연결 — 문항 id 로 연결) · 한영 병기 · LaTeX 관습 기호.
유도·예제 원본은 `content_base.py`. 빌드 예산 700KB. 개념 서술은 게이트가 검산하지 않으므로 수치·정의는 자료와 대조한다.

## 10. 개념 과목 모드 (계산보다 개념 위주 — 예: course-bio)

게이트는 `mc`·`tf` 의 **정답 내용**을 원래 보지 않는다. 개념 과목은 거의 전부가 그 영역이라 `meta.json` 에
`"gate": {"mode":"concept", "floor":{...}, "require_ref":true, "blind":true}` 를 두어 아래를 켠다.

- **`ref` 필수** — 모든 문항에 자료 위치 `ref:'3강 3-(4)'`(`\d+강 ` 로 시작). 위치를 못 대는 사실은 출제하지 않는다.
- **과목별 하한** — `floor` 가 §7 기본값을 대체한다(course-bio: L1 5·L2 8·L3 7·L4 4). 레벨 뜻:
  L1 용어·정의 · L2 개념 구별·비교 · L3 적용(상황→개념) · L4 여러 절을 잇는 종합·추론·함정.
- **블라인드 풀이** (§5 재계산 분리의 개념판):
  1. `node apps/_course_kit/verify_runner.mjs apps/<앱>/pipeline blind u3 > <scratchpad>/q_u3.json` — 정답·해설 없는 문항 + `sig`.
  2. Sonnet급 서브에이전트에게 그 파일과 **해당 강 PDF 경로**를 준다(`pdftotext` 로 읽게). `problems/`·`blind_review.json` 은 열지 못하게 한다.
     에이전트는 자료만 근거로 풀어 `pipeline/blind/u3.json` = `{id: {"sig", "answer"(mc 인덱스/tf bool/모르면 null), "note"}}` 을 쓴다.
     note 에 자료 원문을 옮기지 않는다(public 레포).
  3. 게이트: 답이 키와 다르면 FAIL. **키를 블라인드에 맞춰 고치지 말고** 자료로 판정 — 문항이 모호하면 문항을 고치고
     (sig 가 바뀌어 재풀이), 키가 맞으면 `pipeline/blind_review.json` 에 `{id: {"sig", "reason"}}` 로 근거를 남긴다.
  4. 블라인드가 없거나 sig 가 달라진 문항은 체크포인트 게이트에선 ⚠️, **빌드(`SV_STRICT=1`)에선 FAIL**.
- **자료 오류** — `sources/*.md` 의 "자료 오류 의심" 표에 올리고, 명백한 오기는 과학적으로 맞는 쪽을 정답으로 하되
  해설에 "자료 표기와 다름"을 쓴다. 용어 선택(번역어)은 자료를 따른다. 오류 문장을 정답 근거로 삼는 문항은 만들지 않는다.
- 체크포인트 단위는 §1 과 같다(단원당 L1+L4 · L2 · L3 세 묶음 권장). 블라인드는 단원이 다 써진 뒤 단원 단위로 1회.

## 9. 금지

- **저작권**: public 레포. 강의노트·교재·기출 원문 전재 금지 — 재서술·수치 변경 창작만. 분석 md 에도 원문 문장을 옮기지 않는다.
- `index.html`·`quantity_table.md`·`README.md` 단원표 직접 수정 금지(생성물).
- 게이트 FAIL 상태로 빌드·커밋 마무리 금지(체크포인트 커밋은 FAIL id 를 `task step` 에 적은 경우만 허용).
- 문항 id 재번호 금지 — 사용자 오답노트·진도 키다.
