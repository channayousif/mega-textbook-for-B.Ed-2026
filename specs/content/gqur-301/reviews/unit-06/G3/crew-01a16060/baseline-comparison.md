# Origin/main baseline

At initial inspection HEAD and origin/main both equalled f3cd24e09af22b06a4ea1d9a15e8374a1d47b268. git log origin/main..HEAD and git status --short were empty. The first check:content ran before any tracked file changed; only new excluded review evidence existed. Thus check-content.log is a run on origin/main tracked bytes in this checkout, not a borrowed result from another job.

Only failure: check:content-status, because ignored generated static/content-status.json is missing. All other 12 gates passed. No cache was generated or committed because it is outside the review output boundary. Final rerun is compared against this baseline; timings are immaterial.

Final result: check-content-final.log again has exactly one failed gate, check:content-status, with the identical missing-file finding. No new findings; no review input changed.
