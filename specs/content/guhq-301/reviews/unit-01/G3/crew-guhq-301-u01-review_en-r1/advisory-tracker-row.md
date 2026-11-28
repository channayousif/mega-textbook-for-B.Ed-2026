# Advisory tracker row - GUHQ-301 Unit 1 G3 (r1)

Append after the existing `Unit 1 | G3 en-review` row in `specs/content/guhq-301/tasks.md`.
This run did not edit the tracker.

```markdown
| Unit 1 | G3 en-review | ▢ | agent:claude-crew | advisory r1: escalate; content sound on all seven criteria, but scripts/render-inspect.mjs exits 1 because it reads naturalWidth without scrolling, so fig-U1-1 (offset 4781px) and fig-U1-4 (offset 4408px) are flagged "visible image did not load" although notServed=0 and a scroll check loads both (logs-20261128T125230Z/lazy-load-diagnostic.txt); the render command needs a scroll pass before a pass disposition is possible; advisories: MCQ key B6/C4 with no A or D (unit-assessment.mdx:106-117), the Urdu letter-merger claim is declared in prose not as a no-external-source row (sources/unit-01.md:16-18), ERQ 3 repeats the Topic 1.2 summative task (unit-assessment.mdx:100 vs topic-02.mdx:156-174), bare-URL further-reading links; rendered input deployed SHA d103b2448df417cf34c30c95c362e103d962b2fc equals HEAD; report specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1.json |
```

Status stays `▢` (not done). No reviewer initials, no certification, no gate transition.
