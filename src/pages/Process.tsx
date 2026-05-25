import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Ruler, FileText, HardHat, FileCheck, Trees } from 'lucide-react';
import './Process.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD = '#C5A880';

/* ═══════════════════════════════════════════════════════════════
   PROCESS STEPS DATA (5 Luxury Steps - SEO & GEO Optimized)
═══════════════════════════════════════════════════════════════ */
interface ProcessStep {
  id:    string;
  title: string;
  en:    string;
  desc:  string;
  icon:  React.ReactNode;
  img:   string;
  alt:   string;
}

const STEPS: ProcessStep[] = [
  {
    id:    '01',
    title: '空間規劃',
    en:    'SPACE PLANNING',
    desc:  '精品工業風。精密格局配置與動線規劃。運用北美胡桃木實木地板與奢華暗灰石材，結合微水泥牆面交融的光影視覺，勾勒沉浸式空間深度。',
    icon:  <Ruler size={24} style={{ color: GOLD }} />,
    img:   '/images/space_planning.png',
    alt:   '南源木材 空間規劃設計圖 精品工業風客廳 台北天母豪宅裝潢工程'
  },
  {
    id:    '02',
    title: '風格意境',
    en:    'AMBIANCE DESIGN',
    desc:  '精品工業風。將礦物特殊塗料、微水泥觸感牆面在曜石黑光影折射下，與原木家具進行質感碰撞，形塑侘寂與工業美學交融的私人場域。',
    icon:  <FileText size={24} style={{ color: GOLD }} />,
    img:   '/images/ambiance_design.png',
    alt:   '南源木材 風格意境原木臥室 義大利特殊礦物塗料 曜石黑光影折射'
  },
  {
    id:    '03',
    title: '職人手作',
    en:    'MASTER CRAFTSMANSHIP',
    desc:  '精品工業風。資深職人手工藝匠心傳承。現場工班精細榫卯工法拼接，將天然原木建材以極致精度裁切打磨，為空間注入手作溫度。',
    icon:  <HardHat size={24} style={{ color: GOLD }} />,
    img:   '/images/master_craftsmanship.png',
    alt:   '南源木材 職人手作木工雕琢 榫卯精密拼接工法 台灣自有工班工程落地'
  },
  {
    id:    '04',
    title: '工程合約',
    en:    'TRANSPARENT AGREEMENT',
    desc:  '精品工業風。誠信透明的合約與報價。於胡桃木桌上簽署手工皮革工程合約書，條列化所有工料細節與進度查核點，建立最安心的保障。',
    icon:  <FileCheck size={24} style={{ color: GOLD }} />,
    img:   '/images/transparent_agreement.png',
    alt:   '南源木材 誠信透明工程合約 手工皮革合約書與鋼筆 竹北現代大宅合約簽約'
  },
  {
    id:    '05',
    title: '永續選材',
    en:    'SUSTAINABLE SELECTION',
    desc:  '精品工業風。嚴格挑選具備 FSC 永續認證的天然原木（胡桃木、橡木、楓木），在職人木材樣品藝廊中，為您的空間挑選最切合的傳世肌理。',
    icon:  <Trees size={24} style={{ color: GOLD }} />,
    img:   '/images/sustainable_selection.png',
    alt:   '南源木材 永續選材木材樣品藝廊 FSC認證天然原木 青埔老屋翻新選材'
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
    <main className="process-page">

      {/* Header section */}
      <section className="container px-3 px-md-4 process-header-wrapper">
        <RevealSection>
          <div className="text-center mb-5">
            <h1 className="process-title">服務流程</h1>
            <p className="process-subtitle">
              南源木材高端室內設計統包翻修，報價逐項列出誠信透明，台北天母豪宅、竹北現代客廳、青埔老屋翻新工程之五大服務步驟。
            </p>
          </div>
        </RevealSection>
      </section>

      {/* Timeline Section */}
      <section className="container px-3 px-md-4 pb-5 timeline-section">
        {isMobile ? (
          /* ── MOBILE: VERTICAL SINGLE-COLUMN TRACK ── */
          <div className="mobile-timeline-track">
            <div className="mobile-thread-line" />

            {STEPS.map((step, i) => (
              <div key={step.id} className="mobile-timeline-item">
                
                {/* Node dot on the line */}
                <div className="mobile-node-dot">
                  <span className="mobile-node-dot-number">{step.id}</span>
                </div>

                <RevealSection delay={i * 0.05}>
                  <article className="timeline-card p-4">
                    <div className="mobile-card-img-container">
                      <img 
                        src={step.img} 
                        alt={step.alt} 
                        className="mobile-card-img" 
                        loading="lazy" 
                      />
                      <div className="mobile-card-img-overlay" />
                      <div className="mobile-card-badge-container">
                        <span className="mobile-card-en">{step.en}</span>
                        <h2 className="mobile-card-title">{step.title}</h2>
                      </div>
                    </div>

                    <p className="mobile-card-desc">
                      {step.desc}
                    </p>
                  </article>
                </RevealSection>
              </div>
            ))}
          </div>
        ) : (
          /* ── PC: STAGGERED ALTERNATING TIMELINE ── */
          <div className="pc-timeline-track">
            <div className="pc-center-wire" />

            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div className="row g-0 align-items-center pc-timeline-row" key={step.id}>
                  
                  {/* Central step number circle */}
                  <div className="pc-central-circle">
                    <span className="pc-central-number">{step.id}</span>
                  </div>

                  {/* Left column */}
                  <div className="col-5">
                    {isLeft ? (
                      <RevealSection>
                        <article className="timeline-card p-4 p-xl-5 text-end">
                          <div className="pc-card-icon-wrapper">
                            {step.icon}
                          </div>
                          <span className="pc-card-en">
                            {step.en}
                          </span>
                          <h2 className="pc-card-title">
                            {step.title}
                          </h2>
                          <p className="pc-card-desc">
                            {step.desc}
                          </p>
                        </article>
                      </RevealSection>
                    ) : (
                      /* Image block */
                      <RevealSection>
                        <div className="pc-image-wrapper">
                          <img 
                            src={step.img} 
                            alt={step.alt} 
                            className="pc-image" 
                            loading="lazy" 
                          />
                        </div>
                      </RevealSection>
                    )}
                  </div>

                  {/* Middle spacer */}
                  <div className="col-2" />

                  {/* Right column */}
                  <div className="col-5">
                    {!isLeft ? (
                      <RevealSection>
                        <article className="timeline-card p-4 p-xl-5">
                          <div className="pc-card-icon-wrapper">
                            {step.icon}
                          </div>
                          <span className="pc-card-en">
                            {step.en}
                          </span>
                          <h2 className="pc-card-title">
                            {step.title}
                          </h2>
                          <p className="pc-card-desc">
                            {step.desc}
                          </p>
                        </article>
                      </RevealSection>
                    ) : (
                      /* Image block */
                      <RevealSection>
                        <div className="pc-image-wrapper">
                          <img 
                            src={step.img} 
                            alt={step.alt} 
                            className="pc-image" 
                            loading="lazy" 
                          />
                        </div>
                      </RevealSection>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Decorative footer message */}
      <section className="footer-message-section">
        <RevealSection>
          <p className="footer-message-text">
            南源木材 | 自有工班工藝落地 現場總監全程監督 報價逐項列出誠信透明
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="footer-message-btn"
            aria-label="與南源木材職人預約諮詢"
          >
            立即預約服務 ➔
          </button>
        </RevealSection>
      </section>

    </main>
  );
};

export default Process;
