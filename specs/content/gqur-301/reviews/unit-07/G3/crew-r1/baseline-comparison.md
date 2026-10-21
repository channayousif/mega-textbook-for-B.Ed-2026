# Content-gate comparison

Baseline commit and origin/main: f3cd24e09af22b06a4ea1d9a15e8374a1d47b268. git log origin/main..HEAD was empty and git status was clean before review. The first check-content.log was produced on exactly these bound bytes before changing tasks.md. Only excluded review evidence had been added.

Both check-content.log and check-content-final.log show 12 PASS, one FAIL: check:content-status, missing ignored static/content-status.json. The diagnostic is identical. Pipeline validation passes including the new advisory row. No new finding relative to origin/main. Generating the global ignored cache is outside the Unit 7 review scope and unnecessary for this comparison. No reviewed content was repaired in the independent review session.
