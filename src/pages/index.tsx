import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '@site/src/components/Hero';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  
  // 完全沉浸式主页体验：挂载时隐藏顶部导航栏，卸载时恢复
  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const originalDisplay = navbar ? navbar.style.display : '';
    
    // 强行隐藏导航栏
    if (navbar) {
      navbar.style.setProperty('display', 'none', 'important');
    }
    
    // 移除 docusaurus 默认为 navbar 预留的距离
    document.documentElement.style.setProperty('--ifm-navbar-height', '0px');

    return () => {
      if (navbar) {
        navbar.style.display = originalDisplay;
      }
      document.documentElement.style.removeProperty('--ifm-navbar-height');
    };
  }, []);

  return (
    <Layout title="首页" description={siteConfig.tagline} wrapperClassName="homepage-wrapper">
      <Hero />
    </Layout>
  );
}
