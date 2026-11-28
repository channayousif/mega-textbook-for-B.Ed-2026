# Limitations - GUHQ-301 Unit 1 G3 run 1

1. **Manifest prepared locally.** No dispatcher-supplied frozen handoff was provided, so the
   bundle was prepared with `node scripts/review-evidence.mjs prepare GUHQ-301 1 G3 <dir>` over a
   clean tree (95 bound inputs, `skill_digest eccc4074...`). The report recomputes the same
   manifest from the current commit. Author identity is `crew:crew-guhq-301-u01-author`
   (authoring commit `856b9437e`; banner figure placed by `c0ca97892`); reviewer identity is this
   crew run. Exact deployment versions are not exposed by the host.

2. **Rendered input identity.** Deployed SHA `d103b2448df417cf34c30c95c362e103d962b2fc` equals
   reviewed HEAD `d103b2448`, and `git diff --quiet <deployed> HEAD -- docs/semester-3/guhq-301/unit-01/
   static/img/figures/guhq-301/unit-01/` exits 0, so the production build is the reviewed input.

3. **`render-review` exit code is 1.** `scripts/render-inspect.mjs GUHQ-301 1 --base
   https://textbook.com.pk --no-pdf` reported two defects, both `visible image did not load`
   (`fig-U1-1`, `fig-U1-4`). These are the tool's documented lazy-load timing false positive: the
   desktop pass does not scroll, and both figures sit below the lazy-load threshold. `notServed=0`
   proves every asset is served, and `logs-20261128T125230Z/lazy-load-diagnostic.txt` shows both
   load after a scroll pass. The exit code is reported as 1 because that is the real exit code of
   the recorded run.

4. **A4 print was measured with `--no-pdf`.** Print media was emulated at 794px and measured; no
   PDF file was emitted, as the brief directs.

5. **Urdu mirror is out of G3 scope.** `i18n/ur/.../unit-01/` and the `.ur.svg` variants are G4/G5
   inputs and were not evaluated. The `.ur.svg` files are not in the G3 manifest.

6. **External re-retrieval.** The bound excerpts were read as committed, then the underlying
   sources were re-retrieved for the load-bearing claims (Quran.com API, corpus dictionary pages,
   the MDPI PDF, the arXiv abstract). No other external body was consulted.

7. **Deterministic gates are tree-wide.** The six cited gates scan the whole repository; their
   exit 0 is necessary but not sufficient. The semantic criteria were assessed by reading the unit
   and its bound sources.

8. **Advisory only.** This report does not certify the unit, sign anything, append a tracker row,
   change `translation_status`, alter the reviewer registry, or publish. Acceptance needs a trusted
   detached signature and a qualified registry entry, neither of which exists here.
