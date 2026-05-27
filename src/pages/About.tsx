import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import './About.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.85)';
// GOLD_DIM unused — kept as reference only
// const GOLD_DIM  = 'rgba(197,168,128,0.10)';
const GOLD_WIRE = 'rgba(197,168,128,0.30)';
const BG        = '#050505';
const BG_CARD   = 'rgba(15,15,15,0.60)';
const BORDER    = 'rgba(255,255,255,0.07)';
const TEXT_DIM  = 'rgba(255,255,255,0.38)';
const TEXT_MID  = 'rgba(255,255,255,0.62)';

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  { src: '/images/luxury_tianmu_home_1779301841564.png', caption: '天母森光 — 全屋統包典範'   },
  { src: '/images/style_luxury_dark_1779301949701.png',  caption: '奢華暗灰 — 精品格柵工藝'  },
  { src: '/images/japanese_wabi_sabi_1779301881798.png', caption: '侘寂茶韻 — 礦物手刷美學'  },
];

const STATS = [
  { num: '30+',  label: '年產業經驗',   en: 'YEARS EXPERTISE'   },
  { num: '500+', label: '完工案例',     en: 'PROJECTS COMPLETED' },
  { num: '0',    label: '惡意追加紀錄', en: 'HIDDEN EXTRA COSTS' },
];

const VALUES = [
  {
    id:    '01',
    title: '材料源頭',
    desc:  '深耕木材與建材產業逾三十年，我們從源頭理解每一種素材的物理特性、耐用極限與美學語彙，讓選材決策準確到位。',
  },
  {
    id:    '02',
    title: '工藝細節',
    desc:  '每一個收邊、每一道防水、每一塊木地板的紋理配對，皆由資深職人親手把關。細節不妥協，是我們對每個案場的基本承諾。',
  },
  {
    id:    '03',
    title: '誠信透明',
    desc:  '工程報價逐項條列，簽約金額即最終造價。施工期間每日上傳進度照片，讓您足不出戶掌握每一個工法節點。',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════ */
const Reveal: React.FC<{
  children:   React.ReactNode;
  delay?:     number;
  from?:      'bottom' | 'left' | 'right';
  className?: string;
}> = ({ children, delay = 0, from = 'bottom', className = '' }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  const initial =
    from === 'left'  ? { opacity: 0, x: -48, y: 0 } :
    from === 'right' ? { opacity: 0, x:  48, y: 0 } :
                       { opacity: 0, x:   0, y: 44 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════════════════════════ */
const HeroSlider: React.FC = () => {
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setActive(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, scale: dir > 0 ? 1.06 : 0.96, x: dir > 0 ? 40 : -40 }),
    center: ()            => ({ opacity: 1, scale: 1,                      x: 0 }),
    exit:   (dir: number) => ({ opacity: 0, scale: dir > 0 ? 0.96 : 1.06, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section
      className="about-hero-section"
      style={{
        position:        'relative',
        width:           '100%',
        height:          '100vh',
        minHeight:       '560px',
        overflow:        'hidden',
        backgroundColor: BG,
      }}
    >
      {/* ── Background slide images ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url('${HERO_SLIDES[active].src}')`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            backgroundRepeat:   'no-repeat',
            willChange:         'transform, opacity',
          }}
        />
      </AnimatePresence>

      {/* ── Multi-layer gradient ── */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          background:    `
            linear-gradient(to bottom, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.3) 40%, transparent 70%),
            linear-gradient(to top,    ${BG} 0%,  rgba(5,5,5,0.55) 30%, transparent 60%),
            linear-gradient(to right,  rgba(5,5,5,0.50) 0%, transparent 55%)
          `,
          zIndex:        2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero copy block ── */}
      <div className="about-hero-copy" style={{ zIndex: 5 }}>

        {/* Eyebrow */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.1rem' }}>
            <div style={{ width: 'clamp(20px,3.5vw,36px)', height: '1px', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', color: 'rgba(197,168,128,0.75)', textTransform: 'uppercase' }}>
              ABOUT NANYUAN
            </span>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.08}>
          <h1
            className="about-hero-title"
            style={{
              fontWeight:    900,
              letterSpacing: '-0.06em',
              lineHeight:    0.92,
              color:         '#fff',
              textShadow:    '0 0 40px rgba(0,0,0,0.6)',
              margin:        0,
            }}
          >
            關於<br />
            <span style={{ color: GOLD, textShadow: `0 0 50px ${GOLD_GLOW}` }}>南源</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.16}>
          <p style={{
            fontSize:      'clamp(0.9rem,1.8vw,1.2rem)',
            fontWeight:    300,
            letterSpacing: '0.1em',
            color:         'rgba(255,255,255,0.72)',
            lineHeight:    1.75,
            marginTop:     '1.25rem',
            marginBottom:  0,
          }}>
            從材料源頭到空間落地，我們懂木，更懂您。
          </p>
        </Reveal>

        {/* Slide caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize:      '10px',
              fontWeight:    300,
              letterSpacing: '0.2em',
              color:         'rgba(197,168,128,0.55)',
              textTransform: 'uppercase',
              marginTop:     '1.2rem',
              marginBottom:  0,
            }}
          >
            {HERO_SLIDES[active].caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Dot pagination ── */}
      <div
        style={{
          position:   'absolute',
          bottom:     'clamp(28px,5vh,48px)',
          left:       'clamp(20px,6vw,80px)',
          zIndex:     5,
          display:    'flex',
          alignItems: 'center',
          gap:        '10px',
        }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`切換至第 ${i + 1} 張`}
            style={{
              width:           i === active ? '28px' : '6px',
              height:          '6px',
              borderRadius:    '4px',
              border:          'none',
              padding:         0,
              cursor:          'pointer',
              backgroundColor: i === active ? GOLD : 'rgba(197,168,128,0.3)',
              boxShadow:       i === active ? `0 0 10px rgba(197,168,128,0.7)` : 'none',
              transition:      'all 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
        <span style={{
          marginLeft:    '8px',
          fontSize:      '10px',
          fontWeight:    300,
          letterSpacing: '0.18em',
          color:         TEXT_DIM,
        }}>
          {String(active + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:   'absolute',
          bottom:     'clamp(28px,5vh,48px)',
          right:      'clamp(20px,5vw,60px)',
          zIndex:     5,
          color:      'rgba(197,168,128,0.45)',
          fontSize:   '1.1rem',
          lineHeight: 1,
        }}
      >
        ↓
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════════ */
const StatsBar: React.FC = () => (
  <Reveal>
    <div
      className="row g-0"
      style={{
        border:               `1px solid ${GOLD_WIRE}`,
        background:           'rgba(10,10,10,0.55)',
        backdropFilter:       'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.en}
          className="col-12 col-md-4 about-stat-cell"
          style={{
            padding:     'clamp(1.4rem,3vw,2.2rem) clamp(1.5rem,3.5vw,3rem)',
            borderRight: i < 2 ? `1px solid ${GOLD_WIRE}` : 'none',
            textAlign:   'center',
          }}
        >
          <div style={{
            fontSize:      'clamp(2.2rem,5vw,3.4rem)',
            fontWeight:    900,
            letterSpacing: '-0.05em',
            color:         GOLD,
            textShadow:    `0 0 30px rgba(197,168,128,0.6)`,
            lineHeight:    1,
            marginBottom:  '0.4rem',
          }}>
            {s.num}
          </div>
          <div style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.04em' }}>
            {s.label}
          </div>
          <div style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', color: TEXT_DIM, textTransform: 'uppercase', marginTop: '3px' }}>
            {s.en}
          </div>
        </div>
      ))}
    </div>
  </Reveal>
);

/* ═══════════════════════════════════════════════════════════════
   STORY SECTION
═══════════════════════════════════════════════════════════════ */
const StorySection: React.FC = () => (
  <section style={{ padding: 'clamp(4rem,10vh,8rem) 0' }}>
    <div className="container px-3 px-md-4">

      <Reveal>
        <p style={{
          fontSize:      'clamp(1.3rem,3.5vw,2.2rem)',
          fontWeight:    300,
          letterSpacing: '-0.02em',
          lineHeight:    1.55,
          color:         'rgba(255,255,255,0.88)',
          maxWidth:      '820px',
          marginBottom:  'clamp(2rem,5vh,3.5rem)',
        }}>
          早期深耕木材與建築材料領域，擁有超過三十年的產業資歷。我們看過無數材料的優劣，深知一塊好木頭如何決定一個空間的生命力與溫度。
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{
          fontSize:      'clamp(0.9rem,1.5vw,1.05rem)',
          fontWeight:    300,
          letterSpacing: '0.06em',
          lineHeight:    2,
          color:         TEXT_MID,
          maxWidth:      '680px',
          borderLeft:    `3px solid ${GOLD}`,
          paddingLeft:   '1.5rem',
          boxShadow:     `-4px 0 18px rgba(197,168,128,0.2)`,
        }}>
          我們承諾，每一個細節都經得起時間的考驗，讓您的空間不只是居住，更是世代安心的歸宿。南源不只提供工程，更是您打造傳世私人空間最值得信賴的職人夥伴。
        </p>
      </Reveal>

      <div style={{ marginTop: 'clamp(3rem,7vh,5rem)' }}>
        <StatsBar />
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   VALUES SECTION
═══════════════════════════════════════════════════════════════ */
const ValuesSection: React.FC = () => (
  <section style={{
    padding:         'clamp(4rem,10vh,8rem) 0',
    backgroundColor: '#0D0D0E',
    borderTop:       `1px solid ${BORDER}`,
    borderBottom:    `1px solid ${BORDER}`,
  }}>
    <div className="container px-3 px-md-4">

      <Reveal className="mb-5">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
          <div style={{ width: 'clamp(24px,4vw,40px)', height: '1px', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', color: 'rgba(197,168,128,0.65)', textTransform: 'uppercase' }}>
            OUR CORE VALUES
          </span>
        </div>
        <h2 style={{
          fontSize:      'clamp(1.8rem,4vw,3rem)',
          fontWeight:    900,
          letterSpacing: '-0.04em',
          color:         GOLD,
          textShadow:    `0 0 30px rgba(197,168,128,0.5)`,
          margin:        0,
        }}>
          三大核心價值
        </h2>
      </Reveal>

      <div className="row g-4">
        {VALUES.map((v, i) => (
          <div className="col-12 col-md-4" key={v.id}>
            <Reveal delay={i * 0.12}>
              <ValueCard value={v} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ValueCard: React.FC<{ value: typeof VALUES[0] }> = ({ value }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      animate={{ y: hovered ? -5 : 0, borderColor: hovered ? GOLD : 'rgba(197,168,128,0.12)' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding:              'clamp(1.8rem,3vw,2.8rem)',
        background:           hovered ? `linear-gradient(145deg, rgba(197,168,128,0.08) 0%, ${BG_CARD} 100%)` : BG_CARD,
        border:               '1px solid rgba(197,168,128,0.12)',
        boxShadow:            hovered ? '0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,168,128,0.28), inset 0 0 30px rgba(197,168,128,0.04)' : '0 6px 24px rgba(0,0,0,0.4)',
        backdropFilter:       'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition:           'box-shadow 0.42s ease, background 0.42s ease',
        height:               '100%',
        display:              'flex',
        flexDirection:        'column',
        gap:                  '14px',
      }}
    >
      <span style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.06em', color: hovered ? GOLD : 'rgba(197,168,128,0.2)', textShadow: hovered ? `0 0 30px ${GOLD_GLOW}` : 'none', lineHeight: 1, transition: 'color 0.4s, text-shadow 0.4s', userSelect: 'none' }}>
        {value.id}
      </span>
      <div style={{ width: hovered ? '100%' : '36px', height: '1px', backgroundColor: hovered ? GOLD : GOLD_WIRE, boxShadow: hovered ? `0 0 8px rgba(197,168,128,0.7)` : 'none', transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.4s, box-shadow 0.4s' }} />
      <h3 style={{ fontSize: 'clamp(1.1rem,1.8vw,1.35rem)', fontWeight: 900, letterSpacing: '-0.025em', color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)', textShadow: hovered ? '0 0 18px rgba(255,255,255,0.18)' : 'none', margin: 0, transition: 'color 0.4s, text-shadow 0.4s' }}>
        {value.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.82rem,1.15vw,0.9rem)', fontWeight: 300, letterSpacing: '0.04em', color: hovered ? TEXT_MID : 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: 0, textAlign: 'justify', transition: 'color 0.4s' }}>
        {value.desc}
      </p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RINGS SECTION
═══════════════════════════════════════════════════════════════ */
const CSS_RINGS = [
  { size: 120, delay: '0s',   opacity: 0.50 },
  { size: 220, delay: '1.2s', opacity: 0.35 },
  { size: 330, delay: '2.4s', opacity: 0.22 },
  { size: 460, delay: '3.6s', opacity: 0.14 },
  { size: 600, delay: '4.8s', opacity: 0.08 },
];

const FM_RINGS = [
  { size: 400, borderOpacity: 0.45, shadowOpacity: 0.25, scrollStart: 0.20, scrollEnd: 0.65 },
  { size: 560, borderOpacity: 0.22, shadowOpacity: 0.12, scrollStart: 0.25, scrollEnd: 0.65 },
  { size: 720, borderOpacity: 0.10, shadowOpacity: 0.06, scrollStart: 0.30, scrollEnd: 0.65 },
];

const RingsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  });

  const scaleR = FM_RINGS.map(r =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [r.scrollStart, r.scrollEnd], [0, 1])
  );
  const opacR = FM_RINGS.map((r) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [r.scrollStart, r.scrollStart + 0.25], [0, 1])
  );

  return (
    <section
      ref={sectionRef}
      style={{
        padding:         'clamp(5rem,12vh,10rem) 0',
        backgroundColor: BG,
        overflow:        'hidden',
        position:        'relative',
      }}
    >
      <div className="container px-3 px-md-4">
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            position:       'relative',
            minHeight:      '560px',
          }}
        >
          {/* LAYER A: CSS-animated inner rings */}
          {CSS_RINGS.map((r, i) => (
            <div
              key={`css-ring-${i}`}
              className="about-ring-css"
              style={{
                position:       'absolute',
                top:            '50%',
                left:           '50%',
                width:          `${r.size}px`,
                height:         `${r.size}px`,
                marginTop:      `${-r.size / 2}px`,
                marginLeft:     `${-r.size / 2}px`,
                borderRadius:   '50%',
                border:         `1px solid rgba(197,168,128,${r.opacity})`,
                pointerEvents:  'none',
                animationDelay: r.delay,
                willChange:     'transform, opacity',
                transform:      'translate(0,0)',
              }}
            />
          ))}

          {/* LAYER B: Framer Motion scroll-driven outer rings */}
          {FM_RINGS.map((r, i) => (
            <motion.div
              key={`fm-ring-${i}`}
              style={{
                position:      'absolute',
                top:           '50%',
                left:          '50%',
                width:         `${r.size}px`,
                height:        `${r.size}px`,
                marginTop:     `${-r.size / 2}px`,
                marginLeft:    `${-r.size / 2}px`,
                borderRadius:  '50%',
                border:        `1px solid rgba(197,168,128,${r.borderOpacity})`,
                boxShadow:     `0 0 ${40 + i * 20}px rgba(197,168,128,${r.shadowOpacity})`,
                scale:         scaleR[i],
                opacity:       opacR[i],
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Centre text */}
          <Reveal>
            <div
              style={{
                textAlign: 'center',
                position:  'relative',
                zIndex:    2,
                padding:   '0 clamp(16px,5vw,48px)',
              }}
            >
              <h2 style={{
                fontSize:      'clamp(1.8rem,5vw,3.8rem)',
                fontWeight:    900,
                letterSpacing: '-0.05em',
                lineHeight:    1.1,
                color:         '#fff',
                textShadow:    '0 0 40px rgba(0,0,0,0.5)',
                marginBottom:  '1.2rem',
              }}>
                年輪，時間的印記。
              </h2>
              <p style={{
                fontSize:      'clamp(0.88rem,1.5vw,1.05rem)',
                fontWeight:    300,
                letterSpacing: '0.08em',
                color:         TEXT_MID,
                lineHeight:    1.9,
                maxWidth:      '480px',
                margin:        '0 auto',
              }}>
                一圈圈代表著我們對材料的深刻理解。<br />
                從源頭開始，為您的空間注入經久耐用的職人精神。
              </p>
              <div style={{
                width:           '1px',
                height:          'clamp(32px,5vw,56px)',
                backgroundColor: GOLD,
                boxShadow:       `0 0 12px ${GOLD_GLOW}`,
                margin:          '2rem auto 0',
              }} />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PHILOSOPHY SECTION
═══════════════════════════════════════════════════════════════ */
const PhilosophySection: React.FC = () => (
  <section style={{
    padding:    'clamp(4rem,10vh,8rem) 0',
    background: `linear-gradient(to bottom, #0D0D0E 0%, ${BG} 100%)`,
    borderTop:  `1px solid ${BORDER}`,
  }}>
    <div className="container px-3 px-md-4">
      <div className="row g-5 align-items-center">

        {/* Image */}
        <div className="col-12 col-lg-5">
          <Reveal from="left">
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="/images/renovation_detail.png"
                alt="南源職人現場工藝"
                style={{ width: '100%', height: 'clamp(280px,40vw,500px)', objectFit: 'cover', display: 'block', filter: 'brightness(0.72)', transition: 'filter 0.5s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.9)')}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.72)')}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '40px', borderLeft: `2px solid ${GOLD}`, borderBottom: `2px solid ${GOLD}`, boxShadow: `-2px 2px 16px rgba(197,168,128,0.4)` }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, boxShadow: `2px -2px 16px rgba(197,168,128,0.4)` }} />
            </div>
          </Reveal>
        </div>

        {/* Quote */}
        <div className="col-12 col-lg-7">
          <Reveal from="right" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '1px', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
              <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', color: 'rgba(197,168,128,0.65)', textTransform: 'uppercase' }}>OUR PHILOSOPHY</span>
            </div>
            <div style={{ fontSize: 'clamp(4rem,8vw,7rem)', fontWeight: 900, lineHeight: 0.7, color: GOLD_WIRE, marginBottom: '0.6rem', letterSpacing: '-0.04em', userSelect: 'none' }}>"</div>
            <blockquote style={{ fontSize: 'clamp(1rem,2.2vw,1.45rem)', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: '0 0 1.5rem', borderLeft: 'none', padding: 0 }}>
              裝修不是花錢買外表，而是花心思在對的地方。我們的工作，是讓每一分材料費都能轉化為您空間裡經得起歲月審視的細節。
            </blockquote>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: GOLD, textShadow: `0 0 12px rgba(197,168,128,0.5)`, textTransform: 'uppercase', margin: 0 }}>
              — 南源木材　創辦人
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════ */
const About: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}
  >
    <HeroSlider />
    <StorySection />
    <ValuesSection />
    <RingsSection />
    <PhilosophySection />
  </motion.div>
);

export default About;