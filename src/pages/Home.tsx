import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ClipboardCheck } from 'lucide-react';
import './Home.css';
import CTA from '../components/CTA/CTA';

/* ── Asset Imports: Hero backgrounds ─────────────────────────── */
import heroMaterial     from '../assets/home-hero-material.jpg';
import heroCraft        from '../assets/home-hero-craft.jpg';
import heroTransparency from '../assets/home-hero-transparency.jpg';
import heroRealization  from '../assets/home-hero-realization.jpg';

/* ── Asset Imports: Comparison slider ────────────────────────── */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* ── Asset Imports: Process steps ────────────────────────────── */
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';

/* ── Asset Imports: Portfolio real project photos ────────────── */
import realPhoto01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import realPhoto02 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import realPhoto03 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';
import realPhoto04 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import realPhoto05 from '../assets/LINE_ALBUM_2026.6.17_260621_1.jpg';
import realPhoto06 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';

/* ═══════════════════════════════════════════════════════════════
   UNIFIED HERO STEPS — Single source of truth
   ─────────────────────────────────────────────────────────────
   Text + background image bound to the SAME array index.
   A single setInterval timer (4 seconds) drives BOTH text
   and background changes in the exact same React setState call.
   Zero desync guaranteed.
═══════════════════════════════════════════════════════════════ */
const HERO_STEPS = [
  { text: '材料源頭', sub: 'MATERIAL ORIGIN',  bg: heroMaterial     },
  { text: '工藝精準', sub: 'PRECISION CRAFT',  bg: heroCraft        },
  { text: '誠信透明', sub: 'TRANSPARENCY',     bg: heroTransparency },
  { text: '空間落地', sub: 'SPACE REALIZATION', bg: heroRealization  },
];

/* ═══════════════════════════════════════════════════════════════
   PROCESS STEP DATA
═══════════════════════════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    id: '01',
    title: '初步諮詢',
    en: 'BESPOKE CONSULTATION',
    desc: '傾聽您對場域的無限想像，開展客製化空間設計藍圖。',
    img: process01,
  },
  {
    id: '02',
    title: '現場勘測',
    en: 'PRECISION SITE SURVEY',
    desc: '職人團隊親赴現場，記錄尺度、採光、結構與管線細節。',
    img: process02,
  },
  {
    id: '03',
    title: '設計提案',
    en: 'CONCEPT & SPACE DESIGN',
    desc: '將創意轉化為空間美學，提供格局、材質與視覺提案。',
    img: process03,
  },
  {
    id: '04',
    title: '工程合約',
    en: 'TRANSPARENT AGREEMENT',
    desc: '條列式報價與施工節點，確保合作流程清楚透明。',
    img: process04,
  },
  {
    id: '05',
    title: '精湛施工',
    en: 'MASTER CRAFTSMANSHIP',
    desc: '由自有工班與現場總監執行，精準落實設計圖面。',
    img: process05,
  },
  {
    id: '06',
    title: '完工驗收',
    en: 'PERFECT HANDOVER',
    desc: '高規格檢驗細節，交付安心、完整且具質感的空間。',
    img: process06,
  },
];

/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO ITEMS
═══════════════════════════════════════════════════════════════ */
const portfolioItems = [
  { title: '木光雅居', type: '全屋統包', img: realPhoto01 },
  { title: '奢韻臥室', type: '主臥設計', img: realPhoto02 },
  { title: '原木廚域', type: '廚房木作', img: realPhoto03 },
  { title: '迎賓大廳', type: '公設工程', img: realPhoto04 },
  { title: '雲杉寢閣', type: '系統收納', img: realPhoto05 },
  { title: '織錦牆面', type: '繃布壁飾', img: realPhoto06 },
];

/* ─────────────────────────────────────────────────────────────
   FADE-IN SECTION (scroll-driven reveal via Intersection Observer)
───────────────────────────────────────────────────────────── */
const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PROCESS STEP IMAGE with SVG gradient fallback
   ─────────────────────────────────────────────────────────────
   If the image file fails to load (onError), automatically
   renders an inline SVG warm brown gradient placeholder with
   the step number. Ensures zero broken images across all
   environments.
───────────────────────────────────────────────────────────── */
const ProcessImage: React.FC<{ src: string; alt: string; stepId: string }> = ({ src, alt, stepId }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="home-process-step-fallback">
        <svg viewBox="0 0 400 280" className="home-process-step-fallback-svg" aria-label={alt}>
          <defs>
            <linearGradient id={`grad-${stepId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(197,168,128,0.15)" />
              <stop offset="50%" stopColor="rgba(197,168,128,0.06)" />
              <stop offset="100%" stopColor="rgba(10,10,10,0.95)" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#grad-${stepId})`} />
          <line x1="0" y1="0" x2="400" y2="280" stroke="rgba(197,168,128,0.08)" strokeWidth="0.5" />
          <line x1="400" y1="0" x2="0" y2="280" stroke="rgba(197,168,128,0.08)" strokeWidth="0.5" />
          <rect x="150" y="100" width="100" height="80" fill="none" stroke="rgba(197,168,128,0.12)" strokeWidth="1" />
          <text x="200" y="148" textAnchor="middle" fill="rgba(197,168,128,0.35)" fontSize="28" fontWeight="900" fontFamily="sans-serif">{stepId}</text>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="home-process-step-img"
      onError={() => setHasError(true)}
    />
  );
};

/* ─────────────────────────────────────────────────────────────
   RENDER vs REALITY COMPARISON SLIDER
   ─────────────────────────────────────────────────────────────
   Left:  設計模擬圖 / RENDER  (compare-render.jpg)
   Right: 實景完工照 / REALITY (compare-reality.jpg)
───────────────────────────────────────────────────────────── */
const RenderRealitySlider: React.FC = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="home-before-after-container"
      onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onMouseDown={e => handleMove(e.clientX)}
    >
      <div
        className="home-ba-side home-ba-after"
        style={{ backgroundImage: `url('${compareReality}')` }}
      >
        <div className="home-ba-overlay" />
        <span className="home-ba-label home-ba-label--right">實景完工照 / REALITY</span>
      </div>
      <div
        className="home-ba-side home-ba-before"
        style={{
          backgroundImage: `url('${compareRender}')`,
          clipPath: `polygon(0 0,${pos}% 0,${pos}% 100%,0 100%)`,
        }}
      >
        <div className="home-ba-overlay" />
        <span className="home-ba-label home-ba-label--left">設計模擬圖 / RENDER</span>
      </div>
      <div className="home-ba-divider" style={{ left: `${pos}%` }}>
        <div className="home-ba-handle">
          <span className="home-ba-handle-icon">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ─────────────────────────────────────────────────────────────
   Architecture:
   1. Intro Overlay    — 2.5s brand splash → fade out
   2. Fullscreen Hero  — 4s setInterval rotating bg + text
   3. Three Advantages — 源頭理解 / 細節品質 / 誠信透明
   4. Six Processes    — Alternating image-text layout
   5. Render vs Reality— Interactive comparison slider
   6. Portfolio Wall   — 6-card grid → /projects
   7. Shared CTA       — 全站唯一公共預約引導組件
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── Intro overlay state (brand splash) ── */
  const [isIntro, setIsIntro] = useState(true);

  /* ── Hero rotation index — drives BOTH text and background ── */
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  /* ══════════════════════════════════════════════════════════
     INTRO: auto-dismiss after 2.5 seconds
     The overlay fades out via CSS transition, then the main
     content beneath becomes visible and interactive.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  /* ══════════════════════════════════════════════════════════
     HERO ROTATION — Single setInterval, 4-second cycle
     ──────────────────────────────────────────────────────
     Both text and background image are driven by the SAME
     activeHeroIndex state variable, updated in a single
     setState call. Zero desync guaranteed.

     Fix: replaces the old scroll-driven GSAP approach which
     caused severe text-to-background delay on certain devices.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % HERO_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ── Smooth scroll to advantages section ── */
  const scrollToContent = () => {
    document.querySelector('.advantages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="home-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* ══════════════════════════════════════════════════════════════════
          INTRO OVERLAY — Brand splash (first 2.5 seconds)
          ──────────────────────────────────────────────────────────────
          Slowly fades in: 南源木材｜NANYUAN TIMBER DESIGN
          After 2.5s the isIntro flag flips → CSS transition fades out
          the overlay and unlocks the main content below.
      ══════════════════════════════════════════════════════════════════ */}
      <div className={`home-intro-overlay ${!isIntro ? 'home-intro-overlay--hidden' : ''}`}>
        <div className="home-intro-line" />
        <h1 className="home-intro-brand-zh">南源木材</h1>
        <p className="home-intro-brand-en">NANYUAN TIMBER DESIGN</p>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1: FULLSCREEN HERO — Auto-rotating backgrounds + text
          ──────────────────────────────────────────────────────────────
          Background images are cross-faded via HERO_STEPS[activeHeroIndex].bg
          Step text is cross-faded via HERO_STEPS[activeHeroIndex].text
          Both driven by the SAME state — zero delay.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-hero-section">

        {/* ── 4 Hero background layers — cross-fade via activeHeroIndex ── */}
        {HERO_STEPS.map((step, i) => (
          <div
            key={`hero-bg-${i}`}
            className={`home-hero-bg-layer ${i === activeHeroIndex ? 'home-hero-bg-layer--active' : ''}`}
            style={{ backgroundImage: `url('${step.bg}')` }}
          />
        ))}

        {/* ── Dark overlay ── */}
        <div className="home-hero-bg-overlay" />

        {/* ── Radial vignette ── */}
        <div className="home-hero-vignette" />

        {/* ── Hero center content ── */}
        <div className="home-hero-content">

          {/* ── Eyebrow ornament ── */}
          <div className="home-hero-eyebrow">
            <div className="home-hero-eyebrow-line" />
            <span className="home-hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
            <div className="home-hero-eyebrow-line" />
          </div>

          {/* ── Brand title ── */}
          <h1 className="home-hero-brand">南源木材</h1>

          {/* ── Rotating step text — synced to backgrounds ── */}
          <div className="home-hero-step-container">
            {HERO_STEPS.map((step, i) => (
              <div
                key={`hero-text-${i}`}
                className={`home-hero-step-group ${i === activeHeroIndex ? 'home-hero-step-group--active' : ''}`}
              >
                <span className="home-hero-step-zh">{step.text}</span>
                <span className="home-hero-step-divider">|</span>
                <span className="home-hero-step-en">{step.sub}</span>
              </div>
            ))}
          </div>

          {/* ── Tagline ── */}
          <p className="home-hero-tagline">
            從材料源頭開始，打造安心落地的空間
          </p>

          {/* ── Hero CTA buttons ── */}
          <div className="home-hero-cta-row">
            <button
              className="home-hero-btn home-hero-btn--primary"
              onClick={() => navigate('/contact')}
            >
              立即預約諮詢 ➜
            </button>
            <button
              className="home-hero-btn home-hero-btn--outline"
              onClick={scrollToContent}
            >
              探索南源工藝
            </button>
          </div>

          {/* ── Progress indicator dots ── */}
          <div className="home-hero-dots">
            {HERO_STEPS.map((step, i) => (
              <button
                key={`dot-${i}`}
                className={`home-hero-dot ${i === activeHeroIndex ? 'home-hero-dot--active' : ''}`}
                onClick={() => setActiveHeroIndex(i)}
                aria-label={step.text}
              />
            ))}
          </div>

        </div>

        {/* ── Scroll hint ── */}
        <div className="scroll-hint">
          <span className="home-scroll-hint-text">Scroll to explore</span>
          <motion.div
            className="home-scroll-hint-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 2: THREE CORE ADVANTAGES
          源頭理解 / 細節品質 / 誠信透明
      ══════════════════════════════════════════════════════════════════ */}
      <section className="advantages-section">
        <div className="container">
          <FadeInSection className="home-advantages-header">
            <h2 className="home-advantages-title">三大核心優勢</h2>
            <p className="home-advantages-subtitle">
              從選材到施工，南源以三大核心堅持，為您打造安心穩定的裝修體驗。
            </p>
          </FadeInSection>

          <div className="row g-4 justify-content-center">
            {[
              {
                icon: <Trees size={32} className="home-advantage-icon-svg" />,
                title: '源頭理解',
                desc: '擁有深厚的木材與材料背景，從源頭精準理解各種材料的物理特性與適用性，為您的空間挑選最合適、最耐用的高品質用料。',
              },
              {
                icon: <ShieldCheck size={32} className="home-advantage-icon-svg" />,
                title: '細節品質',
                desc: '在每一項施工環節皆設立嚴格的檢核點，尤其是防水、木作與油漆工程，我們堅持多次逐項驗收，不放過任何影響居住安全的微小細節。',
              },
              {
                icon: <ClipboardCheck size={32} className="home-advantage-icon-svg" />,
                title: '誠信透明',
                desc: '提供完全透明、逐項列出的工程報價單，簽約金額即為最終造價，絕不惡意追加任何隱藏預算；施工過程全程記錄，讓您住得安心、放心。',
              },
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <FadeInSection delay={i * 0.15}>
                  <div className="home-advantage-card">
                    <div className="home-advantage-icon-wrap">
                      {item.icon}
                    </div>
                    <h3 className="home-advantage-card-title">{item.title}</h3>
                    <p className="home-advantage-card-desc">{item.desc}</p>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 3: SIX PROCESS STEPS (Alternating Layout)
          ──────────────────────────────────────────────────────────────
          Left-side images: process-01.jpg ~ process-06.jpg
          If any image fails to load → auto-fallback to inline SVG
          warm brown gradient placeholder. Zero broken images.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-process-section">
        <div className="container">
          <FadeInSection className="home-process-header">
            <p className="home-process-eyebrow">NANYUAN TIMBER</p>
            <h2 className="home-process-title">六大職人服務流程</h2>
            <p className="home-process-subtitle">
              Bespoke Process — From Concept to Flawless Execution
            </p>
          </FadeInSection>

          <div className="home-process-steps">
            {PROCESS_STEPS.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <FadeInSection
                  key={step.id}
                  className={`home-process-step ${isEven ? 'home-process-step--reverse' : ''}`}
                >
                  <div className="home-process-step-img-wrap">
                    <ProcessImage
                      src={step.img}
                      alt={`南源木材 ${step.title} 服務流程`}
                      stepId={step.id}
                    />
                    <span className="home-process-step-num-bg">{step.id}</span>
                  </div>

                  <div className="home-process-step-text">
                    <span className="home-process-step-num">{step.id}</span>
                    <h3 className="home-process-step-title">{step.title}</h3>
                    <p className="home-process-step-en">{step.en}</p>
                    <p className="home-process-step-desc">{step.desc}</p>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 4: RENDER vs REALITY COMPARISON
          ──────────────────────────────────────────────────────────────
          Left:  設計模擬圖 / RENDER  → compare-render.jpg
          Right: 實景完工照 / REALITY → compare-reality.jpg
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-ba-section">
        <div className="container">
          <FadeInSection>
            <h2 className="home-ba-title">設計與落地的真實對照</h2>
            <p className="home-ba-desc">
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證 3D 設計模擬圖與實景完工照的精準對照。
            </p>
          </FadeInSection>
        </div>
        <RenderRealitySlider />
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 5: PORTFOLIO WALL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-portfolio-section">
        <div className="container">
          <FadeInSection className="home-portfolio-header">
            <h2 className="home-portfolio-title">極精選作品</h2>
            <p className="home-portfolio-subtitle">點擊探索每一個空間的完整故事。</p>
          </FadeInSection>
          <div className="row g-4">
            {portfolioItems.map((item, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <FadeInSection delay={i * 0.08}>
                  <motion.div
                    className="home-portfolio-card"
                    whileHover={{ y: -6 }}
                    onClick={() => navigate('/projects')}
                  >
                    <div className="home-portfolio-card-inner">
                      <img
                        src={item.img}
                        className="home-portfolio-card-img"
                        alt={`南源木材作品案例 ${item.title} — ${item.type}`}
                      />
                      <div className="home-portfolio-card-gradient" />
                      <div className="home-portfolio-card-info">
                        <span className="home-portfolio-card-type">{item.type}</span>
                        <h3 className="home-portfolio-card-name">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 6: GLOBAL CTA — 全站唯一公共預約引導組件
          ──────────────────────────────────────────────────────────────
          引入自 src/components/CTA/CTA.tsx（第一步建立的公共完全體）。
          此為全站統一預約入口，嚴禁在此處另寫任何 inline CTA 區塊。
      ══════════════════════════════════════════════════════════════════ */}
      <CTA />


    </motion.div>
  );
};

export default Home;
