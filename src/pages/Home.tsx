import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CTA from '../components/CTA/CTA';
import './Home.css';

/* ─────────────────────────────────────────────────────────────
   HERO IMAGES — 4 dedicated hero shots from src/assets/
   Each matched to its B2C advantage theme.
───────────────────────────────────────────────────────────── */
import img01 from '../assets/home-hero-material.jpg';      // 嚴選頂級建材
import img02 from '../assets/home-hero-craft.jpg';         // 精細職人工藝
import img03 from '../assets/home-hero-transparency.jpg';  // 透明報價零隱藏
import img04 from '../assets/home-hero-realization.jpg';   // 一條龍完美成家

/* ─────────────────────────────────────────────────────────────
   COMPARISON SLIDER IMAGES
───────────────────────────────────────────────────────────── */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* ─────────────────────────────────────────────────────────────
   PROCESS STEP IMAGES
───────────────────────────────────────────────────────────── */
import process01 from '../assets/process-01.jpg';
import process02 from '../assets/process-02.jpg';
import process03 from '../assets/process-03.jpg';
import process04 from '../assets/process-04.jpg';
import process05 from '../assets/process-05.jpg';
import process06 from '../assets/process-06.jpg';

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO IMAGES — varied picks from project album
───────────────────────────────────────────────────────────── */
import port01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import port02 from '../assets/LINE_ALBUM_2026.6.17_260621_50.jpg';
import port03 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import port04 from '../assets/LINE_ALBUM_2026.6.17_260621_40.jpg';
import port05 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import port06 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';


/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const ADVANTAGES = [
  {
    num: '01',
    zh:  '嚴選頂級建材',
    en:  'PREMIUM ECO-MATERIALS',
    desc:'採用 F1/F2 低甲醛環保綠建材，從源頭為您的健康嚴格把關。每一塊木料皆可溯源產地認證。',
    img: img01,
  },
  {
    num: '02',
    zh:  '精細職人工藝',
    en:  'ARTISAN PRECISION',
    desc:'三十年資深木作老師傅手工微調，接合收口精度嚴控於 ±1mm 誤差內。匠心鑄就每一個傳世細節。',
    img: img02,
  },
  {
    num: '03',
    zh:  '透明報價零隱藏',
    en:  'TOTAL TRANSPARENCY',
    desc:'報價單逐項逐料公開透明，白紙黑字簽約承諾——工程中絕不惡意追加任何費用，安心施工。',
    img: img03,
  },
  {
    num: '04',
    zh:  '一條龍完美成家',
    en:  'TURNKEY DREAM HOME',
    desc:'從高精度 3D 設計模擬到自有工班落地，現場總監全程監督控管，讓您輕鬆入住夢想居所。',
    img: img04,
  },
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
  { img: port01, zh: '木光雅居', type: '全屋統包' },
  { img: port02, zh: '禪意客廳', type: '客廳設計' },
  { img: port03, zh: '奢韻臥室', type: '主臥設計' },
  { img: port04, zh: '原木書房', type: '書房木作' },
  { img: port05, zh: '織錦牆面', type: '繃布壁飾' },
  { img: port06, zh: '原木廚域', type: '廚房木作' },
] as const;


/* ─────────────────────────────────────────────────────────────
   FADE-IN WRAPPER — IntersectionObserver, zero inline style
───────────────────────────────────────────────────────────── */
const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: string;
}> = ({ children, className = '', delay }) => {
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
      className={`fadein ${visible ? 'fadein--visible' : ''} ${className}`.trim()}
      data-delay={delay}
    >
      {children}
    </div>
  );
};


/* ─────────────────────────────────────────────────────────────
   COMPARISON SLIDER — DOM refs only, zero inline style on render
   (clipPath and left are set via ref.style after mount — the
    only acceptable DOM mutation outside of CSS classes)
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
    <FadeIn>
      <div
        ref={boxRef}
        className="cmp-box"
        onMouseDown={e => onX(e.clientX)}
        onMouseMove={e => { if (e.buttons === 1) onX(e.clientX); }}
        onTouchStart={e => onX(e.touches[0].clientX)}
        onTouchMove={e => onX(e.touches[0].clientX)}
      >
        <div className="cmp-layer cmp-layer--reality">
          <img src={compareReality} alt="實景完工照" className="cmp-img" />
          <span className="cmp-badge cmp-badge--r">REALITY</span>
        </div>
        <div ref={clipRef} className="cmp-layer cmp-layer--render">
          <img src={compareRender} alt="設計模擬圖" className="cmp-img" />
          <span className="cmp-badge cmp-badge--l">RENDER</span>
        </div>
        <div ref={dividerRef} className="cmp-divider">
          <div className="cmp-knob"><span className="cmp-arrows">⟨⟩</span></div>
        </div>
      </div>
    </FadeIn>
  );
};


/* ═══════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ─────────────────────────────────────────────────────────────
   INTRO LIFECYCLE (all timings from mount at 0 ms):

     0 ms      React renders .intro-viewport + .intro-logo-box
               CSS @keyframes logoFadeIn fires immediately.
               Gold text visible within ~200 ms (8 % of 2.5 s).
               body.scroll-locked added → prevents scrolling.

     2 500 ms  isIntroFadeOut = true
               → .fade-out class → translateY(-100vh) curtain up
               → body.scroll-locked removed
               → .content-ready on main → float-up reveals content

     3 500 ms  isIntroActive = false
               → .intro-viewport removed from DOM entirely

   SCROLL THEATRE:
     .hero-scroll-container  height: 400vh  (see Home.css)
     .hero-sticky-stage      position: sticky; top: 0; height: 100vh

     progress = clamp(-rect.top / (height − innerHeight), 0, 0.99)
     activeIdx = floor(progress × 4)  →  0, 1, 2, 3

   ZERO inline styles. ZERO setInterval. ZERO buttons. ZERO dots.
═══════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ── Intro state ── */
  const [isIntroActive,  setIsIntroActive]  = useState(true);
  const [isIntroFadeOut, setIsIntroFadeOut] = useState(false);

  /* ── Scroll theatre ── */
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Intro timers — start at 0 ms ── */
  useEffect(() => {
    const t1 = setTimeout(() => setIsIntroFadeOut(true),  2500);
    const t2 = setTimeout(() => setIsIntroActive(false),  3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Scroll lock: on during intro, off the moment fade begins ── */
  useEffect(() => {
    const shouldLock = isIntroActive && !isIntroFadeOut;
    document.body.classList.toggle('scroll-locked', shouldLock);
    return () => document.body.classList.remove('scroll-locked');
  }, [isIntroActive, isIntroFadeOut]);

  /* ── Scroll-mapped index ── */
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect       = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.99);
      const step     = Math.floor(progress * 4);
      setActiveIdx(prev => prev !== step ? step : prev);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Slide state helper ── */
  const ss = (i: number) =>
    i < activeIdx ? 'slide-passed' : i === activeIdx ? 'slide-active' : 'slide-upcoming';


  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════════════════════
          INTRO VIEWPORT
          Pure-black fixed overlay. Renders at 0 ms.
          CSS @keyframes logoFadeIn handles the gold glow.
          .fade-out → translateY(-100vh) curtain slide-up.
          isIntroActive guard removes it from DOM after 3.5 s.
      ══════════════════════════════════════════════════════════ */}
      {isIntroActive && (
        <div className={`intro-viewport${isIntroFadeOut ? ' fade-out' : ''}`}>
          <div className="intro-logo-box">
            <h1 className="intro-logo-zh">南源木材</h1>
            <span className="intro-logo-sep" />
            <p className="intro-logo-en">NANYUAN TIMBER DESIGN</p>
          </div>
        </div>
      )}


      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT — always in DOM
          .content-ready triggers float-up when intro fades.
      ══════════════════════════════════════════════════════════ */}
      <div className={`main-content-wrap${isIntroFadeOut ? ' content-ready' : ''}`}>

        {/* ── 400vh STICKY SCROLL THEATRE ── */}
        <div className="hero-scroll-container" ref={containerRef}>
          <div className="hero-sticky-stage">

            {/* Background images — three-state */}
            {ADVANTAGES.map((adv, i) => (
              <div key={adv.num} className={`hero-bg ${ss(i)}`}>
                <img src={adv.img} alt={`南源木材 ${adv.zh}`} className="hero-bg-img" />
              </div>
            ))}

            {/* Overlays */}
            <div className="hero-overlay" />
            <div className="hero-vignette" />

            {/* Corner bracket frame */}
            <div className="hero-frame">
              <div className="hero-corner hero-corner--tl" />
              <div className="hero-corner hero-corner--tr" />
              <div className="hero-corner hero-corner--bl" />
              <div className="hero-corner hero-corner--br" />
            </div>

            {/* Centre crosshair */}
            <div className={`hero-xhair hero-xhair--${activeIdx % 2 === 0 ? 'a' : 'b'}`}>
              <span className="hero-xhair-h" />
              <span className="hero-xhair-v" />
              <span className="hero-xhair-dot" />
            </div>

            {/* Hero text deck */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">NANYUAN TIMBER DESIGN</span>
                <span className="hero-eyebrow-line" />
              </div>

              <div className="hero-deck">
                {/* Giant number — left */}
                <div className="hero-numbox">
                  {ADVANTAGES.map((a, i) => (
                    <span key={a.num} className={`hero-num ${ss(i)}`}>{a.num}</span>
                  ))}
                </div>

                {/* Text card — right */}
                <div className="hero-textbox">
                  {ADVANTAGES.map((a, i) => (
                    <div key={a.num} className={`hero-slide ${ss(i)}`}>
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
              <span className="hero-scroll-label">SCROLL</span>
              <span className="hero-scroll-arrow">↓</span>
            </div>

          </div>
        </div>


        {/* ── SIX-STEP PROCESS ── */}
        <section className="home-process">
          <div className="container">
            <FadeIn className="home-section-hdr">
              <p className="home-eye">NANYUAN TIMBER</p>
              <h2 className="home-section-h">六大職人服務流程</h2>
              <p className="home-section-sub">Bespoke Process — From Concept to Flawless Execution</p>
            </FadeIn>

            {PROCESS_STEPS.map((s, i) => (
              <FadeIn key={s.id} className={`home-step${i % 2 === 1 ? ' home-step--rev' : ''}`}>
                <div className="home-step-imgbox">
                  <img src={s.img} alt={`南源木材 ${s.zh}`} className="home-step-img" />
                  <span className="home-step-num-bg">{s.id}</span>
                </div>
                <div className="home-step-info">
                  <span className="home-step-num">{s.id}</span>
                  <h3 className="home-step-zh">{s.zh}</h3>
                  <p  className="home-step-en">{s.en}</p>
                  <p  className="home-step-desc">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* ── RENDER vs REALITY ── */}
        <section className="home-compare">
          <div className="container">
            <FadeIn>
              <h2 className="home-section-h">設計與落地的真實對照</h2>
              <p className="home-compare-p">許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重把關，確保所見即所得。請拖曳滑桿，親手驗證精準差距。</p>
            </FadeIn>
          </div>
          <ComparisonSlider />
        </section>


        {/* ── PORTFOLIO ── */}
        <section className="home-folio">
          <div className="container">
            <FadeIn className="home-section-hdr home-folio-hdr">
              <h2 className="home-section-h">極精選作品</h2>
              <p className="home-section-sub">點擊探索每一個空間的完整故事。</p>
            </FadeIn>
            <div className="home-folio-grid">
              {PORTFOLIO.map((it, i) => (
                <FadeIn key={i} delay={`${i * 80}ms`}>
                  <div className="home-card" onClick={() => navigate('/projects')}>
                    <div className="home-card-inner">
                      <img src={it.img} alt={`南源木材 ${it.zh}`} className="home-card-img" />
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

        <CTA />

      </div>
    </div>
  );
};

export default Home;
