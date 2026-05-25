import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesSection from '../components/Home/ServicesSection';

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
      className="position-relative w-100 overflow-hidden"
      style={{ height: 'clamp(300px,60vh,80vh)', cursor: 'ew-resize', userSelect: 'none' }}
      onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onMouseDown={e => handleMove(e.clientX)}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundImage: "url('/images/old_house_after.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(5,5,5,0.15)' }} />
        <div className="position-absolute bottom-0 end-0 m-3 px-3 py-2"
          style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>
          完工後 AFTER
        </div>
      </div>
      <div className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundImage: "url('/images/old_house_before.png')", backgroundSize: 'cover', backgroundPosition: 'center',
          clipPath: `polygon(0 0,${pos}% 0,${pos}% 100%,0 100%)` }}>
        <div className="position-absolute bottom-0 start-0 m-3 px-3 py-2"
          style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>
          施工前 BEFORE
        </div>
      </div>
      <div className="position-absolute top-0 bottom-0"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '2px', backgroundColor: '#C5A880', boxShadow: '0 0 25px rgba(197,168,128,0.8)', zIndex: 10 }}>
        <div className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', border: '1px solid #C5A880', backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)' }}>
          <span style={{ color: '#C5A880', fontSize: '12px' }}>⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO ITEMS
───────────────────────────────────────────────────────────── */
const portfolioItems = [
  { title: '天母森光', type: '頂級住宅',  img: '/images/luxury_tianmu_home_1779301841564.png' },
  { title: '侘寂茶韻', type: '日式空間',  img: '/images/japanese_wabi_sabi_1779301881798.png' },
  { title: '極簡廚境', type: '廚房改裝',  img: '/images/minimal_wood_kitchen_1779301855424.png' },
  { title: '曜石辦公', type: '企業總部',  img: '/images/modern_office_1779301899552.png' },
  { title: '沐光水域', type: '衛浴翻新',  img: '/images/luxury_bathroom_1779301913582.png' },
  { title: '琥珀香醇', type: '商業空間',  img: '/images/high_end_cafe_1779301868615.png' },
];

/* ─────────────────────────────────────────────────────────────
   CORRIDOR TUNNEL  —  pure CSS geometry, no images
   
   Architecture:
   ┌─ scrollTrackRef  (height: 500vh, creates scrollbar)
   │  └─ viewportRef  (position:fixed, 100vw×100vh, perspective)
   │     ├─ tunnelRef   (preserve-3d scene, GSAP animates translateZ)
   │     │  ├─ N × <CorridorFrame> rings at z = 0, -800, -1600 …
   │     │  └─ floor / ceiling lines
   │     └─ brandingRef (opacity:0 → 1 at end)

   Each <CorridorFrame> is a rectangle made of 4 absolutely-positioned
   div "edges" (top, bottom, left, right) — no SVG required.
   GSAP moves tunnelRef from z=0 → z=+(N*800)px so the rings fly
   past the camera one by one, simulating walking down the corridor.
───────────────────────────────────────────────────────────── */

const RING_COUNT  = 14;          // number of door-frame rings
const RING_STEP   = 900;         // px between rings in z-space
const TOTAL_Z     = RING_COUNT * RING_STEP; // total travel distance
const GOLD        = '#C5A880';
const GOLD_DIM    = 'rgba(197,168,128,0.18)';
const GOLD_MID    = 'rgba(197,168,128,0.45)';

/* One rectangular frame ring */
const CorridorRing: React.FC<{ depth: number; index: number }> = ({ depth, index }) => {
  // Rings deeper in tunnel are slightly smaller (perspective cue even before CSS perspective)
  const w         = 62;         // % of viewport width
  const h         = 78;         // % of viewport height
  const thickness = 1.5;        // px border thickness
  const opacity   = index === 0 ? 0.9 : Math.max(0.08, 0.55 - index * 0.03);
  const color     = index < 2 ? GOLD_MID : GOLD_DIM;

  const edgeStyle: React.CSSProperties = {
    position:  'absolute',
    backgroundColor: color,
    opacity,
    transition: 'none',
  };

  return (
    <div style={{
      position:        'absolute',
      top:             '50%',
      left:            '50%',
      width:           `${w}vw`,
      height:          `${h}vh`,
      transform:       `translate3d(-50%, -50%, ${depth}px)`,
      transformStyle:  'preserve-3d',
      pointerEvents:   'none',
    }}>
      {/* top edge */}
      <div style={{ ...edgeStyle, top: 0, left: 0, right: 0, height: `${thickness}px` }} />
      {/* bottom edge */}
      <div style={{ ...edgeStyle, bottom: 0, left: 0, right: 0, height: `${thickness}px` }} />
      {/* left edge */}
      <div style={{ ...edgeStyle, top: 0, left: 0, bottom: 0, width: `${thickness}px` }} />
      {/* right edge */}
      <div style={{ ...edgeStyle, top: 0, right: 0, bottom: 0, width: `${thickness}px` }} />

      {/* Corner accent dots */}
      {[
        { top: -3, left: -3 },
        { top: -3, right: -3 },
        { bottom: -3, left: -3 },
        { bottom: -3, right: -3 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '5px', height: '5px',
          borderRadius: '50%',
          backgroundColor: GOLD,
          opacity: opacity * 1.6,
          ...pos,
        }} />
      ))}
    </div>
  );
};

/* Vanishing-point cross-hair lines (floor / ceiling perspective rails) */
const PerspectiveRails: React.FC = () => {
  // 4 rails: top-left→VP, top-right→VP, bottom-left→VP, bottom-right→VP
  // Drawn as absolutely positioned thin lines rotated to meet center
  const railStyle: React.CSSProperties = {
    position:        'absolute',
    transformOrigin: 'center center',
    backgroundColor: GOLD_DIM,
    pointerEvents:   'none',
  };
  return (
    <>
      {/* Horizontal center line */}
      <div style={{ ...railStyle, top: '50%', left: 0, right: 0, height: '1px', opacity: 0.12 }} />
      {/* Vertical center line */}
      <div style={{ ...railStyle, left: '50%', top: 0, bottom: 0, width: '1px', opacity: 0.12 }} />

      {/* Diagonal corner rails — SVG overlay for precision */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* VP at center 50,50 — rails from corners */}
        <line x1="0"   y1="0"   x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="100" y1="0"   x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="0"   y1="100" x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />
        <line x1="100" y1="100" x2="50" y2="50" stroke={GOLD} strokeWidth="0.06" opacity="0.25" />

        {/* Mid-point rails (walls) */}
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

  /* Track when the fixed viewport should "unlock" */
  const [tunnelDone, setTunnelDone] = useState(false);

  useEffect(() => {
    const tunnel   = tunnelRef.current;
    const branding = brandingRef.current;
    const viewport = viewportRef.current;
    if (!tunnel || !branding || !viewport) return;

    /* Initial state */
    gsap.set(tunnel,   { z: 0, opacity: 1, rotationX: 0, rotationY: 0 });
    gsap.set(branding, { opacity: 0, y: 30, scale: 0.92 });

    /* ── Main scroll-driven timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1.4,
        onLeave: () => setTunnelDone(true),
        onEnterBack: () => setTunnelDone(false),
      },
    });

    /* Phase 1 (0% → 80%): camera flies down the corridor */
    tl.to(tunnel, {
      z:        TOTAL_Z + 400,   // fly all rings past the camera
      ease:     'power1.inOut',
      duration: 0.80,
    }, 0);

    /* Phase 1b — subtle bloom: vignette brightens toward center as we travel */
    tl.to(viewport, {
      '--vignette-opacity': 0,   // CSS var trick — won't work directly; use filter instead
      ease: 'none',
      duration: 0.80,
    }, 0);

    /* Phase 2 (80% → 90%): tunnel fades to white flash, then black */
    tl.to(tunnel, {
      opacity:  0,
      filter:   'brightness(4) blur(6px)',
      duration: 0.12,
      ease:     'power2.in',
    }, 0.80);

    /* Phase 3 (88% → 100%): company name rises from darkness */
    tl.to(branding, {
      opacity:  1,
      y:        0,
      scale:    1,
      duration: 0.18,
      ease:     'power3.out',
    }, 0.88);

    /* ── Subtle mouse-parallax tilt ── */
    const onMouseMove = (e: MouseEvent) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * -6;
      const ry = (e.clientX / window.innerWidth  - 0.5) *  6;
      gsap.to(tunnel, { rotationX: rx, rotationY: ry, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Floating dust particles animation ── */
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: '#050505', minHeight: '100vh' }}
    >

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1: CORRIDOR TUNNEL INTRO
          scrollTrackRef  → 500vh tall, creates the scrollbar
          viewportRef     → position:fixed, stays on screen
          tunnelRef       → 3D scene, GSAP moves its Z
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scrollTrackRef}
        style={{ position: 'relative', height: '500vh', zIndex: 1 }}
      >
        {/* Fixed fullscreen viewport */}
        <div
          ref={viewportRef}
          style={{
            position:          'fixed',
            top:               0,
            left:              0,
            width:             '100vw',
            height:            '100vh',
            overflow:          'hidden',
            backgroundColor:   '#050505',
            /* perspective here → vanishing-point always at screen center */
            perspective:       '900px',
            perspectiveOrigin: '50% 50%',
            zIndex:            2,
            /* Hide when tunnel section is done scrolling */
            pointerEvents:     tunnelDone ? 'none' : 'auto',
            opacity:           tunnelDone ? 0 : 1,
            transition:        'opacity 0.4s',
          }}
        >

          {/* ── Radial vignette: darkens edges, brightens center ── */}
          <div style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.92) 100%)',
            zIndex:        30,
            pointerEvents: 'none',
          }} />

          {/* ── Ambient glow at vanishing point ── */}
          <div style={{
            position:      'absolute',
            top:           '50%',
            left:          '50%',
            transform:     'translate(-50%,-50%)',
            width:         'clamp(200px,40vw,500px)',
            height:        'clamp(120px,25vh,300px)',
            background:    `radial-gradient(ellipse at center, rgba(197,168,128,0.12) 0%, transparent 70%)`,
            borderRadius:  '50%',
            zIndex:        5,
            pointerEvents: 'none',
            filter:        'blur(20px)',
          }} />

          {/* ── Perspective rail lines (static, on top of tunnel) ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
            <PerspectiveRails />
          </div>

          {/* ── 3D tunnel scene ── */}
          <div
            ref={tunnelRef}
            style={{
              position:       'absolute',
              top:            0,
              left:           0,
              width:          '100%',
              height:         '100%',
              transformStyle: 'preserve-3d',
              transform:      'translateZ(0px)',
              zIndex:         10,
            }}
          >
            {/* Ring frames: placed at z = 0, -RING_STEP, -2*RING_STEP … */}
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <CorridorRing
                key={i}
                index={i}
                depth={-i * RING_STEP}
              />
            ))}

            {/* Floor line (horizontal, at bottom of each ring, converging) */}
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div
                key={`fl-${i}`}
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  width:           '62vw',
                  height:          '1px',
                  transform:       `translate3d(-50%, calc(${78/2}vh - 0px), ${-i * RING_STEP}px)`,
                  transformStyle:  'preserve-3d',
                  backgroundColor: GOLD_DIM,
                  opacity:         Math.max(0.06, 0.3 - i * 0.02),
                  pointerEvents:   'none',
                }}
              />
            ))}

            {/* Ceiling line */}
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div
                key={`cl-${i}`}
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  width:           '62vw',
                  height:          '1px',
                  transform:       `translate3d(-50%, calc(-${78/2}vh + 0px), ${-i * RING_STEP}px)`,
                  transformStyle:  'preserve-3d',
                  backgroundColor: GOLD_DIM,
                  opacity:         Math.max(0.06, 0.3 - i * 0.02),
                  pointerEvents:   'none',
                }}
              />
            ))}

            {/* Floating text labels inside corridor at certain depths */}
            {[
              { z: -RING_STEP * 2,  text: '材料源頭',    sub: 'MATERIAL ORIGIN'     },
              { z: -RING_STEP * 5,  text: '工藝精準',    sub: 'CRAFTSMANSHIP'        },
              { z: -RING_STEP * 8,  text: '誠信透明',    sub: 'TRANSPARENCY'         },
              { z: -RING_STEP * 11, text: '空間落地',    sub: 'SPACE REALIZATION'    },
            ].map((label, i) => (
              <div
                key={`lbl-${i}`}
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  transform:       `translate3d(-50%, -50%, ${label.z}px)`,
                  transformStyle:  'preserve-3d',
                  textAlign:       'center',
                  pointerEvents:   'none',
                  userSelect:      'none',
                }}
              >
                <div style={{
                  fontSize:      'clamp(1.1rem, 3.5vw, 2.8rem)',
                  fontWeight:    700,
                  letterSpacing: '0.12em',
                  color:         GOLD,
                  textShadow:    `0 0 40px rgba(197,168,128,0.9), 0 0 80px rgba(197,168,128,0.4)`,
                  opacity:       0.85,
                  lineHeight:    1.1,
                }}>
                  {label.text}
                </div>
                <div style={{
                  fontSize:      'clamp(0.5rem, 1.2vw, 0.85rem)',
                  fontWeight:    200,
                  letterSpacing: '0.35em',
                  color:         'rgba(197,168,128,0.55)',
                  marginTop:     '0.4em',
                  textTransform: 'uppercase',
                }}>
                  {label.sub}
                </div>
              </div>
            ))}

            {/* Dust particles scattered along corridor */}
            <div
              ref={particlesRef}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
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

          {/* ── Scroll hint at bottom ── */}
          <div style={{
            position:      'absolute',
            bottom:        'clamp(1.5rem, 4vh, 2.5rem)',
            left:          '50%',
            transform:     'translateX(-50%)',
            zIndex:        40,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '0.5rem',
            pointerEvents: 'none',
          }}>
            <span style={{
              fontSize:      'clamp(9px, 1.1vw, 11px)',
              letterSpacing: '0.28em',
              color:         'rgba(197,168,128,0.5)',
              fontWeight:    200,
              textTransform: 'uppercase',
            }}>
              Scroll to enter
            </span>
            {/* Animated chevron */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(197,168,128,0.45)', fontSize: '1rem' }}
            >
              ↓
            </motion.div>
          </div>

          {/* ══ BRANDING REVEAL ══
              Sits inside the fixed viewport, opacity:0 until GSAP fires
          ══ */}
          <div
            ref={brandingRef}
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              textAlign:      'center',
              padding:        'clamp(1.5rem,5vw,4rem)',
              background:     'radial-gradient(ellipse at center, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.97) 100%)',
              opacity:        0,      /* GSAP animates this */
              zIndex:         50,
              pointerEvents:  'none',
            }}
          >
            {/* Top ornament line */}
            <motion.div
              style={{
                width:           'clamp(30px,6vw,60px)',
                height:          '1px',
                backgroundColor: GOLD,
                marginBottom:    'clamp(1.2rem,3vw,2rem)',
              }}
            />

            {/* Kanji company name */}
            <h1 style={{
              fontSize:      'clamp(2.5rem, 9vw, 7rem)',
              fontWeight:    900,
              letterSpacing: '-0.02em',
              lineHeight:    0.95,
              color:         GOLD,
              textShadow:    `0 0 80px rgba(197,168,128,0.95), 0 0 160px rgba(197,168,128,0.45), 0 0 300px rgba(197,168,128,0.25)`,
              margin:        0,
            }}>
              南源木材
            </h1>

            {/* English subtitle */}
            <p style={{
              fontSize:      'clamp(0.6rem, 1.6vw, 1rem)',
              fontWeight:    200,
              letterSpacing: '0.45em',
              color:         'rgba(197,168,128,0.65)',
              margin:        'clamp(0.8rem,2vw,1.4rem) 0',
              textTransform: 'uppercase',
            }}>
              NANYUAN TIMBER DESIGN
            </p>

            {/* Bottom ornament line */}
            <div style={{
              width:           'clamp(30px,6vw,60px)',
              height:          '1px',
              backgroundColor: 'rgba(197,168,128,0.35)',
              marginBottom:    'clamp(1.5rem,3.5vw,2.5rem)',
            }} />

            {/* Tagline */}
            <p style={{
              fontSize:      'clamp(0.8rem, 1.3vw, 1rem)',
              fontWeight:    300,
              letterSpacing: '0.1em',
              color:         'rgba(255,255,255,0.5)',
              maxWidth:      '520px',
              lineHeight:    1.9,
              margin:        '0 0 clamp(2rem,4vw,3rem)',
            }}>
              從材料源頭開始，打造安心落地的空間
            </p>

            {/* CTA buttons */}
            <div style={{
              display:        'flex',
              gap:            '1rem',
              flexWrap:       'wrap',
              justifyContent: 'center',
              pointerEvents:  'auto',
            }}>
              <button
                onClick={scrollToContent}
                style={{
                  fontSize:        'clamp(0.7rem,1.1vw,0.85rem)',
                  letterSpacing:   '0.14em',
                  padding:         '0.8em 2.2em',
                  border:          `1px solid ${GOLD}`,
                  color:           GOLD,
                  backgroundColor: 'transparent',
                  cursor:          'pointer',
                  transition:      'background 0.3s',
                  textTransform:   'uppercase',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(197,168,128,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                探索南源工藝 ➔
              </button>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  fontSize:        'clamp(0.7rem,1.1vw,0.85rem)',
                  letterSpacing:   '0.14em',
                  padding:         '0.8em 2.2em',
                  border:          `1px solid ${GOLD}`,
                  color:           '#050505',
                  backgroundColor: GOLD,
                  cursor:          'pointer',
                  fontWeight:      700,
                  transition:      'box-shadow 0.3s',
                  textTransform:   'uppercase',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(197,168,128,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                立即預約諮詢
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END scrollTrackRef — content below appears after tunnel */}


      {/* ══ BLOCK 2: THREE CORE ADVANTAGES ══ */}
      <section
        className="advantages-section w-100 py-5"
        style={{ backgroundColor: '#0D0D0E', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container py-4 py-lg-5">
          <FadeInSection className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.02em', color: GOLD, textShadow: '0 0 30px rgba(197,168,128,0.5)' }}>
              三大核心優勢
            </h2>
            <p className="mx-auto" style={{ fontSize: 'clamp(0.85rem,1.5vw,1.05rem)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '600px' }}>
              從選材到施工，南源以三大核心堅持，為您打造安心穩定的裝修體驗。
            </p>
          </FadeInSection>

          <div className="row g-4 justify-content-center">
            {[
              { icon: <Trees size={32} style={{ color: GOLD }} />, title: '源頭理解', desc: '擁有深厚的木材與材料背景，從源頭精準理解各種材料的物理特性與適用性，為您的空間挑選最合適、最耐用的高品質用料。' },
              { icon: <ShieldCheck size={32} style={{ color: GOLD }} />, title: '細節品質', desc: '在每一項施工環節皆設立嚴格的檢核點，尤其是防水、木作與油漆工程，我們堅持多次逐項驗收，不放過任何影響居住安全的微小細節。' },
              { icon: <ClipboardCheck size={32} style={{ color: GOLD }} />, title: '誠信透明', desc: '提供完全透明、逐項列出的工程報價單，簽約金額即為最終造價，絕不惡意追加任何隱藏預算；施工過程全程記錄，讓您住得安心、放心。' },
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <FadeInSection delay={i * 0.15}>
                  <div
                    className="p-4 p-lg-5 h-100 rounded-1"
                    style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(197,168,128,0.1)', boxShadow: '0 4px 30px rgba(0,0,0,0.2)', transition: 'all 0.4s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = GOLD; el.style.backgroundColor = 'rgba(197,168,128,0.05)'; el.style.boxShadow = '0 10px 30px rgba(197,168,128,0.15)'; el.style.transform = 'translateY(-5px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(197,168,128,0.1)'; el.style.backgroundColor = 'rgba(255,255,255,0.02)'; el.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)'; el.style.transform = 'translateY(0)'; }}
                  >
                    <div className="d-flex align-items-center justify-content-center mb-4 rounded-circle mx-auto"
                      style={{ width: '70px', height: '70px', backgroundColor: 'rgba(197,168,128,0.1)' }}>
                      {item.icon}
                    </div>
                    <h3 className="text-center mb-3" style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 600, color: GOLD }}>{item.title}</h3>
                    <p style={{ fontSize: 'clamp(0.85rem,1.2vw,0.95rem)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'justify', margin: 0 }}>{item.desc}</p>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOCK 3: SERVICES ══ */}
      <ServicesSection />

      {/* ══ BLOCK 4: BEFORE / AFTER ══ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#050505' }}>
        <div className="container py-4">
          <FadeInSection>
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', letterSpacing: '-0.05em', color: GOLD, textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>
              設計與落地的真實對照
            </h2>
            <p className="mb-4" style={{ fontSize: 'clamp(0.85rem,1.5vw,1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', maxWidth: '750px', lineHeight: 1.8 }}>
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證老屋翻修前後的精準落地對照。
            </p>
          </FadeInSection>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* ══ BLOCK 5: PORTFOLIO WALL ══ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#0D0D0E' }}>
        <div className="container py-4">
          <FadeInSection className="mb-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', letterSpacing: '-0.05em', color: GOLD, textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>
              極精選作品
            </h2>
            <p style={{ fontSize: 'clamp(0.85rem,1.5vw,1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
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
                      <img src={item.img} className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.7, transition: 'all 0.7s' }} alt={item.title}
                        onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '1'; (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.7'; (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.3) 50%, transparent 100%)', opacity: 0.8 }} />
                      <div className="position-absolute bottom-0 start-0 p-3 p-md-4">
                        <span className="d-block mb-1" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase' }}>{item.type}</span>
                        <h3 style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOCK 6: CTA ══ */}
      <section className="position-relative w-100 overflow-hidden" style={{ height: 'clamp(400px,70vh,80vh)' }}>
        <img src="/images/style_luxury_dark_1779301949701.png" className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover', opacity: 0.4 }} alt="" />
        <div className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.3) 100%)' }} />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-md-5">
          <FadeInSection>
            <h2 className="fw-bold mb-3 mb-md-4" style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', letterSpacing: '-0.05em', color: GOLD, textShadow: '0 0 50px rgba(197,168,128,0.9)', lineHeight: 1.1 }}>
              開啟您的空間之旅
            </h2>
            <p className="mx-auto mb-4 mb-md-5" style={{ fontSize: 'clamp(0.85rem,1.5vw,1.15rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.8 }}>
              從一次免費諮詢開始，讓南源的頂級職人為您的夢想空間量身打造。
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{ fontSize: 'clamp(0.8rem,1.5vw,1rem)', letterSpacing: '0.12em', padding: '0.85em 2.5em', border: `1px solid ${GOLD}`, color: '#fff', backgroundColor: 'rgba(197,168,128,0.15)', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#050505'; }}
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
