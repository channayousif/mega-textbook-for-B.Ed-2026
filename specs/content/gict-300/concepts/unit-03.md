# Concept graph - GICT-300 Unit 3 (Operating System Concepts)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-03.md`, `sources/unit-03.md` and `figures/unit-03.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/gict-300/content-spec.md`
(`## Unit 3`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing
numbering under its three bank headings - no prose was changed to create them.

**Urdu labels.** The bank holds no operating-system terms; all labels below are authored here
and **carry a G5 flag** (see the list at the foot of this file), except where the Unit 2
authored labels are reused (Operating system, File, Process, Kernel) - those remain G5-flagged
from Unit 2 until review promotes them.

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:GICT-300-3-1 | Operating system functions | آپریٹنگ سسٹم کے کام | - | 3.1 | SLO:GICT-300-3-4 | MCQ-01, RRQ-01 |
| CON:GICT-300-3-2 | Time sharing | ٹائم شیئرنگ | CON:GICT-300-3-1 | 3.1 | SLO:GICT-300-3-4 | MCQ-02, RRQ-01 |
| CON:GICT-300-3-3 | Types of operating systems | آپریٹنگ سسٹم کی اقسام | CON:GICT-300-3-1 | 3.1 | SLO:GICT-300-3-4 | MCQ-03, RRQ-02, ERQ-01 |
| CON:GICT-300-3-4 | File identifiers (name, path, metadata) | فائل کی شناخت | CON:GICT-300-3-1 | 3.2 | SLO:GICT-300-3-4 | MCQ-04, RRQ-03 |
| CON:GICT-300-3-5 | File management services | فائل مینجمنٹ کی خدمات | CON:GICT-300-3-4 | 3.2 | SLO:GICT-300-3-4 | RRQ-03, ERQ-02 |
| CON:GICT-300-3-6 | Process as a program in execution | پروسیس بطور چلتا پروگرام | CON:GICT-300-3-2 | 3.2 | SLO:GICT-300-3-4 | MCQ-06, RRQ-04 |
| CON:GICT-300-3-7 | Process states and transitions | پروسیس کی حالتیں | CON:GICT-300-3-6 | 3.2 | SLO:GICT-300-3-4 | MCQ-05, RRQ-04, RRQ-09, ERQ-02 |
| CON:GICT-300-3-8 | The input/output chain | ان پٹ آؤٹ پٹ زنجیر | CON:GICT-300-3-1 | 3.3 | SLO:GICT-300-3-4 | MCQ-07, RRQ-05, ERQ-03 |
| CON:GICT-300-3-9 | Device driver | ڈیوائس ڈرائیور | CON:GICT-300-3-8 | 3.3 | SLO:GICT-300-3-4 | MCQ-07, MCQ-08, RRQ-06 |
| CON:GICT-300-3-10 | Buffer and spooling | بفر اور اسپولنگ | CON:GICT-300-3-8 | 3.3 | SLO:GICT-300-3-4 | RRQ-10, ERQ-03 |
| CON:GICT-300-3-11 | The four layers of the system | نظام کی چار تہیں | CON:GICT-300-3-1 | 3.4 | SLO:GICT-300-3-4 | MCQ-10, RRQ-07, RRQ-08, ERQ-04 |
| CON:GICT-300-3-12 | Kernel functions | کرنل کے کام | CON:GICT-300-3-11 | 3.4 | SLO:GICT-300-3-4 | MCQ-09, MCQ-10, RRQ-07, ERQ-04, ERQ-05 |
| CON:GICT-300-3-13 | System calls as guarded doorways | سسٹم کالز بطور محفوظ دروازے | CON:GICT-300-3-12 | 3.4 | SLO:GICT-300-3-4 | MCQ-09, RRQ-07, ERQ-05 |

## Urdu labels needing G5 review

Authored rather than drawn from the terminology bank. A reviewer should confirm each, and any that
survive review should be promoted into `specs/content/terminology.csv`.

`CON:GICT-300-3-1`, `-3-2`, `-3-3`, `-3-4`, `-3-5`, `-3-6`, `-3-7`, `-3-8`, `-3-9`, `-3-10`,
`-3-11`, `-3-12`, `-3-13`.
