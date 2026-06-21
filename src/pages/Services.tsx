import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

import servicesHeroBg from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';

const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.85)';
const GOLD_WIRE = 'rgba(197,168,128,0.30)';
const BG        = '#050505';
const BG_CARD   = '#0D0D0E';
const BORDER    = 'rgba(255,255,255,0.07)';
const TEXT_DIM  = 'rgba(255,255,255,0.38)';
const TEXT_MID  = 'rgba(255,255,255,0.62)';

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

const SERVICE_CARDS = [
  { id: '01', title: '\u7a7a\u9593\u610f\u5883\u898f\u5283', en: 'SPACE & AMBIANCE DESIGN', desc: '\u5f9e\u52d5\u7dda\u914d\u7f6e\u5230\u98a8\u683c\u5b9a\u8abf\uff0c\u5c07\u60a8\u5c0d\u7a7a\u9593\u7684\u6bcf\u4e00\u7d72\u60f3\u50cf\uff0c\u8f49\u5316\u70ba\u5177\u6709\u547c\u5438\u611f\u7684\u5efa\u7bc9\u610f\u5883\u3002' },
  { id: '02', title: '\u8077\u4eba\u9078\u6750\u8207\u6728\u4f5c\u85dd\u5eca', en: 'MATERIAL CURATION', desc: '\u64c1\u6709\u6df1\u539a\u6728\u6750\u80cc\u666f\uff0c\u56b4\u9078 FSC \u6c38\u7e8c\u8a8d\u8b49\u539f\u6728\u3001\u7fa9\u5927\u5229\u9802\u7d1a\u7926\u7269\u5857\u6599\u8207\u9032\u53e3\u77f3\u6750\uff0c\u70ba\u7a7a\u9593\u6311\u9078\u6700\u5408\u9069\u7684\u50b3\u4e16\u808c\u7406\u3002' },
  { id: '03', title: '\u7cbe\u6e5b\u7d71\u5305\u65bd\u5de5', en: 'TURNKEY CRAFTSMANSHIP', desc: '\u81ea\u6709\u5c08\u696d\u5de5\u73ed\u8207\u73fe\u5834\u7e3d\u76e3\u5168\u7a0b\u76e3\u7763\uff0c\u56b4\u683c\u57f7\u884c\u9632\u6c34\u84c4\u6c34\u6e2c\u8a66\u3001\u6728\u4f5c\u5c01\u908a\u8207\u6cb9\u6f06\u5074\u5149\u6253\u78e8\u3002\u8a2d\u8a08\u5716\u9762\u7cbe\u6e96\u843d\u5730\uff0c\u6240\u898b\u5373\u6240\u5f97\u3002' },
];

const PROCESS_STEPS = [
  { num: '01', title: '\u521d\u6b65\u8aee\u8a62', en: 'BESPOKE CONSULTATION', desc: '\u50be\u807d\u60a8\u5c0d\u5834\u57df\u7684\u7121\u9650\u60f3\u50cf\u3002\u5357\u6e90\u6728\u6750\u5c08\u696d\u9867\u554f\u70ba\u60a8\u52fe\u52d2\u6838\u5fc3\u5de5\u85dd\u6539\u9020\u65b9\u5411\uff0c\u7d50\u5408\u751f\u6d3b\u52d5\u7dda\u8207\u9810\u7b97\u7bc4\u7587\uff0c\u958b\u5c55\u5ba2\u88fd\u5316\u7a7a\u9593\u8a2d\u8a08\u85cd\u5716\u3002' },
  { num: '02', title: '\u73fe\u5834\u52d8\u6e2c', en: 'PRECISION SITE SURVEY', desc: '\u8077\u4eba\u5718\u968a\u89aa\u8d74\u73fe\u5834\uff0c\u4f7f\u7528\u9ad8\u968e\u96f7\u5c04\u4e08\u91cf\u5100\u5668\u8a18\u9304\u4e09\u7dad\u5c3a\u5ea6\u3002\u6df1\u5ea6\u8a3a\u65b7\u8001\u5c4b\u7d50\u69cb\u3001\u63a1\u5149\u98a8\u5411\u8207\u6c34\u96fb\u7ba1\u7dda\uff0c\u78ba\u4fdd\u8a2d\u8a08\u9632\u6f0f\u9632\u9707\u57fa\u790e\u3002' },
  { num: '03', title: '\u8a2d\u8a08\u63d0\u6848', en: 'CONCEPT & SPACE DESIGN', desc: '\u5c07\u5275\u610f\u8f49\u5316\u70ba\u7a7a\u9593\u7f8e\u5b78\u3002\u63d0\u4f9b\u5ba2\u88fd\u5316\u683c\u5c40\u5716\u3001\u8077\u4eba\u624b\u4f5c\u6728\u6599\u9078\u914d\u8207\u7acb\u9762\u8996\u89ba\u610f\u5883\uff0c\u5be6\u73fe\u6bcf\u4e00\u500b\u5c45\u4f4f\u5922\u60f3\u7684\u7cbe\u54c1\u54c1\u5473\u3002' },
  { num: '04', title: '\u5de5\u7a0b\u5408\u7d04', en: 'TRANSPARENT AGREEMENT', desc: '\u5805\u6301\u8aa0\u4fe1\u900f\u660e\u3002\u689d\u5217\u5316\u5831\u50f9\u55ae\uff0c\u660e\u78ba\u6a19\u793a\u54c1\u724c\u3001\u6578\u91cf\u8207\u55ae\u50f9\u3002\u78ba\u7acb\u6bcf\u9031\u65bd\u5de5\u67e5\u6838\u9ede\u8207\u5de5\u7a0b\u9032\u5ea6\uff0c\u7c3d\u7f72\u6b63\u5f0f\u5de5\u7a0b\u5408\u7d04\uff0c\u7d55\u7121\u96b1\u85cf\u8ffd\u52a0\u3002' },
  { num: '05', title: '\u7cbe\u6e5b\u65bd\u5de5', en: 'MASTER CRAFTSMANSHIP', desc: '\u81ea\u6709\u5c08\u696d\u5de5\u73ed\u3001\u73fe\u5834\u7e3d\u76e3\u5168\u7a0b\u76e3\u7763\u3002\u9075\u5faa\u56b4\u683c\u9632\u6c34\u84c4\u6c34\u6e2c\u8a66\u8207\u9632\u5875\u6728\u4f5c\u5c01\u908a\u898f\u7bc4\uff0c\u5c07\u8a2d\u8a08\u5716\u9762\u7531\u8cc7\u6df1\u8077\u4eba\u6309\u5716\u7cbe\u6e96\u843d\u5730\u3002' },
  { num: '06', title: '\u5b8c\u5de5\u9a57\u6536', en: 'PERFECT HANDOVER', desc: '\u9ad8\u898f\u683c\u54c1\u8cea\u4ea4\u53c9\u6aa2\u9a57\u3002\u5be6\u65bd\u7ba1\u7dda\u58d3\u529b\u3001\u7279\u6b8a\u6f06\u9762\u5074\u5149\u6253\u78e8\u53ca\u8a66\u6c34\u6e2c\u8a66\u3002\u5bb6\u5177\u8edf\u88dd\u5b8c\u7f8e\u5b9a\u4f4d\u6e05\u6f54\uff0c\u4ea4\u4ed8\u5c0a\u69ae\u50b3\u4e16\u7684\u79c1\u4eba\u5065\u5eb7\u7a7a\u9593\u3002' },
];

const ServiceCard: React.FC<{ card: typeof SERVICE_CARDS[0]; delay: number }> = ({ card, delay }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Reveal delay={delay}>
      <motion.article
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'clamp(1.8rem, 2.8vw, 2.8rem)', backgroundColor: hovered ? 'rgba(197,168,128,0.06)' : BG_CARD, border: `1px solid ${hovered ? GOLD_WIRE : BORDER}`, boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,168,128,0.22)' : '0 6px 24px rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', transition: 'box-shadow 0.42s ease, background-color 0.42s ease, border-color 0.42s ease', height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <span style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.06em', color: hovered ? GOLD : 'rgba(197,168,128,0.18)', textShadow: hovered ? `0 0 28px ${GOLD_GLOW}` : 'none', lineHeight: 1, transition: 'color 0.4s, text-shadow 0.4s', userSelect: 'none' }}>{card.id}</span>
        <div style={{ width: hovered ? '100%' : '36px', height: '1px', backgroundColor: hovered ? GOLD : GOLD_WIRE, boxShadow: hovered ? '0 0 8px rgba(197,168,128,0.7)' : 'none', transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.4s, box-shadow 0.4s' }} />
        <h3 style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.3rem)', fontWeight: 900, letterSpacing: '-0.025em', color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)', textShadow: hovered ? '0 0 18px rgba(255,255,255,0.18)' : 'none', margin: 0, transition: 'color 0.4s, text-shadow 0.4s' }}>{card.title}</h3>
        <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', color: hovered ? 'rgba(197,168,128,0.75)' : TEXT_DIM, textTransform: 'uppercase', transition: 'color 0.4s' }}>{card.en}</span>
        <p style={{ fontSize: 'clamp(0.82rem, 1.15vw, 0.9rem)', fontWeight: 300, letterSpacing: '0.04em', color: hovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: 0, textAlign: 'justify', transition: 'color 0.4s' }}>{card.desc}</p>
      </motion.article>
    </Reveal>
  );
};

const ProcessItem: React.FC<{ step: typeof PROCESS_STEPS[0]; delay: number; isLeft: boolean }> = ({ step, delay, isLeft }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Reveal delay={delay} className={`services-timeline-item-wrapper ${isLeft ? 'item-left' : 'item-right'}`}>
      <motion.article
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'clamp(1.5rem, 2.2vw, 2.2rem)', backgroundColor: hovered ? 'rgba(197,168,128,0.05)' : BG_CARD, border: `1px solid ${hovered ? GOLD_WIRE : BORDER}`, boxShadow: hovered ? '0 10px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,168,128,0.2)' : '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.42s ease', textAlign: isLeft ? 'right' : 'left' }}
      >
        <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', color: hovered ? 'rgba(197,168,128,0.8)' : TEXT_DIM, textTransform: 'uppercase', display: 'block', marginBottom: '6px', transition: 'color 0.4s' }}>{step.en}</span>
        <h3 style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', fontWeight: 900, letterSpacing: '-0.025em', color: hovered ? '#fff' : 'rgba(255,255,255,0.88)', marginBottom: '0.9rem', transition: 'color 0.4s' }}>{step.num} {step.title}</h3>
        <div style={{ width: hovered ? '100%' : '28px', height: '1px', backgroundColor: hovered ? GOLD : GOLD_WIRE, marginLeft: isLeft ? 'auto' : 0, boxShadow: hovered ? '0 0 8px rgba(197,168,128,0.6)' : 'none', transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.4s', marginBottom: '0.9rem' }} />
        <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.04em', color: hovered ? TEXT_MID : 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: 0, textAlign: 'justify', transition: 'color 0.4s' }}>{step.desc}</p>
      </motion.article>
    </Reveal>
  );
};

const Services: React.FC = () => {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <section className="services-hero" style={{ backgroundImage: `url(${servicesHeroBg})` }}>
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
      <section style={{ padding: 'clamp(4rem, 10vh, 7rem) 0', backgroundColor: BG }}>
        <div className="container px-3 px-md-4">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
              <div style={{ width: 'clamp(24px, 4vw, 40px)', height: '1px', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
              <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', color: 'rgba(197,168,128,0.65)', textTransform: 'uppercase' }}>CORE SERVICES</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: GOLD, textShadow: '0 0 30px rgba(197,168,128,0.5)', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>三大核心服務</h2>
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
      <section style={{ padding: 'clamp(4rem, 10vh, 7rem) 0', backgroundColor: '#0D0D0E', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="container px-3 px-md-4">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
              <div style={{ width: 'clamp(24px, 4vw, 40px)', height: '1px', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
              <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', color: 'rgba(197,168,128,0.65)', textTransform: 'uppercase' }}>BESPOKE PROCESS</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: GOLD, textShadow: '0 0 30px rgba(197,168,128,0.5)', marginBottom: '0.5rem' }}>六大職人服務流程</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>From Concept to Flawless Execution</p>
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
    </motion.main>
  );
};

export default Services;
