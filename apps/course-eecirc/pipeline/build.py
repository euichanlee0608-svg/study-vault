#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parents[2]/"_course_kit"))
from build_core import main
main(Path(__file__).parent)
