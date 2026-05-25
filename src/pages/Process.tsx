import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Ruler, FileText, FileCheck, HardHat, CheckCircle } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD        = '#C5A880';
const GOLD_GLOW   = 'rgba(197,168,128,0.85)';
const GOLD_DIM    = 'rgba(197,168,128,0.1)';
const GOLD_BORDER = 'rgba(197,168,128,0.3)';
const BG          = '#050505';
const BORDER      = 'rgba(255,255,255,0.08)';
const TEXT_DIM    = 'rgba(255,255,255,0.4)';
const TEXT_MID    = 'rgba(255,255,255,0.65)';

/* ═══════════════════════════════════════════════════════════════
   PROCESS STEPS DATA
═══════════════════════════════════════════════════════════════ */
interface ProcessStep {
  id:    string;
  title: string;
  en:    string;
  desc:  string;
  icon:  React.ReactNode;
  img:   string;
}

const STEPS: ProcessStep[] = [
  {
    id:    '01',
    title: '初步諮詢',
    en:    'INITIAL CONSULTATION',
    desc:  '線上勾勒您的空間藍圖，進行初步機能偏好、預算範圍與時程規劃評估，安排專屬職人與您初次對談。',
    icon:  <MessageSquare size={24} style={{ color: GOLD }} />,
    img:   '/images/modern_office_1779301899552.png',
  },
  {
    id:    '02',
    title: '現場勘測',
    en:    'SITE MEASUREMENT',
    desc:  '職人團隊親赴現場，使用高精度雷射儀測量空間尺寸，深度診斷屋況、結構安全與採光通風條件。',
    icon:  <Ruler size={24} style={{ color: GOLD }} />,
    img:   '/images/old_house_before.png',
  },
  {
    id:    '03',
    title: '設計提案',
    en:    'DESIGN PROPOSAL',
    desc:  '繪製詳細平面配置圖，確認空間動線規劃，並提供 3D 風格意象與南源原木等核心建材的選配建議。',
    icon:  <FileText size={24} style={{ color: GOLD }} />,
    img:   '/images/japanese_wabi_sabi_1779301881798.png',
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'CONSTRUCTION CONTRACT',
    desc:  '提供逐項列出、價格完全透明的精細報價單，建立每週施工甘特圖，確認無追加預算後正式簽約。',
    icon:  <FileCheck size={24} style={{ color: GOLD }} />,
    img:   '/images/budget_smart_home.png',
  },
  {
    id:    '05',
    title: '精湛施工',
    en:    'CRAFTSMANSHIP BUILD',
    img:   '/images/renovation_detail.png',
    desc:  '由現場工班總監與自有工匠親自操刀，遵循嚴格防水、木作檢核點，每日上傳施工照片記錄進度。',
    icon:  <HardHat size={24} style={{ color: GOLD }} />,
  },
  {
    id:    '06',
    title: '完工驗收',
    en:    'FINAL HANDOVER',
    desc:  '經過 100% 品質檢核與試水測試，進行家具與軟裝定位清潔，提供精裝交屋與一年工程結構保固。',
    icon:  <CheckCircle size={24} style={{ color: GOLD }} />,
    img:   '/images/luxury_tianmu_home_1779301841564.png',
  },
];

/* ── Reusable scroll reveal component ── */
const RevealSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Process: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}
    >
      {/* CSS Hover Styling Injection */}
      <style>{`
        .timeline-card {
          background-color: ${BG_CARD};
          border: 1px solid ${BORDER};
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-card:hover {
          border-color: ${GOLD};
          background: linear-gradient(135deg, ${GOLD_DIM} 0%, ${BG_CARD} 100%);
          box-shadow: 0 16px 40px rgba(197,168,128,0.18);
          transform: translateY(-4px);
        }
      `}</style>

      {/* Header section */}
      <div className="container px-3 px-md-4" style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: '40px' }}>
        <RevealSection>
          <div className="text-center mb-5">
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, marginBottom: '0.75rem' }}>
              服務流程
            </h1>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', maxWidth: '600px', margin: '0 auto' }}>
              透明、嚴謹的六大步驟，確保您的空間精準落地
            </p>
          </div>
        </RevealSection>
      </div>

      {/* Timeline Section */}
      <div className="container px-3 px-md-4 pb-5" style={{ position: 'relative' }}>
        {isMobile ? (
          /* ── MOBILE: VERTICAL SINGLE-COLUMN TRACK ── */
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Thread line */}
            <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '15px', width: '1.5px', backgroundColor: GOLD_BORDER, boxShadow: `0 0 8px ${GOLD_DIM}` }} />

            {STEPS.map((step, i) => (
              <div key={step.id} style={{ marginBottom: '3rem', position: 'relative' }}>
                {/* Node dot on the line */}
                <div style={{
                  position: 'absolute',
                  left: '-36px',
                  top: '6px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: BG,
                  border: `2px solid ${GOLD}`,
                  boxShadow: `0 0 12px ${GOLD_GLOW}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: GOLD }}>{step.id}</span>
                </div>

                <RevealSection delay={i * 0.05}>
                  <div className="timeline-card p-4">
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', marginBottom: '1.25rem' }}>
                      <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,14,0.9) 0%, transparent 80%)' }} />
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, display: 'block', textTransform: 'uppercase' }}>{step.en}</span>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>{step.title}</h2>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', fontWeight: 300, color: TEXT_MID, lineHeight: 1.8, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </RevealSection>
              </div>
            ))}
          </div>
        ) : (
          /* ── PC: STAGGERED ALTERNATING TIMELINE ── */
          <div style={{ position: 'relative', padding: '40px 0' }}>
            {/* Center golden wire line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: GOLD_BORDER, transform: 'translateX(-50%)', boxShadow: `0 0 10px ${GOLD_DIM}` }} />

            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div className="row g-0 align-items-center" key={step.id} style={{ marginBottom: '5rem', position: 'relative' }}>
                  {/* Central step number circle */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: BG,
                    border: `2px solid ${GOLD}`,
                    boxShadow: `0 0 20px ${GOLD_GLOW}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: GOLD }}>{step.id}</span>
                  </div>

                  {/* Left column (content or spacer) */}
                  <div className="col-5">
                    {isLeft ? (
                      <RevealSection>
                        <div className="timeline-card p-4 p-xl-5 text-end">
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', backgroundColor: 'rgba(197,168,128,0.1)', borderRadius: '50%', marginBottom: '1.25rem' }}>
                            {step.icon}
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: GOLD, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {step.en}
                          </span>
                          <h2 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            {step.title}
                          </h2>
                          <p style={{ fontSize: 'clamp(0.8rem, 1vw, 0.92rem)', fontWeight: 300, color: TEXT_MID, lineHeight: 1.85, margin: 0, textAlign: 'justify' }}>
                            {step.desc}
                          </p>
                        </div>
                      </RevealSection>
                    ) : (
                      /* Image block */
                      <RevealSection>
                        <div style={{ overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', height: '240px' }}>
                          <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.5s' }} />
                        </div>
                      </RevealSection>
                    )}
                  </div>

                  {/* Middle spacing spacer (offsetting index circle width) */}
                  <div className="col-2"></div>

                  {/* Right column (content or spacer) */}
                  <div className="col-5">
                    {!isLeft ? (
                      <RevealSection>
                        <div className="timeline-card p-4 p-xl-5">
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', backgroundColor: 'rgba(197,168,128,0.1)', borderRadius: '50%', marginBottom: '1.25rem' }}>
                            {step.icon}
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: GOLD, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {step.en}
                          </span>
                          <h2 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            {step.title}
                          </h2>
                          <p style={{ fontSize: 'clamp(0.8rem, 1vw, 0.92rem)', fontWeight: 300, color: TEXT_MID, lineHeight: 1.85, margin: 0, textAlign: 'justify' }}>
                            {step.desc}
                          </p>
                        </div>
                      </RevealSection>
                    ) : (
                      /* Image block */
                      <RevealSection>
                        <div style={{ overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', height: '240px' }}>
                          <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.5s' }} />
                        </div>
                      </RevealSection>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Decorative footer message */}
      <div className="text-center py-5 mt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
        <RevealSection>
          <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: TEXT_DIM, textTransform: 'uppercase', marginBottom: '1rem' }}>
            每一步都為您把關，落實細節美學
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            style={{
              fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
              letterSpacing: '0.12em',
              padding: '0.85em 2.5em',
              border: `1px solid ${GOLD}`,
              color: '#050505',
              backgroundColor: GOLD,
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 24px rgba(197,168,128,0.6)`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            立即預約服務 ➔
          </button>
        </RevealSection>
      </div>

    </motion.div>
  );
};

const BG_CARD = '#0D0D0E';
export default Process;
