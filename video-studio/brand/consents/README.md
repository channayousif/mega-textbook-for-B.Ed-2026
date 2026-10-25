# Consent records (narrators and any identifiable person)

The parent repo is **public**, so nothing in this folder is committed except this README
(see `.gitignore`). Consent records and signed scans live in `$MEDIA_ROOT/consents/`.

One record per consent, e.g. `$MEDIA_ROOT/consents/2026-11-narrator-01.md`, stating its **scope**;
consent is never reused beyond it (VS-004 PI-08):
- consent id (no name in any committed file; episode manifests cite the id only)
- who · role (voice of which character) · date signed
- channels/platforms covered (e.g. YouTube, Instagram, Facebook, TikTok, textbook.com.pk)
- uses covered (educational shorts; promotional/advertising use yes/no)
- **processing by third parties**: recordings are uploaded to a private Kaggle dataset for
  alignment and rendering (VS-ADR-0011); the narrator must agree to this explicitly
- duration and how to withdraw; what happens to published videos and Kaggle datasets on withdrawal
- SHA-256 of the signed scan
