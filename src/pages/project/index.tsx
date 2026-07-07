import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import ShowcaseCard from './_components/ShowcaseCard';
import { projects } from '@site/data/project';
import styles from './styles.module.css';

function HeroSection() {
  const stack = ['Vue', 'React', 'Flutter', 'Node.js', 'Mini Program'];

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleSub}>前端工程师</span>
          <br/>
          跨端开发 · AI 工程
        </h1>
        <p className={styles.heroDesc}>
          热爱产品创造，喜欢开发 Web、App、AI 工具与研发效率产品，<br/>
          热衷于工程化和产品体验。
        </p>
        <div className={styles.techStack}>
          {stack.map((tech) => (
            <span key={tech} className={styles.techCapsule}>{tech}</span>
          ))}
        </div>
      </div>
      <div className={styles.heroVisuals}>
         <div className={styles.heroBlurBlue}></div>
         <div className={styles.heroBlurGreen}></div>
         
         {/* Floating Elements */}
         <div className={styles.floatingCard1}>
           <div className={styles.floatingCardHeader}>AppShots</div>
           <div className={styles.floatingCardBody}>⭐ appshots.lihx.top</div>
         </div>
         <div className={styles.floatingCard2}>
           <div className={styles.floatingTerminal}>
              <span className={styles.termPrompt}>&gt;</span> npm i jw-cli<br/>
              <span className={styles.termSuccess}>✔ Installed</span>
           </div>
         </div>
      </div>
    </div>
  );
}

function ShowcaseCards() {
  const featured = useMemo(() => projects.filter(p => p.tags.includes('favorite')), []);
  const allProjects = useMemo(() => projects.filter(p => !p.tags.includes('favorite')), []);

  return (
    <section className={styles.projectsSection}>
      {featured.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={clsx(styles.showcaseGrid, styles.featuredGrid)}>
            {featured.map((project, index) => (
              <ShowcaseCard key={project.title} project={project} index={index} isFeatured />
            ))}
          </div>
        </div>
      )}

      <div className={styles.sectionBlock}>
        <div className={styles.divider}>
          <span className={styles.dividerText}>All Projects</span>
        </div>
        <div className={clsx(styles.showcaseGrid, styles.allGrid)}>
          {allProjects.map((project, index) => (
            <ShowcaseCard key={project.title} project={project} index={index + featured.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <div className={styles.pageFooter}>
      <div className={styles.footerDivider}></div>
      <div className={styles.footerContent}>
        <span className={styles.footerTitle}>Like what you see?</span>
        <div className={styles.footerLinks}>
          <a href="https://github.com/justwe7" target="_blank" rel="noreferrer">Github</a>
          <a href="mailto:ilihuaxi@gmail.com">Email</a>
          <a href="#">RSS</a>
        </div>
      </div>
    </div>
  );
}

export default function Showcase(): JSX.Element {
  return (
    <Layout title="个人项目" description="以下项目均由本人开发，均可自由使用，部分开源。">
      <main className={styles.mainContainer}>
        <div className={styles.backgroundGrid}></div>
        <div className={styles.backgroundNoise}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
           <HeroSection />
           <ShowcaseCards />
           <FooterSection />
        </div>
      </main>
    </Layout>
  );
}
