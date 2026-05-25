import React, { useState, useRef } from 'react';
import { motion, useDragControls, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS & DESIGN CONSTANTS
═══════════════════════════════════════════════════════════════ */
const GOLD        = '#C5A880';
const GOLD_GLOW   = 'rgba(197,168,128,0.85)';
const GOLD_DIM    = 'rgba(197,168,128,0.1)';
const BG          = '#050505';
const BORDER      = 'rgba(255,255,255,0.06)';
const TEXT_DIM    = 'rgba(255,255,255,0.4)';

/* ── Reusable scroll reveal component ── */
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA ARRAY
═══════════════════════════════════════════════════════════════ */
interface ProcessStep {
  id:    string;
  title: string;
  en:    string;
  desc:  string;
}

const STEPS: ProcessStep[] = [
  {
    id:    '01',
    title: '初步諮詢',
    en:    'BESPOKE CONSULTATION',
    desc:  '傾聽您對場域的無限想像。從生活習性、動線期待到預算範疇，由專業顧問為您進行初步架構勾勒，梳理出最核心的工藝改造方向。'
  },
  {
    id:    '02',
    title: '現場勘測',
    en:    'PRECISION SITE SURVEY',
    desc:  '職人團隊親赴現場。利用高階雷射丈量儀器進行精確三維尺度記錄，並針對老屋結構、採光風向與水電隱蔽管線進行深度屋況全面診斷。'
  },
  {
    id:    '03',
    title: '設計提案',
    en:    'CONCEPT & SPACE DESIGN',
    desc:  '將想像轉化為精確的空間美學。提供客製化格局規劃、職人手作木料選配與立面視覺意境確立，讓木質溫潤與高端設計完美交融。'
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '堅持誠信透明。條列化詳盡工料報價、精確的工程進度查核點表確立，並提供正式法律效力合約簽署，給您最安心的品質承諾。'
  },
  {
    id:    '05',
    title: '精湛施工',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '南源自有工班、現場總監全程嚴格監督。從拆除工程、水電管線加固到最細膩的大木作木地板工法，皆由資深職人嚴格按圖步步落地。'
  },
  {
    id:    '06',
    title: '完工驗收',
    en:    'PERFECT HANDOVER',
    desc:  '100% 高規格三階段品質交叉檢驗。管線壓力測試、特殊漆面光影檢查、家具軟裝完美定位，以最無瑕的姿態將傳世私人空間交付您手中。'
  }
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Services: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handleDrag = (_event: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    let newPos = (x / rect.width) * 100;
    newPos = Math.max(5, Math.min(95, newPos));
    setSliderPos(newPos);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}
    >
      {/* CSS Injected Styles for Luxury Aesthetics & RWD Timeline */}
      <style>{`
        /* Timeline line/wire setups */
        .timeline-container {
          position: relative;
        }
        
        @media (max-width: 991.98px) {
          .timeline-container::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            width: 1px;
            background: linear-gradient(180deg, transparent, ${GOLD} 10%, ${GOLD} 90%, transparent);
            box-shadow: 0 0 8px ${GOLD_GLOW};
            z-index: 1;
          }
          .timeline-col {
            position: relative;
            padding-left: 60px !important;
          }
          .glow-dot-mobile {
            display: flex;
            position: absolute;
            left: 9px;
            top: 35px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: ${BG};
            border: 2px solid ${GOLD};
            box-shadow: 0 0 10px ${GOLD_GLOW};
            z-index: 10;
            align-items: center;
            justify-content: center;
          }
        }

        @media (min-width: 992px) {
          .timeline-row-1::before {
            content: '';
            position: absolute;
            top: 80px;
            left: 10%;
            right: 10%;
            height: 1px;
            background: linear-gradient(90deg, transparent, ${GOLD} 15%, ${GOLD} 85%, transparent);
            box-shadow: 0 0 8px ${GOLD_GLOW};
            z-index: 1;
          }
          .timeline-row-2::before {
            content: '';
            position: absolute;
            top: 80px;
            left: 10%;
            right: 10%;
            height: 1px;
            background: linear-gradient(90deg, transparent, ${GOLD} 15%, ${GOLD} 85%, transparent);
            box-shadow: 0 0 8px ${GOLD_GLOW};
            z-index: 1;
          }
        }

        /* Card custom styling */
        .process-card {
          background-color: rgba(15, 15, 15, 0.6);
          border: 1px solid ${BORDER};
          border-radius: 8px;
          padding: 2.5rem 2rem;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 2;
        }

        .process-card:hover {
          border-color: ${GOLD};
          background: linear-gradient(135deg, ${GOLD_DIM} 0%, rgba(15, 15, 15, 0.85) 100%);
          box-shadow: 0 16px 40px rgba(197, 168, 128, 0.15);
          transform: translateY(-4px);
        }

        .process-num {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          color: ${GOLD};
          text-shadow: 0 0 15px rgba(197, 168, 128, 0.4);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1;
        }
      `}</style>

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="container py-5" style={{ paddingTop: 'clamp(80px, 12vh, 140px)' }}>
        <FadeInSection>
          <div className="text-center mb-5">
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, marginBottom: '1rem' }}>
              服務項目與流程
            </h1>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
              從精密木作線條圖到無瑕的實景落地，拖曳下方滑桿，親眼見證南源對細節的精確雕琢。
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* ── 100vw Apple Split Slider ───────────────────── */}
      <section className="w-full relative overflow-hidden mb-5">
        <div 
          ref={containerRef}
          className="relative w-screen h-[55vh] md:h-[75vh] cursor-ew-resize overflow-hidden"
          onPointerDown={(e) => dragControls.start(e)}
        >
          {/* Right side: Finished Reality */}
          <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "url('/images/luxury_tianmu_home_1779301841564.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-10 right-10 text-white text-xs tracking-[0.25em] font-light bg-black/75 backdrop-blur-md px-5 py-3 border border-white/5">
              實景完工照 / REALITY
            </div>
          </div>

          {/* Left side: CAD Blueprint */}
          <div 
            className="absolute inset-0 w-full h-full" 
            style={{ 
              backgroundImage: "url('/images/modern_office_1779301899552.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) contrast(125%) brightness(70%)', 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 40, 120, 0.15)' }}></div>
            <div className="absolute bottom-10 left-10 text-white text-xs tracking-[0.25em] font-light bg-black/75 backdrop-blur-md px-5 py-3 border border-white/5">
              精密木作線條圖 / BLUEPRINT
            </div>
          </div>

          {/* Slider Handle */}
          <motion.div
            drag="x"
            dragControls={dragControls}
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            className="absolute top-0 bottom-0 w-[2px] cursor-ew-resize z-10"
            style={{ left: `${sliderPos}%`, x: '-50%', backgroundColor: GOLD, boxShadow: `0 0 25px ${GOLD_GLOW}` }}
          >
            <div className="absolute top-0 bottom-0 -left-6 w-12 cursor-ew-resize bg-transparent"></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border bg-black/90 backdrop-blur d-flex align-items-center justify-content-center"
              style={{ borderColor: GOLD, boxShadow: `0 0 20px ${GOLD_GLOW}` }}
            >
              <span className="text-xs" style={{ color: GOLD }}>⟨⟩</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Six Craftsmen Service Process Timeline ──────── */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, #050505 0%, #080809 100%)' }}>
        <div className="container px-3 px-md-4 py-5">
          
          <FadeInSection>
            <div className="mb-5 text-center text-lg-start">
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                六大職人服務流程
              </h2>
              <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)', fontWeight: 300, color: TEXT_DIM, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Bespoke Process — From Concept to Flawless Execution
              </p>
            </div>
          </FadeInSection>

          <div className="timeline-container">
            
            {/* ROW 1: Steps 01, 02, 03 */}
            <div className="row g-5 timeline-row-1 position-relative mb-0 mb-lg-5">
              {STEPS.slice(0, 3).map((step) => (
                <div className="col-12 col-lg-4 timeline-col" key={step.id}>
                  
                  {/* Desktop alignment glow dot */}
                  <div className="d-none d-lg-block position-absolute" style={{
                    top: '74px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: BG,
                    border: `2px solid ${GOLD}`,
                    boxShadow: `0 0 10px ${GOLD_GLOW}`,
                    zIndex: 10
                  }} />

                  {/* Mobile alignment glow dot */}
                  <div className="glow-dot-mobile">
                    <span style={{ fontSize: '9px', fontWeight: 900, color: GOLD }}>{step.id}</span>
                  </div>

                  <FadeInSection>
                    <div className="process-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="process-num font-black">{step.id}</span>
                        <span className="d-none d-lg-inline" style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.18)' }}>
                          NANYUAN TIMBER
                        </span>
                      </div>
                      
                      <h3 className="fs-4 text-white" style={{ fontWeight: 900, marginBottom: '4px' }}>
                        {step.title}
                      </h3>
                      <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, display: 'block', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                        {step.en}
                      </span>
                      
                      <p className="fs-6 font-light text-white/50 leading-relaxed m-0" style={{ textAlign: 'justify', letterSpacing: '0.05em' }}>
                        {step.desc}
                      </p>
                    </div>
                  </FadeInSection>

                </div>
              ))}
            </div>

            {/* ROW 2: Steps 04, 05, 06 */}
            <div className="row g-5 timeline-row-2 position-relative">
              {STEPS.slice(3, 6).map((step) => (
                <div className="col-12 col-lg-4 timeline-col" key={step.id}>
                  
                  {/* Desktop alignment glow dot */}
                  <div className="d-none d-lg-block position-absolute" style={{
                    top: '74px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: BG,
                    border: `2px solid ${GOLD}`,
                    boxShadow: `0 0 10px ${GOLD_GLOW}`,
                    zIndex: 10
                  }} />

                  {/* Mobile alignment glow dot */}
                  <div className="glow-dot-mobile">
                    <span style={{ fontSize: '9px', fontWeight: 900, color: GOLD }}>{step.id}</span>
                  </div>

                  <FadeInSection>
                    <div className="process-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="process-num font-black">{step.id}</span>
                        <span className="d-none d-lg-inline" style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.18)' }}>
                          NANYUAN TIMBER
                        </span>
                      </div>
                      
                      <h3 className="fs-4 text-white" style={{ fontWeight: 900, marginBottom: '4px' }}>
                        {step.title}
                      </h3>
                      <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, display: 'block', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                        {step.en}
                      </span>
                      
                      <p className="fs-6 font-light text-white/50 leading-relaxed m-0" style={{ textAlign: 'justify', letterSpacing: '0.05em' }}>
                        {step.desc}
                      </p>
                    </div>
                  </FadeInSection>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Consultation Button ─────────────────────── */}
      <div className="container py-5 text-center mt-5 mb-5">
        <FadeInSection>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            與南源職人攜手，構築您的傳世空間
          </h3>
          <p style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', fontWeight: 300, color: TEXT_DIM, letterSpacing: '0.12em', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            我們的專業團隊隨時準備傾聽您的需求，為您量身打造極致溫潤的空間體驗。
          </p>
          <Link
            to="/contact"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.15em',
              padding: '1em 3.2em',
              border: `1px solid ${GOLD}`,
              color: '#050505',
              backgroundColor: GOLD,
              cursor: 'pointer',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 32px ${GOLD_GLOW}`;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            立即預約諮詢 ➔
          </Link>
        </FadeInSection>
      </div>

    </motion.div>
  );
};

export default Services;
