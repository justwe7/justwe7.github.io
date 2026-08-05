import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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

function useSourceNotice() {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const configuredAuthor = siteConfig.customFields?.contentAuthor;
  const author =
    typeof configuredAuthor === 'string' && configuredAuthor.trim()
      ? configuredAuthor.trim()
      : '土豆和土豆丝';
  const canonicalUrl = new URL(metadata.permalink, siteConfig.url).href;

  return {
    author,
    canonicalUrl,
    displayUrl: decodeURI(canonicalUrl),
    title: metadata.title,
  };
}

export default function DocItemContent({children}: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const catalogLabel = useCatalogLabel();
  const sourceNotice = useSourceNotice();

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
      <aside
        className="dell1996-doc-source"
        aria-label="内容声明"
        data-page-source={sourceNotice.canonicalUrl}>
        <strong className="dell1996-doc-source__heading">内容声明</strong>
        <div className="dell1996-doc-source__body">
          <p>
            本文《{sourceNotice.title}》由{' '}
            <span className="dell1996-doc-source__author">
              {sourceNotice.author}
            </span>{' '}
            撰写。
          </p>
          <p>
            原文链接：
            <a href={sourceNotice.canonicalUrl}>{sourceNotice.displayUrl}</a>
          </p>
          <p>未经许可请勿转载；引用时请保留作者和原文链接。</p>
        </div>
      </aside>
    </div>
  );
}
