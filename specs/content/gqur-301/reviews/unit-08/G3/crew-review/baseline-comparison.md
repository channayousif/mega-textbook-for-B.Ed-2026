# Baseline comparison

Initial HEAD = origin/main = 1aac6d60bd7a042bc192483133df769e6c7660b1, with no tracked changes. check-content-baseline.log is the actual check:content run on those bytes. Exit 1: 12 of 13 gates pass; check:content-status reports missing static/content-status.json. No second checkout is needed to compare identical commits. The generated status file is outside this review scope and was not created. Final run must retain precisely this failure and no additional findings.

Final check-content-final.log: exit 1, the same 12 passing gates and sole missing static/content-status.json failure. No new findings. git diff --check passed.
