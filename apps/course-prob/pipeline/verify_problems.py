#!/usr/bin/env python3
"""검산 게이트 (앱 shim) — 공용 코어 + 이 앱의 독립 재계산 레지스트리."""
import sys
from pathlib import Path
DIR = Path(__file__).parent
sys.path.insert(0, str(DIR))
sys.path.insert(0, str(DIR.parents[1]/"_course_kit"))
from verify_ind import IND
import verify_core
if __name__ == "__main__":
    verify_core.run(DIR, IND, sys.argv[1] if len(sys.argv) > 1 else "50")
