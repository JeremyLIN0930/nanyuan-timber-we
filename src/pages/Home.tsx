import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTA from '../components/CTA/CTA';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════
   ASSET IMPORTS — Real project photography from src/assets/
   NO external URLs. All images verified to exist locally.
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
   DATA — B2C Advantage Slides (4 slides × 4 seconds each)
═══════════════════════════════════════════════════════════════ */
const ADVANTAGES = [
  { num: '01', zh: '嚴選頂級建材', en: 'PREMIUM ECO-MATERIALS', desc: '採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。每一塊木料皆可溯源產地認證。',       bg: heroSlide01 },
  { num: '02', zh: '精細職人工藝', en: 'ARTISAN PRECISION',     desc: '三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。匠心鑄就每一個傳世細節。', bg: heroSlide02 },
  { num: '03', zh: '透明報價零隱藏', en: 'TOTAL TRANSPARENCY',   desc: '報價單逐項逐料公開透明，白紙黑字簽約承諾——工程中絕不惡意追加任何費用，安心施工。',   bg: heroSlide03 },
  { num: '04', zh: '一條龍完美成家', en: 'TURNKEY DREAM HOME',   desc: '從高精度 3D 設計模擬到自有工班落地，現場總監全程監督控管，讓您輕鬆入住夢想居所。',   bg: heroSlide04 },
] as const;

const PROCESS_STEPS = [
  { id: '01', zh: '初步諮詢', en: 'BESPOKE CONSULTATION',   desc: '傾聽您的居住想像與生活需求。南源專業顧問為您建構客製化空間藍圖，融合動線美學與精準預算規劃。', img: process01 },
  { id: '02', zh: '現場勘測', en: 'PRECISION SITE SURVEY',  desc: '職人團隊親赴現場，使用高階雷射儀器記錄三維尺度，深度診斷結構、採光與管線，奠定設計基礎。',   img: process02 },
  { id: '03', zh: '設計提案', en: 'CONCEPT & SPACE DESIGN', desc: '將創意化為立體空間意境。提供客製化格局圖、職人木料選配與立面視覺效果，呈現精品居住藍圖。',   img: process03 },
  { id: '04', zh: '工程合約', en: 'TRANSPARENT AGREEMENT',  desc: '條列化報價單逐項明確，品牌數量與單價清晰標示。確立施工查核點，簽署合約絕無任何隱藏追加費用。', img: process04 },
  { id: '05', zh: '精湛施工', en: 'MASTER CRAFTSMANSHIP',   desc: '自有專業工班、現場總監全程監督。嚴格遵循防水測試與木作封邊規範，將設計圖面精準落地實現。',   img: process05 },
  { id: '06', zh: '完工驗收', en: 'PERFECT HANDOVER',       desc: '高規格品質交叉驗收。管線壓力測試、漆面側光打磨，家具軟裝精準定位清潔，交付傳世健康生活空間。', img: process06 },
] as const;

const PORTFOLIO = [
  { img: portfolio01, zh: '木光雅居', type: '全屋統包' },
  { img: portfolio02, zh: '奢韻臥室', type: '主臥設計' },
  { img: portfolio03, zh: '原木廚域', type: '廚房木作' },
  { img: portfolio04, zh: '迎賓大廳', type: '公設工程' },
  { img: portfolio05, zh: '雲杉寢閣', type: '系統收納' },
  { img: portfolio06, zh: '織錦牆面', type: '繃布壁飾' },
] as const;


/* ═══════════════════════════════════════════════════════════════
   SCROLL-REVEAL WRAPPER
═══════════════════════════════════════════════════════════════ */
const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children, className = '', delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   COMPARISON SLIDER
   Dynamic clipPath + left position applied via refs only.
   Zero style={{ }} in JSX.
═══════════════════════════════════════════════════════════════ */
const ComparisonSlider: React.FC = () => {
  const boxRef     = useRef<HTMLDivElement>(null);
  const clipRef    = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const applyPos = useCallback((pct: number) => {
    const p = Math.max(5, Math.min(95, pct));
    if (clipRef.current)    clipRef.current.style.clipPath = `polygon(0 0,${p}% 0,${p}% 100%,0 100%)`;
    if (dividerRef.current) dividerRef.current.style.left  = `${p}%`;
  }, []);

  useEffect(() => { applyPos(50); }, [applyPos]);

  const handleX = (cx: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    applyPos(((cx - r.left) / r.width) * 100);
  };

  return (
    <FadeIn>
      <div
        ref={boxRef}
        className="cmp-box"
        onMouseDown={e => handleX(e.clientX)}
        onMouseMove={e => { if (e.buttons === 1) handleX(e.clientX); }}
        onTouchMove={e => handleX(e.touches[0].clientX)}
        onTouchStart={e => handleX(e.touches[0].clientX)}
      >
        <div className="cmp-layer cmp-layer--reality">
          <img src={compareReality} alt="實景完工照" className="cmp-img" />
          <span className="cmp-tag cmp-tag--r">REALITY</span>
        </div>
        <div ref={clipRef} className="cmp-layer cmp-layer--render">
          <img src={compareRender} alt="設計模擬圖" className="cmp-img" />
          <span className="cmp-tag cmp-tag--l">RENDER</span>
        </div>
        <div ref={dividerRef} className="cmp-divider">
          <div className="cmp-knob">
            <span className="cmp-arrows">⟨⟩</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};


/* ═══════════════════════════════════════════════════════════════
   HOME — MAIN COMPONENT
   ─────────────────────────────────────────────────────────────
   STATE MACHINE (drives className toggles — CSS does all visuals)

   isOpening=false, isReady=false  →  STAGE 0: Preloader waiting
   isOpening=true,  isReady=false  →  STAGE 1: Door animation running
   isOpening=true,  isReady=true   →  STAGE 2: Main content visible

   className cascades on the outermost .cinema div:
     (nothing)          → doors closed, brand text visible
     .cinema--opening   → CSS triggers rotateY + scale + burst

   className on .home-hero:
     (nothing)          → opacity 0, translateY(40px)
     .home-hero--on     → opacity 1, translateY(0)
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── 3-state lifecycle ── */
  const [isOpening, setIsOpening] = useState(false);
  const [isReady,   setIsReady]   = useState(false);
  const [showGate,  setShowGate]  = useState(true);

  /* ── Hero slide index ── */
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Ref for bg layers (background images applied via DOM) ── */
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ══════════════════════════════════════════════════════════
     STAGE 0 → 1: Fire opening sequence
     One-shot: once triggered, clear all listeners.
  ══════════════════════════════════════════════════════════ */
  const openDoor = useCallback(() => {
    if (isOpening || isReady) return;

    /* Step A: Apply .cinema--opening → CSS takes over */
    setIsOpening(true);

    /* Step B: After 1600ms animation completes, unlock main content */
    setTimeout(() => {
      setIsReady(true);
      /* Step C: Fade out gate 400ms after content appears */
      setTimeout(() => setShowGate(false), 400);
    }, 1600);
  }, [isOpening, isReady]);

  /* ── Attach wheel/click once ── */
  useEffect(() => {
    if (isOpening) return;
    const handler = () => openDoor();
    window.addEventListener('wheel',     handler, { passive: true, once: true });
    window.addEventListener('click',     handler, { once: true });
    window.addEventListener('touchstart',handler, { passive: true, once: true });
    return () => {
      window.removeEventListener('wheel',     handler);
      window.removeEventListener('click',     handler);
      window.removeEventListener('touchstart',handler);
    };
  }, [isOpening, openDoor]);

  /* ── Lock body scroll while gate is showing ── */
  useEffect(() => {
    document.body.style.overflow = showGate ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showGate]);

  /* ── Advantage rotation — starts after gate is gone ── */
  useEffect(() => {
    if (!isReady) return;
    const iv = setInterval(() => setActiveIdx(p => (p + 1) % ADVANTAGES.length), 4000);
    return () => clearInterval(iv);
  }, [isReady]);

  /* ── Apply background images to hero bg layers via DOM (zero inline style) ── */
  useEffect(() => {
    bgRefs.current.forEach((el, i) => {
      if (el) el.style.backgroundImage = `url('${ADVANTAGES[i].bg}')`;
    });
  }, []);

  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════════════════════
          STAGE 0/1 : CINEMATIC GATE PRELOADER
          ─────────────────────────────────────────────────────────
          .cinema               = gate closed (default)
          .cinema--opening      = CSS animations fire (door swing + zoom)
          showGate===false      = unmount from DOM entirely
      ══════════════════════════════════════════════════════════ */}
      {showGate && (
        <div className={`cinema${isOpening ? ' cinema--opening' : ''}`}>

          {/* ── Layer 1: Background room depth (receding dark) ── */}
          <div className="cinema-room" />

          {/* ── Layer 2: Gold light burst through door crack ── */}
          <div className="cinema-burst" />

          {/* ── Layer 3: Architectural gate + two door panels ──
                The perspective-3d wrapper that zooms into nothing
          ── */}
          <div className="cinema-gate-wrap">
            <div className="cinema-gate">

              {/* Structural lintel (top beam) */}
              <div className="cinema-lintel" />

              {/* Left door panel */}
              <div className="cinema-door cinema-door--left">
                <div className="cinema-door-panel cinema-door-panel--top" />
                <div className="cinema-door-panel cinema-door-panel--bot" />
              </div>

              {/* Door gap highlight */}
              <div className="cinema-door-gap" />

              {/* Right door panel */}
              <div className="cinema-door cinema-door--right">
                <div className="cinema-door-panel cinema-door-panel--top" />
                <div className="cinema-door-panel cinema-door-panel--bot" />
              </div>

              {/* Floor sill */}
              <div className="cinema-sill" />
            </div>
          </div>

          {/* ── Layer 4: Brand identity centered over the gate ── */}
          <div className="cinema-brand">
            <span className="cinema-brand-zh">南源木材</span>
            <span className="cinema-brand-sep" />
            <span className="cinema-brand-en">NANYUAN TIMBER DESIGN</span>
          </div>

          {/* ── Layer 5: Enter prompt (pulse until click) ── */}
          <p className={`cinema-cue${isOpening ? ' cinema-cue--hidden' : ''}`}>
            ◇ &nbsp; SCROLL OR CLICK TO ENTER &nbsp; ◇
          </p>

        </div>
      )}


      {/* ══════════════════════════════════════════════════════════
          STAGE 2 : MAIN CONTENT
          Slide up from translateY(40px) once isReady fires.
      ══════════════════════════════════════════════════════════ */}
      <div className={`home-body${isReady ? ' home-body--on' : ''}`}>

        {/* ── HERO ADVANTAGE THEATRE — 100vh ── */}
        <section className="home-hero">

          {/* Fullscreen background layers — Ken Burns cross-fade */}
          {ADVANTAGES.map((adv, i) => (
            <div
              key={adv.num}
              ref={el => { bgRefs.current[i] = el; }}
              className={`home-bg${i === activeIdx ? ' home-bg--on' : ''}`}
            />
          ))}

          {/* Overlays */}
          <div className="home-overlay" />
          <div className="home-vignette" />

          {/* Geometric bracket frame */}
          <div className="home-frame">
            <div className="home-corner home-corner--tl" />
            <div className="home-corner home-corner--tr" />
            <div className="home-corner home-corner--bl" />
            <div className="home-corner home-corner--br" />
          </div>

          {/* Center crosshair — breathes on each slide change */}
          <div className={`home-xhair home-xhair--${activeIdx % 2 === 0 ? 'a' : 'b'}`}>
            <span className="home-xhair-h" />
            <span className="home-xhair-v" />
            <span className="home-xhair-dot" />
          </div>

          {/* Hero content block */}
          <div className="home-hero-inner">

            <div className="home-eyebrow">
              <span className="home-eyebrow-line" />
              <span className="home-eyebrow-text">NANYUAN TIMBER DESIGN</span>
              <span className="home-eyebrow-line" />
            </div>

            {/* Giant number + text deck */}
            <div className="home-deck">
              {/* Left: huge slide number */}
              <div className="home-numbox">
                {ADVANTAGES.map((a, i) => (
                  <span key={a.num} className={`home-num${i === activeIdx ? ' home-num--on' : ''}`}>
                    {a.num}
                  </span>
                ))}
              </div>

              {/* Right: text slides */}
              <div className="home-textbox">
                {ADVANTAGES.map((a, i) => (
                  <div key={a.num} className={`home-slide${i === activeIdx ? ' home-slide--on' : ''}`}>
                    <h2 className="home-slide-zh">{a.zh}</h2>
                    <p  className="home-slide-en">{a.en}</p>
                    <div className="home-slide-wire" />
                    <p  className="home-slide-desc">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="home-actions">
              <button className="home-btn home-btn--gold"  onClick={() => navigate('/contact')}>立即預約諮詢 ➜</button>
              <button className="home-btn home-btn--ghost" onClick={() => document.querySelector('.home-process')?.scrollIntoView({ behavior: 'smooth' })}>探索南源工藝</button>
            </div>

            {/* Progress dots */}
            <div className="home-dots">
              {ADVANTAGES.map((a, i) => (
                <button
                  key={a.num}
                  className={`home-dot${i === activeIdx ? ' home-dot--on' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={a.zh}
                />
              ))}
            </div>

          </div>

          {/* Scroll cue */}
          <div className="home-scroll-cue">
            <span className="home-scroll-text">SCROLL</span>
            <motion.span className="home-scroll-arrow" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
          </div>

        </section>


        {/* ── PROCESS STEPS ── */}
        <section className="home-process">
          <div className="container">
            <FadeIn className="home-process-hdr">
              <p className="home-process-eye">NANYUAN TIMBER</p>
              <h2 className="home-process-h">六大職人服務流程</h2>
              <p className="home-process-sub">Bespoke Process — From Concept to Flawless Execution</p>
            </FadeIn>
            {PROCESS_STEPS.map((s, i) => (
              <FadeIn key={s.id} className={`home-step${i % 2 === 1 ? ' home-step--rev' : ''}`}>
                <div className="home-step-imgbox">
                  <img src={s.img} alt={`南源木材 ${s.zh}`} className="home-step-img" />
                  <span className="home-step-watermark">{s.id}</span>
                </div>
                <div className="home-step-info">
                  <span className="home-step-num">{s.id}</span>
                  <h3 className="home-step-h">{s.zh}</h3>
                  <p  className="home-step-en">{s.en}</p>
                  <p  className="home-step-p">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* ── RENDER vs REALITY ── */}
        <section className="home-compare">
          <div className="container">
            <FadeIn>
              <h2 className="home-compare-h">設計與落地的真實對照</h2>
              <p className="home-compare-p">許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重把關，確保所見即所得。請左右拖曳滑桿，親手驗證精準差距。</p>
            </FadeIn>
          </div>
          <ComparisonSlider />
        </section>


        {/* ── PORTFOLIO WALL ── */}
        <section className="home-folio">
          <div className="container">
            <FadeIn className="home-folio-hdr">
              <h2 className="home-folio-h">極精選作品</h2>
              <p className="home-folio-sub">點擊探索每一個空間的完整故事。</p>
            </FadeIn>
            <div className="row g-4">
              {PORTFOLIO.map((it, i) => (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                  <FadeIn delay={i * 0.08}>
                    <motion.div className="home-card" whileHover={{ y: -6 }} onClick={() => navigate('/projects')}>
                      <div className="home-card-inner">
                        <img src={it.img} alt={`南源木材作品 ${it.zh}`} className="home-card-img" />
                        <div className="home-card-grad" />
                        <div className="home-card-meta">
                          <span className="home-card-type">{it.type}</span>
                          <h3 className="home-card-name">{it.zh}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── GLOBAL CTA — zero duplication ── */}
        <CTA />

      </div>{/* end .home-body */}

    </div>
  );
};

export default Home;
