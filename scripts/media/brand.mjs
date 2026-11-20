// Shared channel and brand constants for every Media Studio kind (Feature 030, T007).
// One source of truth: scripts/notebook-studio/teaser.mjs and assemble-teaser.mjs re-export these.
// Do not import this file from any content gate (FR-018).

export const SITE = 'https://textbook.com.pk';
export const CHANNEL_ID = 'UC7cQfkGkdNABCiyjmV5ZaFQ';
export const CHANNEL_URL = 'https://www.youtube.com/@textbookdotcomdotpk';
export const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;
/** "Course teasers (اردو)" playlist. */
export const TEASER_PLAYLIST = 'PLCJn7gAoYIJs';
/** House colours used on end cards, overlays and thumbnails. */
export const BRAND = { teal: '#123e43', amber: '#e5a333', paper: '#f8f5ef', pale: '#a6dfdc' };
/** Long dashes are banned in authored text (Constitution Art. III.9). */
export const LONG_DASH = /[—―⸺⸻]/;
/** Replace long dashes with a spaced hyphen, drop angle brackets and collapse whitespace. */
export const clean = (s) => String(s).replace(/[—―⸺⸻]/g, ' - ').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
