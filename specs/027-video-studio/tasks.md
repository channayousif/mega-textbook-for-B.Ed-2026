# Tasks: 027 Video Studio sub-project

Parent-level tasks only. Build tasks live in `video-studio/specs/*/tasks.md` (order: `/video-build`).

- [x] P001 Evaluate package v1.5 against the repo (read-only); plan approved 2026-10-26.
- [x] P002 Patch package to v1.6 (em dashes, VS namespace, paths/tiers, term bank, palette, media rule, consents, owner token, Kaggle runner); `tools/audit_package.py` 0 issues.
- [x] P003 Install with `tools/install_overlay.py --apply` (62 new files, 0 conflicts).
- [x] P004 Parent wiring: `.gitignore`, `tsconfig.json`, root `.claude/settings.json`, `AGENTS.md`, ADR-0031, this spec.
- [x] P005 Media gate script + CI steps (media, em dash for `video-studio/`).
- [ ] P006 Owner approves `video-studio/specs/000-discovery/discovery.md` (VS-001 T000). Blocks all code.
- [ ] P007 Owner sets up Kaggle (phone-verified account, `~/.kaggle/kaggle.json` chmod 600) and `MEDIA_ROOT`.
- [ ] P008 VS-001 Phase 0 (T001-T007) incl. the Kaggle render spike; Checkpoint 0.
- [ ] P009 Owner-timed constitution wording amendment for Art. VI.3 (v5.1.0), batched with the next planned standard change so the corpus re-opens once.
