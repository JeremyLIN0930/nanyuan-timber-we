import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTA from '../components/CTA/CTA';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════
   ASSET IMPORTS — Curated Real Project Photography
   ─────────────────────────────────────────────────────────────
   Selected for maximum visual impact:
     heroSlide01 — Large-format material/timber close-up
     heroSlide02 — Artisan at work / precision craftsmanship
     heroSlide03 — Clean transparent office / handover moment
     heroSlide04 — Finished luxury living room / turnkey home
═══════════════════════════════════════════════════════════════ */
import heroSlide01 from '../assets/home-hero-material.jpg';
import heroSlide02 from '../assets/home-hero-craft.jpg';
import heroSlide03 from '../assets/home-hero-transparency.jpg';
import heroSlide04 from '../assets/home-hero-realization.jpg';

/* Comparison slider */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* Process steps 01 – 06 */
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';

/* Portfolio showcase — hand-picked best angles */
import portfolio01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import portfolio02 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import portfolio03 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';
import portfolio04 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import portfolio05 from '../assets/LINE_ALBUM_2026.6.17_260621_1.jpg';
import portfolio06 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';


/* ═══════════════════════════════════════════════════════════════
   DATA: FOUR B2C ADVANTAGE SLIDES
   ─────────────────────────────────────────────────────────────
   Single source of truth. Each entry simultaneously drives:
     • The fullscreen background image (cross-fade via opacity)
     • The giant geometric number (left column)
     • The headline / description (right column)
     • The crosshair breathing animation intensity
   All bound to the SAME activeIndex state, updated by ONE
   setInterval(4000). Zero desync guaranteed.
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
    desc:    '採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。',
    bg:      heroSlide01,
  },
  {
    num:     '02',
    titleZh: '精細職人工藝',
    titleEn: 'ARTISAN PRECISION',
    desc:    '三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。',
    bg:      heroSlide02,
  },
  {
    num:     '03',
    titleZh: '透明報價零隱藏',
    titleEn: 'TOTAL TRANSPARENCY',
    desc:    '報價單逐項逐料透明列出，白紙黑字簽約承諾工程中絕不惡意追加。',
    bg:      heroSlide03,
  },
  {
    num:     '04',
    titleZh: '一條龍完美成家',
    titleEn: 'TURNKEY DREAM HOME',
    desc:    '從高精度 3D 設計模擬圖到自有工班落地，現場總監全程控管直接入住。',
    bg:      heroSlide04,
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
  { id: '01', title: '初步諮詢', en: 'BESPOKE CONSULTATION', desc: '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。', img: process01 },
  { id: '02', title: '現場勘測', en: 'PRECISION SITE SURVEY', desc: '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。', img: process02 },
  { id: '03', title: '設計提案', en: 'CONCEPT & SPACE DESIGN', desc: '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現每一個居住夢想的精品品味。', img: process03 },
  { id: '04', title: '工程合約', en: 'TRANSPARENT AGREEMENT', desc: '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點與工程進度，簽署正式工程合約，絕無隱藏追加。', img: process04 },
  { id: '05', title: '精湛施工', en: 'MASTER CRAFTSMANSHIP', desc: '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。', img: process05 },
  { id: '06', title: '完工驗收', en: 'PERFECT HANDOVER', desc: '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。', img: process06 },
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
  { img: portfolio01, title: '木光雅居', type: '全屋統包' },
  { img: portfolio02, title: '奢韻臥室', type: '主臥設計' },
  { img: portfolio03, title: '原木廚域', type: '廚房木作' },
  { img: portfolio04, title: '迎賓大廳', type: '公設工程' },
  { img: portfolio05, title: '雲杉寢閣', type: '系統收納' },
  { img: portfolio06, title: '織錦牆面', type: '繃布壁飾' },
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
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
═══════════════════════════════════════════════════════════════ */
const RenderRealitySlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderRef    = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  const applyPos = (pct: number) => {
    if (renderRef.current)  renderRef.current.style.clipPath = `polygon(0 0,${pct}% 0,${pct}% 100%,0 100%)`;
    if (dividerRef.current) dividerRef.current.style.left    = `${pct}%`;
  };

  /* Initialize at 50% */
  useEffect(() => { applyPos(50); }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    applyPos(pct);
  };

  return (
    <FadeInSection>
      <div
        ref={containerRef}
        className="home-ba-container"
        onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
        onTouchMove={e => handleMove(e.touches[0].clientX)}
        onMouseDown={e => handleMove(e.clientX)}
      >
        {/* Reality (right/background) */}
        <div className="home-ba-layer home-ba-reality">
          <img src={compareReality} alt="實景完工照" className="home-ba-img" />
          <span className="home-ba-tag home-ba-tag--right">實景完工照 / REALITY</span>
        </div>

        {/* Render (left/clipped) */}
        <div ref={renderRef} className="home-ba-layer home-ba-render">
          <img src={compareRender} alt="設計模擬圖" className="home-ba-img" />
          <span className="home-ba-tag home-ba-tag--left">設計模擬圖 / RENDER</span>
        </div>

        {/* Divider */}
        <div ref={dividerRef} className="home-ba-divider">
          <div className="home-ba-handle">
            <span className="home-ba-handle-icon">⟨⟩</span>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};


/* ═══════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ─────────────────────────────────────────────────────────────
   Architecture:
   0. Intro Overlay          — 2.5s brand splash
   1. Geometric Grid Theatre — 100vh sticky deck, 4 slides
   2. Six Process Steps      — Alternating image-text layout
   3. Render vs Reality      — Interactive comparison slider
   4. Portfolio Wall         — 6-card grid → /projects
   5. CTA                    — Global footer CTA (zero duplication)
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── Intro overlay state (brand splash) ── */
  const [isIntro, setIsIntro] = useState(true);

  /* ── Cinematic deck index ── */
  const [activeIndex, setActiveIndex] = useState(0);


  /* ══════════════════════════════════════════════════════════
     INTRO: auto-dismiss after 2.5 seconds
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  /* ══════════════════════════════════════════════════════════
     HERO ROTATION — Single setInterval, 4-second cycle
     Both text and background bound to SAME activeIndex.
     Updated in ONE setState call. Zero desync guaranteed.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % ADVANTAGES.length);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  /* ── Apply background images to hero layers via DOM (zero inline styles) ── */
  useEffect(() => {
    ADVANTAGES.forEach((adv, i) => {
      const el = document.querySelector(`[data-bg-idx="${i}"]`) as HTMLElement | null;
      if (el) el.style.backgroundImage = `url('${adv.bg}')`;
    });
  }, []);

  /* ── Scroll to content ── */
  const scrollToContent = () => {
    document.querySelector('.home-process-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* ══════════════════════════════════════════════════════════════
          BLOCK 0: INTRO OVERLAY
      ══════════════════════════════════════════════════════════════ */}
      <div className={`home-intro ${!isIntro ? 'home-intro--hidden' : ''}`}>
        <div className="home-intro-wire" />
        <h1 className="home-intro-zh">南源木材</h1>
        <p className="home-intro-en">NANYUAN TIMBER DESIGN</p>
      </div>


      {/* ══════════════════════════════════════════════════════════════
          BLOCK 1: GEOMETRIC GRID THEATRE — 100vh
      ══════════════════════════════════════════════════════════════ */}
      <section className="home-hero">

        {/* ── Background layers — cross-fade + Ken Burns ── */}
        {ADVANTAGES.map((adv, i) => (
          <div
            key={`bg-${adv.num}`}
            className={`home-hero-bg ${i === activeIndex ? 'home-hero-bg--active' : ''}`}
            data-bg-idx={i}
          />
        ))}

        {/* ── Dark cinematic overlay ── */}
        <div className="home-hero-overlay" />

        {/* ── Radial vignette ── */}
        <div className="home-hero-vignette" />

        {/* ══ GEOMETRIC GRID FRAME ══
            Pure CSS decorative layer — bracket corners + fine lines
        ══════════════════════════════════════════════════════════ */}
        <div className="home-grid-frame">
          <div className="home-grid-corner home-grid-corner--tl" />
          <div className="home-grid-corner home-grid-corner--tr" />
          <div className="home-grid-corner home-grid-corner--bl" />
          <div className="home-grid-corner home-grid-corner--br" />
          <div className="home-grid-line home-grid-line--h" />
          <div className="home-grid-line home-grid-line--v" />
        </div>

        {/* ══ CENTER CROSSHAIR ══
            Breathing micro-animation synced to activeIndex
        ══════════════════════════════════════════════════════════ */}
        <div className={`home-crosshair ${activeIndex % 2 === 0 ? 'home-crosshair--pulse-a' : 'home-crosshair--pulse-b'}`}>
          <div className="home-crosshair-h" />
          <div className="home-crosshair-v" />
          <div className="home-crosshair-dot" />
        </div>

        {/* ── Hero content ── */}
        <div className="home-hero-content">

          {/* Eyebrow */}
          <div className="home-hero-eyebrow">
            <span className="home-hero-eyebrow-line" />
            <span className="home-hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
            <span className="home-hero-eyebrow-line" />
          </div>

          {/* ── Cinematic Deck: Giant Number (left) + Text (right) ── */}
          <div className="home-hero-deck">
            <div className="home-hero-num-col">
              {ADVANTAGES.map((adv, i) => (
                <span
                  key={`n-${adv.num}`}
                  className={`home-hero-num ${i === activeIndex ? 'home-hero-num--active' : ''}`}
                >
                  {adv.num}
                </span>
              ))}
            </div>

            <div className="home-hero-text-col">
              {ADVANTAGES.map((adv, i) => (
                <div
                  key={`t-${adv.num}`}
                  className={`home-hero-slide ${i === activeIndex ? 'home-hero-slide--active' : ''}`}
                >
                  <h2 className="home-hero-title">{adv.titleZh}</h2>
                  <p className="home-hero-subtitle">{adv.titleEn}</p>
                  <div className="home-hero-wire" />
                  <p className="home-hero-desc">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="home-hero-btns">
            <button className="home-hero-btn home-hero-btn--gold" onClick={() => navigate('/contact')}>
              立即預約諮詢 ➜
            </button>
            <button className="home-hero-btn home-hero-btn--ghost" onClick={scrollToContent}>
              探索南源工藝
            </button>
          </div>

          {/* Dots */}
          <div className="home-hero-dots">
            {ADVANTAGES.map((adv, i) => (
              <button
                key={`d-${adv.num}`}
                className={`home-hero-dot ${i === activeIndex ? 'home-hero-dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={adv.titleZh}
              />
            ))}
          </div>

        </div>

        {/* Scroll hint */}
        <div className="home-scroll-hint">
          <span className="home-scroll-hint-label">SCROLL</span>
          <motion.span
            className="home-scroll-hint-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >↓</motion.span>
        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════
          BLOCK 2: SIX PROCESS STEPS
      ══════════════════════════════════════════════════════════════ */}
      <section className="home-process-section">
        <div className="container">
          <FadeInSection className="home-process-header">
            <p className="home-process-eyebrow">NANYUAN TIMBER</p>
            <h2 className="home-process-title">六大職人服務流程</h2>
            <p className="home-process-sub">Bespoke Process — From Concept to Flawless Execution</p>
          </FadeInSection>

          <div className="home-process-list">
            {PROCESS_STEPS.map((step, i) => (
              <FadeInSection
                key={step.id}
                className={`home-process-row ${i % 2 === 1 ? 'home-process-row--rev' : ''}`}
              >
                <div className="home-process-img-wrap">
                  <ProcessImage src={step.img} alt={`南源木材 ${step.title}`} stepId={step.id} />
                  <span className="home-process-img-num">{step.id}</span>
                </div>
                <div className="home-process-text">
                  <span className="home-process-num">{step.id}</span>
                  <h3 className="home-process-step-title">{step.title}</h3>
                  <p className="home-process-en">{step.en}</p>
                  <p className="home-process-desc">{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          BLOCK 3: RENDER vs REALITY
      ══════════════════════════════════════════════════════════════ */}
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


      {/* ══════════════════════════════════════════════════════════════
          BLOCK 4: PORTFOLIO WALL
      ══════════════════════════════════════════════════════════════ */}
      <section className="home-portfolio-section">
        <div className="container">
          <FadeInSection className="home-portfolio-header">
            <h2 className="home-portfolio-title">極精選作品</h2>
            <p className="home-portfolio-sub">點擊探索每一個空間的完整故事。</p>
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
                    <div className="home-portfolio-inner">
                      <img src={item.img} className="home-portfolio-img" alt={`南源木材作品 ${item.title}`} />
                      <div className="home-portfolio-gradient" />
                      <div className="home-portfolio-info">
                        <span className="home-portfolio-type">{item.type}</span>
                        <h3 className="home-portfolio-name">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          BLOCK 5: GLOBAL CTA — Zero duplication
      ══════════════════════════════════════════════════════════════ */}
      <CTA />

    </motion.div>
  );
};

export default Home;
