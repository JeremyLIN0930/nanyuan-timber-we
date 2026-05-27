import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './About.css';

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  '/images/luxury_tianmu_home_1779301841564.png',
  '/images/style_luxury_dark_1779301949701.png',
  '/images/japanese_wabi_sabi_1779301881798.png',
];

const STATS = [
  { num: '30+', label: '年產業經驗' },
  { num: '500+', label: '完工案例' },
  { num: '0', label: '惡意追加' },
];

/* ── Reusable scroll reveal ── */
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const About: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  /* Auto-rotate slides every 5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* Parallax rings section */
  const ringsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ringsRef,
    offset: ['start end', 'end start'],
  });
  const scaleRing1 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const scaleRing2 = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  const scaleRing3 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const opacityRing1 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const opacityRing2 = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const opacityRing3 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <main className="about-page">

      {/* ── Hero Slider ─────────────────────────────────────── */}
      <section className="about-hero-slider">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={i}
            className={`about-hero-slide ${i === activeSlide ? 'active' : ''}`}
          >
            <div
              className="about-hero-slide-bg"
              style={{ backgroundImage: `url('${src}')` }}
            />
          </div>
        ))}

        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <h1 className="about-hero-title">關於南源</h1>
          <p className="about-hero-subtitle">
            從材料源頭到空間落地，我們懂木，更懂您。
          </p>
        </div>

        <div className="about-hero-pagination">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`about-hero-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`切換至第 ${i + 1} 張幻燈片`}
            />
          ))}
        </div>
      </section>

      {/* ── Story Section ───────────────────────────────────── */}
      <section className="about-story-section container">
        <FadeInSection>
          <p className="about-story-lead">
            早期深耕木材與建築材料領域，擁有超過數十年的產業經驗。我們看過無數材料的優劣，深知一塊好木頭如何影響一個空間的生命力。
          </p>
        </FadeInSection>

        <FadeInSection>
          <p className="about-story-secondary">
            我們承諾，每一個細節都經得起時間的考驗，讓您的空間不只是居住，更是安心的歸宿。
          </p>
        </FadeInSection>

        {/* Stats grid */}
        <FadeInSection>
          <div className="about-stats-grid">
            {STATS.map((stat, i) => (
              <div key={i} className="about-stat-item">
                <span className="about-stat-number">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ── Rings Parallax ──────────────────────────────────── */}
      <section ref={ringsRef} className="about-rings-section">
        <div className="about-rings-sticky">
          <div className="about-rings-container">
            <motion.div className="about-rings-group">
              <motion.div
                className="about-ring about-ring-1"
                style={{ scale: scaleRing1, opacity: opacityRing1 }}
              />
              <motion.div
                className="about-ring about-ring-2"
                style={{ scale: scaleRing2, opacity: opacityRing2 }}
              />
              <motion.div
                className="about-ring about-ring-3"
                style={{ scale: scaleRing3, opacity: opacityRing3 }}
              />
            </motion.div>

            <div className="about-rings-text">
              <h2 className="about-rings-title">年輪，時間的印記。</h2>
              <p className="about-rings-desc">
                一圈圈代表著我們對材料的深刻理解。<br />
                從源頭開始，為您的空間注入經久耐用的職人精神。
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
