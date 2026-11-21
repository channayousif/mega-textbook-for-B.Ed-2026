# scripts/media/producers

One module per producer behind one contract: success, out of quota (with reset), unavailable, or failed take.

No content gate, nothing a content gate imports, and nothing the review-evidence binding walks may import scripts/media/ (FR-018, ADR-0037); tests/unit/media-isolation.test.mjs enforces it (run by CI through npm test).
