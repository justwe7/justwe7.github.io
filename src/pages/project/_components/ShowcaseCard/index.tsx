import React, { useRef, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import Image from '@theme/IdealImage';
import Link from '@docusaurus/Link';
import { type Project } from '@site/data/project';
import styles from './styles.module.css';

export default function ShowcaseCard({ project, index, isFeatured }: { project: Project, index: number, isFeatured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generate a predictable gradient for placeholder based on title length or char code
  const hash = project.title.charCodeAt(0) + project.title.length;
  const hue1 = (hash * 137) % 360;
  const hue2 = (hash * 277) % 360;
  
  const animationDelay = `${index * 50}ms`;

  return (
    <div
      ref={cardRef}
      className={clsx(styles.cardWrapper, { [styles.cardFeatured]: isFeatured })}
      style={{ animationDelay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={styles.cardGlow}
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)`
            : 'none'
        }}
      />
      <div 
        className={styles.cardGlowDark}
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.03), transparent 40%)`
            : 'none'
        }}
      />
      
      <div className={styles.cardContent}>
        <Link href={project.website} className={styles.cardImageLink}>
          {project.preview ? (
            <div className={styles.cardImageWrapper}>
               <Image src={project.preview} alt={project.title} className={styles.cardImage} />
            </div>
          ) : (
            <div className={styles.cardPlaceholder} style={{
               background: `linear-gradient(135deg, hsl(${hue1}, 70%, 80%), hsl(${hue2}, 70%, 90%))`
            }}>
              <span className={styles.placeholderIcon}>✦</span>
            </div>
          )}
          {project.badge && (
            <div className={styles.cardBadge}>{project.badge}</div>
          )}
        </Link>
        
        <div className={styles.cardBody}>
           <div className={styles.cardHeader}>
              <h4 className={styles.cardTitle}>
                <Link href={project.website} className={styles.cardTitleLink}>
                  {project.title}
                </Link>
              </h4>
              <Link href={project.website} className={styles.cardArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <line x1="7" y1="17" x2="17" y2="7"></line>
                   <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
           </div>
           <p className={styles.cardDesc}>{project.description}</p>
           
           {project.source && (
             <div className={styles.cardFooter}>
               <Link href={project.source} className={styles.cardSourceLink}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                 </svg>
                 Source
               </Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
