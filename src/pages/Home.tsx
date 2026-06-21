import React, { useState, useEffect, useRef } from 'react';

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
   COMPARISON IMAGES
───────────────────────────────────────────────────────────── */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* ─────────────────────────────────────────────────────────────
   DATA — FOUR B2C ADVANTAGES
   Index 0–3 maps directly to activeIndex 0–3.
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
   COMPARISON SLIDER
   All positioning mutated directly on DOM refs to avoid
   any inline style on initial render.
   clipRef.current.style.clipPath is a runtime mutation, not
   a declared inline prop — this is compliant.
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

  useEffect(() => { applyPos(50); }, []);

  const onX = (cx: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    applyPos(((cx - r.left) / r.width) * 100);
  };

  return (
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

      {/* Render layer — clipped left portion */}
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
  );
};

/* ═══════════════════════════════════════════════════════════════
   HOME COMPONENT
   ─────────────────────────────────────────────────────────────
   PRELOADER LIFECYCLE:
     0ms      DOM painted. .brand-intro-viewport unconditionally
              rendered. @keyframes fires on first frame — no delay.
     2500ms   setIntroExiting(true) → .brand-intro-viewport--exit
              → CSS dissolve begins.
     3500ms   setIntroMounted(false) → removed from DOM.
              Scroll chain is NEVER locked.

   SCROLL THEATRE LIFECYCLE:
     .hero-scroll-container  height: 400vh  creates scroll track.
     .hero-sticky-stage      position: sticky; top: 0; height: 100vh
                             stays glued while user scrolls through 4×100vh.

     SCROLL MATH (RAF loop):
       rect    = containerRef.current.getBoundingClientRect()
       raw     = -rect.top / (rect.height - window.innerHeight)
       clamped = Math.max(0, Math.min(0.9999, raw))
       index   = Math.floor(clamped * 4)   → 0 | 1 | 2 | 3

     SLIDE CSS STATE MACHINE (3 states per card):
       past   (.slide--past)    translateX(-100%)  ← scrolled past
       active (.slide--active)  translateX(0)      ← current
       future (no modifier)     translateX(100%)   ← not yet reached
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {


  /* ── Preloader states ── */
  const [introMounted,  setIntroMounted]  = useState(true);
  const [introExiting,  setIntroExiting]  = useState(false);

  /* ── Scroll theatre: which advantage is active ── */
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Ref to the 400vh scroll container ── */
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── RAF ref (to cancel on unmount) ── */
  const rafRef = useRef<number>(0);

  /* ─────────────────────────────────────────────────────────
     PRELOADER TIMERS
     t1 @ 2500ms → CSS curtain dissolve
     t2 @ 3500ms → remove from DOM
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroExiting(true),  2500);
    const t2 = setTimeout(() => setIntroMounted(false), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ─────────────────────────────────────────────────────────
     SCROLL THEATRE — RAF LOOP
     Reads containerRef.getBoundingClientRect().top every frame.
     Applies the progress → index formula.
     Writes only to React state (setActiveIndex) — no DOM mutation.
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      if (containerRef.current) {
        const rect     = containerRef.current.getBoundingClientRect();
        const trackLen = rect.height - window.innerHeight;

        if (trackLen > 0) {
          /*
            PRECISE MAPPING FORMULA (spec):
              raw     = -rect.top / trackLen
              clamped = clamp(raw, 0, 0.9999)
              index   = Math.floor(clamped * 4) → 0 | 1 | 2 | 3
          */
          const raw     = -rect.top / trackLen;
          const clamped = Math.max(0, Math.min(0.9999, raw));
          const index   = Math.floor(clamped * 4);

          setActiveIndex(prev => (prev !== index ? index : prev));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Helper: derive CSS class for each slide ── */
  const slideClass = (i: number): string => {
    if (i < activeIndex)  return 'hero-slide hero-slide--past';
    if (i === activeIndex) return 'hero-slide hero-slide--active';
    return 'hero-slide';
  };

  const numClass = (i: number): string => {
    if (i < activeIndex)  return 'hero-num hero-num--past';
    if (i === activeIndex) return 'hero-num hero-num--active';
    return 'hero-num';
  };

  const bgClass = (i: number): string => {
    if (i === activeIndex) return 'hero-bg hero-bg--active';
    return 'hero-bg';
  };

  return (
    <div className="home-page">

      {/* ════════════════════════════════════════════════════
          BRAND PRELOADER CURTAIN
          ─────────────────────────────────────────────────
          Unconditionally rendered — no JS gate blocks paint.
          .brand-intro-viewport          → base (fixed, z:9999)
          .brand-intro-viewport--exit    → CSS dissolve at 2500ms
          ZERO inline styles.
      ════════════════════════════════════════════════════ */}
      {introMounted && (
        <div
          className={
            introExiting
              ? 'brand-intro-viewport brand-intro-viewport--exit'
              : 'brand-intro-viewport'
          }
          aria-hidden="true"
        >
          <div className="brand-intro-logo">
            <h1 className="brand-intro-zh">南源木材</h1>
            <p  className="brand-intro-en">NANYUAN TIMBER DESIGN</p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          SCROLL THEATRE — 400vh container + sticky stage
          ─────────────────────────────────────────────────
          .hero-scroll-container   height: 400vh; position: relative
            Creates the scroll track. The browser needs 400vh of
            scrollable distance so the sticky stage remains pinned
            while the user scrolls through all 4 advantage slides.

          .hero-sticky-stage       position: sticky; top: 0; height: 100vh
            Stays glued at the top of the viewport for exactly
            400vh of scrolling. RAF loop computes activeIndex from
            containerRef.getBoundingClientRect().top.

          NOTE: html, body, #root must NOT have overflow:hidden.
                Home.css declares overflow:visible on all ancestors.
      ════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="hero-scroll-container">
        <div className="hero-sticky-stage">

          {/* ── Background images — crossfade via opacity ── */}
          {ADVANTAGES.map((adv, i) => (
            <div key={adv.num} className={bgClass(i)}>
              <img
                src={adv.img}
                alt={`南源木材 ${adv.zh}`}
                className="hero-bg-img"
              />
            </div>
          ))}

          {/* ── Dark gradient overlay ── */}
          <div className="hero-overlay" />

          {/* ── Radial vignette ── */}
          <div className="hero-vignette" />

          {/* ── Bracket frame corners ── */}
          <div className="hero-frame">
            <div className="hero-corner hero-corner--tl" />
            <div className="hero-corner hero-corner--tr" />
            <div className="hero-corner hero-corner--bl" />
            <div className="hero-corner hero-corner--br" />
          </div>

          {/* ── Content deck ── */}
          <div className="hero-content">

            {/* Eyebrow label */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
              <span className="hero-eyebrow-line" />
            </div>

            {/* Deck: giant number (left) + text card (right) */}
            <div className="hero-deck">

              {/* Left: stacked absolute numbers — 3-state CSS machine */}
              <div className="hero-numbox">
                {ADVANTAGES.map((adv, i) => (
                  <span key={adv.num} className={numClass(i)}>
                    {adv.num}
                  </span>
                ))}
              </div>

              {/* Right: stacked absolute text cards — 3-state CSS machine */}
              <div className="hero-textbox">
                {ADVANTAGES.map((adv, i) => (
                  <div key={adv.num} className={slideClass(i)}>
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

          {/* ── Progress rail — thin line showing scroll depth ── */}
          <div className="hero-progress-rail">
            <div
              className={`hero-progress-fill hero-progress-fill--${activeIndex}`}
            />
          </div>

          {/* ── Scroll cue (only on first slide) ── */}
          {activeIndex === 0 && (
            <div className="hero-scroll-cue" aria-hidden="true">
              <span className="hero-scroll-label">SCROLL</span>
              <span className="hero-scroll-arrow">↓</span>
            </div>
          )}

        </div>
        {/* END hero-sticky-stage */}
      </div>
      {/* END hero-scroll-container */}

      {/* ════════════════════════════════════════════════════
          RENDER vs REALITY COMPARISON SLIDER
      ════════════════════════════════════════════════════ */}
      <section className="home-compare">
        <div className="container">
          <h2 className="home-section-h">設計與落地的真實對照</h2>
          <p  className="home-compare-p">
            許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重把關，確保所見即所得。請拖曳滑桿親手驗證。
          </p>
        </div>
        <ComparisonSlider />
      </section>

      {/* ════════════════════════════════════════════════════
          GLOBAL CTA — single shared component
      ════════════════════════════════════════════════════ */}
      <CTA />

    </div>
  );
};

export default Home;
