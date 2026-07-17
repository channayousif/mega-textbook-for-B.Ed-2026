<!--
  PR template for the B.Ed Mega Textbook platform.
  Keep it short. Under SDD, a PR should trace to a spec (specs/NNN-*/) and clear the
  applicable review gates in the project Constitution (Article VII).
-->

## Summary

<!-- What does this PR change and why? One or two sentences. Link the feature: specs/NNN-*/ -->

Spec: `specs/<NNN-feature>/`

## What's here

<!-- Bullet the notable changes (content, components, scripts, config). -->
-

## Verification

<!-- Check what you actually ran. CI runs validate:content, checks, unit tests, build, and e2e. -->
- [ ] `npm run validate:content` (metadata + EN↔UR parity + glossary + weighting gate)
- [ ] `npm run check:no-answer-keys` (no private marking material in public content)
- [ ] `npm run check:add-course` (adding a course is content-only — SC-006)
- [ ] `npm test` (validator fixtures)
- [ ] `npm run build` (both locales) — or confirmed via CI
- [ ] e2e (`npm run test:e2e`) — or confirmed via CI

## Review gates (Constitution Art. VII — check those that apply)

- [ ] **Content**: CLO/SLO traceability, simple-English, Urdu parity & register, Bloom's tags, citations, guide-section fidelity, accessibility
- [ ] **Engineering**: spec compliance, responsive/RTL rendering, Lighthouse pass
- [ ] **Teacher** (per course, once): a practicing teacher dry-ran the unit's activities/assessments

## Tasks / notes

<!-- Reference tasks.md IDs completed, and anything reviewers should know (deferrals, follow-ups). -->
-

🤖 Generated with [Claude Code](https://claude.com/claude-code)
