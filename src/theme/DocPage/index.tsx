import React from 'react';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import OriginalDocPage from '@theme-original/DocPage';
import type {Props} from '@theme/DocPage';

/**
 * Apply the Dell 1996 visual system to both docs plugin instances while
 * retaining Docusaurus' original routing, sidebar and metadata behavior.
 */
export default function DocPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider className="dell1996">
      <OriginalDocPage {...props} />
    </HtmlClassNameProvider>
  );
}
