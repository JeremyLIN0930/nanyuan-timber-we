import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   FADE-IN SECTION  (scroll-driven)
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
   BEFORE / AFTER SLIDER
───────────────────────────────────────────────────────────── */
const BeforeAfterSlider: React.FC = () => {
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
      {/* AFTER side */}
      <div
        className="home-ba-side home-ba-after"
        style={{ backgroundImage: "url('/images/old_house_after.png')" }}
      >
        <div className="home-ba-overlay" />
        <span className="home-ba-label home-ba-label--right">完工後 AFTER</span>
      </div>

      {/* BEFORE side (clips to slider position) */}
      <div
        className="home-ba-side home-ba-before"
        style={{
          backgroundImage: "url('/images/old_house_before.png')",
          clipPath: `polygon(0 0,${pos}% 0,${pos}% 100%,0 100%)`,
        }}
      >
        <div className="home-ba-overlay" />
        <span className="home-ba-label home-ba-label--left">施工前 BEFORE</span>
      </div>

      {/* Divider handle */}
      <div className="home-ba-divider" style={{ left: `${pos}%` }}>
        <div className="home-ba-handle">
          <span className="home-ba-handle-icon">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO ITEMS
───────────────────────────────────────────────────────────── */
const portfolioItems = [
  { title: '天母森光', type: '頂級住宅', img: '/images/luxury_tianmu_home_1779301841564.png' },
  { title: '侘寂茶韻', type: '日式空間', img: '/images/japanese_wabi_sabi_1779301881798.png' },
  { title: '極簡廚境', type: '廚房改裝', img: '/images/minimal_wood_kitchen_1779301855424.png' },
  { title: '曜石辦公', type: '企業總部', img: '/images/modern_office_1779301899552.png' },
  { title: '沐光水域', type: '衛浴翻新', img: '/images/luxury_bathroom_1779301913582.png' },
  { title: '琥珀香醇', type: '商業空間', img: '/images/high_end_cafe_1779301868615.png' },
];

/* ─────────────────────────────────────────────────────────────
   CORRIDOR TUNNEL CONSTANTS
───────────────────────────────────────────────────────────── */
const RING_COUNT = 14;
const RING_STEP  = 900;
const TOTAL_Z    = RING_COUNT * RING_STEP;
const GOLD       = '#C5A880';
const GOLD_DIM   = 'rgba(197,168,128,0.18)';
const GOLD_MID   = 'rgba(197,168,128,0.45)';

/* One rectangular frame ring */
const CorridorRing: React.FC<{ depth: number; index: number }> = ({ depth, index }) => {
  const w         = 62;
  const h         = 78;
  const thickness = 1.5;
  const opacity   = index === 0 ? 0.9 : Math.max(0.08, 0.55 - index * 0.03);
  const color     = index < 2 ? GOLD_MID : GOLD_DIM;

  const edgeBase: React.CSSProperties = {
    position:        'absolute',
    backgroundColor: color,
    opacity,
    transition:      'none',
  };

  return (
    <div style={{
      position:       'absolute',
      top:            '50%',
      left:           '50%',
      width:          `${w}vw`,
      height:         `${h}vh`,
      transform:      `translate3d(-50%, -50%, ${depth}px)`,
      transformStyle: 'preserve-3d',
      pointerEvents:  'none',
    }}>
      <div className="corridor-ring-edge" style={{ ...edgeBase, top: 0, left: 0, right: 0, height: `${thickness}px` }} />
      <div className="corridor-ring-edge" style={{ ...edgeBase, bottom: 0, left: 0, right: 0, height: `${thickness}px` }} />
      <div className="corridor-ring-edge" style={{ ...edgeBase, top: 0, left: 0, bottom: 0, width: `${thickness}px` }} />
      <div className="corridor-ring-edge" style={{ ...edgeBase, top: 0, right: 0, bottom: 0, width: `${thickness}px` }} />

      {[
        { top: -3, left: -3 },
        { top: -3, right: -3 },
        { bottom: -3, left: -3 },
        { bottom: -3, right: -3 },
      ].map((pos, i) => (
        <div key={i} style={{
          position:        'absolute',
          width:           '5px',
          height:          '5px',
          borderRadius:    '50%',
          backgroundColor: GOLD,
          opacity:         opacity * 1.6,
          ...pos,
        }} />
      ))}
    </div>
  );
};

/* Vanishing-point perspective rails */
const PerspectiveRails: React.FC = () => {
  const railBase: React.CSSProperties = {
    position:        'absolute',
    transformOrigin: 'center center',
    backgroundColor: GOLD_DIM,
    pointerEvents:   'none',
  };
  return (
    <>
      <div style={{ ...railBase, top: '50%', left: 0, right: 0, height: '1px', opacity: 0.12 }} />
      <div style={{ ...railBase, left: '50%', top: 0, bottom: 0, width: '1px', opacity: 0.12 }} />
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0"   y1="0"   x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="100" y1="0"   x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="0"   y1="100" x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="100" y1="100" x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="0"   y1="50"  x2="50" y2="50" stroke={GOLD} strokeWidth="0.04" opacity="0.15" />
        <line x1="100" y1="50"  x2="50" y2="50" stroke={GOLD} strokeWidth="0.04" opacity="0.15" />
        <line x1="50"  y1="0"   x2="50" y2="50" stroke={GOLD} strokeWidth="0.04" opacity="0.15" />
        <line x1="50"  y1="100" x2="50" y2="50" stroke={GOLD} strokeWidth="0.04" opacity="0.15" />
      </svg>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const navigate = useNavigate();

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const viewportRef    = useRef<HTMLDivElement>(null);
  const tunnelRef      = useRef<HTMLDivElement>(null);
  const brandingRef    = useRef<HTMLDivElement>(null);
  const particlesRef   = useRef<HTMLDivElement>(null);

  const [tunnelDone, setTunnelDone] = useState(false);

  useEffect(() => {
    const tunnel   = tunnelRef.current;
    const branding = brandingRef.current;
    const viewport = viewportRef.current;
    if (!tunnel || !branding || !viewport) return;

    gsap.set(tunnel,   { z: 0, opacity: 1, rotationX: 0, rotationY: 0 });
    gsap.set(branding, { opacity: 0, y: 30, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1.4,
        onLeave:      () => setTunnelDone(true),
        onEnterBack:  () => setTunnelDone(false),
      },
    });

    tl.to(tunnel, {
      z:        TOTAL_Z + 400,
      ease:     'power1.inOut',
      duration: 0.80,
    }, 0);

    tl.to(tunnel, {
      opacity:  0,
      filter:   'brightness(4) blur(6px)',
      duration: 0.12,
      ease:     'power2.in',
    }, 0.80);

    tl.to(branding, {
      opacity:  1,
      y:        0,
      scale:    1,
      duration: 0.18,
      ease:     'power3.out',
    }, 0.88);

    const onMouseMove = (e: MouseEvent) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * -6;
      const ry = (e.clientX / window.innerWidth  - 0.5) *  6;
      gsap.to(tunnel, { rotationX: rx, rotationY: ry, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
    };
    window.addEventListener('mousemove', onMouseMove);

    const particles = particlesRef.current;
    if (particles) {
      const dots = particles.querySelectorAll<HTMLElement>('.dust-dot');
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y:        `${-30 - Math.random() * 60}px`,
          x:        `${(Math.random() - 0.5) * 40}px`,
          opacity:  0,
          duration: 3 + Math.random() * 4,
          delay:    i * 0.3,
          repeat:   -1,
          ease:     'power1.inOut',
          yoyo:     false,
          onRepeat: () => {
            gsap.set(dot, { y: 0, x: 0, opacity: Math.random() * 0.4 + 0.1 });
          },
        });
      });
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

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
          BLOCK 1: CORRIDOR TUNNEL INTRO + HERO BACKGROUND IMAGE
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scrollTrackRef}
        className="home-scroll-track"
      >
        {/* Fixed fullscreen viewport */}
        <div
          ref={viewportRef}
          className={`home-tunnel-viewport ${tunnelDone ? 'home-tunnel-viewport--done' : ''}`}
        >
          {/* ── Hero background image layer (bottom-most) ── */}
          <div className="home-hero-bg" />

          {/* ── Dark overlay atop the hero image ── */}
          <div className="home-hero-bg-overlay" />

          {/* ── Radial vignette ── */}
          <div className="home-hero-vignette" />

          {/* ── Ambient glow at vanishing point ── */}
          <div className="ambient-glow" />

          {/* ── Perspective rail lines ── */}
          <div className="home-rails-layer">
            <PerspectiveRails />
          </div>

          {/* ── 3D tunnel scene ── */}
          <div
            ref={tunnelRef}
            className="home-tunnel-scene"
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <CorridorRing key={i} index={i} depth={-i * RING_STEP} />
            ))}

            {/* Floor lines */}
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div
                key={`fl-${i}`}
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  width:           '62vw',
                  height:          '1px',
                  transform:       `translate3d(-50%, calc(${78 / 2}vh - 0px), ${-i * RING_STEP}px)`,
                  transformStyle:  'preserve-3d',
                  backgroundColor: GOLD_DIM,
                  opacity:         Math.max(0.06, 0.3 - i * 0.02),
                  pointerEvents:   'none',
                }}
              />
            ))}

            {/* Ceiling lines */}
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div
                key={`cl-${i}`}
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  width:           '62vw',
                  height:          '1px',
                  transform:       `translate3d(-50%, calc(-${78 / 2}vh + 0px), ${-i * RING_STEP}px)`,
                  transformStyle:  'preserve-3d',
                  backgroundColor: GOLD_DIM,
                  opacity:         Math.max(0.06, 0.3 - i * 0.02),
                  pointerEvents:   'none',
                }}
              />
            ))}

            {/* Floating text labels inside corridor */}
            {[
              { z: -RING_STEP * 2,  text: '材料源頭', sub: 'MATERIAL ORIGIN'  },
              { z: -RING_STEP * 5,  text: '工藝精準', sub: 'CRAFTSMANSHIP'     },
              { z: -RING_STEP * 8,  text: '誠信透明', sub: 'TRANSPARENCY'      },
              { z: -RING_STEP * 11, text: '空間落地', sub: 'SPACE REALIZATION' },
            ].map((label, i) => (
              <div
                key={`lbl-${i}`}
                style={{
                  position:       'absolute',
                  top:            '50%',
                  left:           '50%',
                  transform:      `translate3d(-50%, -50%, ${label.z}px)`,
                  transformStyle: 'preserve-3d',
                  textAlign:      'center',
                  pointerEvents:  'none',
                  userSelect:     'none',
                }}
              >
                <div className="home-tunnel-label-zh">{label.text}</div>
                <div className="home-tunnel-label-en">{label.sub}</div>
              </div>
            ))}

            {/* Dust particles */}
            <div ref={particlesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="dust-dot"
                  style={{
                    position:        'absolute',
                    top:             `${20 + Math.random() * 60}%`,
                    left:            `${15 + Math.random() * 70}%`,
                    width:           `${1 + Math.random() * 2}px`,
                    height:          `${1 + Math.random() * 2}px`,
                    borderRadius:    '50%',
                    backgroundColor: GOLD,
                    opacity:         Math.random() * 0.3 + 0.05,
                    transform:       `translateZ(${-Math.random() * TOTAL_Z * 0.6}px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Scroll hint ── */}
          <div className="scroll-hint">
            <span className="home-scroll-hint-text">Scroll to enter</span>
            <motion.div
              className="home-scroll-hint-arrow"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.div>
          </div>

          {/* ── BRANDING REVEAL (GSAP animates opacity from 0) ── */}
          <div ref={brandingRef} className="home-branding-reveal">
            <div className="home-branding-ornament-line" />

            <h1 className="home-branding-title">南源木材</h1>

            <p className="home-branding-en">NANYUAN TIMBER DESIGN</p>

            <div className="home-branding-ornament-line home-branding-ornament-line--bottom" />

            <p className="home-branding-tagline">從材料源頭開始，打造安心落地的空間</p>

            <div className="home-branding-cta-row">
              <button
                className="home-branding-btn home-branding-btn--outline"
                onClick={scrollToContent}
              >
                探索南源工藝 ➔
              </button>
              <button
                className="home-branding-btn home-branding-btn--ghost"
                onClick={() => navigate('/contact')}
              >
                立即預約諮詢
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END scrollTrackRef */}


      {/* ══ BLOCK 2: THREE CORE ADVANTAGES ══ */}
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

      {/* ══ BLOCK 3: SIX PROCESS STEPS (Alternating Layout) ══ */}
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
            {[
              {
                id: '01',
                title: '初步諮詢',
                en: 'BESPOKE CONSULTATION',
                desc: '傾聽您對場域的無限想像，開展客製化空間設計藍圖。',
                img: '/images/space_planning_1779728567334.png',
              },
              {
                id: '02',
                title: '現場勘測',
                en: 'PRECISION SITE SURVEY',
                desc: '職人團隊親赴現場，記錄尺度、採光、結構與管線細節。',
                img: '/images/renovation_detail_1779463551246.png',
              },
              {
                id: '03',
                title: '設計提案',
                en: 'CONCEPT & SPACE DESIGN',
                desc: '將創意轉化為空間美學，提供格局、材質與視覺提案。',
                img: '/images/ambiance_design_1779728584649.png',
              },
              {
                id: '04',
                title: '工程合約',
                en: 'TRANSPARENT AGREEMENT',
                desc: '條列式報價與施工節點，確保合作流程清楚透明。',
                img: '/images/transparent_agreement_1779728622356.png',
              },
              {
                id: '05',
                title: '精湛施工',
                en: 'MASTER CRAFTSMANSHIP',
                desc: '由自有工班與現場總監執行，精準落實設計圖面。',
                img: '/images/master_craftsmanship_1779728604535.png',
              },
              {
                id: '06',
                title: '完工驗收',
                en: 'PERFECT HANDOVER',
                desc: '高規格檢驗細節，交付安心、完整且具質感的空間。',
                img: '/images/sustainable_selection_1779728638928.png',
              },
            ].map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <FadeInSection key={step.id} className={`home-process-step ${isEven ? 'home-process-step--reverse' : ''}`}>
                  {/* Image side */}
                  <div className="home-process-step-img-wrap">
                    <img
                      src={step.img}
                      alt={`南源木材 ${step.title} 服務實景 — 台北天母竹北高端住宅空間規劃`}
                      className="home-process-step-img"
                    />
                    <span className="home-process-step-num-bg">{step.id}</span>
                  </div>

                  {/* Text side */}
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

      {/* ══ BLOCK 4: BEFORE / AFTER ══ */}
      <section className="home-ba-section">
        <div className="container">
          <FadeInSection>
            <h2 className="home-ba-title">設計與落地的真實對照</h2>
            <p className="home-ba-desc">
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證老屋翻修前後的精準落地對照。
            </p>
          </FadeInSection>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* ══ BLOCK 5: PORTFOLIO WALL ══ */}
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
                        alt={`南源木材作品案例 ${item.title} — ${item.type} — 台北天母竹北高端住宅空間規劃`}
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

      {/* ══ BLOCK 6: UNIFIED CTA (唯一完全體預約引導區塊) ══ */}
      <section className="home-cta-section">
        <FadeInSection>
          <h2 className="home-cta-title">準備好開始您的空間改造了嗎？</h2>
          <p className="home-cta-desc">
            結合木材背景與工藝，南源從設計、選材到施工，提供一條龍的高級室內裝修落地服務。
          </p>
          <nav className="home-cta-buttons" aria-label="預約服務快速連結">
            <Link to="/contact" className="home-cta-btn home-cta-btn--primary">
              立即預約諮詢 ➜
            </Link>
            <Link to="/projects" className="home-cta-btn home-cta-btn--secondary">
              查看作品案例
            </Link>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="home-cta-btn home-cta-btn--line"
            >
              加入 LINE 詢問
            </a>
          </nav>
        </FadeInSection>
      </section>

    </motion.div>
  );
};

export default Home;
