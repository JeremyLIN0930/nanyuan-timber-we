import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════
   ASSET IMPORTS
═══════════════════════════════════════════════════════════════ */

/* Hero / Advantage backgrounds */
import heroMaterial     from '../assets/home-hero-material.jpg';
import heroCraft        from '../assets/home-hero-craft.jpg';
import heroTransparency from '../assets/home-hero-transparency.jpg';
import heroRealization  from '../assets/home-hero-realization.jpg';

/* Comparison slider */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* Process steps 01–06 */
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';

/* Portfolio real project photos */
import realPhoto01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import realPhoto02 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import realPhoto03 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';
import realPhoto04 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import realPhoto05 from '../assets/LINE_ALBUM_2026.6.17_260621_1.jpg';
import realPhoto06 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';


/* ═══════════════════════════════════════════════════════════════
   DATA: FOUR CINEMATIC ADVANTAGE SLIDES
   ─────────────────────────────────────────────────────────────
   Single source of truth for the hero cinematic deck.
   Each entry simultaneously drives:
     • The fullscreen background image (cross-fade via opacity)
     • The giant left-side geometric number (.luxury-number)
     • The right-side Chinese / English headline + description

   All bound to the same activeIndex state variable, updated by
   a single setInterval(4000). Zero desync guaranteed.
═══════════════════════════════════════════════════════════════ */
interface AdvantageSlide {
  num:     string;
  titleZh: string;
  titleEn: string;
  desc:    string;
  bg:      string;
}

const ADVANTAGES: AdvantageSlide[] = [
  {
    num:     '01',
    titleZh: '嚴選頂級建材',
    titleEn: 'PREMIUM ECO-MATERIALS',
    desc:    '採用 F1/F2 低甲醛環保綠建材，從源頭為健康把關。',
    bg:      heroMaterial,
  },
  {
    num:     '02',
    titleZh: '精細職人工藝',
    titleEn: 'ARTISAN PRECISION',
    desc:    '三十年高級木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。',
    bg:      heroCraft,
  },
  {
    num:     '03',
    titleZh: '透明報價零隱藏',
    titleEn: 'TOTAL TRANSPARENCY',
    desc:    '報價單逐項逐料透明列出，白紙黑字簽約承諾工程中絕不惡意追加。',
    bg:      heroTransparency,
  },
  {
    num:     '04',
    titleZh: '一條龍完美成家',
    titleEn: 'TURNKEY DREAM HOME',
    desc:    '從高精度 3D 設計模擬圖到自有工班落地，現場總監全程控管直接入住。',
    bg:      heroRealization,
  },
];


/* ═══════════════════════════════════════════════════════════════
   DATA: SIX PROCESS STEPS
═══════════════════════════════════════════════════════════════ */
interface ProcessStep {
  id:    string;
  title: string;
  en:    string;
  desc:  string;
  img:   string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id:    '01',
    title: '初步諮詢',
    en:    'BESPOKE CONSULTATION',
    desc:  '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。',
    img:   process01,
  },
  {
    id:    '02',
    title: '現場勘測',
    en:    'PRECISION SITE SURVEY',
    desc:  '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。',
    img:   process02,
  },
  {
    id:    '03',
    title: '設計提案',
    en:    'CONCEPT & SPACE DESIGN',
    desc:  '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現每一個居住夢想的精品品味。',
    img:   process03,
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點與工程進度，簽署正式工程合約，絕無隱藏追加。',
    img:   process04,
  },
  {
    id:    '05',
    title: '精湛施工',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。',
    img:   process05,
  },
  {
    id:    '06',
    title: '完工驗收',
    en:    'PERFECT HANDOVER',
    desc:  '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。',
    img:   process06,
  },
];


/* ═══════════════════════════════════════════════════════════════
   DATA: PORTFOLIO SHOWCASE
═══════════════════════════════════════════════════════════════ */
interface PortfolioItem {
  img:   string;
  title: string;
  type:  string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { img: realPhoto01, title: '木光雅居', type: '全屋統包' },
  { img: realPhoto02, title: '奢韻臥室', type: '主臥設計' },
  { img: realPhoto03, title: '原木廚域', type: '廚房木作' },
  { img: realPhoto04, title: '迎賓大廳', type: '公設工程' },
  { img: realPhoto05, title: '雲杉寢閣', type: '系統收納' },
  { img: realPhoto06, title: '織錦牆面', type: '繃布壁飾' },
];


/* ═══════════════════════════════════════════════════════════════
   UTILITY: SCROLL-REVEAL WRAPPER (Intersection Observer)
═══════════════════════════════════════════════════════════════ */
const FadeInSection: React.FC<{
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref      = useRef<HTMLDivElement>(null);
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


/* ═══════════════════════════════════════════════════════════════
   UTILITY: PROCESS STEP IMAGE with SVG gradient fallback
   ─────────────────────────────────────────────────────────────
   If the image fails to load (onError), automatically renders
   an inline SVG warm brown gradient placeholder with the step
   number. Ensures zero broken images across all environments.
═══════════════════════════════════════════════════════════════ */
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


/* ═══════════════════════════════════════════════════════════════
   UTILITY: RENDER vs REALITY COMPARISON SLIDER
   ─────────────────────────────────────────────────────────────
   Left:  設計模擬圖 / RENDER  → compare-render.jpg
   Right: 實景完工照 / REALITY → compare-reality.jpg
═══════════════════════════════════════════════════════════════ */
const RenderRealitySlider: React.FC = () => {
  const [pos, setPos] = useState(50);
  const containerRef  = useRef<HTMLDivElement>(null);

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
   1. Intro Overlay          — 2.5s brand splash → scale micro-zoom
   2. Cinematic Advantage    — 100vh sticky deck, 4 auto-rotating slides
   3. Six Process Steps      — Alternating image-text layout
   4. Render vs Reality      — Interactive comparison slider
   5. Portfolio Wall         — 6-card grid → /projects
   (CTA handled globally by Footer.tsx — zero duplication)
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── Intro overlay state (brand splash) ── */
  const [isIntro, setIsIntro] = useState(true);

  /* ── Cinematic deck index — drives BOTH background + text ── */
  const [activeIndex, setActiveIndex] = useState(0);

  /* ══════════════════════════════════════════════════════════
     INTRO: auto-dismiss after 2.5 seconds
     CSS transition on the overlay handles the fade-out with
     scale(1.02) → scale(1) micro-zoom sinking effect.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  /* ══════════════════════════════════════════════════════════
     HERO ROTATION — Single setInterval, 4-second cycle
     ──────────────────────────────────────────────────────
     Both text and background are bound to the SAME activeIndex.
     Updated in a single setState call. Zero desync guaranteed.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % ADVANTAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ── Scroll to process section ── */
  const scrollToProcess = () => {
    document.querySelector('.home-process-section')?.scrollIntoView({ behavior: 'smooth' });
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
          BLOCK 0: INTRO OVERLAY — Brand Splash (first 2.5 seconds)
          ──────────────────────────────────────────────────────────────
          Centre-screen glow: 南源木材｜NANYUAN TIMBER DESIGN
          Accompanies a scale(1.02) → scale(1) micro-zoom sinking feel.
          After 2.5s → CSS transition fades out, main content unlocks.
      ══════════════════════════════════════════════════════════════════ */}
      <div className={`home-intro-overlay ${!isIntro ? 'home-intro-overlay--hidden' : ''}`}>
        <div className="home-intro-line" />
        <h1 className="home-intro-brand-zh">南源木材</h1>
        <p className="home-intro-brand-en">NANYUAN TIMBER DESIGN</p>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1: CINEMATIC ADVANTAGE DECK — 100vh Sticky Theatre
          ──────────────────────────────────────────────────────────────
          Full-viewport immersive hero with 4 auto-rotating slides.
          Left:  Giant gold geometric number (.luxury-number)
          Right: Chinese title + English subtitle + description
          Background: Dual-layer cross-fade (opacity 0.6s) + scale(1.05→1)
          Driven by a single setInterval(4000) → zero desync.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-hero-section">

        {/* ── 4 Background layers — cross-fade via activeIndex ── */}
        {ADVANTAGES.map((adv, i) => (
          <div
            key={`hero-bg-${adv.num}`}
            className={`home-hero-bg-layer ${i === activeIndex ? 'home-hero-bg-layer--active' : ''}`}
            style={{ backgroundImage: `url('${adv.bg}')` }}
          />
        ))}

        {/* ── Dark overlay ── */}
        <div className="home-hero-bg-overlay" />

        {/* ── Radial vignette ── */}
        <div className="home-hero-vignette" />

        {/* ── Cinematic deck content — split layout ── */}
        <div className="home-hero-content">

          {/* ── Eyebrow ornament ── */}
          <div className="home-hero-eyebrow">
            <div className="home-hero-eyebrow-line" />
            <span className="home-hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
            <div className="home-hero-eyebrow-line" />
          </div>

          {/* ── Cinematic deck: giant number (left) + text (right) ── */}
          <div className="home-hero-deck">

            {/* Left column: Giant geometric gold number */}
            <div className="home-hero-number-col">
              {ADVANTAGES.map((adv, i) => (
                <span
                  key={`num-${adv.num}`}
                  className={`luxury-number ${i === activeIndex ? 'luxury-number--active' : ''}`}
                >
                  {adv.num}
                </span>
              ))}
            </div>

            {/* Right column: Advantage text */}
            <div className="home-hero-text-col">
              {ADVANTAGES.map((adv, i) => (
                <div
                  key={`slide-${adv.num}`}
                  className={`home-hero-slide ${i === activeIndex ? 'home-hero-slide--active' : ''}`}
                >
                  <h2 className="home-hero-title-zh">{adv.titleZh}</h2>
                  <p className="home-hero-title-en">{adv.titleEn}</p>
                  <div className="home-hero-title-wire" />
                  <p className="home-hero-desc">{adv.desc}</p>
                </div>
              ))}
            </div>

          </div>

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
              onClick={scrollToProcess}
            >
              探索南源工藝
            </button>
          </div>

          {/* ── Progress indicator dots ── */}
          <div className="home-hero-dots">
            {ADVANTAGES.map((adv, i) => (
              <button
                key={`dot-${adv.num}`}
                className={`home-hero-dot ${i === activeIndex ? 'home-hero-dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={adv.titleZh}
              />
            ))}
          </div>

        </div>

        {/* ── Scroll hint ── */}
        <div className="scroll-hint">
          <span className="home-scroll-hint-text">SCROLL</span>
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
          BLOCK 2: SIX PROCESS STEPS (Alternating Layout)
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
          BLOCK 3: RENDER vs REALITY COMPARISON
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
          BLOCK 4: PORTFOLIO WALL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-portfolio-section">
        <div className="container">
          <FadeInSection className="home-portfolio-header">
            <h2 className="home-portfolio-title">極精選作品</h2>
            <p className="home-portfolio-subtitle">點擊探索每一個空間的完整故事。</p>
          </FadeInSection>
          <div className="row g-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
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


    </motion.div>
  );
};

export default Home;
