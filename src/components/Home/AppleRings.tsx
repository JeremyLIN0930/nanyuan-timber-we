import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AppleRings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Expand the rings as user scrolls
  const scaleRing1 = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const scaleRing2 = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]);
  const scaleRing3 = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const opacityRings = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-bg-color w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: opacityRings }}
          >
            {/* Outer Ring */}
            <motion.div 
              className="absolute w-[500px] h-[500px] rounded-full border border-wood-brown/20"
              style={{ scale: scaleRing1 }}
            />
            {/* Middle Ring */}
            <motion.div 
              className="absolute w-[350px] h-[350px] rounded-full border border-wood-brown/30"
              style={{ scale: scaleRing2 }}
            />
            {/* Inner Ring */}
            <motion.div 
              className="absolute w-[200px] h-[200px] rounded-full border border-wood-brown/40"
              style={{ scale: scaleRing3 }}
            />
          </motion.div>

          <div className="relative z-10 text-center max-w-sm px-6">
            <motion.h2 
              className="text-2xl font-light tracking-widest text-dark-blue mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              年輪，時間的印記。
            </motion.h2>
            <motion.p 
              className="text-sm font-light tracking-widest text-text-muted leading-loose"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              一圈圈代表著我們對木材的深刻理解。<br/>
              不是表面的裝飾，而是從源頭開始，<br/>
              為您的空間注入生命力與經久耐用的職人精神。
            </motion.p>
          </div>

          {/* Hover interactive dots on rings */}
          <div className="absolute top-1/4 right-1/4 group cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-wood-brown shadow-[0_0_10px_rgba(139,90,43,0.5)]"></div>
            <div className="absolute top-4 left-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 backdrop-blur p-4 rounded text-xs tracking-widest border-l border-wood-brown">
              源頭選材：嚴格篩選每一吋木紋，確保物理結構穩定。
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/4 group cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-dark-blue shadow-[0_0_10px_rgba(28,40,51,0.5)]"></div>
            <div className="absolute top-4 right-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 backdrop-blur p-4 rounded text-xs tracking-widest border-r border-dark-blue text-right">
              極致工法：無縫塗裝與抗潮處理，挑戰最嚴苛的居住環境。
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppleRings;
