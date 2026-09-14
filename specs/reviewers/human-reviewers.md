# Human reviewers

Who is qualified to certify a G3 English review or a G5 Urdu review, for what scope, on what
evidence. Owner-maintained (Spec 017 FR-010).

**This is not `registry.json`.** That file beside it is the signed **agent** registry, and the
signature is there because an agent identity is forgeable in a way a named person's is not: an
agent can be re-instantiated, re-prompted, or impersonated by another agent, so its qualification
has to be cryptographically bound to a configuration. A person's qualification is bound by their
commits and by this file's Git history, which is why plain Markdown is the right shape here and a
signed JSON registry would be ceremony.

**This is not a gate input either.** `check:pipeline-gate` accepts any reviewer matching
`/^[A-Z]{1,5}$/` with no lookup, deliberately (FR-010), and Spec 017 changes no gate. What stops an
unauthorized certification is the pull request; this file is what a reviewer of that pull request
checks the initials against.

## Qualification

Mirroring ADR-0019's shape at human scale, because inventing a second standard for people would be
harder to defend than reusing the one already written for agents.

The candidate reviews two or three units the curriculum owner has already reviewed, **blind** to
the owner's findings. Compare on:

1. **Agreement over blocking findings** - did they find what the owner found?
2. **False passes, decisively.** A candidate who passes a unit the owner failed is **not yet
   qualified**, however well they did elsewhere. A missed defect is the failure this whole pipeline
   exists to prevent, and a reviewer who misses one is not made safe by finding others.

Record the comparison in the entry. Scope is per stage and per course family, not global by
default: certifying G5 needs Urdu register judgement that certifying G3 does not.

## Entries

| Initials | Scope | Qualification evidence | Date | Status |
|---|---|---|---|---|
| YM | All courses, G3 and G5 | Curriculum owner. Every G1-G7 row in `specs/content/*/tasks.md` to date, including EFMP-301 Unit 1 and EFMP-302 Unit 1 at v3.0 and the v4.0 concept-graph retrofit. | 2026-09-13 | active |

**Grant record.** `privilege_audit` row **6936**, `false -> true`, 2026-09-14 03:47 UTC, on profile
`45e8770e-d9e2-43fa-92c1-eef2b76b89bc`.

That row's `actor_id` is **NULL**, and the reason belongs here rather than in anyone's memory. The
grant was applied directly against the database at the owner's instruction while Feature 017 was
being landed, not clicked through `/app/admin/users`. `write_privilege_audit` reads the actor from
`current_profile_id()`, which resolves to null outside a session, so the trail records accurately
that **no signed-in user performed this write**. That is the truthful entry: the alternative -
minting a session for the owner so the row would name them - would have put a false statement in
the first audit row of the first delegation of a content gate.

Every subsequent grant and revocation must go through the admin page, where the actor resolves. A
second NULL-actor row in this table is a defect, not a precedent.

### YM - the curriculum owner

Granted first, before anyone external holds the capability. **Operationally this changes nothing**:
the same person certifies the same units they already certified. What it buys is that the whole
path gets exercised end to end on real units - the manifest intake, the export, the commit flow,
the tracker row - before an external reviewer meets it, and that the certifications produced from
here on are in the format the G5 comparator base needs.

**It does not lift the ceiling.** Every tracker row still carries these initials, and one person
still closes every G5. That was the problem Spec 017 was written for, and granting the capability
to the person who already had it does not solve it. The exit criterion for this work is a **second
qualified person**, and until that entry appears below this one, the bottleneck is exactly where it
was.

One thing to name rather than leave implicit: the owner authored or translated nearly all the
content they certify, and Art. III.2 says a translation cannot approve itself. Art. VII §2's
independence requirement governs the agent path rather than this one, and owner-certification is
the status quo Spec 017 exists to end rather than something it introduces. It is accepted for the
proving run, and it is one more reason this entry is a rehearsal rather than the destination.
