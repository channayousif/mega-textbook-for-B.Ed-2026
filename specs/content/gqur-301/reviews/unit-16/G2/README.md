# Unit 16 deterministic G2 evidence

- Current: `20261022T004408483Z-gates.json`, bound to English content and source notes at commit `49a3b6a0`. All eight deterministic draft commands passed. Its manifest includes all three unit-specific source excerpt files.
- Superseded: `20261022T004248886Z-gates.json`, the earlier attempt bound to `c94f5b70`. The later source-key repair changes its dependencies. It is retained for audit and must not be used as current evidence.
- No G3/G5 review or publication approval is claimed. The Unit 16 tracker changes only G2; all other gate rows retain their previous state.
- Validation: all six English pages passed a direct MDX syntax compilation; figure palette tests passed 46/46; light/dark SVGs passed structural and freshness checks. Light figures and a dark contact sheet were inspected via serial, heavy-wrapper-protected Sharp rendering. Browser, build, server and Playwright checks were forbidden by the job brief.
- The clean main baseline lacked the ignored generated content-status report; it is captured at `specs/content/gqur-301/authoring/unit-16/check-content-main.txt`. The report was generated locally before the final content run. It is not committed or a publication action.

Final `npm run check:content`: all 13 gates PASS, with no remaining findings. See `check-content-final.txt`. The current evidence manifest was compared against the working tree after recording the G2 row and matches exactly.
