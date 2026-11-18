import { describe, it, expect } from 'vitest';
import { mdxToSourceMarkdown, findTopicFile } from '../../scripts/notebook-studio/build-source-pack.mjs';

const MDX = `---
title: "Topic 9.1 - Sample"
description: "One line."
---

import Figure from '@site/src/components/Figure';
import Glossary from '@site/src/components/Glossary';

<TranslationStatusBadge status="draft" />
<PrintHandout />

# Topic 9.1 - Sample

{/* FIGURE[id=fig-U9-1] internal marker */}

## Explanation

<Glossary term="Attention" /> matters, and so does <Glossary term="Perception">perceiving</Glossary>.

<Figure
  id="fig-U9-1"
  src="/img/x.svg"
  alt="A spotlight diagram."
/>

## Answers and marking guidance

1. (b) SECRET-KEY
`;

describe('mdxToSourceMarkdown', () => {
  const { markdown, excludedAnswers } = mdxToSourceMarkdown(MDX);

  it('drops everything from the answers heading onward', () => {
    expect(excludedAnswers).toBe(true);
    expect(markdown).not.toContain('SECRET-KEY');
    expect(markdown).not.toContain('Answers and marking guidance');
  });

  it('removes imports, widgets, comments and component tags', () => {
    expect(markdown).not.toMatch(/^import /m);
    expect(markdown).not.toMatch(/<[A-Z]/);
    expect(markdown).not.toContain('FIGURE[');
  });

  it('keeps glossary words and figure alt text', () => {
    expect(markdown).toContain('Attention matters, and so does perceiving.');
    expect(markdown).toContain('> Figure: A spotlight diagram.');
  });

  it('puts the H1 first and the description under it', () => {
    expect(markdown.startsWith('# Topic 9.1 - Sample\n\n_One line._\n')).toBe(true);
  });

  it('reports no exclusion when there is no answers section', () => {
    expect(mdxToSourceMarkdown('# T\n\nBody\n').excludedAnswers).toBe(false);
  });
});

describe('findTopicFile', () => {
  it('resolves a real EN topic and its UR mirror', () => {
    expect(findTopicFile('efmp-301', 4, 1, 'en')).toMatch(/docs\/semester-1\/efmp-301\/unit-04\/topic-01\.mdx$/);
    expect(findTopicFile('efmp-301', 4, 1, 'ur')).toMatch(/i18n\/ur\/docusaurus-plugin-content-docs\/current\/.*topic-01\.mdx$/);
  });

  it('throws for a missing topic', () => {
    expect(() => findTopicFile('efmp-301', 99, 1)).toThrow(/Topic not found/);
  });
});
