import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../../pages/Services.css';

/* ─────────────────────────────────────────────────────────────
   PROCESS STEPS DATA
───────────────────────────────────────────────────────────── */
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
    desc:  '傾聽您對場域的無限想像，開展客製化空間設計藍圖。',
  },
  {
    id:    '02',
    title: '現場勘測',
    en:    'PRECISION SITE SURVEY',
    desc:  '職人團隊親赴現場，記錄尺度、採光、結構與管線細節。',
  },
  {
    id:    '03',
    title: '設計提案',
    en:    'CONCEPT & SPACE DESIGN',
    desc:  '將創意轉化為空間美學，提供格局、材質與視覺提案。',
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '條列式報價與施工節點，確保合作流程清楚透明。',
  },
  {
    id:    '05',
    title: '精湛施工',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '由自有工班與現場總監執行，精準落實設計圖面。',
  },
  {
    id:    '06',
    title: '完工驗收',
    en:    'PERFECT HANDOVER',
    desc:  '高規格檢驗細節，交付安心、完整且具質感的空間。',
  },
];

/* ─────────────────────────────────────────────────────────────
   FADE-IN SECTION
───────────────────────────────────────────────────────────── */
const FadeInSection: React.FC<{
  children:   React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SERVICES SECTION COMPONENT
   Used on the Home page as an embedded block.
   The BLUEPRINT/REALITY slider has been removed.
───────────────────────────────────────────────────────────── */
const ServicesSection: React.FC = () => {
  return (
    <motion.section
      className="services-page page-layout-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Section header */}
      <header className="container services-header-wrapper">
        <FadeInSection>
          <div className="services-header-content">
            <p className="services-eyebrow">NANYUAN TIMBER</p>
            <h2 className="services-title">服務項目與流程</h2>
            <p className="services-subtitle">
              南源木材以設計、選材、施工整合為核心，打造兼具機能、美學與職人工藝的高端室內空間。
            </p>
          </div>
        </FadeInSection>
      </header>

      {/* Six-step timeline */}
      <section className="process-section" aria-labelledby="process-title-home">
        <div className="container">
          <FadeInSection>
            <div className="process-heading">
              <h3 id="process-title-home" className="process-section-title">
                六大職人服務流程
              </h3>
              <p className="process-section-subtitle">
                Bespoke Process — From Concept to Flawless Execution
              </p>
            </div>
          </FadeInSection>

          <div className="timeline-container">
            {STEPS.map(step => (
              <FadeInSection className="timeline-item" key={step.id}>
                <article className="process-card">
                  <div className="process-card-top">
                    <span className="process-num">{step.id}</span>
                    <span className="process-brand-label">NANYUAN TIMBER</span>
                  </div>
                  <h4 className="process-card-title">{step.title}</h4>
                  <p className="process-card-en">{step.en}</p>
                  <p className="process-card-desc">{step.desc}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

    </motion.section>
  );
};

export default ServicesSection;