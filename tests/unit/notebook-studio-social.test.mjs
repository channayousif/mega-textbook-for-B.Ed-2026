import { describe, it, expect } from 'vitest';
import { authUrl, codeFrom, tiktokChunks, tiktokInit, linkedinInit, linkedinPost, REDIRECT_URI, PROVIDER_OF } from '../../scripts/notebook-studio/social-post.mjs';

const app = { client_id: 'cid', client_secret: 'secret' };

describe('cross-post auth', () => {
  it('builds each provider sign-in link with the shared redirect and never the secret', () => {
    for (const p of ['meta', 'tiktok', 'linkedin']) {
      const u = authUrl(p, app, 'st');
      expect(u).toContain(encodeURIComponent(REDIRECT_URI));
      expect(u).not.toContain('secret');
      expect(u).toContain('state=st');
    }
    expect(authUrl('tiktok', app, 's')).toContain('client_key=cid');
    expect(authUrl('tiktok', app, 's')).toContain('video.upload');
    expect(authUrl('meta', app, 's')).toContain('instagram_content_publish');
    expect(authUrl('linkedin', app, 's')).toContain('w_member_social');
    expect(() => authUrl('myspace', app)).toThrow(/unknown provider/);
  });
  it('takes the code from a pasted redirect address or a bare code', () => {
    expect(codeFrom('https://textbook.com.pk/?code=AbC_1&state=x')).toBe('AbC_1');
    expect(codeFrom('  AbC_1 ')).toBe('AbC_1');
    expect(() => codeFrom('https://textbook.com.pk/?state=x')).toThrow(/no code/);
  });
  it('maps platforms to their sign-in provider', () => {
    expect(PROVIDER_OF).toEqual({ instagram: 'meta', facebook: 'meta', tiktok: 'tiktok', linkedin: 'linkedin' });
  });
});

describe('upload requests', () => {
  it('sends a teaser-sized file to TikTok as one chunk and splits large files with the remainder last', () => {
    expect(tiktokChunks(19_400_400)).toEqual({ chunk_size: 19_400_400, total_chunk_count: 1, ranges: [[0, 19_400_399]] });
    expect(tiktokInit(100).source_info).toEqual({ source: 'FILE_UPLOAD', video_size: 100, chunk_size: 100, total_chunk_count: 1 });
    const MB = 1024 * 1024;
    const big = tiktokChunks(75 * MB);
    expect(big.total_chunk_count).toBe(7);
    expect(big.ranges.at(-1)).toEqual([60 * MB, 75 * MB - 1]);
  });
  it('builds the LinkedIn video upload and post bodies', () => {
    expect(linkedinInit('urn:li:person:1', 5).initializeUploadRequest).toEqual({ owner: 'urn:li:person:1', fileSizeBytes: 5, uploadCaptions: false, uploadThumbnail: false });
    const p = linkedinPost('urn:li:person:1', 'urn:li:video:9', 'text', 'title');
    expect(p.content.media.id).toBe('urn:li:video:9');
    expect(p.lifecycleState).toBe('PUBLISHED');
    expect(p.visibility).toBe('PUBLIC');
  });
});
