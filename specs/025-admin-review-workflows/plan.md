# Implementation plan

1. Add the missing admin route and use the existing admin pages where their actions already
   have backend enforcement. Add a selected-record read view and link all workflows.
2. Add one additive Supabase migration for applications, grants, recommendations, decisions,
   job state, host choices and action history. Keep course identifiers only for authorization;
   Git remains the source for course content and formal evidence.
3. Provide reviewer application and workbench pages, admin decision and job pages, and a host
   CLI. Course identifiers and host configuration names are synchronized by the heartbeat. Only the service role
   may claim and report jobs; claim tokens guard retry races.
4. Redesign dashboard homes using the existing query helpers and shell. Add guide updates,
   static course-map and cleanup tests, scoped RLS tests, and route checks.

The pending Antigravity implementation-policy ADR is recorded in
`specs/decisions/adr-proposals.md` without creating an ADR.
