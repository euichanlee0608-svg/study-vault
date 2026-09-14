#!/usr/bin/env python3
"""출제 인수인계 도구 — 드라이브 자료 대장 · 작업 체크포인트 · docs/HANDOFF.md 자동 섹션.

토큰 0 (파일 stat 과 json 만). 규약 = docs/PROBLEM_SPEC.md §1.
  status                                   작업 개시: 드라이브 변화 스캔 + HANDOFF 갱신·출력
  mark <파일(부분일치)> --course <id> [--status read|used|unread|skip] [--note ..]
  task start <course> <목표> / task step <체크포인트> / task done <결과>
"""
import argparse, datetime, glob, json, os, re, sys
from pathlib import Path

BEGIN, END = "<!-- AUTO:BEGIN -->", "<!-- AUTO:END -->"
STATUSES = ("unread", "read", "used", "skip")
HINTS = {"확률": "course-prob", "COSE382": "course-prob", "MECH387": "course-control", "자동제어": "course-control",
         "COSE362": "course-ml", "기계학습": "course-ml", "전전개": "course-eecirc", "Electrical": "course-eecirc"}
EMPTY = {"new": [], "modified": [], "unread": [], "missing": []}


def root():
    return Path(os.environ.get("STUDY_VAULT_ROOT") or Path(__file__).resolve().parents[2])

def now():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

def src_dir():
    if os.environ.get("STUDY_SRC_DIR"):
        return Path(os.environ["STUDY_SRC_DIR"])
    hits = sorted(glob.glob(os.path.expanduser("~/Library/CloudStorage/GoogleDrive-*/내 드라이브/공유 파일함/3학년2학기")))
    return Path(hits[0]) if hits else None

def load():
    p = root()/"docs"/"vault_state.json"
    return json.loads(p.read_text()) if p.exists() else {"files": {}, "task": None, "log": []}

def save(st):
    (root()/"docs"/"vault_state.json").write_text(json.dumps(st, ensure_ascii=False, indent=1) + "\n")

def listing(d):
    """드라이브 폴더의 파일 {상대경로: (mtime, size)} — 하위 폴더 포함, 숨김 제외."""
    out = {}
    for f in d.rglob("*"):
        rel = f.relative_to(d).as_posix()
        if f.is_file() and not any(part.startswith(".") for part in rel.split("/")):
            s = f.stat()
            out[rel] = (int(s.st_mtime), s.st_size)
    return out

def guess(name):
    return next((c for k, c in HINTS.items() if k in name), "?")

def scan(st, files):
    rows = {k: [] for k in EMPTY}
    for name, (mt, sz) in sorted(files.items()):
        e = st["files"].get(name)
        if e is None:
            rows["new"].append((name, guess(name)))
        elif e["status"] == "skip":
            continue
        elif e["status"] == "unread":
            rows["unread"].append((name, e["course"]))
        elif (mt, sz) != (e["mtime"], e["size"]):
            rows["modified"].append((name, e["course"]))
    for name, e in sorted(st["files"].items()):
        if name not in files and e["status"] != "skip":
            rows["missing"].append((name, e["course"]))
    return rows

def courses():
    for p in sorted((root()/"apps").glob("course-*/pipeline")):
        qt = p/"quantity_table.md"
        txt = qt.read_text() if qt.exists() else ""
        m = re.search(r"총 (\d+)문제", txt)
        yield p.parent.name, m.group(1) if m else "?", txt.count("⚠️"), "✅" if (p/"coverage.json").exists() else "✗"

def render(st, rows, found):
    L = [BEGIN, f"_자동 생성 — `vault_ops.py` 가 명령마다 덮어쓴다. 손으로 고치지 말 것. 갱신 {now()}_", "",
         "### ▶ 진행 중 작업 (끊긴 세션은 여기서 이어간다)"]
    t = st["task"]
    if t:
        L.append(f"- **{t['course']}** — {t['goal']} (시작 {t['started']})")
        L += [f"  - {ts} {msg}" for ts, msg in t["steps"]] or ["  - (체크포인트 아직 없음)"]
    else:
        L.append("- 없음")
    L += ["", "### 📥 드라이브 자료 대장" + ("" if found else " — ⚠️ 드라이브 폴더를 못 찾음(스캔 생략)")]
    labels = [("new", "🆕 새 파일"), ("modified", "✏️ 읽은 뒤 수정됨"), ("unread", "⏳ 안 읽음"), ("missing", "🗑 폴더에서 사라짐")]
    L += [f"- {lab}: `{name}` → {c or '?'}" for k, lab in labels for name, c in rows[k]]
    if not any(rows.values()):
        L.append("- 변화 없음 — 등록된 자료가 모두 반영됐다")
    done = [(n, e) for n, e in sorted(st["files"].items()) if e["status"] in ("read", "used")]
    nskip = sum(e["status"] == "skip" for e in st["files"].values())
    L += ["", f"<details><summary>읽은 자료 {len(done)}건 · 제외 {nskip}건</summary>", ""]
    L += [f"- `{n}` · {e['course']} · {e['status']} · {e['marked_at']} — {e['note']}" for n, e in done]
    L += ["", "</details>", "", "### 📚 과목별 현황 (각 앱 quantity_table.md)", "",
          "| 과목 | 문제 | 경고(하한·커버리지) | coverage.json |", "|---|---|---|---|"]
    L += [f"| {c} | {n} | {w} | {cov} |" for c, n, w, cov in courses()]
    L += ["", "### 🧾 최근 기록"]
    L += [f"- {ts} · {c} · {m}" for ts, c, m in st["log"][-15:]] or ["- 없음"]
    L.append(END)
    return "\n".join(L)

def refresh(st):
    d = src_dir()
    found = bool(d and d.exists())
    files = listing(d) if found else {}
    rows = scan(st, files) if found else {k: [] for k in EMPTY}
    save(st)
    p = root()/"docs"/"HANDOFF.md"
    txt = p.read_text() if p.exists() else f"# 출제 인수인계\n\n{BEGIN}\n{END}\n\n## 메모 (손으로 쓰는 곳)\n"
    if BEGIN not in txt or END not in txt:
        sys.exit("HANDOFF.md 에 AUTO 마커가 없다 — 손메모를 지키려고 중단")
    head, rest = txt.split(BEGIN, 1)
    block = render(st, rows, found)
    p.write_text(head + block + rest.split(END, 1)[1])
    return files, block


def cmd_status(a, st):
    print(refresh(st)[1])

def cmd_mark(a, st):
    d = src_dir()
    files = listing(d) if d and d.exists() else {}
    names = sorted(set(files) | set(st["files"]))
    hit = [n for n in names if n == a.name] or [n for n in names if a.name in n]
    if len(hit) != 1:
        sys.exit(f"'{a.name}' 에 맞는 파일이 {len(hit)}개: {hit[:5]}")
    name, prev = hit[0], st["files"].get(hit[0], {})
    course = a.course or prev.get("course", "")
    if not course and a.status != "skip":
        sys.exit("--course 필요 (skip 만 생략 가능)")
    mt, sz = files.get(name, (prev.get("mtime"), prev.get("size")))
    st["files"][name] = {"course": course, "status": a.status, "mtime": mt, "size": sz,
                         "marked_at": now(), "note": a.note or prev.get("note", "")}
    st["log"].append([now(), course or "-", f"{a.status}: {name}" + (f" — {a.note}" if a.note else "")])
    refresh(st)
    print(f"✅ {name} → {course or '-'} · {a.status}")

def cmd_task(a, st):
    act, words = a.action, " ".join(a.words)
    t = st["task"]
    if act == "start":
        if t:
            sys.exit(f"열린 작업이 있다: {t['course']} — {t['goal']}. 이어가거나 `task done` 먼저")
        if len(a.words) < 2:
            sys.exit("task start <course> <목표>")
        st["task"] = {"course": a.words[0], "goal": " ".join(a.words[1:]), "started": now(), "steps": []}
    elif not t:
        sys.exit("열린 작업이 없다 — `task start` 먼저")
    elif act == "step":
        t["steps"].append([now(), words])
    else:
        st["log"].append([now(), t["course"], words])
        st["task"] = None
    refresh(st)
    print(f"✅ task {act}: {words}")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("status")
    m = sub.add_parser("mark")
    m.add_argument("name"); m.add_argument("--course", default="")
    m.add_argument("--status", choices=STATUSES, default="read"); m.add_argument("--note", default="")
    t = sub.add_parser("task")
    t.add_argument("action", choices=("start", "step", "done")); t.add_argument("words", nargs="+")
    a = ap.parse_args(argv)
    (root()/"docs").mkdir(exist_ok=True)
    {"status": cmd_status, "mark": cmd_mark, "task": cmd_task}[a.cmd](a, load())

if __name__ == "__main__":
    main()
