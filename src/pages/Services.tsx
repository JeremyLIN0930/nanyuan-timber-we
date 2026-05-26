import React, { useState, useRef } from 'react';
import { motion, useDragControls, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Services.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */

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
   SERVICES DATA ARRAY (SEO & GEO Optimized description)
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
    desc:  '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。'
  },
  {
    id:    '02',
    title: '現場勘測',
    en:    'PRECISION SITE SURVEY',
    desc:  '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。'
  },
  {
    id:    '03',
    title: '設計提案',
    en:    'CONCEPT & SPACE DESIGN',
    desc:  '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現台北天母住宅與竹北客廳的精品品味。'
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點工程進度，簽署正式工程合約，絕無隱藏追加。'
  },
  {
    id:    '05',
    title: '精湛施工',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。'
  },
  {
    id:    '06',
    title: '完工驗收',
    en:    'PERFECT HANDOVER',
    desc:  '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。'
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
    <main className="services-page">

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="container py-5 services-header-wrapper">
        <FadeInSection>
          <div className="text-center mb-5">
            <h1 className="services-title">服務項目與流程</h1>
            <p className="services-subtitle">
              南源木材高端室內設計統包翻修，現場總監全程監督，台北天母豪宅、竹北現代客廳、青埔老屋翻新工程之職人工藝流程。
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* ── 100vw Apple Split Slider ───────────────────── */}
      <section className="slider-section">
        <div 
          ref={containerRef}
          className="slider-container"
          onPointerDown={(e) => dragControls.start(e)}
        >
          {/* Right side: Finished Reality */}
          <div 
            className="slider-reality-side" 
            style={{ backgroundImage: "url('/images/luxury_tianmu_home_1779301841564.png')" }}
            role="img"
            aria-label="南源木材 台北天母奢華住宅 頂級住宅室內設計實景完工照"
          >
            <div className="slider-reality-overlay" />
            <div className="slider-label-right">
              實景完工照 / REALITY
            </div>
          </div>

          {/* Left side: CAD Blueprint */}
          <div 
            className="slider-blueprint-side" 
            style={{ 
              backgroundImage: "url('/images/modern_office_1779301899552.png')",
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
            role="img"
            aria-label="南源木材 精密木作線條圖 CAD室內設計底稿圖"
          >
            <div className="slider-blueprint-overlay" />
            <div className="slider-label-left">
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
            className="slider-handle"
            style={{ left: `${sliderPos}%`, x: '-50%' }}
          >
            <div className="slider-handle-area" />
            <div className="slider-handle-circle">
              <span className="slider-handle-arrows">⟨⟩</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Six Craftsmen Service Process Timeline ──────── */}
      <section className="process-section">
        <div className="container px-3 px-md-4 py-5">
          
          <FadeInSection>
            <div className="mb-5 text-center text-lg-start">
              <h2 className="process-section-title">
                六大職人服務流程
              </h2>
              <p className="process-section-subtitle">
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
                  <div className="glow-dot-desktop" />

                  {/* Mobile alignment glow dot */}
                  <div className="glow-dot-mobile">
                    <span className="glow-dot-mobile-number">{step.id}</span>
                  </div>

                  <FadeInSection>
                    <article className="process-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="process-num">{step.id}</span>
                        <span className="process-brand-label">
                          NANYUAN TIMBER
                        </span>
                      </div>
                      
                      <h3 className="process-card-title">
                        {step.title}
                      </h3>
                      <span className="process-card-en">
                        {step.en}
                      </span>
                      
                      <p className="process-card-desc">
                        {step.desc}
                      </p>
                    </article>
                  </FadeInSection>

                </div>
              ))}
            </div>

            {/* ROW 2: Steps 04, 05, 06 */}
            <div className="row g-5 timeline-row-2 position-relative">
              {STEPS.slice(3, 6).map((step) => (
                <div className="col-12 col-lg-4 timeline-col" key={step.id}>
                  
                  {/* Desktop alignment glow dot */}
                  <div className="glow-dot-desktop" />

                  {/* Mobile alignment glow dot */}
                  <div className="glow-dot-mobile">
                    <span className="glow-dot-mobile-number">{step.id}</span>
                  </div>

                  <FadeInSection>
                    <article className="process-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="process-num">{step.id}</span>
                        <span className="process-brand-label">
                          NANYUAN TIMBER
                        </span>
                      </div>
                      
                      <h3 className="process-card-title">
                        {step.title}
                      </h3>
                      <span className="process-card-en">
                        {step.en}
                      </span>
                      
                      <p className="process-card-desc">
                        {step.desc}
                      </p>
                    </article>
                  </FadeInSection>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Consultation Button ─────────────────────── */}
      <section className="container py-5 text-center cta-section">
        <FadeInSection>
          <h2 className="cta-title">
            與南源職人攜手，構築您的傳世空間
          </h2>
          <p className="cta-desc">
            南源木材自有工班工藝落地、報價逐項列出誠信透明。我們隨時準備傾聽您的期待，打造極致空間體驗。
          </p>
          <Link
            to="/contact"
            className="cta-btn"
            aria-label="預約南源木材一對一設計諮詢"
          >
            立即預約諮詢 ➔
          </Link>
        </FadeInSection>
      </section>

    </main>
  );
};

export default Services;
