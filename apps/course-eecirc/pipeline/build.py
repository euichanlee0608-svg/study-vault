#!/usr/bin/env python3
"""생성기 (§13.5) — 검산 게이트 통과 후에만 index.html 조립 + README 수량표 갱신.
사용: .venv/bin/python build.py"""
import json, re, subprocess, sys, datetime
from pathlib import Path

DIR = Path(__file__).parent
APP = DIR.parent
PY = sys.executable

# 1) 게이트 (타협 불가 — 실패 시 빌드 중단)
r = subprocess.run([PY, str(DIR/"verify_problems.py"), "50"], cwd=DIR)
if r.returncode != 0:
    print("\n❌ 검산 게이트 실패 — 빌드 중단 (§13.3)"); sys.exit(1)

# 2) 재료
sys.path.insert(0, str(DIR))
from content import UNITS as CONTENT
content_map = {u["id"]: {k: v for k, v in u.items() if k != "id"} for u in CONTENT}

bank_files = sorted((DIR/"problems").glob("u*.js"), key=lambda f: int(f.stem[1:]))
bank_js = '<script>window.SV_BANK=[];</script>\n'
bank_js += '<script>\n' + (DIR/"problems"/"_helpers.js").read_text() + '\n</script>\n'
for f in bank_files:
    bank_js += '<script>\n' + f.read_text() + '\n</script>\n'

n_prob = sum(len(re.findall(r"id:'u\d+-l\d-\d\d'", f.read_text())) for f in bank_files)
today = datetime.date.today().isoformat()
build_info = json.dumps({"date": today, "units": len(bank_files), "problems": n_prob,
                         "gate": f"PASS {today} (N=50/문제)"}, ensure_ascii=False)

# 3) 조립
tpl = (DIR/"engine_template.html").read_text()
html = (tpl.replace("[[BANK_JS]]", bank_js)
           .replace("[[CONTENT_JSON]]", json.dumps(content_map, ensure_ascii=False))
           .replace("[[BUILD_INFO]]", build_info)
           .replace("[[BUILD_DATE]]", today))
(APP/"index.html").write_text(html)
size = len(html.encode())
assert size <= 400_000, f"성능 예산 초과: {size}B > 400KB (§7)"

# 4) README 갱신 (파이프라인 기록 + 수량 현황표 + 게이트 로그)
qt = (DIR/"quantity_table.md").read_text()
readme = f"""# 전전개 문제은행 (course-eecirc)

전자전기공학개론(Rizzoni 7판) **중간범위** 문제풀이 앱 — Course Mastery 아키타입 파일럿(C0).
개념(CONCEPT) → 유도(DERIVE) → 예제(WORKED) → 4단계 문제(DRILL: L1~L4) · 파라메트릭 리롤 ·
오답노트 · 모의고사. 진도·자가채점은 `vault:course-eecirc:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | 기출 스캔 3부 비전 판독 → **유형·배점·스타일 분석만** 기록(`pipeline/sources/기출분석.md`, 원문 미전재) + Rizzoni 범위 골격 |
| VERIFY | **검산 게이트 `verify_problems.py`** — solver(런타임과 동일 JS)를 시드 샘플 50개/문제로 실행, `verify_ind.py`의 sympy/numpy **독립 재계산(별도 경로)** 과 전수 대조. 구조·힌트·해설·유도 차원/극한 체크 포함. 통과분만 탑재 |
| GENERATE | `pipeline/build.py` — 게이트 통과 확인 후 `engine_template.html` + `content.py` + `problems/u*.js` 를 단일 HTML로 조립 |
| OUTPUT | 단일 HTML SPA ({size//1024} KB ≤ 400 KB 예산) |

## 재빌드

```
cd apps/course-eecirc/pipeline
../../../.venv/bin/python build.py     # 게이트 실패 시 빌드 중단
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산 등록),
콘텐츠는 `content.py`, 화면은 `engine_template.html`을 고치고 재빌드.

## 단원별 수량 현황 (게이트 {today} 자동 기록)

{qt}

## C0 진행 상태

- ✅ U1 회로 기초 · U2 저항 회로망 · U3 절점·망로 · U4 회로 정리 — 각 40문제, 검산 통과
- ⏳ **U5 축전기·인덕터·페이저 · U6 1차 과도 · U7 주파수응답·필터** — 다음 증분(중간 2주 전까지 하한 충족, §13.2)
- ⏳ 전전개 중간고사 날짜 공지 시 `apps.json`의 `exams`에 기입 → 허브 D-day 자동 표시
"""
(APP/"README.md").write_text(readme)
print(f"\n✅ 빌드 완료: index.html {size//1024} KB · {n_prob}문제 · README 갱신")
