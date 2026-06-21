import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CTA from '../components/CTA/CTA';
import './Home.css';

/* ─────────────────────────────────────────────────────────────
   HERO IMAGES — 4 dedicated shots, one per advantage
───────────────────────────────────────────────────────────── */
import img01 from '../assets/home-hero-material.jpg';
import img02 from '../assets/home-hero-craft.jpg';
import img03 from '../assets/home-hero-transparency.jpg';
import img04 from '../assets/home-hero-realization.jpg';

/* ─────────────────────────────────────────────────────────────
   SUPPORTING IMAGES
───────────────────────────────────────────────────────────── */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';
import port01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import port02 from '../assets/LINE_ALBUM_2026.6.17_260621_50.jpg';
import port03 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import port04 from '../assets/LINE_ALBUM_2026.6.17_260621_40.jpg';
import port05 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import port06 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';

/* ─────────────────────────────────────────────────────────────
   DATA — FOUR B2C ADVANTAGES
   Each maps to one hero background image.
───────────────────────────────────────────────────────────── */
const ADVANTAGES = [
  {
    num:  '01',
    zh:   '嚴選頂級建材',
    en:   'PREMIUM ECO-MATERIALS',
    desc: '採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。每一塊木料皆可溯源產地認證。',
    img:  img01,
  },
  {
    num:  '02',
    zh:   '精細職人工藝',
    en:   'ARTISAN PRECISION',
    desc: '三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。匠心鑄就每一個傳世細節。',
    img:  img02,
  },
  {
    num:  '03',
    zh:   '透明報價零隱藏',
    en:   'TOTAL TRANSPARENCY',
    desc: '報價單逐項逐料公開透明，白紙黑字簽約承諾——工程中絕不惡意追加任何費用，安心施工。',
    img:  img03,
  },
  {
    num:  '04',
    zh:   '一條龍完美成家',
    en:   'TURNKEY DREAM HOME',
    desc: '從高精度 3D 設計模擬到自有工班落地，現場總監全程監督控管，讓您輕鬆入住夢想居所。',
    img:  img04,
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   DATA — SIX PROCESS STEPS
───────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    id:   '01',
    zh:   '初步諮詢',
    en:   'BESPOKE CONSULTATION',
    desc: '傾聽您的居住想像與生活需求。南源專業顧問為您建構客製化空間藍圖，融合動線美學與精準預算規劃。',
    img:  process01,
  },
  {
    id:   '02',
    zh:   '現場勘測',
    en:   'PRECISION SITE SURVEY',
    desc: '職人團隊親赴現場，使用高階雷射儀器記錄三維尺度，深度診斷結構、採光與管線，奠定設計基礎。',
    img:  process02,
  },
  {
    id:   '03',
    zh:   '設計提案',
    en:   'CONCEPT & SPACE DESIGN',
    desc: '將創意化為立體空間意境。提供客製化格局圖、職人木料選配與立面視覺效果，呈現精品居住藍圖。',
    img:  process03,
  },
  {
    id:   '04',
    zh:   '工程合約',
    en:   'TRANSPARENT AGREEMENT',
    desc: '條列化報價單逐項明確，品牌數量與單價清晰標示。確立施工查核點，簽署合約絕無任何隱藏追加費用。',
    img:  process04,
  },
  {
    id:   '05',
    zh:   '精湛施工',
    en:   'MASTER CRAFTSMANSHIP',
    desc: '自有專業工班、現場總監全程監督。嚴格遵循防水測試與木作封邊規範，將設計圖面精準落地實現。',
    img:  process05,
  },
  {
    id:   '06',
    zh:   '完工驗收',
    en:   'PERFECT HANDOVER',
    desc: '高規格品質交叉驗收。管線壓力測試、漆面側光打磨，家具軟裝精準定位清潔，交付傳世健康生活空間。',
    img:  process06,
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   DATA — PORTFOLIO ITEMS
───────────────────────────────────────────────────────────── */
const PORTFOLIO = [
  { img: port01, zh: '木光雅居', type: '全屋統包' },
  { img: port02, zh: '禪意客廳', type: '客廳設計' },
  { img: port03, zh: '奢韻臥室', type: '主臥設計' },
  { img: port04, zh: '原木書房', type: '書房木作' },
  { img: port05, zh: '織錦牆面', type: '繃布壁飾' },
  { img: port06, zh: '原木廚域', type: '廚房木作' },
] as const;

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — IntersectionObserver, no inline styles
   CSS class .fadein → .fadein--visible controls the animation.
   data-delay attribute is read by CSS transition-delay rules.
───────────────────────────────────────────────────────────── */
const FadeIn: React.FC<{
  children:   React.ReactNode;
  className?: string;
  delay?:     string;
}> = ({ children, className = '', delay }) => {
  const ref              = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fadein${visible ? ' fadein--visible' : ''}${className ? ' ' + className : ''}`}
      data-delay={delay}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   COMPARISON SLIDER
   All positioning and clip-path are mutated directly on DOM
   refs to avoid any inline style on initial render.
   The CSS classes define the static structural rules.
───────────────────────────────────────────────────────────── */
const ComparisonSlider: React.FC = () => {
  const boxRef     = useRef<HTMLDivElement>(null);
  const clipRef    = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const applyPos = (pct: number) => {
    const p = Math.max(5, Math.min(95, pct));
    if (clipRef.current)    clipRef.current.style.clipPath = `polygon(0 0,${p}% 0,${p}% 100%,0 100%)`;
    if (dividerRef.current) dividerRef.current.style.left  = `${p}%`;
  };

  useEffect(() => {
    applyPos(50);
  }, []);

  const onX = (cx: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    applyPos(((cx - r.left) / r.width) * 100);
  };

  return (
    <FadeIn>
      <div
        ref={boxRef}
        className="cmp-box"
        onMouseDown={e => onX(e.clientX)}
        onMouseMove={e => { if (e.buttons === 1) onX(e.clientX); }}
        onTouchStart={e => onX(e.touches[0].clientX)}
        onTouchMove={e  => onX(e.touches[0].clientX)}
      >
        {/* Reality layer — always behind */}
        <div className="cmp-layer cmp-layer--reality">
          <img src={compareReality} alt="南源木材 實景完工照" className="cmp-img" />
          <span className="cmp-badge cmp-badge--r">REALITY</span>
        </div>

        {/* Render layer — clipped from left */}
        <div ref={clipRef} className="cmp-layer cmp-layer--render">
          <img src={compareRender} alt="南源木材 設計模擬圖" className="cmp-img" />
          <span className="cmp-badge cmp-badge--l">RENDER</span>
        </div>

        {/* Divider handle */}
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
   HOME COMPONENT
   ─────────────────────────────────────────────────────────────
   PRELOADER LIFECYCLE (zero inline styles, zero style tags):

     0ms      DOM is painted. .intro-viewport is unconditionally
              rendered. CSS @keyframes drives the gold glow on
              first frame — no animation-delay. Text is visible
              at t=0.

     2500ms   setIntroExiting(true) → .intro-viewport gets the
              .intro-viewport--exit class → CSS transition
              opacity:0 + scale(1.06) dissolves the curtain.

     3500ms   setIntroMounted(false) → element removed from DOM.
              No scroll lock was ever applied. Page scrolls freely
              from the very first frame.

   HERO LIFECYCLE:
     setInterval every 4000ms → increments activeIdx (0→1→2→3→0).
     CSS classes .hero-bg--active / .hero-num--active /
     .hero-slide--active drive all visual transitions.
     No buttons. No dot indicators. Pure cinematic cycling.
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── Preloader state ── */
  const [introMounted,  setIntroMounted]  = useState(true);
  const [introExiting,  setIntroExiting]  = useState(false);

  /* ── Hero slide index ── */
  const [activeIdx, setActiveIdx] = useState(0);

  /* ─────────────────────────────────────────────────────────
     PRELOADER TIMERS
     t1 @ 2500ms: add exit class → CSS curtain dissolve begins
     t2 @ 3500ms: remove from DOM → scroll chain fully clear
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroExiting(true),  2500);
    const t2 = setTimeout(() => setIntroMounted(false), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ─────────────────────────────────────────────────────────
     HERO AUTO-CYCLE
     Advances activeIdx every 4 seconds.
     Wraps around: 0 → 1 → 2 → 3 → 0 → …
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % ADVANTAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">

      {/* ════════════════════════════════════════════════════
          BRAND PRELOADER CURTAIN
          ─────────────────────────────────────────────────
          Unconditional render: no JS conditionals block the
          first paint. The element is mounted immediately.

          Classes:
            .intro-viewport          → base (visible, fixed, z:9999)
            .intro-viewport--exit    → triggers CSS dissolve

          ZERO inline styles.
          ZERO style tags.
          CSS @keyframes drives the gold logo glow from t=0.
      ════════════════════════════════════════════════════ */}
      {introMounted && (
        <div
          className={
            introExiting
              ? 'intro-viewport intro-viewport--exit'
              : 'intro-viewport'
          }
          aria-hidden="true"
        >
          <div className="intro-logo">
            <h1 className="intro-logo-zh">南源木材</h1>
            <p  className="intro-logo-en">NANYUAN TIMBER DESIGN</p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          HERO — 100vh full-viewport, auto-cycling slides
          ─────────────────────────────────────────────────
          Structure:
            .hero-section          → 100vh container
              .hero-bg[--active]   → crossfading background imgs
              .hero-overlay        → dark gradient (top→bottom)
              .hero-vignette       → radial vignette
              .hero-frame          → bracket corner accents
              .hero-content        → centred content deck
                .hero-eyebrow      → tiny NANYUAN label
                .hero-deck         → number + text side by side
                  .hero-numbox     → absolute-stacked numbers
                  .hero-textbox    → absolute-stacked text cards
              .hero-scroll-cue     → SCROLL ↓ bottom
      ════════════════════════════════════════════════════ */}
      <section className="hero-section">

        {/* Background images — cinematic opacity crossfade */}
        {ADVANTAGES.map((adv, i) => (
          <div
            key={adv.num}
            className={i === activeIdx ? 'hero-bg hero-bg--active' : 'hero-bg'}
          >
            <img
              src={adv.img}
              alt={`南源木材 ${adv.zh}`}
              className="hero-bg-img"
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Radial vignette */}
        <div className="hero-vignette" />

        {/* Bracket frame corners */}
        <div className="hero-frame">
          <div className="hero-corner hero-corner--tl" />
          <div className="hero-corner hero-corner--tr" />
          <div className="hero-corner hero-corner--bl" />
          <div className="hero-corner hero-corner--br" />
        </div>

        {/* Content deck — eyebrow + number + text */}
        <div className="hero-content">

          {/* Eyebrow label */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
            <span className="hero-eyebrow-line" />
          </div>

          {/* Deck: left number | right text cards */}
          <div className="hero-deck">

            {/* Left: stacked giant geometric numbers */}
            <div className="hero-numbox">
              {ADVANTAGES.map((adv, i) => (
                <span
                  key={adv.num}
                  className={
                    i === activeIdx
                      ? 'hero-num hero-num--active'
                      : 'hero-num'
                  }
                >
                  {adv.num}
                </span>
              ))}
            </div>

            {/* Right: stacked B2C text cards */}
            <div className="hero-textbox">
              {ADVANTAGES.map((adv, i) => (
                <div
                  key={adv.num}
                  className={
                    i === activeIdx
                      ? 'hero-slide hero-slide--active'
                      : 'hero-slide'
                  }
                >
                  <h2 className="hero-slide-zh">{adv.zh}</h2>
                  <p  className="hero-slide-en">{adv.en}</p>
                  <div className="hero-slide-wire" />
                  <p  className="hero-slide-desc">{adv.desc}</p>
                </div>
              ))}
            </div>

          </div>
          {/* END hero-deck */}

        </div>
        {/* END hero-content */}

        {/* Scroll cue — bottom centre */}
        <div className="hero-scroll-cue">
          <span className="hero-scroll-label">SCROLL</span>
          <span className="hero-scroll-arrow">↓</span>
        </div>

      </section>
      {/* END hero-section */}


      {/* ════════════════════════════════════════════════════
          SIX-STEP PROCESS
          Alternating left/right image + text grid.
          Odd-indexed rows get .home-step--rev for RTL flip.
      ════════════════════════════════════════════════════ */}
      <section className="home-process">
        <div className="container">

          <FadeIn className="home-section-hdr">
            <p  className="home-eye">NANYUAN TIMBER</p>
            <h2 className="home-section-h">六大職人服務流程</h2>
            <p  className="home-section-sub">Bespoke Process — From Concept to Flawless Execution</p>
          </FadeIn>

          {PROCESS_STEPS.map((s, i) => (
            <FadeIn
              key={s.id}
              className={i % 2 === 1 ? 'home-step home-step--rev' : 'home-step'}
            >
              {/* Image block */}
              <div className="home-step-imgbox">
                <img
                  src={s.img}
                  alt={`南源木材 ${s.zh}`}
                  className="home-step-img"
                />
                <span className="home-step-num-bg">{s.id}</span>
              </div>

              {/* Text block */}
              <div className="home-step-info">
                <span className="home-step-num">{s.id}</span>
                <h3   className="home-step-zh">{s.zh}</h3>
                <p    className="home-step-en">{s.en}</p>
                <p    className="home-step-desc">{s.desc}</p>
              </div>
            </FadeIn>
          ))}

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          RENDER vs REALITY COMPARISON SLIDER
      ════════════════════════════════════════════════════ */}
      <section className="home-compare">
        <div className="container">
          <FadeIn>
            <h2 className="home-section-h">設計與落地的真實對照</h2>
            <p  className="home-compare-p">
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重把關，確保所見即所得。請拖曳滑桿親手驗證。
            </p>
          </FadeIn>
        </div>

        <ComparisonSlider />
      </section>


      {/* ════════════════════════════════════════════════════
          PORTFOLIO GRID  — 6 items, 3-col desktop / 2-col tablet / 1-col mobile
      ════════════════════════════════════════════════════ */}
      <section className="home-folio">
        <div className="container">

          <FadeIn className="home-section-hdr home-folio-hdr">
            <h2 className="home-section-h">極精選作品</h2>
            <p  className="home-section-sub">點擊探索每一個空間的完整故事。</p>
          </FadeIn>

          <div className="home-folio-grid">
            {PORTFOLIO.map((it, i) => (
              <FadeIn key={i} delay={`${i * 80}ms`}>
                <div
                  className="home-card"
                  onClick={() => navigate('/projects')}
                  role="button"
                  tabIndex={0}
                  aria-label={`查看作品：${it.zh}`}
                  onKeyDown={e => { if (e.key === 'Enter') navigate('/projects'); }}
                >
                  <div className="home-card-inner">
                    <img
                      src={it.img}
                      alt={`南源木材 ${it.zh}`}
                      className="home-card-img"
                    />
                    <div className="home-card-grad" />
                    <div className="home-card-meta">
                      <span className="home-card-type">{it.type}</span>
                      <h3   className="home-card-name">{it.zh}</h3>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          GLOBAL CTA — single instance, shared component
      ════════════════════════════════════════════════════ */}
      <CTA />

    </div>
  );
};

export default Home;
