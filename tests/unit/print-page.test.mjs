import { describe, it, expect } from 'vitest';
import { printTitle, printableLinkUrl, qrCacheKey, shortUrl } from '../../src/lib/printPage.ts';

// Printed pages: the browser's page header reads "subject | unit | topic", and
// links that lead somewhere else get a QR code (owner request, 2026-10-19).
describe('printTitle', () => {
  it('drops the home and semester crumbs and joins the rest', () => {
    expect(printTitle(['', 'Semester 1', 'EFMP-302 · Teaching Profession', 'Unit 1 · Understanding Teaching', 'Topic 1.1 · What makes teaching a profession']))
      .toBe('EFMP-302 · Teaching Profession | Unit 1 · Understanding Teaching | Topic 1.1 · What makes teaching a profession');
  });

  it('works for Urdu crumbs and for pages below a unit that are not topics', () => {
    expect(printTitle(['', 'سمسٹر 1', 'EFMP-302 · پیشہ تدریس', 'یونٹ 1 · تدریس کو سمجھنا', 'موضوع 1.1']))
      .toBe('EFMP-302 · پیشہ تدریس | یونٹ 1 · تدریس کو سمجھنا | موضوع 1.1');
    expect(printTitle(['', 'Semester 1', 'EFMP-302 · Teaching Profession', 'Unit 1 · Understanding Teaching', 'Unit assessment']))
      .toBe('EFMP-302 · Teaching Profession | Unit 1 · Understanding Teaching | Unit assessment');
  });

  it('returns null when there is no subject to name', () => {
    expect(printTitle([])).toBeNull();
    expect(printTitle(['', 'Semester 1'])).toBeNull();
  });
});

describe('printableLinkUrl', () => {
  const page = 'https://textbook.com.pk/semester-1/efmp-302/unit-01/topic-01/';

  it('keeps external links and links to other textbook pages, as absolute URLs', () => {
    expect(printableLinkUrl('https://doi.org/10.1016/j.sbspro.2010.12.444', page)).toBe('https://doi.org/10.1016/j.sbspro.2010.12.444');
    expect(printableLinkUrl('../../unit-02/topic-01', page)).toBe('https://textbook.com.pk/semester-1/efmp-302/unit-02/topic-01');
    expect(printableLinkUrl('/semester-1/efmp-302/unit-01/topic-02/', page)).toBe('https://textbook.com.pk/semester-1/efmp-302/unit-01/topic-02/');
  });

  it('skips in-page anchors, the page itself and non-web schemes', () => {
    expect(printableLinkUrl('#summary', page)).toBeNull();
    expect(printableLinkUrl('/semester-1/efmp-302/unit-01/topic-01#summary', page)).toBeNull();
    expect(printableLinkUrl('mailto:someone@example.com', page)).toBeNull();
    expect(printableLinkUrl(null, page)).toBeNull();
  });
});

describe('shortUrl', () => {
  it('drops the scheme, www and a trailing slash', () => {
    expect(shortUrl('https://www.example.org/report/')).toBe('example.org/report');
  });

  it('shortens long URLs', () => {
    const out = shortUrl(`https://example.org/${'a'.repeat(100)}`);
    expect(out.length).toBe(70);
    expect(out.endsWith('...')).toBe(true);
  });
});

// Codes are drawn once per page and stored; they expire when the page changes.
describe('qrCacheKey', () => {
  const doi = 'https://doi.org/10.1016/j.sbspro.2010.12.444';

  it('is the same for the same page and links', () => {
    expect(qrCacheKey('/semester-1/efmp-302/unit-01/topic-01/', [doi])).toBe(qrCacheKey('/semester-1/efmp-302/unit-01/topic-01/', [doi]));
  });

  it('changes when the page or any of its links changes', () => {
    const key = qrCacheKey('/semester-1/efmp-302/unit-01/topic-01/', [doi]);
    expect(qrCacheKey('/semester-1/efmp-302/unit-01/topic-02/', [doi])).not.toBe(key);
    expect(qrCacheKey('/semester-1/efmp-302/unit-01/topic-01/', [doi, 'https://example.org/'])).not.toBe(key);
    expect(qrCacheKey('/semester-1/efmp-302/unit-01/topic-01/', [])).not.toBe(key);
  });
});
