import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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

const About: React.FC = () => {
  const ringsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ringsRef,
    offset: ['start end', 'end start']
  });

  const scaleRing1 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const scaleRing2 = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  const scaleRing3 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const opacityRing1 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const opacityRing2 = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const opacityRing3 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-obsidian min-h-screen pt-32 pb-32"
    >
      {/* Hero Image */}
      <div className="relative w-full h-[70vh] overflow-hidden mb-32">
        <img src="/images/luxury_tianmu_home_1779301841564.png" className="w-full h-full object-cover opacity-60" alt="About Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-metal-brown glow-text mb-6">關於南源</h1>
          <p className="text-lg md:text-xl font-light tracking-widest text-white/70 max-w-2xl">
            從材料源頭到空間落地，我們懂木，更懂您。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Story */}
        <FadeInSection className="max-w-4xl mx-auto mb-40 space-y-12">
          <p className="text-2xl md:text-3xl font-light tracking-widest text-white/85 leading-relaxed">
            早期深耕木材與建築材料領域，擁有超過數十年的產業經驗。我們看過無數材料的優劣，深知一塊好木頭如何影響一個空間的生命力。
          </p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-relaxed">
            我們承諾，每一個細節都經得起時間的考驗，讓您的空間不只是居住，更是安心的歸宿。
          </p>
        </FadeInSection>

        {/* Stats */}
        <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40 border-t border-white/10 pt-16">
          {[
            { num: '30+', label: '年產業經驗' },
            { num: '500+', label: '完工案例' },
            { num: '0', label: '惡意追加' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-6xl md:text-7xl font-black tracking-tighter text-metal-brown glow-text block mb-4">{stat.num}</span>
              <span className="text-sm font-light tracking-widest text-white/50 uppercase">{stat.label}</span>
            </div>
          ))}
        </FadeInSection>
      </div>

      {/* Rings Parallax */}
      <section ref={ringsRef} className="h-[200vh] relative w-full">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="absolute w-[450px] h-[450px] rounded-full border-[0.5px] border-metal-brown/30"
                style={{ scale: scaleRing1, opacity: opacityRing1 }}
              />
              <motion.div 
                className="absolute w-[300px] h-[300px] rounded-full border-[0.5px] border-metal-brown/40"
                style={{ scale: scaleRing2, opacity: opacityRing2 }}
              />
              <motion.div 
                className="absolute w-[150px] h-[150px] rounded-full border-[0.5px] border-metal-brown/50"
                style={{ scale: scaleRing3, opacity: opacityRing3 }}
              />
            </motion.div>

            <div className="relative z-10 text-center max-w-sm px-6">
              <h2 className="text-3xl font-black tracking-tighter text-metal-brown glow-text mb-4">
                年輪，時間的印記。
              </h2>
              <p className="text-sm font-light tracking-widest text-white/50 leading-loose">
                一圈圈代表著我們對材料的深刻理解。<br/>
                從源頭開始，為您的空間注入經久耐用的職人精神。
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
