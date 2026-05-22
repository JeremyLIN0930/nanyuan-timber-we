import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';

const ServicesSplitSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handleDrag = (_event: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    let newPos = (x / rect.width) * 100;
    newPos = Math.max(0, Math.min(100, newPos));
    setSliderPos(newPos);
  };

  return (
    <section className="py-32 bg-dark-blue text-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-20 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">施工圖面到實境的完美落地</h2>
        <p className="text-xl text-earth-light/80 max-w-2xl mx-auto">
          拖曳滑桿，見證複雜的 CAD 施工藍圖如何百分之百精準轉化為高級實景。
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[60vh] min-h-[400px] cursor-ew-resize overflow-hidden rounded-xl shadow-2xl"
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Right side: Finished Reality (Base layer) */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80')" }}>
          <div className="absolute top-6 right-6 bg-black/50 backdrop-blur px-4 py-2 text-sm uppercase tracking-widest font-bold">
            實景完工照
          </div>
        </div>

        {/* Left side: CAD Blueprint (Clipped layer) */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')",
            filter: "grayscale(100%) contrast(150%) brightness(80%) sepia(20%) hue-rotate(180deg)", // Fake blueprint effect
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
          }}
        >
          <div className="absolute top-6 left-6 bg-white/90 text-dark-blue px-4 py-2 text-sm uppercase tracking-widest font-bold">
            精密木作線條圖
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
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
          style={{ left: `${sliderPos}%`, x: "-50%" }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-wood-brown">
            <div className="w-1 h-6 bg-wood-brown/30 mx-0.5 rounded-full"></div>
            <div className="w-1 h-6 bg-wood-brown/30 mx-0.5 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {['防水檢測機制', '木作結構強化', '無縫塗裝工法'].map((step, i) => (
          <div key={i} className="border-t border-earth-light/20 pt-6 cursor-pointer hover:border-wood-brown transition-colors group">
            <h4 className="text-xl font-bold mb-2 group-hover:text-wood-brown transition-colors">{step}</h4>
            <p className="text-sm text-earth-light/60">點擊了解南源在此工序的多次檢核機制與施作標準。</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSplitSlider;
