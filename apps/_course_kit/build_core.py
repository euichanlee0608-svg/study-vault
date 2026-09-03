#!/usr/bin/env python3
"""생성기 공용 코어 — 게이트 통과 후 단일 HTML 조립 + README 갱신. 앱별 build.py가 호출."""
import json, re, subprocess, sys, datetime
from pathlib import Path

KIT = Path(__file__).parent

def main(app_pipeline: Path):
    DIR = app_pipeline; APP = DIR.parent
    meta = json.loads((DIR/"meta.json").read_text())

    r = subprocess.run([sys.executable, str(DIR/"verify_problems.py"), "50"], cwd=DIR)
    if r.returncode != 0:
        print("\n❌ 검산 게이트 실패 — 빌드 중단 (§13.3)"); sys.exit(1)

    sys.path.insert(0, str(DIR))
    import importlib, content as content_mod
    importlib.reload(content_mod)
    content_map = {u["id"]: {k: v for k, v in u.items() if k != "id"} for u in content_mod.UNITS}

    bank_files = sorted((DIR/"problems").glob("u*.js"), key=lambda f: int(f.stem[1:]))
    bank_js = '<script>window.SV_BANK=[];</script>\n'
    bank_js += '<script>\n' + (KIT/"helpers.js").read_text() + '\n</script>\n'
    for f in bank_files:
        bank_js += '<script>\n' + f.read_text() + '\n</script>\n'

    n_prob = sum(len(re.findall(r"id:'u\d+-l\d-\d\d'", f.read_text())) for f in bank_files)
    today = datetime.date.today().isoformat()
    build_info = json.dumps({"date": today, "units": len(bank_files), "problems": n_prob,
                             "gate": f"PASS {today} (N=50/문제)"}, ensure_ascii=False)

    tpl = (KIT/"engine_template.html").read_text()
    html = (tpl.replace("[[BANK_JS]]", bank_js)
               .replace("[[CONTENT_JSON]]", json.dumps(content_map, ensure_ascii=False))
               .replace("[[BUILD_INFO]]", build_info)
               .replace("[[BUILD_DATE]]", today)
               .replace("[[APP_ID]]", meta["id"])
               .replace("[[APP_TITLE]]", meta["title"])
               .replace("[[APP_BRAND]]", meta["brand"])
               .replace("[[APP_SUB]]", meta["sub"])
               .replace("[[APP_EYEBROW]]", meta["eyebrow"]))
    (APP/"index.html").write_text(html)
    size = len(html.encode())
    assert size <= 700_000, f"성능 예산 초과: {size}B > 700KB (정석급 콘텐츠 개편으로 상향, 2026-09-03)"

    qt = (DIR/"quantity_table.md").read_text()
    readme = f"""# {meta['title']} ({meta['id']})

{meta['readme_intro']}

구성(정석식): 개념(+「정석」 핵심 박스) → 수식·유도 → 필수예제(완전 풀이) → 드릴 L1~L4
(L3 응용·L4 시험급 중심 배분 6·12·14·8) · 파라메트릭 리롤 · 오답노트 · 모의고사.
진도·자가채점: `vault:{meta['id']}:*` (shared/progress.js).

## 파이프라인 기록 (docs/PIPELINE.md 규약)

| 단계 | 수행 내용 |
|---|---|
| EXTRACT | {meta['extract']} |
| VERIFY | 공용 게이트 `_course_kit/verify_core.py` — solver(런타임 동일 JS) 시드 샘플 50개/문제를 `verify_ind.py`의 sympy/numpy 독립 재계산(별도 경로)과 전수 대조. 통과분만 탑재 |
| GENERATE | `_course_kit/build_core.py` — 게이트 통과 후 엔진 템플릿+content.py+problems/u*.js 단일 HTML 조립 |
| OUTPUT | 단일 HTML SPA ({size//1024} KB ≤ 700 KB 예산) |

## 재빌드

```
cd apps/{meta['id']}/pipeline && ../../../.venv/bin/python build.py
```

**index.html 직접 수정 금지** — 문제는 `problems/u*.js` + `verify_ind.py`(같은 id로 독립 재계산),
콘텐츠는 `content.py`, 공용 화면/게이트는 `apps/_course_kit/`.

## 단원별 수량 현황 (게이트 {today} 자동 기록)

{qt}

{meta.get('status','')}
"""
    (APP/"README.md").write_text(readme)
    print(f"\n✅ 빌드 완료: {meta['id']} index.html {size//1024} KB · {n_prob}문제 · README 갱신")
