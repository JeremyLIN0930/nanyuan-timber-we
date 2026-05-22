import React, { useState, useRef } from 'react';
import { motion, useDragControls, useInView } from 'framer-motion';

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-obsidian min-h-screen pt-32"
    >
      <FadeInSection className="container mx-auto px-6 md:px-12 mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-metal-brown glow-text mb-8">服務項目</h1>
        <p className="text-lg md:text-xl font-light tracking-widest text-white/60 max-w-2xl leading-relaxed">
          我們拒絕空洞的承諾。從嚴謹的施工圖面到無瑕的落地實景，拖曳下方滑桿，親眼見證南源木材的精密工法。
        </p>
      </FadeInSection>

      {/* 100vw Apple Split Slider */}
      <section className="w-full relative overflow-hidden">
        <div 
          ref={containerRef}
          className="relative w-screen h-[60vh] md:h-[80vh] cursor-ew-resize overflow-hidden"
          onPointerDown={(e) => dragControls.start(e)}
        >
          {/* Right side: Finished Reality */}
          <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "url('/images/luxury_tianmu_home_1779301841564.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-obsidian/20"></div>
            <div className="absolute bottom-10 right-10 text-white text-sm tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur-md px-6 py-3">
              實景完工照 / REALITY
            </div>
          </div>

          {/* Left side: CAD Blueprint */}
          <div 
            className="absolute inset-0 w-full h-full" 
            style={{ 
              backgroundImage: "url('/images/modern_office_1779301899552.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) contrast(120%) brightness(70%)', 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <div className="absolute inset-0 bg-blue-900/20"></div>
            <div className="absolute bottom-10 left-10 text-white text-sm tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur-md px-6 py-3">
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
            className="absolute top-0 bottom-0 w-[2px] bg-metal-brown cursor-ew-resize z-10 shadow-[0_0_25px_rgba(197,168,128,0.8)]"
            style={{ left: `${sliderPos}%`, x: '-50%' }}
          >
            <div className="absolute top-0 bottom-0 -left-6 w-12 cursor-ew-resize bg-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-metal-brown bg-obsidian/80 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.5)]">
              <span className="text-metal-brown text-xs">⟨⟩</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service List */}
      <FadeInSection className="container mx-auto px-6 md:px-12 py-32">
        <h2 className="text-3xl font-black tracking-tighter text-metal-brown glow-text mb-16">完整服務範疇</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            { title: '室內設計規劃', desc: '從動線格局到風格營造，提供全方位的空間規劃。' },
            { title: '老屋翻新工程', desc: '水電管線重拉、結構補強到防水處理，為高齡房屋注入新生命。' },
            { title: '商業空間設計', desc: '結合品牌形象與商業機能，打造吸引顧客的最佳空間。' },
            { title: '裝潢施工整合', desc: '自有工班統包，解決傳統發包常見的溝通落差與責任推諉。' },
            { title: '家具材料諮詢', desc: '提供專業的家具與軟裝材質建議，挑選最符合設計風格且耐用的搭配。' }
          ].map((item, i) => (
            <div key={i} className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-black tracking-tighter text-white mb-4">{item.title}</h3>
              <p className="text-sm font-light tracking-widest text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </motion.div>
  );
};

export default Services;
