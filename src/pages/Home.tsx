import React, { useState, useEffect, useRef, useCallback } from 'react';
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
   DATA — B2C Advantage Matrix (4 slides × 100vh scroll each)
   ZERO auto-play. ZERO setInterval. Scroll-position-mapped only.
═══════════════════════════════════════════════════════════════ */
const ADVANTAGES = [
  { num: '01', zh: '嚴選頂級建材', en: 'PREMIUM ECO-MATERIALS', desc: '採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。每一塊木料皆可溯源產地認證。',       img: heroSlide01 },
  { num: '02', zh: '精細職人工藝', en: 'ARTISAN PRECISION',     desc: '三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。匠心鑄就每一個傳世細節。', img: heroSlide02 },
  { num: '03', zh: '透明報價零隱藏', en: 'TOTAL TRANSPARENCY',   desc: '報價單逐項逐料公開透明，白紙黑字簽約承諾——工程中絕不惡意追加任何費用，安心施工。',   img: heroSlide03 },
  { num: '04', zh: '一條龍完美成家', en: 'TURNKEY DREAM HOME',   desc: '從高精度 3D 設計模擬到自有工班落地，現場總監全程監督控管，讓您輕鬆入住夢想居所。',   img: heroSlide04 },
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
   SCROLL-REVEAL WRAPPER (IntersectionObserver, zero inline style)
═══════════════════════════════════════════════════════════════ */
const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({
  children, className = '', delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fadein ${visible ? 'fadein--visible' : ''} ${className}`}
      data-delay={delay || undefined}
    >
      {children}
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   COMPARISON SLIDER
   Dynamic clipPath + left applied via refs (zero inline style).
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
   ZERO JS STATE LOCKS. No isIntro, isOpening, curtainOpen.
   Page renders INSTANTLY.

   SCROLL-MAPPING ARCHITECTURE:
     .hero-scroll-container  → height: 400vh (CSS)
       .hero-sticky-stage    → position: sticky; top: 0; height: 100vh (CSS)

   Scroll listener:
     1. Get container rect via getBoundingClientRect()
     2. progress = clamp(-rect.top / (rect.height - innerHeight), 0, 0.99)
     3. activeIndex = floor(progress * 4)  →  0, 1, 2, 3
     4. Toggle className: .slide-active / .slide-passed
     5. CSS handles ALL visual transitions
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── activeIndex driven ONLY by scroll position ── */
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ══════════════════════════════════════════════════════════
     SCROLL-MAPPED INDEX — THE PRECISE MATH
     Container = 400vh. Scrollable depth = 400vh - 100vh = 300vh.
     progress = -rect.top / (rect.height - window.innerHeight)
     Clamped to [0, 0.99], then floor(progress * 4) → 0,1,2,3
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.99);
      const step = Math.floor(progress * 4);

      setActiveIdx(prev => (prev !== step ? step : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Derive per-slide state: 'upcoming', 'active', or 'passed' ── */
  const getSlideState = (i: number): string => {
    if (i < activeIdx) return 'slide-passed';
    if (i === activeIdx) return 'slide-active';
    return 'slide-upcoming';
  };


  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════════════════════
          PURE CSS INTRO VEIL — ceremonial overlay.
          Auto-fades via @keyframes. ZERO JS gating.
          Page always rendered underneath — no black screen ever.
      ══════════════════════════════════════════════════════════ */}
      <div className="intro-veil" aria-hidden="true">
        <div className="intro-veil-geo">
          <div className="intro-geo-roof" />
          <div className="intro-geo-body" />
          <div className="intro-geo-door" />
        </div>
        <div className="intro-veil-brand">
          <span className="intro-brand-zh">南源木材</span>
          <span className="intro-brand-sep" />
          <span className="intro-brand-en">NANYUAN TIMBER DESIGN</span>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════
          400vh SCROLL-ANCHORED HERO THEATRE
          ─────────────────────────────────────────────────────────
          Outer: hero-scroll-container (400vh)
          Inner: hero-sticky-stage (sticky top:0, 100vh)
          Scroll maps to activeIndex 0→3.
          User MUST scroll through all 4 to proceed past.
      ══════════════════════════════════════════════════════════ */}
      <div className="hero-scroll-container" ref={containerRef}>
        <div className="hero-sticky-stage">

          {/* Full-bleed background images */}
          {ADVANTAGES.map((adv, i) => (
            <div key={adv.num} className={`hero-bg ${getSlideState(i)}`}>
              <img src={adv.img} alt={`南源木材 ${adv.zh}`} className="hero-bg-img" />
            </div>
          ))}

          {/* Dark overlays */}
          <div className="hero-overlay" />
          <div className="hero-vignette" />

          {/* Geometric bracket frame — four corners [ ] */}
          <div className="hero-frame">
            <div className="hero-corner hero-corner--tl" />
            <div className="hero-corner hero-corner--tr" />
            <div className="hero-corner hero-corner--bl" />
            <div className="hero-corner hero-corner--br" />
          </div>

          {/* Center crosshair */}
          <div className={`hero-xhair hero-xhair--${activeIdx % 2 === 0 ? 'a' : 'b'}`}>
            <span className="hero-xhair-h" />
            <span className="hero-xhair-v" />
            <span className="hero-xhair-dot" />
          </div>

          {/* Hero content: left number + right text */}
          <div className="hero-content">

            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
              <span className="hero-eyebrow-line" />
            </div>

            <div className="hero-deck">
              {/* Left: giant geometric number */}
              <div className="hero-numbox">
                {ADVANTAGES.map((a, i) => (
                  <span key={a.num} className={`hero-num ${getSlideState(i)}`}>
                    {a.num}
                  </span>
                ))}
              </div>

              {/* Right: text cards — slide-in / slide-out */}
              <div className="hero-textbox">
                {ADVANTAGES.map((a, i) => (
                  <div key={a.num} className={`hero-slide ${getSlideState(i)}`}>
                    <h2 className="hero-slide-zh">{a.zh}</h2>
                    <p  className="hero-slide-en">{a.en}</p>
                    <div className="hero-slide-wire" />
                    <p  className="hero-slide-desc">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Scroll cue */}
          <div className="hero-scroll-cue">
            <span className="hero-scroll-text">SCROLL</span>
            <span className="hero-scroll-arrow">↓</span>
          </div>

        </div>
      </div>


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
          <div className="home-folio-grid">
            {PORTFOLIO.map((it, i) => (
              <FadeIn key={i} delay={`${i * 80}ms`}>
                <div className="home-card" onClick={() => navigate('/projects')}>
                  <div className="home-card-inner">
                    <img src={it.img} alt={`南源木材作品 ${it.zh}`} className="home-card-img" />
                    <div className="home-card-grad" />
                    <div className="home-card-meta">
                      <span className="home-card-type">{it.type}</span>
                      <h3 className="home-card-name">{it.zh}</h3>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ── GLOBAL CTA — single shared component ── */}
      <CTA />

    </div>
  );
};

export default Home;
