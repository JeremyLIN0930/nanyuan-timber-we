import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Services.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.85)';
// const GOLD_DIM  = 'rgba(197,168,128,0.10)'; // Commented out to avoid unused local compilation error
const GOLD_WIRE = 'rgba(197,168,128,0.30)';
const BG        = '#050505';
const BG_CARD   = '#0D0D0E';
const BORDER    = 'rgba(255,255,255,0.07)';
const TEXT_DIM  = 'rgba(255,255,255,0.38)';
const TEXT_MID  = 'rgba(255,255,255,0.62)';

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════ */
interface RevealProps {
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DATA — SERVICE CARDS
═══════════════════════════════════════════════════════════════ */
const SERVICE_CARDS = [
  {
    id:    '01',
    title: '空間意境規劃',
    en:    'SPACE & AMBIANCE DESIGN',
    desc:  '從動線配置到風格定調，將您對空間的每一絲想像，轉化為具有呼吸感的建築意境。',
  },
  {
    id:    '02',
    title: '職人選材與木作藝廊',
    en:    'MATERIAL CURATION',
    desc:  '擁有深厚木材背景，嚴選 FSC 永續認證原木、義大利頂級礦物塗料與進口石材，為空間挑選最合適的傳世肌理。',
  },
  {
    id:    '03',
    title: '精湛統包施工',
    en:    'TURNKEY CRAFTSMANSHIP',
    desc:  '自有專業工班與現場總監全程監督，嚴格執行防水蓄水測試、木作封邊與油漆側光打磨。設計圖面精準落地，所見即所得。',
  },
];

/* ═══════════════════════════════════════════════════════════════
   DATA — PROCESS STEPS
═══════════════════════════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    num:   '01',
    title: '初步諮詢',
    en:    'BESPOKE CONSULTATION',
    desc:  '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。',
  },
  {
    num:   '02',
    title: '現場勘測',
    en:    'PRECISION SITE SURVEY',
    desc:  '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。',
  },
  {
    num:   '03',
    title: '設計提案',
    en:    'CONCEPT & SPACE DESIGN',
    desc:  '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現每一個居住夢想的精品品味。',
  },
  {
    num:   '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點與工程進度，簽署正式工程合約，絕無隱藏追加。',
  },
  {
    num:   '05',
    title: '精湛施工',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。',
  },
  {
    num:   '06',
    title: '完工驗收',
    en:    'PERFECT HANDOVER',
    desc:  '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICE FEATURE CARD  (hover state)
═══════════════════════════════════════════════════════════════ */
const ServiceCard: React.FC<{ card: typeof SERVICE_CARDS[0]; delay: number }> = ({ card, delay }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Reveal delay={delay}>
      <motion.article
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()   => setHovered(false)}
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding:              'clamp(1.8rem, 2.8vw, 2.8rem)',
          backgroundColor:      hovered
            ? `rgba(197,168,128,0.06)`
            : BG_CARD,
          border:               `1px solid ${hovered ? GOLD_WIRE : BORDER}`,
          boxShadow:            hovered
            ? `0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,168,128,0.22)`
            : '0 6px 24px rgba(0,0,0,0.4)',
          backdropFilter:       'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition:           'box-shadow 0.42s ease, background-color 0.42s ease, border-color 0.42s ease',
          height:               '100%',
          display:              'flex',
          flexDirection:        'column',
          gap:                  '14px',
        }}
      >
        {/* Step number watermark */}
        <span
          style={{
            fontSize:      'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight:    900,
            letterSpacing: '-0.06em',
            color:         hovered ? GOLD : 'rgba(197,168,128,0.18)',
            textShadow:    hovered ? `0 0 28px ${GOLD_GLOW}` : 'none',
            lineHeight:    1,
            transition:    'color 0.4s, text-shadow 0.4s',
            userSelect:    'none',
          }}
        >
          {card.id}
        </span>

        {/* Animated separator wire */}
        <div
          style={{
            width:           hovered ? '100%' : '36px',
            height:          '1px',
            backgroundColor: hovered ? GOLD : GOLD_WIRE,
            boxShadow:       hovered ? `0 0 8px rgba(197,168,128,0.7)` : 'none',
            transition:      'width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.4s, box-shadow 0.4s',
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontSize:      'clamp(1.05rem, 1.7vw, 1.3rem)',
            fontWeight:    900,
            letterSpacing: '-0.025em',
            color:         hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
            textShadow:    hovered ? '0 0 18px rgba(255,255,255,0.18)' : 'none',
            margin:        0,
            transition:    'color 0.4s, text-shadow 0.4s',
          }}
        >
          {card.title}
        </h3>

        {/* English label */}
        <span
          style={{
            fontSize:      '9px',
            fontWeight:    300,
            letterSpacing: '0.22em',
            color:         hovered ? 'rgba(197,168,128,0.75)' : TEXT_DIM,
            textTransform: 'uppercase',
            transition:    'color 0.4s',
          }}
        >
          {card.en}
        </span>

        {/* Description */}
        <p
          style={{
            fontSize:      'clamp(0.82rem, 1.15vw, 0.9rem)',
            fontWeight:    300,
            letterSpacing: '0.04em',
            color:         hovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.45)',
            lineHeight:    1.85,
            margin:        0,
            textAlign:     'justify',
            transition:    'color 0.4s',
          }}
        >
          {card.desc}
        </p>
      </motion.article>
    </Reveal>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROCESS TIMELINE ITEM
═══════════════════════════════════════════════════════════════ */
const ProcessItem: React.FC<{ step: typeof PROCESS_STEPS[0]; delay: number; isLeft: boolean }> = ({
  step,
  delay,
  isLeft,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Reveal delay={delay} className={`services-timeline-item-wrapper ${isLeft ? 'item-left' : 'item-right'}`}>
      <motion.article
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()   => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding:              'clamp(1.5rem, 2.2vw, 2.2rem)',
          backgroundColor:      hovered ? 'rgba(197,168,128,0.05)' : BG_CARD,
          border:               `1px solid ${hovered ? GOLD_WIRE : BORDER}`,
          boxShadow:            hovered
            ? `0 10px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,168,128,0.2)`
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition:           'all 0.42s ease',
          textAlign:            isLeft ? 'right' : 'left',
        }}
      >
        {/* EN label */}
        <span
          style={{
            fontSize:      '9px',
            fontWeight:    300,
            letterSpacing: '0.22em',
            color:         hovered ? 'rgba(197,168,128,0.8)' : TEXT_DIM,
            textTransform: 'uppercase',
            display:       'block',
            marginBottom:  '6px',
            transition:    'color 0.4s',
          }}
        >
          {step.en}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize:      'clamp(1rem, 1.6vw, 1.25rem)',
            fontWeight:    900,
            letterSpacing: '-0.025em',
            color:         hovered ? '#fff' : 'rgba(255,255,255,0.88)',
            marginBottom:  '0.9rem',
            transition:    'color 0.4s',
          }}
        >
          {step.num} {step.title}
        </h3>

        {/* Bottom wire */}
        <div
          style={{
            width:           hovered ? '100%' : '28px',
            height:          '1px',
            backgroundColor: hovered ? GOLD : GOLD_WIRE,
            marginLeft:      isLeft ? 'auto' : 0,
            boxShadow:       hovered ? `0 0 8px rgba(197,168,128,0.6)` : 'none',
            transition:      'width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.4s',
            marginBottom:    '0.9rem',
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize:      'clamp(0.78rem, 1.1vw, 0.85rem)',
            fontWeight:    300,
            letterSpacing: '0.04em',
            color:         hovered ? TEXT_MID : 'rgba(255,255,255,0.45)',
            lineHeight:    1.85,
            margin:        0,
            textAlign:     'justify',
            transition:    'color 0.4s',
          }}
        >
          {step.desc}
        </p>
      </motion.article>
    </Reveal>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SERVICES PAGE
═══════════════════════════════════════════════════════════════ */
const Services: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}
    >

      {/* ══════════════════════════════════════════════════════
          LAYER 1 — HERO BANNER
          ─────────────────────────────────────────────────────
          BUG 1 FIX: The .services-hero class in Services.css
          now sets padding-top: 150px (desktop) / 110px (mobile)
          so the heading title always clears the fixed Navbar.
          Background image is set via inline style to guarantee
          it renders regardless of CSS load order.
      ══════════════════════════════════════════════════════ */}
      <section
        className="services-hero"
        style={{ backgroundImage: "url('/images/style_luxury_dark_1779301949701.png')" }}
      >
        {/* Gradient overlay — CSS handled in Services.css */}
        <div className="services-hero-overlay" />

        <div className="services-hero-content">
          {/* Eyebrow line */}
          <div className="services-hero-eyebrow">
            <div className="services-hero-eyebrow-line" />
            <span className="services-hero-eyebrow-text">NANYUAN SERVICE</span>
          </div>

          {/* Main heading */}
          <h1 className="services-hero-title">服務項目與流程</h1>

          {/* Subtitle */}
          <p className="services-hero-subtitle">
            南源木材高端室內設計統包翻修，自有工班現場總監全程監督，報價逐項列出誠信透明。
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — THREE CORE SERVICE CARDS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding:         'clamp(4rem, 10vh, 7rem) 0',
          backgroundColor: BG,
        }}
      >
        <div className="container px-3 px-md-4">

          {/* Section heading */}
          <Reveal>
            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '14px',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width:           'clamp(24px, 4vw, 40px)',
                  height:          '1px',
                  backgroundColor: GOLD,
                  boxShadow:       `0 0 8px ${GOLD_GLOW}`,
                }}
              />
              <span
                style={{
                  fontSize:      '10px',
                  fontWeight:    300,
                  letterSpacing: '0.28em',
                  color:         'rgba(197,168,128,0.65)',
                  textTransform: 'uppercase',
                }}
              >
                CORE SERVICES
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              style={{
                fontSize:      'clamp(1.8rem, 4vw, 3rem)',
                fontWeight:    900,
                letterSpacing: '-0.04em',
                color:         GOLD,
                textShadow:    `0 0 30px rgba(197,168,128,0.5)`,
                marginBottom:  'clamp(2.5rem, 5vh, 4rem)',
              }}
            >
              三大核心服務
            </h2>
          </Reveal>

          <div className="row g-4">
            {SERVICE_CARDS.map((card, i) => (
              <div className="col-12 col-lg-4" key={card.id}>
                <ServiceCard card={card} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LAYER 3 — SIX-STEP PROCESS TIMELINE
          Desktop: alternating zigzag (left / right cards)
          Mobile:  single column via CSS class overrides
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding:         'clamp(4rem, 10vh, 7rem) 0',
          backgroundColor: '#0D0D0E',
          borderTop:       `1px solid ${BORDER}`,
          borderBottom:    `1px solid ${BORDER}`,
        }}
      >
        <div className="container px-3 px-md-4">

          {/* Section heading */}
          <Reveal>
            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '14px',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width:           'clamp(24px, 4vw, 40px)',
                  height:          '1px',
                  backgroundColor: GOLD,
                  boxShadow:       `0 0 8px ${GOLD_GLOW}`,
                }}
              />
              <span
                style={{
                  fontSize:      '10px',
                  fontWeight:    300,
                  letterSpacing: '0.28em',
                  color:         'rgba(197,168,128,0.65)',
                  textTransform: 'uppercase',
                }}
              >
                BESPOKE PROCESS
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              style={{
                fontSize:      'clamp(1.8rem, 4vw, 3rem)',
                fontWeight:    900,
                letterSpacing: '-0.04em',
                color:         GOLD,
                textShadow:    `0 0 30px rgba(197,168,128,0.5)`,
                marginBottom:  '0.5rem',
              }}
            >
              六大職人服務流程
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              style={{
                fontSize:      'clamp(0.8rem, 1.2vw, 0.92rem)',
                fontWeight:    300,
                letterSpacing: '0.18em',
                color:         TEXT_DIM,
                textTransform: 'uppercase',
                marginBottom:  'clamp(3rem, 6vh, 5rem)',
              }}
            >
              From Concept to Flawless Execution
            </p>
          </Reveal>

          {/*
            Zigzag timeline layout.
            The .services-timeline-grid class in CSS provides:
              Desktop (≥ 992px): CSS grid with centre line and
                alternating left/right placement.
              Mobile (< 992px):  single column, centre line
                becomes a left-side track.
          */}
          <div className="services-timeline-grid">

            {/* Central golden spine line (desktop) */}
            <div className="services-timeline-spine" />

            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.num} className={`services-timeline-row ${isLeft ? 'row-left' : 'row-right'}`}>

                  {/* Node circle on the spine */}
                  <div className="services-timeline-node">
                    <span className="services-timeline-node-num">{step.num}</span>
                  </div>

                  {/* Card */}
                  <div className={`services-timeline-cell ${isLeft ? 'cell-left' : 'cell-right'}`}>
                    <ProcessItem step={step} delay={i * 0.07} isLeft={isLeft} />
                  </div>

                  {/* Spacer — opposite side (desktop only, hidden mobile) */}
                  <div className="services-timeline-spacer" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LAYER 4 — SINGLE UNIFIED CTA BLOCK
          ─────────────────────────────────────────────────────
          BUG 2 FIX: Only ONE CTA block exists in this file.
          The duplicate that was caused by merging Services and
          Process pages has been removed entirely.
          margin-top: 120px gives a premium magazine-style
          breathing gap above the section.
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          marginTop:       '120px',
          marginBottom:    'clamp(4rem, 8vh, 6rem)',
          padding:         '0',
        }}
      >
        <div className="container px-3 px-md-4">
          <Reveal>
            <div
              style={{
                textAlign:    'center',
                padding:      'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
                border:       `1px solid rgba(197,168,128,0.22)`,
                background:   'rgba(10,10,10,0.55)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow:    '0 8px 48px rgba(0,0,0,0.5)',
              }}
            >

              {/* Eyebrow ornament */}
              <div
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '16px',
                  marginBottom:   '1.5rem',
                }}
              >
                <div style={{ width: '40px', height: '1px', backgroundColor: GOLD_WIRE }} />
                <span
                  style={{
                    fontSize:      '9.5px',
                    fontWeight:    300,
                    letterSpacing: '0.28em',
                    color:         'rgba(197,168,128,0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  START YOUR JOURNEY
                </span>
                <div style={{ width: '40px', height: '1px', backgroundColor: GOLD_WIRE }} />
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize:      'clamp(1.8rem, 5vw, 3.5rem)',
                  fontWeight:    900,
                  letterSpacing: '-0.05em',
                  lineHeight:    1.1,
                  color:         GOLD,
                  textShadow:    `0 0 50px ${GOLD_GLOW}, 0 0 80px rgba(197,168,128,0.3)`,
                  marginBottom:  '1.25rem',
                }}
              >
                準備好開始您的空間改造了嗎？
              </h2>

              {/* Body copy */}
              <p
                style={{
                  fontSize:      'clamp(0.88rem, 1.5vw, 1.05rem)',
                  fontWeight:    300,
                  letterSpacing: '0.06em',
                  color:         TEXT_MID,
                  lineHeight:    1.9,
                  maxWidth:      '560px',
                  margin:        '0 auto 2.5rem',
                }}
              >
                結合木材背景與工藝，南源從設計、選材到施工，提供一條龍的高級室內裝修落地服務。
              </p>

              {/* Three CTA buttons */}
              <nav
                aria-label="預約服務快速連結"
                style={{
                  display:        'flex',
                  flexWrap:       'wrap',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '1rem',
                }}
              >
                {/* Primary — gold fill */}
                <Link
                  to="/contact"
                  style={{
                    display:         'inline-block',
                    fontSize:        'clamp(0.82rem, 1.2vw, 0.95rem)',
                    fontWeight:      900,
                    letterSpacing:   '0.14em',
                    padding:         '0.9em 2.5em',
                    backgroundColor: GOLD,
                    color:           '#050505',
                    border:          `1px solid ${GOLD}`,
                    textDecoration:  'none',
                    textTransform:   'uppercase',
                    transition:      'box-shadow 0.3s',
                    whiteSpace:      'nowrap',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(197,168,128,0.65)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  立即預約諮詢 ➜
                </Link>

                {/* Secondary — outline */}
                <Link
                  to="/projects"
                  style={{
                    display:         'inline-block',
                    fontSize:        'clamp(0.82rem, 1.2vw, 0.95rem)',
                    fontWeight:      300,
                    letterSpacing:   '0.14em',
                    padding:         '0.9em 2.5em',
                    backgroundColor: 'transparent',
                    color:           'rgba(255,255,255,0.75)',
                    border:          `1px solid rgba(255,255,255,0.22)`,
                    textDecoration:  'none',
                    textTransform:   'uppercase',
                    transition:      'border-color 0.3s, color 0.3s',
                    whiteSpace:      'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.color       = GOLD;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.75)';
                  }}
                >
                  查看作品案例
                </Link>

                {/* LINE — outline, green accent on hover */}
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:         'inline-block',
                    fontSize:        'clamp(0.82rem, 1.2vw, 0.95rem)',
                    fontWeight:      300,
                    letterSpacing:   '0.14em',
                    padding:         '0.9em 2.5em',
                    backgroundColor: 'transparent',
                    color:           'rgba(255,255,255,0.75)',
                    border:          `1px solid rgba(255,255,255,0.22)`,
                    textDecoration:  'none',
                    textTransform:   'uppercase',
                    transition:      'border-color 0.3s, color 0.3s',
                    whiteSpace:      'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#06C755';
                    e.currentTarget.style.color       = '#06C755';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.75)';
                  }}
                >
                  加入 LINE 詢問
                </a>
              </nav>

            </div>
          </Reveal>
        </div>
      </section>

    </motion.main>
  );
};

export default Services;
