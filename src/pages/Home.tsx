import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTA from '../components/CTA/CTA';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════
   ASSET IMPORTS — Curated Real Project Photography
   ─────────────────────────────────────────────────────────────
   Hand-picked from src/assets/ for maximum visual impact.
   Absolutely NO AI-generated or external placeholder URLs.
═══════════════════════════════════════════════════════════════ */
import heroSlide01 from '../assets/home-hero-material.jpg';
import heroSlide02 from '../assets/home-hero-craft.jpg';
import heroSlide03 from '../assets/home-hero-transparency.jpg';
import heroSlide04 from '../assets/home-hero-realization.jpg';
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';
import portfolio01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import portfolio02 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import portfolio03 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';
import portfolio04 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import portfolio05 from '../assets/LINE_ALBUM_2026.6.17_260621_1.jpg';
import portfolio06 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';


/* ═══════════════════════════════════════════════════════════════
   DATA: FOUR B2C ADVANTAGE CARDS
═══════════════════════════════════════════════════════════════ */
interface Advantage {
  num:     string;
  titleZh: string;
  titleEn: string;
  desc:    string;
  bg:      string;
}

const ADVANTAGES: Advantage[] = [
  { num: '01', titleZh: '嚴選頂級建材', titleEn: 'PREMIUM ECO-MATERIALS', desc: '採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。每一塊木料皆可溯源產地認證。', bg: heroSlide01 },
  { num: '02', titleZh: '精細職人工藝', titleEn: 'ARTISAN PRECISION',     desc: '三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。匠心鑄就傳世品質。', bg: heroSlide02 },
  { num: '03', titleZh: '透明報價零隱藏', titleEn: 'TOTAL TRANSPARENCY',   desc: '報價單逐項逐料透明列出，白紙黑字簽約承諾——工程中絕不惡意追加任何費用。',          bg: heroSlide03 },
  { num: '04', titleZh: '一條龍完美成家', titleEn: 'TURNKEY DREAM HOME',   desc: '從高精度 3D 設計模擬圖到自有工班落地施工，現場總監全程控管，讓您輕鬆入住夢想家。',  bg: heroSlide04 },
];


/* ═══════════════════════════════════════════════════════════════
   DATA: SIX PROCESS STEPS
═══════════════════════════════════════════════════════════════ */
interface ProcessStep {
  id: string; title: string; en: string; desc: string; img: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  { id: '01', title: '初步諮詢', en: 'BESPOKE CONSULTATION',   desc: '傾聽您對場域的無限想像。南源專業顧問為您勾勒核心改造方向，結合生活動線與預算，開展客製化空間設計藍圖。', img: process01 },
  { id: '02', title: '現場勘測', en: 'PRECISION SITE SURVEY',  desc: '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷結構、採光與管線，確保設計基礎完備。',     img: process02 },
  { id: '03', title: '設計提案', en: 'CONCEPT & SPACE DESIGN', desc: '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現居住夢想的精品品味。',     img: process03 },
  { id: '04', title: '工程合約', en: 'TRANSPARENT AGREEMENT',  desc: '堅持誠信透明。條列化報價單，明確品牌、數量與單價。確立施工查核點與進度表，簽署正式合約絕無隱藏追加。', img: process04 },
  { id: '05', title: '精湛施工', en: 'MASTER CRAFTSMANSHIP',   desc: '自有專業工班、現場總監全程監督。遵循嚴格防水測試與防塵木作封邊規範，將設計圖面精準落地。',           img: process05 },
  { id: '06', title: '完工驗收', en: 'PERFECT HANDOVER',       desc: '高規格品質交叉檢驗。管線壓力測試、漆面側光打磨及試水驗收。家具軟裝完美定位，交付傳世的健康空間。',   img: process06 },
];


/* ═══════════════════════════════════════════════════════════════
   DATA: PORTFOLIO SHOWCASE
═══════════════════════════════════════════════════════════════ */
const PORTFOLIO_ITEMS = [
  { img: portfolio01, title: '木光雅居', type: '全屋統包' },
  { img: portfolio02, title: '奢韻臥室', type: '主臥設計' },
  { img: portfolio03, title: '原木廚域', type: '廚房木作' },
  { img: portfolio04, title: '迎賓大廳', type: '公設工程' },
  { img: portfolio05, title: '雲杉寢閣', type: '系統收納' },
  { img: portfolio06, title: '織錦牆面', type: '繃布壁飾' },
];


/* ═══════════════════════════════════════════════════════════════
   UTILITY: SCROLL-REVEAL WRAPPER
═══════════════════════════════════════════════════════════════ */
const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   RENDER vs REALITY COMPARISON SLIDER
   ─────────────────────────────────────────────────────────────
   Dynamic clipPath + left applied via refs (zero inline style).
═══════════════════════════════════════════════════════════════ */
const ComparisonSlider: React.FC = () => {
  const boxRef     = useRef<HTMLDivElement>(null);
  const renderRef  = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const apply = useCallback((pct: number) => {
    if (renderRef.current)  renderRef.current.style.clipPath = `polygon(0 0,${pct}% 0,${pct}% 100%,0 100%)`;
    if (dividerRef.current) dividerRef.current.style.left    = `${pct}%`;
  }, []);

  useEffect(() => { apply(50); }, [apply]);

  const move = (cx: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    apply(Math.max(5, Math.min(95, ((cx - r.left) / r.width) * 100)));
  };

  return (
    <FadeIn>
      <div ref={boxRef} className="home-ba-box"
        onMouseMove={e => { if (e.buttons === 1) move(e.clientX); }}
        onTouchMove={e => move(e.touches[0].clientX)}
        onMouseDown={e => move(e.clientX)}
      >
        <div className="home-ba-layer"><img src={compareReality} alt="實景完工照" className="home-ba-img" /><span className="home-ba-label home-ba-label--r">REALITY</span></div>
        <div ref={renderRef} className="home-ba-layer home-ba-clip"><img src={compareRender} alt="設計模擬圖" className="home-ba-img" /><span className="home-ba-label home-ba-label--l">RENDER</span></div>
        <div ref={dividerRef} className="home-ba-divider"><div className="home-ba-knob"><span className="home-ba-arrows">⟨⟩</span></div></div>
      </div>
    </FadeIn>
  );
};


/* ═══════════════════════════════════════════════════════════════
   HOME PAGE — Cinematic Door Preloader
   ─────────────────────────────────────────────────────────────
   States:
     isIntro   — true on mount; preloader visible
     isOpening — door animation in progress
     isReady   — main content unlocked

   ALL visual transforms are CSS-driven via className toggles.
   The TSX only manages state booleans.
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  const [isIntro, setIsIntro]     = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isReady, setIsReady]     = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Trigger door opening ── */
  const openDoor = useCallback(() => {
    if (isOpening || isReady) return;
    setIsOpening(true);
    /* After CSS animation finishes (~1.6s), retire preloader */
    setTimeout(() => {
      setIsIntro(false);
      setIsReady(true);
    }, 1600);
  }, [isOpening, isReady]);

  /* ── Click anywhere or scroll to enter ── */
  useEffect(() => {
    const onWheel = () => openDoor();
    const onClick = () => openDoor();
    if (isIntro && !isOpening) {
      window.addEventListener('wheel', onWheel, { passive: true, once: true });
      window.addEventListener('touchmove', onWheel, { passive: true, once: true });
      window.addEventListener('click', onClick, { once: true });
    }
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onWheel);
      window.removeEventListener('click', onClick);
    };
  }, [isIntro, isOpening, openDoor]);

  /* ── Lock body scroll during intro ── */
  useEffect(() => {
    document.body.style.overflow = isIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isIntro]);

  /* ── Advantage rotation: single 4s interval ── */
  useEffect(() => {
    if (!isReady) return;
    const iv = setInterval(() => setActiveIdx(p => (p + 1) % ADVANTAGES.length), 4000);
    return () => clearInterval(iv);
  }, [isReady]);

  /* ── Apply background images to hero layers via DOM ── */
  useEffect(() => {
    ADVANTAGES.forEach((adv, i) => {
      const el = document.querySelector(`[data-adv-bg="${i}"]`) as HTMLElement | null;
      if (el) el.style.backgroundImage = `url('${adv.bg}')`;
    });
  }, [isReady]);

  return (
    <div className="home-page">

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 0 : CINEMATIC DOOR PRELOADER
      ═══════════════════════════════════════════════════════════ */}
      {isIntro && (
        <div className={`cinema ${isOpening ? 'cinema--opening' : ''}`}>

          {/* Gold light burst behind door crack */}
          <div className="cinema-burst" />

          {/* The gate frame + two doors */}
          <div className="cinema-gate">
            <div className="cinema-door cinema-door--left" />
            <div className="cinema-door cinema-door--right" />
          </div>

          {/* Brand text — centered inside the gate */}
          <div className="cinema-brand">
            <span className="cinema-brand-zh">南源木材</span>
            <span className="cinema-brand-divider" />
            <span className="cinema-brand-en">NANYUAN TIMBER DESIGN</span>
          </div>

          {/* Enter prompt */}
          <p className={`cinema-prompt ${isOpening ? 'cinema-prompt--hidden' : ''}`}>
            SCROLL OR CLICK TO ENTER SPACE
          </p>
        </div>
      )}


      {/* ═══════════════════════════════════════════════════════════
          BLOCK 1 : HERO ADVANTAGE THEATRE — 100vh
      ═══════════════════════════════════════════════════════════ */}
      <section className={`home-hero ${isReady ? 'home-hero--visible' : ''}`}>

        {/* Background layers */}
        {ADVANTAGES.map((adv, i) => (
          <div key={adv.num} className={`home-hero-bg ${i === activeIdx ? 'home-hero-bg--active' : ''}`} data-adv-bg={i} />
        ))}
        <div className="home-hero-overlay" />
        <div className="home-hero-vignette" />

        {/* Geometric grid frame */}
        <div className="home-grid-frame">
          <div className="home-grid-corner home-grid-corner--tl" />
          <div className="home-grid-corner home-grid-corner--tr" />
          <div className="home-grid-corner home-grid-corner--bl" />
          <div className="home-grid-corner home-grid-corner--br" />
        </div>

        {/* Crosshair */}
        <div className={`home-crosshair ${activeIdx % 2 === 0 ? 'home-crosshair--a' : 'home-crosshair--b'}`}>
          <div className="home-xh home-xh--h" />
          <div className="home-xh home-xh--v" />
          <div className="home-xh-dot" />
        </div>

        {/* Hero content */}
        <div className="home-hero-content">
          <div className="home-hero-eyebrow">
            <span className="home-hero-eline" />
            <span className="home-hero-etext">NANYUAN TIMBER DESIGN</span>
            <span className="home-hero-eline" />
          </div>

          <div className="home-hero-deck">
            {/* Giant number */}
            <div className="home-hero-numbox">
              {ADVANTAGES.map((a, i) => (
                <span key={a.num} className={`home-hero-num ${i === activeIdx ? 'home-hero-num--on' : ''}`}>{a.num}</span>
              ))}
            </div>

            {/* Text slides */}
            <div className="home-hero-textbox">
              {ADVANTAGES.map((a, i) => (
                <div key={a.num} className={`home-hero-slide ${i === activeIdx ? 'home-hero-slide--on' : ''}`}>
                  <h2 className="home-hero-h2">{a.titleZh}</h2>
                  <p className="home-hero-en">{a.titleEn}</p>
                  <div className="home-hero-wire" />
                  <p className="home-hero-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-hero-actions">
            <button className="home-hero-btn home-hero-btn--gold" onClick={() => navigate('/contact')}>立即預約諮詢 ➜</button>
            <button className="home-hero-btn home-hero-btn--ghost" onClick={() => document.querySelector('.home-process')?.scrollIntoView({ behavior: 'smooth' })}>探索南源工藝</button>
          </div>

          <div className="home-hero-dots">
            {ADVANTAGES.map((a, i) => (
              <button key={a.num} className={`home-hero-dot ${i === activeIdx ? 'home-hero-dot--on' : ''}`} onClick={() => setActiveIdx(i)} aria-label={a.titleZh} />
            ))}
          </div>
        </div>

        <div className="home-scroll-cue">
          <span className="home-scroll-cue-text">SCROLL</span>
          <motion.span className="home-scroll-cue-arrow" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          BLOCK 2 : SIX PROCESS STEPS
      ═══════════════════════════════════════════════════════════ */}
      <section className="home-process">
        <div className="container">
          <FadeIn className="home-process-hdr">
            <p className="home-process-eye">NANYUAN TIMBER</p>
            <h2 className="home-process-h2">六大職人服務流程</h2>
            <p className="home-process-sub">Bespoke Process — From Concept to Flawless Execution</p>
          </FadeIn>
          <div className="home-process-grid">
            {PROCESS_STEPS.map((s, i) => (
              <FadeIn key={s.id} className={`home-process-row ${i % 2 === 1 ? 'home-process-row--rev' : ''}`}>
                <div className="home-process-imgbox">
                  <img src={s.img} alt={`南源木材 ${s.title}`} className="home-process-img" />
                  <span className="home-process-watermark">{s.id}</span>
                </div>
                <div className="home-process-info">
                  <span className="home-process-num">{s.id}</span>
                  <h3 className="home-process-h3">{s.title}</h3>
                  <p className="home-process-en">{s.en}</p>
                  <p className="home-process-p">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          BLOCK 3 : RENDER vs REALITY
      ═══════════════════════════════════════════════════════════ */}
      <section className="home-compare">
        <div className="container">
          <FadeIn>
            <h2 className="home-compare-h2">設計與落地的真實對照</h2>
            <p className="home-compare-p">許多裝修最怕「設計圖好看，實際卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證精準對照。</p>
          </FadeIn>
        </div>
        <ComparisonSlider />
      </section>


      {/* ═══════════════════════════════════════════════════════════
          BLOCK 4 : PORTFOLIO WALL
      ═══════════════════════════════════════════════════════════ */}
      <section className="home-folio">
        <div className="container">
          <FadeIn className="home-folio-hdr">
            <h2 className="home-folio-h2">極精選作品</h2>
            <p className="home-folio-sub">點擊探索每一個空間的完整故事。</p>
          </FadeIn>
          <div className="row g-4">
            {PORTFOLIO_ITEMS.map((it, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <FadeIn delay={i * 0.08}>
                  <motion.div className="home-folio-card" whileHover={{ y: -6 }} onClick={() => navigate('/projects')}>
                    <div className="home-folio-inner">
                      <img src={it.img} alt={`南源木材作品 ${it.title}`} className="home-folio-img" />
                      <div className="home-folio-grad" />
                      <div className="home-folio-meta">
                        <span className="home-folio-type">{it.type}</span>
                        <h3 className="home-folio-name">{it.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          BLOCK 5 : GLOBAL CTA — zero duplication
      ═══════════════════════════════════════════════════════════ */}
      <CTA />

    </div>
  );
};

export default Home;
