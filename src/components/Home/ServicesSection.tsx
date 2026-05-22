import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="h-100"
    >
      <div
        className="h-100 overflow-hidden"
        style={{
          transform: 'translateZ(30px)',
          backgroundColor: '#0D0D0E',
          border: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.5s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A880'; e.currentTarget.style.boxShadow = '0 0 40px rgba(197,168,128,0.25)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const STEPS = [
  {
    num: '01',
    title: '數位選配預約',
    subtitle: '點擊探索視覺預覽技術 ➔',
    popupTitle: '數位選配預約',
    popupContent: '線上配備未來新家，即時生成視覺預覽。我們利用最新的渲染技術，讓您在施工前就能看見未來的模樣。從格局配置到燈光模擬，每一處都精準呈現。',
    popupImg: '/images/style_minimal_wood_1779301932325.png'
  },
  {
    num: '02',
    title: '職人源頭選材',
    subtitle: '點擊探索頂級材料工藝 ➔',
    popupTitle: '職人源頭選材',
    popupContent: '直接對接林場，嚴格把關木材含水率與韌性。每一塊進入南源工坊的木材，都經過含水率測試、紋理評估與結構韌性檢驗，從根本解決台灣潮濕氣候帶來的建材耗損問題。',
    popupImg: '/images/japanese_wabi_sabi_1779301881798.png'
  },
  {
    num: '03',
    title: '透明施工監造',
    subtitle: '點擊探索雲端施工日誌 ➔',
    popupTitle: '透明施工監造',
    popupContent: '雲端施工日誌 24/7 全天候查看。每日進度由工地主管實拍回報，杜絕一切不合理的預算追加。追加預算為 0，這是我們對每一位業主的誠信承諾。',
    popupImg: '/images/modern_office_1779301899552.png'
  }
];

const ServicesSection: React.FC = () => {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  return (
    <section className="py-5" style={{ backgroundColor: '#050505' }}>
      <div className="container py-4">
        <h2 className="fw-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>服務項目</h2>

        {/* Bootstrap Grid: 1 col mobile, 3 col desktop */}
        <div className="row g-4">
          {STEPS.map((step, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <TiltCard onClick={() => setActivePopup(i)}>
                <div className="p-4 p-lg-5 d-flex flex-column justify-content-between" style={{ minHeight: '260px' }}>
                  <span className="fw-bold d-block mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.7)', lineHeight: 1.1 }}>{step.num}</span>
                  <div>
                    <h3 className="mb-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>{step.title}</h3>
                    <p style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>{step.subtitle}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {activePopup !== null && (
          <motion.div
            className="d-flex align-items-center justify-content-center p-3 p-md-5"
            style={{ position: 'fixed', inset: 0, zIndex: 9990, backgroundColor: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ cursor: 'pointer' }} onClick={() => setActivePopup(null)}></div>

            <motion.div
              className="position-relative w-100 overflow-hidden d-flex flex-column flex-md-row"
              style={{ maxWidth: '960px', backgroundColor: '#0D0D0E', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-100" style={{ maxHeight: '250px', minHeight: '200px' }}>
                <img src={STEPS[activePopup].popupImg} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={STEPS[activePopup].popupTitle} />
              </div>
              <div className="d-none d-md-block" style={{ width: '50%', minHeight: '400px' }}>
                <img src={STEPS[activePopup].popupImg} className="w-100 h-100" style={{ objectFit: 'cover', display: 'block' }} alt={STEPS[activePopup].popupTitle} />
              </div>
              <div className="w-100 p-4 p-md-5 d-flex flex-column justify-content-center" style={{ flex: '1 1 50%' }}>
                <span className="fw-bold mb-2" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', letterSpacing: '-0.02em', color: '#C5A880', textShadow: '0 0 20px rgba(197,168,128,0.6)' }}>STEP {STEPS[activePopup].num}</span>
                <h3 className="mb-4" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>{STEPS[activePopup].popupTitle}</h3>
                <p className="mb-5" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                  {STEPS[activePopup].popupContent}
                </p>
                <button onClick={() => setActivePopup(null)} className="apple-btn" style={{ width: 'fit-content' }}>
                  關閉視窗 ➔
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
