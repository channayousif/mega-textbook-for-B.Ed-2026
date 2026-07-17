import React from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

/**
 * T026 (FR-006, SC-005): scaffolded `coming_soon` units stay visible in the sidebar
 * (no dead ends) but MUST be excluded from the search index. The search plugin
 * (@easyops-cn/docusaurus-search-local) skips any page whose HTML carries
 * `<meta name="robots" content="noindex">`, so we emit that only for coming_soon pages.
 */
export default function MetadataWrapper(props: Record<string, unknown>): React.ReactElement {
  const { frontMatter } = useDoc();
  return (
    <>
      <Metadata {...props} />
      {(frontMatter as { coming_soon?: boolean }).coming_soon && (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      )}
    </>
  );
}
