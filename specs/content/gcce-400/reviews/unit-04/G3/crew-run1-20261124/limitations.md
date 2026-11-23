# Limitations - GCCE-400 Unit 4 G3 run 1

- Rendered input identity: deployed SHA 98fbbb0647d5e2c6040059edcaaccc1317b620a1; the unit's English
  directory and figure assets are identical to reviewed HEAD 9502097ffbfe5ed2856b82dc60052cddae071767.
- render-inspect could not confirm on-screen loading of fig-U4-2, fig-U4-4 and fig-U4-5 (lazy images
  below the fold). The served files are byte-identical to HEAD (HTTP 200, cmp). Visual rendering of these
  three figures is unverified, not a content defect. The full-page PNGs are too tall to inspect at
  legible scale; layout judgements rest on the structured measurements in renders/render-inspect.json.
- A4 print was measured with --no-pdf (print media emulation, no PDF file).
- Source notes for bala-2013 and macqueen-2001 are abstract-level; the unit's claims stay within the
  abstracts. youniss-levine-2009 is declared under Unverifiable sources and used only for a title-level
  idea; the declaration is honest and the prose claims no more. No owner authorisation line is present in
  the declaration; this is advisory because the use is title-level.
- oecd-2011 definition was read via the publication page summary, not the full PDF; the quoted
  eight-word phrase is consistent with the note.
- Reviewer independence: fresh claude crew session (model claude-opus-5-5) that did not author or
  translate these bytes. Author run identified by the authoring commit 7953d1221. No initials, no signature.
