import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';
import CTA from '../components/CTA/CTA';

import servicesHeroBg from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';

/* ─── Reveal animation wrapper ─── */
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

/* ─── Data ─── */
const SERVICE_CARDS = [
  { id: '01', title: '空間意境規劃', en: 'SPACE & AMBIANCE DESIGN', desc: '從動線配置到風格定調，將您對空間的每一絲想像，轉化為具有呼吸感的建築意境。' },
  { id: '02', title: '職人選材與木作藝廊', en: 'MATERIAL CURATION', desc: '擁有深厚木材背景，嚴選 FSC 永續認證原木、義大利頂級礦物塗料與進口石材，為空間挑選最合適的傳世肌理。' },
  { id: '03', title: '精湛統包施工', en: 'TURNKEY CRAFTSMANSHIP', desc: '自有專業工班與現場總監全程監督，嚴格執行防水蓄水測試、木作封邊與油漆側光打磨。設計圖面精準落地，所見即所得。' },
];

const PROCESS_STEPS = [
  { num: '01', title: '初步諮詢', en: 'BESPOKE CONSULTATION', desc: '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。' },
  { num: '02', title: '現場勘測', en: 'PRECISION SITE SURVEY', desc: '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。' },
  { num: '03', title: '設計提案', en: 'CONCEPT & SPACE DESIGN', desc: '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現每一個居住夢想的精品品味。' },
  { num: '04', title: '工程合約', en: 'TRANSPARENT AGREEMENT', desc: '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點與工程進度，簽署正式工程合約，絕無隱藏追加。' },
  { num: '05', title: '精湛施工', en: 'MASTER CRAFTSMANSHIP', desc: '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。' },
  { num: '06', title: '完工驗收', en: 'PERFECT HANDOVER', desc: '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。' },
];

/* ─── ServiceCard ─── */
const ServiceCard: React.FC<{ card: typeof SERVICE_CARDS[0]; delay: number }> = ({ card, delay }) => {
  return (
    <Reveal delay={delay}>
      <article className="service-card">
        <span className="service-card__number">{card.id}</span>
        <div className="service-card__divider" />
        <h3 className="service-card__title">{card.title}</h3>
        <span className="service-card__en">{card.en}</span>
        <p className="service-card__desc">{card.desc}</p>
      </article>
    </Reveal>
  );
};

/* ─── ProcessItem ─── */
const ProcessItem: React.FC<{ step: typeof PROCESS_STEPS[0]; delay: number; isLeft: boolean }> = ({ step, delay, isLeft }) => {
  return (
    <Reveal delay={delay} className={`services-timeline-item-wrapper ${isLeft ? 'item-left' : 'item-right'}`}>
      <article className={`process-item ${isLeft ? 'process-item--left' : 'process-item--right'}`}>
        <span className="process-item__en">{step.en}</span>
        <h3 className="process-item__heading">{step.num} {step.title}</h3>
        <div className="process-item__divider" />
        <p className="process-item__desc">{step.desc}</p>
      </article>
    </Reveal>
  );
};

/* ─── Main Page ─── */
const Services: React.FC = () => {
  return (
    <motion.main
      className="services-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Hero ── */}
      <section
        className="services-hero"
        style={{ backgroundImage: `url(${servicesHeroBg})` }}
      >
        <div className="services-hero-overlay" />
        <div className="services-hero-content">
          <div className="services-hero-eyebrow">
            <div className="services-hero-eyebrow-line" />
            <span className="services-hero-eyebrow-text">NANYUAN SERVICE</span>
          </div>
          <h1 className="services-hero-title">服務項目與流程</h1>
          <p className="services-hero-subtitle">南源木材高端室內設計統包翻修，自有工班現場總監全程監督，報價逐項列出誠信透明。</p>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section className="services-core-section">
        <div className="container px-3 px-md-4">
          <Reveal>
            <div className="services-section-eyebrow">
              <div className="services-section-eyebrow-line" />
              <span className="services-section-eyebrow-text">CORE SERVICES</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="services-section-heading">三大核心服務</h2>
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

      {/* ── Process Timeline ── */}
      <section className="services-process-section">
        <div className="container px-3 px-md-4">
          <Reveal>
            <div className="services-section-eyebrow">
              <div className="services-section-eyebrow-line" />
              <span className="services-section-eyebrow-text">BESPOKE PROCESS</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="services-process-heading">六大職人服務流程</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="services-process-subtitle">From Concept to Flawless Execution</p>
          </Reveal>
          <div className="services-timeline-grid">
            <div className="services-timeline-spine" />
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.num} className={`services-timeline-row ${isLeft ? 'row-left' : 'row-right'}`}>
                  <div className="services-timeline-node">
                    <span className="services-timeline-node-num">{step.num}</span>
                  </div>
                  <div className={`services-timeline-cell ${isLeft ? 'cell-left' : 'cell-right'}`}>
                    <ProcessItem step={step} delay={i * 0.07} isLeft={isLeft} />
                  </div>
                  <div className="services-timeline-spacer" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <CTA />
    </motion.main>
  );
};

export default Services;
