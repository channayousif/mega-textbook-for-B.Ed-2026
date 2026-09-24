# Bound source excerpts

One file per source key: `<key>.md`. These are **verification excerpts**, not reproductions.

## Why they exist

A G3 reviewer can confirm from a registry that a citation exists. It cannot confirm the source
*supports the claim* without the text. `specs/content/<course>/sources/` is already bound into
the review input manifest, so an excerpt committed here travels with the unit and makes support
checkable offline, reproducibly, and identically on any host.

All four EFMP-302 Unit 3-6 G3 reviews on 2026-09-18 returned `sources` as fail or unverified
because nothing was bound. Where a source *was* independently retrievable, those reviews found
real defects: Isore (2009) inverted in Unit 4, `goe2008` not containing the de-escalation
sequence Unit 3 cited it for, `hargreaves2000` mapped to Unit 5 sections it does not support.
An unverified source is not safe by default.

## What goes in a file

- The bibliographic record, and how it was retrieved (URL, registry ID, date, SHA-256 of the
  retrieved file where one exists).
- Only the passages a unit actually relies on, quoted exactly, each with its location in the
  source. Short excerpts for verification, never a copy of the work.
- A note where a passage was read from an abstract or record rather than full text.

## If a source cannot be retrieved

Do not invent an excerpt. List the key under an `## Unverifiable sources` heading in the unit's
`sources/unit-NN.md`, one bullet per key, saying what was attempted and what it leaves
unchecked. `check:depth-gate` accepts either a bound excerpt or that declaration, and fails on
silence. Declaring a limitation is a legitimate outcome; hiding one is not.
