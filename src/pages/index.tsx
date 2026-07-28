import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '@site/src/components/Hero';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();


  return (
    <HtmlClassNameProvider className="dell1996">
      <Layout title="首页" description={siteConfig.tagline} wrapperClassName="homepage-wrapper">
        <Head>
          <style>{`
            .navbar { display: none !important; }
            :root { --ifm-navbar-height: 0px !important; }
          `}</style>
        </Head>
        <Hero />
      </Layout>
    </HtmlClassNameProvider>
  );
}
