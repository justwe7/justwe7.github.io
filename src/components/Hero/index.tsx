import React from 'react';

import { useTrail, animated } from '@react-spring/web';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

import HeroMain from './img/hero_main.svg';

import JuejinIcon from '@site/static/svg/juejin.svg';
import { Icon } from '@iconify/react';

import styles from './styles.module.scss';

function Hero() {
  const trails = useTrail(4, {
    from: { opacity: 0, transform: 'translate3d(0px, 2em, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    config: {
      mass: 3,
      tension: 460,
      friction: 45,
    },
  });

  return (
    <animated.div className={styles.hero}>
      <div className={styles.bloghome__intro}>
        <animated.div style={trails[0]} className={styles.hero_text}>
          <Translate id="homepage.hero.greet">你好! 我是</Translate>
          <span className={styles.intro__name}>
            <Translate id="homepage.hero.name">土豆和土豆丝</Translate>
          </span>
        </animated.div>
        <animated.p style={trails[1]}>
          <Translate id="homepage.hero.text">
            {`在这里我会分享自己平时总结的一些认为“有用”的知识`}
          </Translate>
          <br />
          <br />
          <Translate
            id="homepage.hero.look"
            values={{
              note: (
                <Link to="/docs">
                  <Translate id="hompage.hero.note">技术笔记</Translate>
                </Link>
              ),
              project: (
                <Link to="/project">
                  <Translate id="hompage.hero.project">个人项目</Translate>
                </Link>
              ),
              link: (
                <Link to="/website">
                  <Translate id="hompage.hero.link">网址收藏</Translate>
                </Link>
              ),
              // idea: (
              //   <Link to="/tags/随笔">
              //     <Translate id="hompage.hero.idea">想法感悟</Translate>
              //   </Link>
              // ),
            }}
          >
            {`你可以随处逛逛，查看{note}、{project}、{link}。`}
          </Translate>
            {/* {`你可以随处逛逛，查看{note}、{project}、{link}、以及我的{idea}。`} */}
        </animated.p>
        <SocialLinks style={trails[2]} />
        <animated.div style={trails[3]}>
          <a className={styles.intro} href={'./docs'}>
            <Translate id="hompage.hero.introduce">我的笔记</Translate>
          </a>
        </animated.div>
        {/* <animated.div style={trails[3]}>
          <a className={styles.intro} href={'./about'}>
            <Translate id="hompage.hero.introduce">自我介绍</Translate>
          </a>
        </animated.div> */}
      </div>
      <div className={styles.bloghome__image}>
        <HeroMain />
      </div>
    </animated.div>
  );
}

export function SocialLinks({ ...prop }) {
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const socials = themeConfig.socials as {
    github: string;
    bilibili: string;
    v2ex: string;
    qq: string;
    cloudmusic: string;
  };

  return (
    <animated.div className={styles.social__links} {...prop}>
     {/*  <a href="/rss.xml" target="_blank">
        <Icon icon='ri:rss-line' />
      </a> */}
      <a href={socials.github} target="_blank">
        <Icon icon='ri:github-line' />
      </a>
      {/* <a href={socials.qq} target="_blank">
        <Icon icon='ri:qq-line' />
      </a> */}
      {/* <a href={socials.twitter} target="_blank">
        <Icon icon='ri:twitter-line' />
      </a>
      <a href={socials.zhihu} target="_blank">
        <Icon icon='ri:zhihu-line' />
      </a> */}
    </animated.div>
  );
}

export default Hero;
