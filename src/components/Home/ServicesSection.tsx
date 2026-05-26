import React, { useRef, useState } from 'react';
import { motion, useDragControls, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../pages/Services.css';

interface ProcessStep {
  id: string;
  title: string;
  en: string;
  desc: string;
}

const STEPS: ProcessStep[] = [
  {
    id: '01',
    title: '初步諮詢',
    en: 'BESPOKE CONSULTATION',
    desc: '傾聽您對場域的無限想像，開展客製化空間設計藍圖。'
  },
  {
    id: '02',
    title: '現場勘測',
    en: 'PRECISION SITE SURVEY',
    desc: '職人團隊親赴現場，記錄尺度、採光、結構與管線細節。'
  },
  {
    id: '03',
    title: '設計提案',
    en: 'CONCEPT & SPACE DESIGN',
    desc: '將創意轉化為空間美學，提供格局、材質與視覺提案。'
  },
  {
    id: '04',
    title: '工程合約',
    en: 'TRANSPARENT AGREEMENT',
    desc: '條列式報價與施工節點，確保合作流程清楚透明。'
  },
  {
    id: '05',
    title: '精湛施工',
    en: 'MASTER CRAFTSMANSHIP',
    desc: '由自有工班與現場總監執行，精準落實設計圖面。'
  },
  {
    id: '06',
    title: '完工驗收',
    en: 'PERFECT HANDOVER',
    desc: '高規格檢驗細節，交付安心、完整且具質感的空間。'
  }
];

const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
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

const Services: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number } }) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const nextPos = Math.max(5, Math.min(95, (x / rect.width) * 100));

    setSliderPos(nextPos);
  };

  return (
    <motion.main
      className="services-page page-layout-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="container services-header-wrapper">
        <FadeInSection>
          <div className="services-header-content">
            <p className="services-eyebrow">NANYUAN TIMBER</p>
            <h1 className="services-title">服務項目與流程</h1>
            <p className="services-subtitle">
              南源木材以設計、選材、施工整合為核心，打造兼具機能、美學與職人工藝的高端室內空間。
            </p>
          </div>
        </FadeInSection>
      </header>

      <section className="slider-section" aria-label="設計圖與完工實景對照">
        <div
          ref={containerRef}
          className="slider-container"
          onPointerDown={(event) => dragControls.start(event)}
        >
          <div
            className="slider-reality-side"
            role="img"
            aria-label="南源木材室內設計完工實景"
          >
            <div className="slider-reality-overlay" />
            <p className="slider-label-right">實景完工照 / REALITY</p>
          </div>

          <div
            className="slider-blueprint-side"
            role="img"
            aria-label="南源木材室內設計規劃圖"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <div className="slider-blueprint-overlay" />
            <p className="slider-label-left">精密木作線條圖 / BLUEPRINT</p>
          </div>

          <motion.div
            drag="x"
            dragControls={dragControls}
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            className="slider-handle"
            style={{ left: `${sliderPos}%`, x: '-50%' }}
            aria-hidden="true"
          >
            <div className="slider-handle-circle">
              <span>⟨⟩</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="container">
          <FadeInSection>
            <div className="process-heading">
              <h2 id="process-title" className="process-section-title">
                六大職人服務流程
              </h2>
              <p className="process-section-subtitle">
                Bespoke Process — From Concept to Flawless Execution
              </p>
            </div>
          </FadeInSection>

          <div className="timeline-container">
            {STEPS.map((step) => (
              <FadeInSection className="timeline-item" key={step.id}>
                <article className="process-card">
                  <div className="process-card-top">
                    <span className="process-num">{step.id}</span>
                    <span className="process-brand-label">NANYUAN TIMBER</span>
                  </div>

                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-en">{step.en}</p>
                  <p className="process-card-desc">{step.desc}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section container" aria-labelledby="cta-title">
        <FadeInSection>
          <h2 id="cta-title" className="cta-title">
            與南源職人攜手，構築您的理想空間
          </h2>
          <p className="cta-desc">
            從設計規劃到工程落地，南源木材以透明流程與職人工藝，陪您完成每一處細節。
          </p>
          <Link to="/contact" className="cta-btn">
            立即預約諮詢
          </Link>
        </FadeInSection>
      </section>
    </motion.main>
  );
};

export default Services;