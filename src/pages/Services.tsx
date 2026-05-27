import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Services.css';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const serviceCards = [
  {
    id: '01',
    title: '空間意境規劃',
    en: 'SPACE & AMBIANCE DESIGN',
    desc: '從動線配置到風格定調，將您對空間的每一絲想像，轉化為具有呼吸感的建築意境。',
  },
  {
    id: '02',
    title: '職人選材與木作藝廊',
    en: 'MATERIAL CURATION',
    desc: '擁有深厚木材背景，嚴選 FSC 永續認證原木、義大利頂級礦物塗料與進口石材，為空間挑選最合適的傳世肌理。',
  },
  {
    id: '03',
    title: '精湛統包施工',
    en: 'TURNKEY CRAFTSMANSHIP',
    desc: '自有專業工班與現場總監全程監督，嚴格執行防水蓄水測試、木作封邊與油漆側光打磨。設計圖面精準落地，所見即所得。',
  },
];

const processSteps = [
  {
    num: '01',
    title: '初步諮詢',
    en: 'BESPOKE CONSULTATION',
    desc: '傾聽您對場域的無限想像。南源木材專業顧問為您勾勒核心工藝改造方向，結合生活動線與預算範疇，開展客製化空間設計藍圖。',
  },
  {
    num: '02',
    title: '現場勘測',
    en: 'PRECISION SITE SURVEY',
    desc: '職人團隊親赴現場，使用高階雷射丈量儀器記錄三維尺度。深度診斷老屋結構、採光風向與水電管線，確保設計防漏防震基礎。',
  },
  {
    num: '03',
    title: '設計提案',
    en: 'CONCEPT & SPACE DESIGN',
    desc: '將創意轉化為空間美學。提供客製化格局圖、職人手作木料選配與立面視覺意境，實現台北天母住宅與竹北客廳的精品品味。',
  },
  {
    num: '04',
    title: '工程合約',
    en: 'TRANSPARENT AGREEMENT',
    desc: '堅持誠信透明。條列化報價單，明確標示品牌、數量與單價。確立每週施工查核點工程進度，簽署正式工程合約，絕無隱藏追加。',
  },
  {
    num: '05',
    title: '精湛施工',
    en: 'MASTER CRAFTSMANSHIP',
    desc: '自有專業工班、現場總監全程監督。遵循嚴格防水蓄水測試與防塵木作封邊規範，將設計圖面由資深職人按圖精準落地。',
  },
  {
    num: '06',
    title: '完工驗收',
    en: 'PERFECT HANDOVER',
    desc: '高規格品質交叉檢驗。實施管線壓力、特殊漆面側光打磨及試水測試。家具軟裝完美定位清潔，交付尊榮傳世的私人健康空間。',
  },
];

const Services: React.FC = () => {
  return (
    <main>
      {/* Layer 1: Full-width Hero Banner */}
      <section
        className="services-hero"
        style={{ backgroundImage: "url('/images/style_luxury_dark_1779301949701.png')" }}
      >
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <h1 className="services-hero-title">服務項目與流程</h1>
          <p className="services-hero-subtitle">
            南源木材高端室內設計統包翻修，自有工班現場總監全程監督，報價逐項列出誠信透明。
          </p>
        </div>
      </section>

      {/* Layer 2: Three Core Service Cards */}
      <section className="services-cards-section container">
        <FadeInSection>
          <h2 className="services-section-heading">三大核心服務</h2>
        </FadeInSection>
        <div className="row g-4">
          {serviceCards.map((card) => (
            <div className="col-12 col-lg-4" key={card.id}>
              <FadeInSection>
                <article className="service-feature-card">
                  <span className="service-feature-num">{card.id}</span>
                  <h3 className="service-feature-title">{card.title}</h3>
                  <span className="service-feature-en">{card.en}</span>
                  <p className="service-feature-desc">{card.desc}</p>
                </article>
              </FadeInSection>
            </div>
          ))}
        </div>
      </section>

      {/* Layer 3: Six-Step Process Timeline */}
      <section className="services-process-section">
        <div className="container">
          <FadeInSection>
            <h2 className="services-section-heading">六大職人服務流程</h2>
          </FadeInSection>
          <p className="services-process-subtitle">
            Bespoke Process — From Concept to Flawless Execution
          </p>
          <div className="services-timeline">
            {processSteps.map((step) => (
              <FadeInSection key={step.num}>
                <article className="services-timeline-item">
                  <div className="services-timeline-dot">
                    <span className="services-timeline-dot-num">{step.num}</span>
                  </div>
                  <h3 className="services-timeline-title">
                    {step.num} {step.title}
                  </h3>
                  <span className="services-timeline-en">{step.en}</span>
                  <p className="services-timeline-desc">{step.desc}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 4: CTA */}
      <section className="services-cta-section container">
        <FadeInSection>
          <h2 className="services-cta-title">開啟您的空間旅程</h2>
          <p className="services-cta-desc">
            預約免費諮詢，讓南源木材為您量身打造理想居所
          </p>
          <Link to="/contact" className="services-cta-btn">
            立即預約諮詢
          </Link>
        </FadeInSection>
      </section>
    </main>
  );
};

export default Services;
