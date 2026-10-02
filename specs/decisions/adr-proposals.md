# ADR proposals awaiting owner authorization

## Separate Antigravity implementation jobs from independent review

Proposed 2026-09-26 for the admin dashboard and agent job workflow. An admin may approve a
bounded content improvement job for a host-installed agent, including Antigravity. The job
creates a draft pull request. Any G3/G5 review of that material must run in a fresh independent
session and satisfy ADR-0019; the implementation run may not approve its own work, sign evidence,
edit the reviewer registry, or mark tracker gates done. This changes the previous repository rule
that every Antigravity invocation was reviewer-only. The owner should decide and record the
long-term governance tradeoffs in an ADR. This note is a proposal, not an adopted ADR or a
qualification record.

## Move course-prose authoring from Claude to a non-Claude agent (amends ADR-0024)

Proposed 2026-10-01 for the Paperclip workforce that runs Textbook.com.pk. The owner wants the
company's worker agents to run on Codex (OpenAI), Antigravity (Google) and OpenCode instead of
Claude, with only the CEO agent remaining on Claude. ADR-0024 decision 1 assigns course research,
prose, pedagogy, sources, figure planning, prompts, alt text and SVG schematics to Claude, so a
non-Claude ContentAuthor would contradict it as written.

Proposed change: course meaning and authoring (ADR-0024 decision 1) may be owned by whichever
agent the owner assigns to the ContentAuthor role, currently Codex or Antigravity. Codex keeps raster
production (decision 2). Decisions 3 to 5 stay as written, with "Claude" read as "the assigned
authoring agent". ADR-0019 is unchanged: any G3/G5 review must run in a fresh session on a
different vendor, model family and quota pool from the authoring agent, so a Codex-authored unit
is reviewed by Antigravity or Claude, and an Antigravity-authored unit by Codex or Claude.

Tradeoffs for the owner to record in an ADR: spreading load off one subscription and quota pool,
versus re-proving authoring quality (style guide v4.4, the Urdu parity workflow, em-dash and
answer-key gates) on a new model, and keeping the existing `.claude/skills/` authoring skills
usable from a non-Claude agent (`.agents/skills.json` already exposes them to Antigravity). This
note is a proposal, not an adopted ADR. ContentAuthor stays on Claude until the owner adopts it.
