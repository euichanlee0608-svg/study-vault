#!/usr/bin/env python3
"""vault_ops(자료 대장·체크포인트·HANDOFF) + verify_core.coverage_rows 회귀 — 드라이브·node 없이 임시 폴더로."""
import json, os, subprocess, sys, tempfile, time
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
KIT = REPO/"apps"/"_course_kit"
sys.path.insert(0, str(KIT))


def cli(env, *args):
    r = subprocess.run([sys.executable, str(KIT/"vault_ops.py"), *args], env=env, capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def setup():
    root, src = Path(tempfile.mkdtemp()), Path(tempfile.mkdtemp())
    p = root/"apps"/"course-x"/"pipeline"
    p.mkdir(parents=True)
    (p/"quantity_table.md").write_text("| U1 | ⚠️ L1 1/6 |\n\n총 12문제 · 검산 샘플 N=50/문제")
    return root, src, dict(os.environ, STUDY_VAULT_ROOT=str(root), STUDY_SRC_DIR=str(src))


def test_ledger():
    root, src, env = setup()
    f = src/"확률_WEEK2.pdf"
    f.write_bytes(b"a")
    rc, out = cli(env, "status")
    assert rc == 0 and "🆕 새 파일: `확률_WEEK2.pdf` → course-prob" in out, out    # 새 파일 + 과목 추정
    rc, out = cli(env, "mark", "WEEK2", "--course", "course-prob", "--note", "판독")  # 부분일치
    assert rc == 0, out
    assert "변화 없음" in cli(env, "status")[1]
    f.write_bytes(b"ab"); os.utime(f, (time.time() + 60, time.time() + 60))
    assert "✏️ 읽은 뒤 수정됨: `확률_WEEK2.pdf`" in cli(env, "status")[1]
    (src/"PHYS.pdf").write_bytes(b"x")
    assert cli(env, "mark", "PHYS.pdf", "--status", "skip")[0] == 0               # skip 은 과목 생략 가능
    assert cli(env, "mark", "WEEK", "--status", "read")[0] == 0                  # 기존 과목 유지
    assert cli(env, "mark", "nothing")[0] != 0
    f.unlink()
    out = cli(env, "status")[1]
    assert "🗑 폴더에서 사라짐: `확률_WEEK2.pdf`" in out and "`PHYS.pdf` →" not in out, out

def test_task_and_handoff():
    root, src, env = setup()
    cli(env, "status")
    h = root/"docs"/"HANDOFF.md"
    h.write_text(h.read_text() + "\n손메모 유지\n")
    assert cli(env, "task", "start", "course-x", "U3", "보강")[0] == 0
    assert cli(env, "task", "start", "course-x", "또")[0] != 0                  # 열린 작업 위에 새 작업 금지
    cli(env, "task", "step", "U3 L3 01~05 PASS")
    txt = h.read_text()
    assert "U3 보강" in txt and "U3 L3 01~05 PASS" in txt and "손메모 유지" in txt, txt
    assert "| course-x | 12 | 1 | ✗ |" in txt, txt
    cli(env, "task", "done", "완료 +5")
    st = json.loads((root/"docs"/"vault_state.json").read_text())
    assert st["task"] is None and st["log"][-1][2] == "완료 +5", st
    assert cli(env, "task", "step", "x")[0] != 0

def test_coverage_rows():
    import verify_core
    probs = [{"unit": "u4", "tags": ["중첩 계산"]}, {"unit": "u4", "tags": ["분해"]}, {"unit": "u3", "tags": ["합과정", "중첩"]}]
    cov = {"keywords": [{"kw": "중첩", "unit": "u4", "match": ["중첩"], "min": 2, "src": "W1"},
                        {"kw": "중첩"}]}                              # match·unit 생략 = kw 로 전 단원
    rows = verify_core.coverage_rows(probs, cov)
    assert rows[0][2] == 1 and rows[1][2] == 2 and rows[1][3] == 3, rows


def test_blind_errors():
    import verify_core
    probs = [{"id": "a", "type": "tf", "answerBool": True, "sig": "s1"},
             {"id": "b", "type": "mc", "answerIdx": 0, "sig": "s2"},
             {"id": "c", "type": "mc", "answerIdx": 1, "sig": "s3"},
             {"id": "d", "type": "num"}]
    answers = {"a": {"sig": "s1", "answer": True}, "b": {"sig": "s2", "answer": 2, "note": "n"},
               "c": {"sig": "OLD", "answer": 1}}
    errs, pend = verify_core.blind_errors(probs, answers, {}, False)
    assert len(errs) == 1 and errs[0].startswith("b:") and pend == ["c"], (errs, pend)   # 불일치 FAIL, 문항 변경은 대기
    errs, _ = verify_core.blind_errors(probs, answers, {"b": {"sig": "s2", "reason": "키가 맞음"}}, True)
    assert len(errs) == 1 and "재풀이" in errs[0], errs                                    # 판정 근거 → 통과, strict 는 대기분 FAIL
    errs, _ = verify_core.blind_errors(probs, answers, {"b": {"sig": "OLD", "reason": "x"}}, False)
    assert len(errs) == 1 and errs[0].startswith("b:"), errs                               # 낡은 판정 근거는 무효


if __name__ == "__main__":
    tests = [v for k, v in dict(globals()).items() if k.startswith("test_")]
    for t in tests:
        t(); print("✅", t.__name__)
    print(f"전부 통과 {len(tests)}건")
