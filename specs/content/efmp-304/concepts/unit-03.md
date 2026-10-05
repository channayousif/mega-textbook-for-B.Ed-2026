# Concept graph (v4.0) - EFMP-304 Unit 3 (Basic Logic Concepts and Analyzing the Argument)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. Records what a learner must
understand and in what order, with Urdu labels from `terminology.csv` where the term is banked.

## Nodes

| ID | Label EN | Label UR (from terminology.csv) | Introduced in | Requires |
|---|---|---|---|---|
| U3-C1 | Deductive argument | استنتاجی دلیل | Topic 3.1 | U2-C2 (classical form) |
| U3-C2 | Inductive argument | استقرئی دلیل | Topic 3.1 | U2-C2 (classical form) |
| U3-C3 | Validity | ولڈٹی | Topic 3.1 | U3-C1 |
| U3-C4 | Strength | اسٹرینتھ | Topic 3.1 | U3-C2 |
| U3-C5 | Soundness | سانڈنس | Topic 3.4 | U3-C3 |
| U3-C6 | Cogency | | Topic 3.4 | U3-C4 |
| U3-C7 | Categorical syllogism | | Topic 3.2 | U3-C1 |
| U3-C8 | Modus ponens | | Topic 3.2 | U3-C1 |
| U3-C9 | Modus tollens | | Topic 3.2 | U3-C1 |
| U3-C10 | Chain argument | | Topic 3.2 | U3-C1 |
| U3-C11 | Generalisation | | Topic 3.3 | U3-C2 |
| U3-C12 | Analogy (inductive) | | Topic 3.3 | U3-C2, U2-C5 |
| U3-C13 | Causal inference | | Topic 3.3 | U3-C2 |
| U3-C14 | Prediction | | Topic 3.3 | U3-C2 |
| U3-C15 | Classify before judge | | Topic 3.4 | U3-C1, U3-C2 |

## Edges (prerequisite relations)

| From | To | Kind |
|---|---|---|
| U2-C2 | U3-C1 | assumes |
| U2-C2 | U3-C2 | assumes |
| U3-C1 | U3-C3 | introduces |
| U3-C2 | U3-C4 | introduces |
| U3-C3 | U3-C5 | introduces |
| U3-C4 | U3-C6 | introduces |
| U3-C1 | U3-C7 | introduces |
| U3-C1 | U3-C8 | introduces |
| U3-C1 | U3-C9 | introduces |
| U3-C1 | U3-C10 | introduces |
| U3-C2 | U3-C11 | introduces |
| U3-C2 | U3-C12 | introduces |
| U3-C2 | U3-C13 | introduces |
| U3-C2 | U3-C14 | introduces |
| U3-C1 | U3-C15 | introduces |
| U3-C2 | U3-C15 | introduces |
| U2-C5 | U3-C12 | reinforces |

## Assessment trace

| Assessment item | Concepts tested |
|---|---|
| MCQ-01, MCQ-04, MCQ-08 | U3-C1, U3-C2, U3-C3, U3-C4 |
| MCQ-03, MCQ-05, MCQ-07 | U3-C1..U3-C14 (recognition) |
| RRQ-01, RRQ-03, RRQ-05 | U3-C1..U3-C10 |
| RRQ-06, RRQ-07 | U3-C11..U3-C14 |
| ERQ-01 | U3-C7 (categorical syllogism) |
| ERQ-02 | U3-C11 (generalisation) |
| ERQ-03 | U3-C1, U3-C2, U3-C3, U3-C4 |
| ERQ-04 | U3-C10 (chain argument) |
| ERQ-05 (integrative) | U3-C1..U3-C15 |
