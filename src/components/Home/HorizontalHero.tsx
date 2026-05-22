import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const HorizontalHero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  // 3D Parallax for Wood Ring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [activeStory, setActiveStory] = useState(0);
  const stories = [
    { title: '起源', desc: '早期木材深耕，掌握木材物理特性與最佳運用。' },
    { title: '轉型', desc: '跨足室內設計，將對材料的深刻理解融入空間。' },
    { title: '落地', desc: '設計施工一條龍整合，確保每份設計圖都能完美落地。' }
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg-color text-text-main">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] h-full">
          {/* Panel 1: Main Title + 3D Ring */}
          <div className="w-screen h-full flex items-center justify-center relative p-8 md:p-20">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="z-10">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight text-wood-brown mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  從材料源頭開始，<br/>打造安心落地的空間
                </motion.h1>
                <p className="text-xl text-text-muted">向下滾動，展開南源的時光畫卷 &darr;</p>
              </div>

              {/* 3D Interactive Wood Ring */}
              <motion.div 
                className="relative w-full aspect-square flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-earth-light/30 rounded-full blur-3xl -z-10"></div>
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-md drop-shadow-2xl cursor-pointer">
                  {/* Outer Ring */}
                  <motion.circle cx="200" cy="200" r="180" fill="transparent" stroke="#8B5A2B" strokeWidth="2" strokeDasharray="10 5" 
                    whileHover={{ scale: 1.05, strokeWidth: 4 }} 
                    onClick={() => setActiveStory(0)}
                  />
                  {/* Middle Ring */}
                  <motion.circle cx="200" cy="200" r="120" fill="transparent" stroke="#A69B8D" strokeWidth="4" 
                    whileHover={{ scale: 1.1, strokeWidth: 6 }} 
                    onClick={() => setActiveStory(1)}
                  />
                  {/* Inner Ring */}
                  <motion.circle cx="200" cy="200" r="60" fill="#8B5A2B" 
                    whileHover={{ scale: 1.2 }} 
                    onClick={() => setActiveStory(2)}
                  />
                </svg>

                {/* Story Tooltip Overlay */}
                <div className="absolute pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                  <motion.div 
                    key={activeStory}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur p-6 rounded shadow-xl border-l-4 border-wood-brown w-64 text-center"
                  >
                    <h3 className="text-xl font-bold text-dark-blue mb-2">{stories[activeStory].title}</h3>
                    <p className="text-sm text-text-muted">{stories[activeStory].desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Panel 2: Big Visual / Manifesto */}
          <div className="w-screen h-full flex flex-col justify-center px-10 md:px-32 relative bg-wood-brown text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 w-1/2">
              拒絕妥協的職人精神
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl leading-relaxed">
              我們不套用罐頭版型，不使用劣質材料。<br/>
              每一個空間的誕生，都經過材料科學的精算與嚴謹的施工藍圖。
            </p>
          </div>

          {/* Panel 3: Imagery / Call to action context */}
          <div className="w-screen h-full flex flex-col md:flex-row items-center justify-between p-10 md:p-32 relative">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-7xl font-bold text-dark-blue mb-8">一條龍整合</h2>
              <p className="text-2xl text-text-muted">從設計出圖到完工點交，無縫接軌。</p>
            </div>
            <div className="md:w-1/2 h-full py-12">
               <div className="w-full h-full bg-earth-light rounded-xl overflow-hidden relative shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover mix-blend-multiply opacity-80" alt="Construction" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalHero;
