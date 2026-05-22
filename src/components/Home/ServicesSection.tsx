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
      className="cursor-pointer relative group h-full"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div 
        className="h-full bg-titanium border border-white/5 group-hover:border-metal-brown group-hover:shadow-[0_0_40px_rgba(197,168,128,0.25)] transition-all duration-500 overflow-hidden" 
        style={{ transform: 'translateZ(30px)' }}
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
    <section className="py-[15vh] bg-obsidian relative">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-metal-brown glow-text mb-20">服務項目</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <TiltCard key={i} onClick={() => setActivePopup(i)}>
              <div className="p-10 flex flex-col h-full justify-between min-h-[280px]">
                <span className="text-5xl font-black tracking-tighter text-metal-brown glow-text mb-8">{step.num}</span>
                <div>
                  <h3 className="text-xl font-black tracking-tighter text-white mb-3">{step.title}</h3>
                  <p className="text-sm font-light tracking-widest text-white/40">{step.subtitle}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {activePopup !== null && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center p-6 md:p-12"
            style={{ zIndex: 9990, backgroundColor: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActivePopup(null)}></div>
            
            <motion.div 
              className="relative w-full max-w-5xl bg-titanium border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full md:w-1/2 h-64 md:h-[500px] relative">
                <img src={STEPS[activePopup].popupImg} className="w-full h-full object-cover" alt={STEPS[activePopup].popupTitle} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-titanium/50"></div>
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tighter text-metal-brown glow-text mb-4">STEP {STEPS[activePopup].num}</span>
                <h3 className="text-3xl font-black tracking-tighter text-white mb-8">{STEPS[activePopup].popupTitle}</h3>
                <p className="text-base font-light tracking-widest text-white/70 leading-relaxed mb-12">
                  {STEPS[activePopup].popupContent}
                </p>
                <button onClick={() => setActivePopup(null)} className="apple-btn w-fit">
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
