import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';

const AppleSplitSlider: React.FC = () => {
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
    <section className="py-[150px] md:py-[300px] w-full bg-bg-color overflow-hidden">
      <div className="text-center mb-24 px-6">
        <h2 className="text-3xl md:text-5xl font-light tracking-widest text-dark-blue mb-6">完美落地的堅持</h2>
        <p className="text-sm md:text-lg tracking-[0.1em] text-text-muted font-light max-w-2xl mx-auto leading-loose">
          拖曳細線，見證複雜的 CAD 施工藍圖<br/>如何百分之百精準轉化為頂級實景空間。
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-screen h-[50vh] md:h-[80vh] cursor-ew-resize overflow-hidden"
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Right side: Finished Reality (Base layer) */}
        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2500&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute bottom-10 right-10 text-white/80 text-xs tracking-widest uppercase font-light">
            實景完工照 Reality
          </div>
        </div>

        {/* Left side: CAD Blueprint (Clipped layer) */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2500&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: "grayscale(100%) contrast(150%) brightness(80%) sepia(10%) hue-rotate(200deg)", 
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
          }}
        >
          <div className="absolute bottom-10 left-10 text-white/80 text-xs tracking-widest uppercase font-light">
            精密木作線條圖 Blueprint
          </div>
        </div>

        {/* Slider Handle (1px white line) */}
        <motion.div
          drag="x"
          dragControls={dragControls}
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          className="absolute top-0 bottom-0 w-[1px] bg-white cursor-ew-resize z-10 hover:w-[3px] transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ left: `${sliderPos}%`, x: "-50%" }}
        >
          {/* Invisible magnetic handle area */}
          <div className="absolute top-0 bottom-0 -left-6 w-12 cursor-ew-resize"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppleSplitSlider;
