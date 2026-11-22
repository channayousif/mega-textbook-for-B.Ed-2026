# Bound source evidence: dukes-2010-treebank

Source: Dukes, K., Atwell, E., & Sharaf, A.-B. M. (2010). Syntactic annotation guidelines for the Quranic Arabic Dependency Treebank. *Proceedings of the Language Resources and Evaluation Conference (LREC 2010)*. ELRA. https://doi.org/10.63317/5ca39mfekwbt (PDF: http://www.lrec-conf.org/proceedings/lrec2010/pdf/278_Paper.pdf)

Consulted: 2026-11-22. PDF fetched from the LREC proceedings and read locally with `pdftotext`; OpenAlex record W48549471 (hybrid OA) and its abstract were also read. The DOI listed in the content spec (https://doi.org/10.63317/5ca39mfekwbt) was recorded from OpenAlex. The paper is part of the Quranic Arabic Corpus project at the University of Leeds.

Locator: pages 1822-1824. Sections 1 (Introduction), 2.1 (Traditional Arabic Grammar), 2.2 (The Syntactic Annotation Process), 2.3 (Syntactic Dependency Relations) and 3.1 (Verbs, Subjects and Objects). The abstract and the corpus documentation pages that describe the same treebank (https://corpus.quran.com/documentation.jsp, /documentation/grammar.jsp, /documentation/verb.jsp, /documentation/condition.jsp) were also read.

## Evidence notes (original paraphrase)

The paper explains that the Quranic Arabic Dependency Treebank is part of the Quranic Arabic Corpus at the University of Leeds, and that its syntactic representation deliberately adopts traditional Arabic grammar (*i'rāb*) rather than a theory designed for another language. That supports the unit's framing of parts of speech and verb forms as the traditional Arabic grammatical framework the Corpus follows (U2-02, U2-09).

The paper states that the fundamental syntactic unit in *i'rāb* is the morphological word segment rather than the whitespace-delimited word, that each segment is assigned a part-of-speech in traditional Arabic grammar, and that a word may fuse a stem with prefixes and suffixes. It gives the example of a noun with a fused preposition prefix being inflected for the genitive case. This supports the unit's treatment of words carrying tense, gender and number markers, and of pronouns and prepositions attaching to a word (U2-02, U2-04, U2-06).

The paper states that nouns are found in one of three cases and that imperfect verbs are found in three moods, with case and mood realised through different vowelized endings. It describes a verb as having a subject, optionally an object, and an implicit subject pronoun conveyed by the verb's inflection, and it states that passive verbs have no subject. This supports the unit's subject-verb agreement and verb-form teaching (U2-07, U2-08, U2-09).

The paper lists dependency relations taken from traditional Arabic grammar, including subject of a verb, object of a verb, imperative, prohibition, negation, emphasis, exception and preposition phrase. This supports the unit's identification of particles, negation and emphasis as grammatical relations (U2-10, U2-11).

The abstract states that the Quranic Arabic Dependency Treebank (QADT) is part of the Quranic Arabic Corpus, an online linguistic resource organized by the University of Leeds and built through online collaborative annotation. The paper presents the treebank, explains the choice of syntactic representation, and highlights key parts of the annotation guidelines. The text analysed is the Qur'an, written in classical Quranic Arabic (c.600 CE). At the time of writing, all 77,430 words of the Qur'an had a manually verified morphological analysis, syntactic analysis was in progress, and 11,000 words had been syntactically annotated as a gold standard treebank. The guidelines exist to keep annotation consistent across collaborators, and the treebank is published for collaborative correction, with suggestions reviewed by expert Arabic linguists and compared against published books of Qur'anic syntax.

The corpus documentation pages describe the same resource in terms a reader can use: the treebank links Arabic words through dependencies, and the linguistic structure of verses is represented as graphs. The grammar guide states that every active verb has a subject (*fāʿil*) and that every passive verb is linked through a *nā'ib fāʿil* relation, which represents the subject of a passive verb and is supplied as a hidden pronoun when it is not a word in the verse. The same guide defines a conditional sentence as two clauses, the condition (*sharṭ*) and the result (*jawāb sharṭ*), and treats *idhā* as a time adverb used as a conditional particle.

The unit uses the paper for the general claim that the treebank represents sentence structure as dependency relations (U3-03) and for the passive-verb relation *nā'ib fāʿil* (U3-05). It does not quote the paper's annotation rules in detail, and it does not rely on the paper for the definitions of the sentence types, which are standard teaching content.

The paper does not set out the three-part taxonomy of *ism*, *fi'l* and *harf* in the passages read, and it does not print the conjugation tables, pronoun tables or negation tables the unit teaches. Those tables are standard Arabic grammar stated from general knowledge and remain subject to the G3 reviewer's confirmation, including the religious-content check in content-spec drafting note 7.

These notes identify the checked passages and their support limits. They are not verbatim extracts or a substitute for independent source review.

## Short passage anchor

> Each of these morphological segments is assigned a part-of-speech in traditional Arabic grammar, and can take an independent syntactic role in the sentence that influences inflection

From section 2.1, page 1823, read 2026-11-22.

> The treebank is available online for collaborative correction to improve accuracy, with suggestions reviewed by expert Arabic linguists, and compared against existing published books of Quranic Syntax.

From the abstract of Dukes, Atwell and Sharaf (2010), read from OpenAlex W48549471 on 2026-11-22.
