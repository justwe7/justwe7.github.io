import React, { useState, useEffect } from 'react';
import { useTrail, animated } from '@react-spring/web';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';

import CanvasParticles from './CanvasParticles';
import styles from './styles.module.scss';

// Terminal typing effect hook with delete and loop
const RotatingTypewriter = ({ phrases, typingSpeed = 120, deletingSpeed = 60, pause = 1500 }: { phrases: string[]; typingSpeed?: number; deletingSpeed?: number; pause?: number }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingDelay(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTypingDelay(pause);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingDelay(typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingDelay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingDelay, typingSpeed, deletingSpeed, pause]);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: text ? text : ' ' }} />
      <span className={styles.blinkingCursor}>|</span>
    </>
  );
};

function Hero() {
  const trails = useTrail(4, {
    from: { opacity: 0, transform: 'translate3d(0px, 20px, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    config: { mass: 2, tension: 400, friction: 30 },
    delay: 300,
  });

  return (
    <div className={styles.heroContainer}>
      {/* 沉浸式动态粒子背景 */}
      <CanvasParticles />
      
      {/* 极客风格透明毛玻璃终端卡片 */}
      <div className={styles.glassCard}>
        {/* Fake Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className={styles.macButtons}>
            <span className={styles.dot} style={{ background: '#ff5f56' }} />
            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
            <span className={styles.dot} style={{ background: '#27c93f' }} />
          </div>
          <span className={styles.terminalTitle}>guest@wiki: ~</span>
        </div>
        
        {/* Terminal Content */}
        <div className={styles.terminalBody}>
          <animated.div style={trails[0]}>
            <h1 className={styles.greetText}>
              <span className={styles.prompt}>$&gt; </span>
              <RotatingTypewriter 
                phrases={[
                  "你好！我是土豆和土豆丝",
                  "前端工程师，热衷于独立开发与AI应用"
                ]} 
              />
            </h1>
          </animated.div>
          
          <animated.p style={trails[1]} className={styles.sysOutput}>
            <span className={styles.systemLog}>[System]: Booting knowledge matrix... OK</span><br/>
            <span className={styles.systemLog}>[System]: Load connections... 100%</span><br/><br/>
            <Translate id="homepage.hero.text">
              这里记录我的开发实践、踩坑总结、开源项目与一些有趣的尝试。
            </Translate>
            <br />
            希望这些内容，也能帮你少踩几个坑。
          </animated.p>

          <animated.div style={trails[2]} className={styles.techStack}>
            <span className={styles.techLabel}>[Tech_Stack]:</span>
            <div className={styles.badgeGroup}>
              <span className={styles.techBadge}><Icon icon="logos:vue" className={styles.badgeIcon} /> Vue</span>
              <span className={styles.techBadge}><Icon icon="logos:react" className={styles.badgeIcon} /> React</span>
              <span className={styles.techBadge}><Icon icon="logos:flutter" className={styles.badgeIcon} /> Flutter</span>
              <span className={styles.techBadge}><Icon icon="logos:nodejs-icon" className={styles.badgeIcon} /> Node.js</span>
              <span className={styles.techBadge}><Icon icon="logos:typescript-icon" className={styles.badgeIcon} /> TS/JS</span>
              {/* <span className={styles.techBadge}><Icon icon="devicon:nextjs" className={styles.badgeIcon} /> Next.js</span> */}
              <span className={styles.techBadge}><Icon icon="ri:wechat-fill" className={styles.badgeIcon} style={{ color: '#07C160' }} /> 小程序</span>
            </div>
          </animated.div>

          <animated.div style={trails[3]} className={styles.actionLinks}>
            <Link className={styles.cyberButton} to="/docs">
              <Icon icon="ri:terminal-box-line" className={styles.btnIcon} />
              <span className={styles.command}>./enter_docs.sh</span>
            </Link>
          </animated.div>
          
          <div className={styles.footerSocials}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
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
    <animated.div className={styles.socialNetworks} {...prop}>
      <a href={socials.github} target="_blank" rel="noreferrer" title="Github Repository">
        <Icon icon="ri:github-fill" />
      </a>
      {/* <a href={socials.bilibili} target="_blank" rel="noreferrer" title="Bilibili">
        <Icon icon="ri:bilibili-fill" />
      </a> */}
    </animated.div>
  );
}

export default Hero;
