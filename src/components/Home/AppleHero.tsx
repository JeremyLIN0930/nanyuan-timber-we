import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const AppleHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // The container is 200vh tall to allow scrolling space.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Scale down the image and add border radius
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ['0px', '40px']);
  
  // Fade out the initial title, fade in the subtitle
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-bg-color w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Parallax / Scaled Background Image */}
        <motion.div 
          className="absolute w-full h-full shadow-2xl overflow-hidden"
          style={{ scale, borderRadius }}
        >
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80')", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-black" 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.1, 0.5]) }} 
          />
        </motion.div>
        
        {/* Content Layers */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full h-full pointer-events-none">
          
          <motion.h1 
            className="absolute text-5xl md:text-7xl font-light tracking-[0.2em] px-4"
            style={{ opacity: titleOpacity }}
          >
            NANYUAN TIMBER
          </motion.h1>
          
          <motion.div 
            className="absolute flex flex-col items-center justify-center pointer-events-auto"
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-6">重新定義空間的本質</h2>
            <p className="text-lg md:text-xl tracking-widest font-light opacity-80 mb-10 max-w-2xl px-6">
              拋棄繁複的裝飾，回歸材料的原始純粹。<br/>
              從精密選材到完美落地，展現無與倫比的建築工藝。
            </p>
            <Link to="/projects" className="apple-btn apple-btn-white text-sm">
              探索作品 ➜
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AppleHero;
