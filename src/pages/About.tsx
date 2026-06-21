import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import './About.css';

import aboutSlide01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import aboutSlide02 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import aboutSlide03 from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import aboutDetail from '../assets/LINE_ALBUM_2026.6.17_260621_40.jpg';

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  { src: aboutSlide01, caption: '天母森光 — 全屋統包典範'   },
  { src: aboutSlide02, caption: '奢華暗灰 — 精品格柵工藝'  },
  { src: aboutSlide03, caption: '侘寂茶韻 — 礦物手刷美學'  },
];

const STATS = [
  { num: '30+',  label: '年產業經驗',   en: 'YEARS EXPERTISE'   },
  { num: '500+', label: '完工案例',     en: 'PROJECTS COMPLETED' },
  { num: '0',    label: '惡意追加紀錄', en: 'HIDDEN EXTRA COSTS' },
];

const VALUES = [
  {
    id:    '01',
    title: '材料源頭',
    desc:  '深耕木材與建材產業逾三十年，我們從源頭理解每一種素材的物理特性、耐用極限與美學語彙，讓選材決策準確到位。',
  },
  {
    id:    '02',
    title: '工藝細節',
    desc:  '每一個收邊、每一道防水、每一塊木地板的紋理配對，皆由資深職人親手把關。細節不妥協，是我們對每個案場的基本承諾。',
  },
  {
    id:    '03',
    title: '誠信透明',
    desc:  '工程報價逐項條列，簽約金額即最終造價。施工期間每日上傳進度照片，讓您足不出戶掌握每一個工法節點。',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════ */
const Reveal: React.FC<{
  children:   React.ReactNode;
  delay?:     number;
  from?:      'bottom' | 'left' | 'right';
  className?: string;
}> = ({ children, delay = 0, from = 'bottom', className = '' }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  const initial =
    from === 'left'  ? { opacity: 0, x: -48, y: 0 } :
    from === 'right' ? { opacity: 0, x:  48, y: 0 } :
                       { opacity: 0, x:   0, y: 44 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════════════════════════ */
const HeroSlider: React.FC = () => {
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setActive(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, scale: dir > 0 ? 1.06 : 0.96, x: dir > 0 ? 40 : -40 }),
    center: ()            => ({ opacity: 1, scale: 1,                      x: 0 }),
    exit:   (dir: number) => ({ opacity: 0, scale: dir > 0 ? 0.96 : 1.06, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section className="about-hero-section">
      {/* ── Background slide images ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="about-hero-slide-bg"
          style={{ backgroundImage: `url('${HERO_SLIDES[active].src}')` }}
        />
      </AnimatePresence>

      {/* ── Multi-layer gradient ── */}
      <div className="about-hero-gradient" />

      {/* ── Hero copy block ── */}
      <div className="about-hero-copy">

        {/* Eyebrow */}
        <Reveal>
          <div className="about-eyebrow">
            <div className="about-eyebrow-line" />
            <span className="about-eyebrow-text">
              ABOUT NANYUAN
            </span>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.08}>
          <h1 className="about-hero-title">
            關於<br />
            <span className="about-hero-title-gold">南源</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.16}>
          <p className="about-hero-subtitle">
            從材料源頭到空間落地，我們懂木，更懂您。
          </p>
        </Reveal>

        {/* Slide caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="about-slide-caption"
          >
            {HERO_SLIDES[active].caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Dot pagination ── */}
      <div className="about-dot-pagination">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`切換至第 ${i + 1} 張`}
            className={`about-dot-btn ${i === active ? 'about-dot-btn--active' : 'about-dot-btn--inactive'}`}
          />
        ))}
        <span className="about-dot-counter">
          {String(active + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="about-scroll-cue"
      >
        ↓
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════════ */
const StatsBar: React.FC = () => (
  <Reveal>
    <div className="row g-0 about-stats-bar">
      {STATS.map((s) => (
        <div
          key={s.en}
          className="col-12 col-md-4 about-stat-cell"
        >
          <div className="about-stat-num">
            {s.num}
          </div>
          <div className="about-stat-label">
            {s.label}
          </div>
          <div className="about-stat-en">
            {s.en}
          </div>
        </div>
      ))}
    </div>
  </Reveal>
);

/* ═══════════════════════════════════════════════════════════════
   STORY SECTION
═══════════════════════════════════════════════════════════════ */
const StorySection: React.FC = () => (
  <section className="about-story-section">
    <div className="container px-3 px-md-4">

      <Reveal>
        <p className="about-story-lead">
          早期深耕木材與建築材料領域，擁有超過三十年的產業資歷。我們看過無數材料的優劣，深知一塊好木頭如何決定一個空間的生命力與溫度。
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="about-story-quote">
          我們承諾，每一個細節都經得起時間的考驗，讓您的空間不只是居住，更是世代安心的歸宿。南源不只提供工程，更是您打造傳世私人空間最值得信賴的職人夥伴。
        </p>
      </Reveal>

      <div className="about-stats-wrapper">
        <StatsBar />
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   VALUES SECTION
═══════════════════════════════════════════════════════════════ */
const ValuesSection: React.FC = () => (
  <section className="about-values-section">
    <div className="container px-3 px-md-4">

      <Reveal className="mb-5">
        <div className="about-values-eyebrow">
          <div className="about-values-eyebrow-line" />
          <span className="about-values-eyebrow-text">
            OUR CORE VALUES
          </span>
        </div>
        <h2 className="about-values-title">
          三大核心價值
        </h2>
      </Reveal>

      <div className="row g-4">
        {VALUES.map((v, i) => (
          <div className="col-12 col-md-4" key={v.id}>
            <Reveal delay={i * 0.12}>
              <ValueCard value={v} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ValueCard: React.FC<{ value: typeof VALUES[0] }> = ({ value }) => {
  return (
    <div className="about-value-card">
      <span className="about-value-id">
        {value.id}
      </span>
      <div className="about-value-divider" />
      <h3 className="about-value-name">
        {value.title}
      </h3>
      <p className="about-value-desc">
        {value.desc}
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RINGS SECTION
═══════════════════════════════════════════════════════════════ */
const CSS_RINGS = [
  { size: 120, delay: '0s',   opacity: 0.50 },
  { size: 220, delay: '1.2s', opacity: 0.35 },
  { size: 330, delay: '2.4s', opacity: 0.22 },
  { size: 460, delay: '3.6s', opacity: 0.14 },
  { size: 600, delay: '4.8s', opacity: 0.08 },
];

const FM_RINGS = [
  { size: 400, borderOpacity: 0.45, shadowOpacity: 0.25, scrollStart: 0.20, scrollEnd: 0.65 },
  { size: 560, borderOpacity: 0.22, shadowOpacity: 0.12, scrollStart: 0.25, scrollEnd: 0.65 },
  { size: 720, borderOpacity: 0.10, shadowOpacity: 0.06, scrollStart: 0.30, scrollEnd: 0.65 },
];

const RingsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  });

  const scaleR = FM_RINGS.map(r =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [r.scrollStart, r.scrollEnd], [0, 1])
  );
  const opacR = FM_RINGS.map((r) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [r.scrollStart, r.scrollStart + 0.25], [0, 1])
  );

  return (
    <section
      ref={sectionRef}
      className="about-rings-section"
    >
      <div className="container px-3 px-md-4">
        <div className="about-rings-container">
          {/* LAYER A: CSS-animated inner rings */}
          {CSS_RINGS.map((r, i) => (
            <div
              key={`css-ring-${i}`}
              className="about-ring-css"
              style={{
                width:          `${r.size}px`,
                height:         `${r.size}px`,
                marginTop:      `${-r.size / 2}px`,
                marginLeft:     `${-r.size / 2}px`,
                border:         `1px solid rgba(197,168,128,${r.opacity})`,
                animationDelay: r.delay,
              }}
            />
          ))}

          {/* LAYER B: Framer Motion scroll-driven outer rings */}
          {FM_RINGS.map((r, i) => (
            <motion.div
              key={`fm-ring-${i}`}
              className="about-ring-fm"
              style={{
                width:         `${r.size}px`,
                height:        `${r.size}px`,
                marginTop:     `${-r.size / 2}px`,
                marginLeft:    `${-r.size / 2}px`,
                border:        `1px solid rgba(197,168,128,${r.borderOpacity})`,
                boxShadow:     `0 0 ${40 + i * 20}px rgba(197,168,128,${r.shadowOpacity})`,
                scale:         scaleR[i],
                opacity:       opacR[i],
              }}
            />
          ))}

          {/* Centre text */}
          <Reveal>
            <div className="about-rings-centre">
              <h2 className="about-rings-title">
                年輪，時間的印記。
              </h2>
              <p className="about-rings-desc">
                一圈圈代表著我們對材料的深刻理解。<br />
                從源頭開始，為您的空間注入經久耐用的職人精神。
              </p>
              <div className="about-rings-accent-line" />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PHILOSOPHY SECTION
═══════════════════════════════════════════════════════════════ */
const PhilosophySection: React.FC = () => (
  <section className="about-philosophy-section">
    <div className="container px-3 px-md-4">
      <div className="row g-5 align-items-center">

        {/* Image */}
        <div className="col-12 col-lg-5">
          <Reveal from="left">
            <div className="about-philosophy-img-wrap">
              <img
                src={aboutDetail}
                alt="南源職人現場工藝"
                className="about-philosophy-img"
              />
              <div className="about-philosophy-corner-bl" />
              <div className="about-philosophy-corner-tr" />
            </div>
          </Reveal>
        </div>

        {/* Quote */}
        <div className="col-12 col-lg-7">
          <Reveal from="right" delay={0.1}>
            <div className="about-philosophy-eyebrow">
              <div className="about-philosophy-eyebrow-line" />
              <span className="about-philosophy-eyebrow-text">OUR PHILOSOPHY</span>
            </div>
            <div className="about-philosophy-open-quote">"</div>
            <blockquote className="about-philosophy-blockquote">
              裝修不是花錢買外表，而是花心思在對的地方。我們的工作，是讓每一分材料費都能轉化為您空間裡經得起歲月審視的細節。
            </blockquote>
            <p className="about-philosophy-author">
              — 南源木材　創辦人
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════ */
const About: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="about-page"
  >
    <HeroSlider />
    <StorySection />
    <ValuesSection />
    <RingsSection />
    <PhilosophySection />
  </motion.div>
);

export default About;