# scripts/media

Shared Media Studio core (Feature 030, ADR-0037): job states, the ledger engine, brand constants, recipes and producers for image, audio and video.

No content gate, nothing a content gate imports, and nothing the review-evidence binding walks may import scripts/media/ (FR-018, ADR-0037); tests/unit/media-isolation.test.mjs enforces it (run by CI through npm test).
