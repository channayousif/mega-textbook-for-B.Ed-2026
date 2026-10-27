---
id: 0892
title: Grow boot volume with OCI CLI
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-drop-ready-worktrees
user: M Yousif Channa
command: can you use oci cli to grow it
labels: ["board-direct", "ops", "disk", "oci"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0892-grow-boot-volume-oci-cli.general.prompt.md
tests:
 - oci bv boot-volume list (tenancy and OCI-free compartment)
---

## Prompt

can you use oci cli to grow it

## Response snapshot

Checked the tenancy and its one child compartment (OCI-free): the only volume is the 125 GB
boot volume of instance-20251108-1844, no block volumes. Ran
`oci bv boot-volume update --size-in-gbs 200` on it; it returned AVAILABLE at 200 GB, inside
the free 200 GB allowance. The OS still sees 125 GB: the rescan, `growpart` and `resize2fs`
need sudo, which this account lacks, so the owner runs them.

## Outcome

- Impact: boot volume 125 GB to 200 GB at OCI; about 75 GB more once the owner extends the
  partition and filesystem.
- Tests: none (ops).
- Files: this PHR.
- Next prompts: owner runs the three sudo commands; confirm with `df -h /`.
- Reflection: a volume cannot be shrunk, so the tenancy total was checked before growing.

## Handoff (for CEO and agents)

- Shipped: boot volume grown to 200 GB at OCI.
- Decisions to respect: the tenancy is now at the free 200 GB block storage cap; any new block
  or boot volume in this tenancy is billed.
- Done by the owner: rescan, `sudo growpart /dev/sda 1`, `sudo resize2fs /dev/sda1`;
  `df -h /` now 193G size, 80G free (was 7.3G, below the crew's 8 GB launch floor).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Next experiment: none.
