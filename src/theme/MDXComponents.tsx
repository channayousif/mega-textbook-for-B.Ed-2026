import MDXComponents from '@theme-original/MDXComponents';
import Glossary from '@site/src/components/Glossary';
import TranslationStatusBadge from '@site/src/components/TranslationStatusBadge';
import PrintHandout from '@site/src/components/PrintHandout';
import BloomTag from '@site/src/components/BloomTag';
import ActivityCard from '@site/src/components/ActivityCard';
import ObjectiveList from '@site/src/components/ObjectiveList';

/**
 * Register unit components globally (T010) so MDX content can use them without a
 * per-file import. Content files may still import explicitly.
 */
export default {
  ...MDXComponents,
  Glossary,
  TranslationStatusBadge,
  PrintHandout,
  BloomTag,
  ActivityCard,
  ObjectiveList,
};
