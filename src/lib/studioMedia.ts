/**
 * Feature 029: hosted Study Studio media (owner ruling 2026-11-09).
 * Audio and video live on YouTube / YouTube Music; slides live on Google Drive.
 * These helpers turn a manifest host_url into a privacy-enhanced embed URL, or null when the
 * URL is not one of those hosts (the panel then falls back to a plain link).
 * The manifest schema enforces the same hosts per kind, so a null here means a bad row.
 */

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

export function youtubeId(url: string): string | null {
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  if (u.protocol !== 'https:') return null;
  const host = u.hostname.replace(/^(www|m)\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'music.youtube.com') {
    if (u.pathname === '/watch') id = u.searchParams.get('v');
    else { const m = u.pathname.match(/^\/(shorts|embed)\/([^/]+)/); id = m ? m[2] : null; }
  }
  return id && YT_ID.test(id) ? id : null;
}

/** youtube-nocookie embed: no tracking cookies until the viewer presses play. */
export function youtubeEmbed(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
}

export function isYouTubeMusic(url: string): boolean {
  try { return new URL(url).hostname === 'music.youtube.com'; } catch { return false; }
}

/** Google Slides -> /embed; a Drive file (PDF or PPTX) -> /preview. */
export function driveEmbed(url: string): string | null {
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  if (u.protocol !== 'https:') return null;
  const slides = u.hostname === 'docs.google.com' && u.pathname.match(/^\/presentation\/d\/([A-Za-z0-9_-]{20,})/);
  if (slides) return `https://docs.google.com/presentation/d/${slides[1]}/embed?start=false&loop=false`;
  const file = u.hostname === 'drive.google.com' && u.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]{20,})/);
  if (file) return `https://drive.google.com/file/d/${file[1]}/preview`;
  return null;
}
