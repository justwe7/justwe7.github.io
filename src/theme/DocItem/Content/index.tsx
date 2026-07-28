import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';

function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';

  return shouldRender ? metadata.title : null;
}

function useCatalogLabel() {
  const {metadata, frontMatter} = useDoc();
  const sourceDirectory = metadata.sourceDirName;
  const isLifeNote = metadata.permalink.startsWith('/life/');
  const fallbackCategory = isLifeNote ? '生活日常' : '开发笔记';
  const category =
    sourceDirectory && sourceDirectory !== '.'
      ? sourceDirectory.split('/')[0] ?? fallbackCategory
      : fallbackCategory;
  const configuredBadge = frontMatter.dell1996_badge;
  const badge =
    typeof configuredBadge === 'string' && configuredBadge.trim()
      ? configuredBadge.trim()
      : 'NOTE';

  return {
    badge,
    category,
    collection: isLifeNote ? 'LIFE CATALOG' : 'DEV CATALOG',
  };
}

export default function DocItemContent({children}: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const catalogLabel = useCatalogLabel();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      <div className="dell1996-doc-ribbon">
        <span className="dell1996-doc-ribbon__category">
          {catalogLabel.category}
        </span>
        <span className="dell1996-doc-ribbon__collection">
          {catalogLabel.collection}
        </span>
        <span className="dell1996-doc-ribbon__sticker">
          {catalogLabel.badge}
        </span>
      </div>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
