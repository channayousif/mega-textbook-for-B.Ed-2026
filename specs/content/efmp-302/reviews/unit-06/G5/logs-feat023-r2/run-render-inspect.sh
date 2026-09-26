#!/usr/bin/env bash
# G5 feat023-r2 render-review runner: serve the shared build on port 4629 and run
# the repo's render-inspect instrument over the Urdu Unit 6 pages.
set -o pipefail
cd /home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ae2ddfdbf249be0f2
node scripts/render-inspect.mjs EFMP-302 6 --locale ur --port 4629 \
  --out specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r2 \
  > specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r2/render-inspect.log 2>&1
echo "EXIT_CODE=$?"
tail -6 specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r2/render-inspect.log
