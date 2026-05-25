import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesSection from '../components/Home/ServicesSection';

gsap.registerPlugin(ScrollTrigger);

/* ─── Reusable Scroll-Driven Fade-In ─── */
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

/* ─── Portfolio Items (below tunnel) ─── */
const portfolioItems = [
  { title: '天母森光', type: '頂級住宅',   img: '/images/luxury_tianmu_home_1779301841564.png' },
  { title: '侘寂茶韻', type: '日式空間',   img: '/images/japanese_wabi_sabi_1779301881798.png' },
  { title: '極簡廚境', type: '廚房改裝',   img: '/images/minimal_wood_kitchen_1779301855424.png' },
  { title: '曜石辦公', type: '企業總部',   img: '/images/modern_office_1779301899552.png' },
  { title: '沐光水域', type: '衛浴翻新',   img: '/images/luxury_bathroom_1779301913582.png' },
  { title: '琥珀香醇', type: '商業空間',   img: '/images/high_end_cafe_1779301868615.png' },
];

/* ─── 3D Tunnel Card Data ───
 *  KEY RULE: translateZ values must be NEGATIVE (going into the screen).
 *  The camera sits at z=0 looking toward negative-z.
 *  Start the nearest card at -600px so it is NEVER in front of the camera
 *  at scroll progress 0. Cards extend to ~-6000px.
 *  GSAP will animate the wrapper from translateZ(0) → translateZ(+6000px),
 *  which pulls all cards forward through the camera smoothly.
 * ─── */
const tunnelItems = [
  { img: '/images/luxury_tianmu_home_1779301841564.png',    title: '天母森光',   tag: 'LUXURY RESIDENTIAL',      x: -28, y: -18, z: -600,  r: 5  },
  { img: '/images/high_end_cafe_1779301868615.png',         title: '琥珀香醇',   tag: 'COMMERCIAL CAFE',         x:  26, y: -14, z: -1100, r: -4 },
  { img: '/images/minimal_wood_kitchen_1779301855424.png',  title: '極簡廚境',   tag: 'KITCHEN MINIMALISM',      x: -22, y:  18, z: -1700, r: -7 },
  { img: '/images/japanese_wabi_sabi_1779301881798.png',    title: '侘寂茶韻',   tag: 'JAPANESE WABI-SABI',      x:  24, y:  20, z: -2200, r: 9  },
  { img: '/images/luxury_bathroom_1779301913582.png',       title: '沐光水域',   tag: 'BOUTIQUE BATHROOM',       x: -30, y:  -6, z: -2800, r: -3 },
  { img: '/images/modern_office_1779301899552.png',         title: '曜石辦公',   tag: 'OFFICE HEADQUARTERS',     x:  28, y:  -8, z: -3300, r: 4  },
  { img: '/images/style_luxury_dark_1779301949701.png',     title: '奢華暗灰',   tag: 'DARK MODERN STYLE',       x: -18, y: -24, z: -3900, r: 11 },
  { img: '/images/style_minimal_wood_1779301932325.png',    title: '北歐極簡',   tag: 'MINIMAL WOOD STYLE',      x:  20, y: -22, z: -4400, r: -9 },
  { img: '/images/style_wabi_sabi_1779301962644.png',       title: '日式靜謐',   tag: 'ZEN RETREAT STYLE',       x: -26, y:  22, z: -5000, r: -5 },
  { img: '/images/style_industrial_1779301976370.png',      title: '精品工業',   tag: 'INDUSTRIAL LOFT STYLE',   x:  26, y:  16, z: -5500, r: 7  },
  { img: '/images/budget_smart_home.png',                   title: '小資宅機能', tag: 'SMART FUNCTIONAL LIVING', x: -28, y: -12, z: -6000, r: 3  },
];

/* ─── Before/After Slider ─── */
const BeforeAfterSlider: React.FC = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="position-relative w-100 overflow-hidden"
      style={{ height: 'clamp(300px, 60vh, 80vh)', cursor: 'ew-resize', userSelect: 'none' }}
      onMouseMove={(e) => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseDown={(e) => handleMove(e.clientX)}
    >
      {/* After */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundImage: "url('/images/old_house_after.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(5,5,5,0.15)' }} />
        <div className="position-absolute bottom-0 end-0 m-3 m-md-4 px-3 py-2"
          style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>
          完工後 AFTER
        </div>
      </div>
      {/* Before */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/images/old_house_before.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`,
        }}
      >
        <div className="position-absolute bottom-0 start-0 m-3 m-md-4 px-3 py-2"
          style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>
          施工前 BEFORE
        </div>
      </div>
      {/* Handle */}
      <div
        className="position-absolute top-0 bottom-0"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '2px', backgroundColor: '#C5A880', boxShadow: '0 0 25px rgba(197,168,128,0.8)', zIndex: 10 }}
      >
        <div
          className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', border: '1px solid #C5A880', backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 0 20px rgba(197,168,128,0.5)' }}
        >
          <span style={{ color: '#C5A880', fontSize: '12px', fontWeight: 300 }}>⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /*
   * FIX 1 — Scroll architecture
   * scrollTrackRef  → the tall outer container that CREATES the scrollbar (height: 400vh)
   * viewportRef     → position:fixed inner viewport that STAYS on screen while scrolling
   * frameRef        → the 3D scene root; GSAP animates its translateZ
   * brandingRef     → company name overlay that fades in at the end
   */
  const scrollTrackRef  = useRef<HTMLDivElement>(null);
  const viewportRef     = useRef<HTMLDivElement>(null);
  const frameRef        = useRef<HTMLDivElement>(null);
  const brandingRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame    = frameRef.current;
    const branding = brandingRef.current;
    if (!frame || !branding) return;

    /*
     * FIX 2 — Camera never clips at start
     * The tunnel cards start at z:-600px and extend to z:-6000px.
     * We animate the FRAME from translateZ(0) → translateZ(6600px).
     * At progress=0  → nearest card is at effective z = 0 + (-600) = -600px (behind camera ✓)
     * At progress=1  → nearest card is at 6600 + (-600) = +6000px (flew past camera ✓)
     *
     * perspective is set on the viewport container, NOT on the frame itself,
     * so the vanishing-point stays fixed in the middle of the screen.
     */
    gsap.set(frame,    { z: 0, opacity: 1 });
    gsap.set(branding, { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackRef.current,   // the tall div that has the scroll height
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1.2,                      // smooth lag between scroll and animation
        // pin is NOT used here — instead we manually fixed the viewport
      },
    });

    // Phase 1 (0% → 85%): fly through the tunnel
    tl.to(frame, {
      z:        6600,   // push all cards forward through the camera
      ease:     'none',
      duration: 0.85,   // fraction of the timeline (relative)
    });

    // Phase 2 (85% → 95%): fade out the gallery
    tl.to(frame, {
      opacity:  0,
      duration: 0.1,
    });

    // Phase 3 (95% → 100%): dramatic company name reveal
    tl.to(branding, {
      opacity:  1,
      scale:    1,
      duration: 0.15,
      ease:     'power3.out',
    }, '<0.05');

    // Mouse-move parallax tilt (subtle, layered on top of scroll animation)
    const handleMouseMove = (e: MouseEvent) => {
      const xAngle = (e.clientX / window.innerWidth  - 0.5) * 10;
      const yAngle = (e.clientY / window.innerHeight - 0.5) * -10;
      gsap.to(frame, {
        rotationY: xAngle,
        rotationX: yAngle,
        ease:      'power2.out',
        duration:  0.9,
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToContent = () => {
    document.querySelector('.advantages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: '#050505', minHeight: '100vh' }}
    >

      {/* ══ BLOCK 1: 3D PORTFOLIO TUNNEL ══════════════════════════════════════
       *
       *  scrollTrackRef  height: 400vh  → generates the scrollbar
       *  viewportRef     position: fixed → stays fullscreen while user scrolls
       *  frameRef        translateZ animated by GSAP → the moving 3D world
       *
       * ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={scrollTrackRef}
        style={{
          position: 'relative',
          height:   '400vh',      // ← FIX 1: tall container that creates scroll height
          zIndex:   1,
        }}
      >
        {/* Fixed viewport — stays glued to the screen while the track scrolls */}
        <div
          ref={viewportRef}
          style={{
            position:   'fixed',
            top:        0,
            left:       0,
            width:      '100vw',
            height:     '100vh',
            overflow:   'hidden',
            zIndex:     2,
            /* FIX 2: perspective on the VIEWPORT keeps the vanishing-point
               at screen-center regardless of the frame's translateZ */
            perspective:     '1000px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Dark radial vignette overlay */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.75) 100%)',
              zIndex:     10,
              pointerEvents: 'none',
            }}
          />

          {/* 3D frame — GSAP animates translateZ on this element */}
          <div
            ref={frameRef}
            style={{
              position:        'absolute',
              top:             0,
              left:            0,
              width:           '100%',
              height:          '100%',
              transformStyle:  'preserve-3d',
              // Initial camera position: translateZ(0)
              // Cards start at z=-600px → safely behind the camera at load
              transform:       'translateZ(0px)',
            }}
          >
            {tunnelItems.map((item, idx) => (
              /*
               * FIX 3 — Bootstrap 5 responsive card layout
               * Each card is absolutely centered in the viewport, then
               * offset by its (x, y) percentages and pushed into z-depth.
               * Width uses Bootstrap responsive clamp so it shrinks on mobile.
               */
              <div
                key={idx}
                style={{
                  position:  'absolute',
                  top:       '50%',
                  left:      '50%',
                  transform: `translate3d(calc(-50% + ${item.x}vw), calc(-50% + ${item.y}vh), ${item.z}px) rotate(${item.r}deg)`,
                  transformStyle: 'preserve-3d',
                  // Responsive width: 280px on mobile → 360px on desktop
                  width:     'clamp(200px, 28vw, 360px)',
                }}
              >
                {/* Bootstrap card shell */}
                <div
                  className="overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(15,12,9,0.75)',
                    border:          '1px solid rgba(197,168,128,0.25)',
                    backdropFilter:  'blur(6px)',
                    boxShadow:       '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,168,128,0.08)',
                  }}
                >
                  {/* Image — aspect-ratio 4:3, never distorts */}
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width:      '100%',
                        height:     '100%',
                        objectFit:  'cover',
                        display:    'block',
                        opacity:    0.85,
                      }}
                    />
                  </div>

                  {/* Card footer — Bootstrap utility classes for responsive text */}
                  <div className="px-3 py-2 px-md-3 py-md-3">
                    {/* Tag line: smaller on mobile (fs-6 clamp) */}
                    <p
                      className="mb-1"
                      style={{
                        fontSize:      'clamp(9px, 1.1vw, 11px)',
                        fontWeight:    300,
                        letterSpacing: '0.18em',
                        color:         '#C5A880',
                        textTransform: 'uppercase',
                        margin:        0,
                        whiteSpace:    'nowrap',
                        overflow:      'hidden',
                        textOverflow:  'ellipsis',
                      }}
                    >
                      {item.tag}
                    </p>
                    {/* Title: clamp prevents overflow on narrow cards */}
                    <h4
                      style={{
                        fontSize:      'clamp(13px, 1.8vw, 18px)',
                        fontWeight:    700,
                        letterSpacing: '-0.02em',
                        color:         '#fff',
                        margin:        0,
                        textShadow:    '0 0 12px rgba(255,255,255,0.2)',
                        whiteSpace:    'nowrap',
                        overflow:      'hidden',
                        textOverflow:  'ellipsis',
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Branding Reveal Overlay (FIX 3 - end reveal) ──────────────
           *  opacity:0 at start; GSAP fades it in at scroll progress ~95%
           * ──────────────────────────────────────────────────────────────── */}
          <div
            ref={brandingRef}
            style={{
              position:        'absolute',
              inset:           0,
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'center',
              justifyContent:  'center',
              textAlign:       'center',
              padding:         'clamp(1.5rem, 5vw, 4rem)',
              background:      'radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)',
              opacity:         0,           // GSAP controls this
              zIndex:          20,
              pointerEvents:   'none',       // click-through when invisible
            }}
          >
            {/* Decorative top rule */}
            <div style={{ width: 'clamp(40px, 8vw, 80px)', height: '1px', backgroundColor: '#C5A880', marginBottom: 'clamp(1rem, 3vw, 2rem)' }} />

            <h1
              style={{
                fontSize:      'clamp(1.8rem, 6vw, 5rem)',
                fontWeight:    900,
                letterSpacing: '-0.03em',
                lineHeight:    1.05,
                color:         '#C5A880',
                textShadow:    '0 0 60px rgba(197,168,128,0.9), 0 0 120px rgba(197,168,128,0.4)',
                margin:        0,
              }}
            >
              南源木材
            </h1>

            <p
              style={{
                fontSize:      'clamp(0.7rem, 2vw, 1.1rem)',
                fontWeight:    300,
                letterSpacing: '0.35em',
                color:         'rgba(197,168,128,0.7)',
                margin:        'clamp(0.5rem, 1.5vw, 1rem) 0',
                textTransform: 'uppercase',
              }}
            >
              NANYUAN TIMBER DESIGN
            </p>

            <div style={{ width: 'clamp(40px, 8vw, 80px)', height: '1px', backgroundColor: 'rgba(197,168,128,0.4)', marginTop: 'clamp(0.5rem, 1.5vw, 1rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }} />

            <p
              style={{
                fontSize:    'clamp(0.8rem, 1.4vw, 1rem)',
                fontWeight:  300,
                letterSpacing: '0.08em',
                color:       'rgba(255,255,255,0.55)',
                maxWidth:    '600px',
                lineHeight:  1.8,
              }}
            >
              從材料源頭開始，打造安心落地的空間
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
              <button
                onClick={scrollToContent}
                style={{
                  fontSize:        'clamp(0.75rem, 1.2vw, 0.9rem)',
                  letterSpacing:   '0.12em',
                  padding:         '0.75em 2em',
                  border:          '1px solid #C5A880',
                  color:           '#C5A880',
                  backgroundColor: 'transparent',
                  cursor:          'pointer',
                  transition:      'background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(197,168,128,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                探索南源工藝 ➔
              </button>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  fontSize:        'clamp(0.75rem, 1.2vw, 0.9rem)',
                  letterSpacing:   '0.12em',
                  padding:         '0.75em 2em',
                  border:          '1px solid #C5A880',
                  color:           '#050505',
                  backgroundColor: '#C5A880',
                  cursor:          'pointer',
                  fontWeight:      700,
                  transition:      'box-shadow 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(197,168,128,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                立即預約諮詢
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END scrollTrackRef — content below this appears after the tunnel section */}

      {/* ══ BLOCK 2: THREE CORE ADVANTAGES ══════════════════════════════════ */}
      <section
        className="advantages-section w-100 py-5"
        style={{ backgroundColor: '#0D0D0E', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container py-4 py-lg-5">
          <FadeInSection className="text-center mb-5">
            <h2
              className="fw-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.5)' }}
            >
              三大核心優勢
            </h2>
            <p
              className="mx-auto"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '600px' }}
            >
              從選材到施工，南源以三大核心堅持，為您打造安心穩定的裝修體驗。
            </p>
          </FadeInSection>

          <div className="row g-4 justify-content-center">
            {[
              {
                icon:  <Trees size={32} style={{ color: '#C5A880' }} />,
                title: '源頭理解',
                desc:  '擁有深厚的木材與材料背景，從源頭精準理解各種材料的物理特性與適用性，為您的空間挑選最合適、最耐用的高品質用料。',
              },
              {
                icon:  <ShieldCheck size={32} style={{ color: '#C5A880' }} />,
                title: '細節品質',
                desc:  '在每一項施工環節皆設立嚴格的檢核點，尤其是防水、木作與油漆工程，我們堅持多次逐項驗收，不放過任何影響居住安全的微小細節。',
              },
              {
                icon:  <ClipboardCheck size={32} style={{ color: '#C5A880' }} />,
                title: '誠信透明',
                desc:  '提供完全透明、逐項列出的工程報價單，簽約金額即為最終造價，絕不惡意追加任何隱藏預算；施工過程全程記錄，讓您住得安心、放心。',
              },
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <FadeInSection delay={i * 0.15}>
                  <div
                    className="p-4 p-lg-5 h-100 rounded-1"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border:          '1px solid rgba(197,168,128,0.1)',
                      boxShadow:       '0 4px 30px rgba(0,0,0,0.2)',
                      transition:      'all 0.4s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.borderColor      = '#C5A880';
                      el.style.backgroundColor  = 'rgba(197,168,128,0.05)';
                      el.style.boxShadow        = '0 10px 30px rgba(197,168,128,0.15)';
                      el.style.transform        = 'translateY(-5px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.borderColor      = 'rgba(197,168,128,0.1)';
                      el.style.backgroundColor  = 'rgba(255,255,255,0.02)';
                      el.style.boxShadow        = '0 4px 30px rgba(0,0,0,0.2)';
                      el.style.transform        = 'translateY(0)';
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mb-4 rounded-circle mx-auto"
                      style={{ width: '70px', height: '70px', backgroundColor: 'rgba(197,168,128,0.1)' }}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className="text-center mb-3"
                      style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, color: '#C5A880' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'justify', margin: 0 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOCK 3: SERVICES ═══════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ══ BLOCK 4: BEFORE / AFTER ═════════════════════════════════════════ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#050505' }}>
        <div className="container py-4">
          <FadeInSection>
            <h2
              className="fw-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}
            >
              設計與落地的真實對照
            </h2>
            <p
              className="mb-4"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', maxWidth: '750px', lineHeight: 1.8 }}
            >
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證老屋翻修前後的精準落地對照。
            </p>
          </FadeInSection>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* ══ BLOCK 5: PORTFOLIO WALL ══════════════════════════════════════════ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#0D0D0E' }}>
        <div className="container py-4">
          <FadeInSection className="mb-5">
            <h2
              className="fw-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}
            >
              極精選作品
            </h2>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
              點擊探索每一個空間的完整故事。
            </p>
          </FadeInSection>

          <div className="row g-4">
            {portfolioItems.map((item, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <FadeInSection delay={i * 0.08}>
                  <motion.div
                    className="position-relative overflow-hidden"
                    style={{ cursor: 'pointer' }}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate('/projects')}
                  >
                    <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={item.img}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover', opacity: 0.7, transition: 'all 0.7s' }}
                        alt={item.title}
                        onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '1'; (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.7'; (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.3) 50%, transparent 100%)', opacity: 0.8 }}
                      />
                      <div className="position-absolute bottom-0 start-0 p-3 p-md-4">
                        <span className="d-block mb-1" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textTransform: 'uppercase' }}>
                          {item.type}
                        </span>
                        <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOCK 6: CTA FULL-WIDTH ══════════════════════════════════════════ */}
      <section className="position-relative w-100 overflow-hidden" style={{ height: 'clamp(400px, 70vh, 80vh)' }}>
        <img
          src="/images/style_luxury_dark_1779301949701.png"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover', opacity: 0.4 }}
          alt="CTA background"
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.3) 100%)' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-md-5">
          <FadeInSection>
            <h2
              className="fw-bold mb-3 mb-md-4"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 50px rgba(197,168,128,0.9)', lineHeight: 1.1 }}
            >
              開啟您的空間之旅
            </h2>
            <p
              className="mx-auto mb-4 mb-md-5"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.8 }}
            >
              從一次免費諮詢開始，讓南源的頂級職人為您的夢想空間量身打造。
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{
                fontSize:        'clamp(0.8rem, 1.5vw, 1rem)',
                letterSpacing:   '0.12em',
                padding:         '0.85em 2.5em',
                border:          '1px solid #C5A880',
                color:           '#fff',
                backgroundColor: 'rgba(197,168,128,0.15)',
                cursor:          'pointer',
                backdropFilter:  'blur(8px)',
                transition:      'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C5A880'; e.currentTarget.style.color = '#050505'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(197,168,128,0.15)'; e.currentTarget.style.color = '#fff'; }}
            >
              立即預約諮詢 ➔
            </button>
          </FadeInSection>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
