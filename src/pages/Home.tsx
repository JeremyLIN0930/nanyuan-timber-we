import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ServicesSection from '../components/Home/ServicesSection';

/* ─── Reusable Scroll-Driven Fade-In ─── */
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Hero Slides ─── */
const heroSlides = [
  { id: 1, image: '/images/luxury_tianmu_home_1779301841564.png', title: '頂級天母豪宅' },
  { id: 2, image: '/images/high_end_cafe_1779301868615.png', title: '高階商業空間' },
  { id: 3, image: '/images/minimal_wood_kitchen_1779301855424.png', title: '極簡廚房' },
];

/* ─── Portfolio Items ─── */
const portfolioItems = [
  { title: '天母森光', type: '頂級住宅', img: '/images/luxury_tianmu_home_1779301841564.png' },
  { title: '侘寂茶韻', type: '日式空間', img: '/images/japanese_wabi_sabi_1779301881798.png' },
  { title: '極簡廚境', type: '廚房改裝', img: '/images/minimal_wood_kitchen_1779301855424.png' },
  { title: '曜石辦公', type: '企業總部', img: '/images/modern_office_1779301899552.png' },
  { title: '沐光水域', type: '衛浴翻新', img: '/images/luxury_bathroom_1779301913582.png' },
  { title: '琥珀香醇', type: '商業空間', img: '/images/high_end_cafe_1779301868615.png' },
];

/* ─── Before/After Slider ─── */
const BeforeAfterSlider: React.FC = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] cursor-ew-resize overflow-hidden select-none"
      onMouseMove={(e) => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseDown={(e) => handleMove(e.clientX)}
    >
      {/* After (base) */}
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/luxury_tianmu_home_1779301841564.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-obsidian/10"></div>
        <div className="absolute bottom-8 right-8 text-white text-xs tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur px-5 py-2">完工後 AFTER</div>
      </div>
      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/japanese_wabi_sabi_1779301881798.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(110%) brightness(60%)',
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`
        }}
      >
        <div className="absolute bottom-8 left-8 text-white text-xs tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur px-5 py-2">施工前 BEFORE</div>
      </div>
      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-[2px] z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)', backgroundColor: '#C5A880', boxShadow: '0 0 25px rgba(197,168,128,0.8)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-metal-brown bg-obsidian/80 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.5)]">
          <span className="text-metal-brown text-xs font-light">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════ HOME ═══════════════════════════════════ */

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll Zoom
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.85]);
  const heroRadius = useTransform(heroScroll, [0, 0.5], ['0px', '24px']);
  const heroOpacity = useTransform(heroScroll, [0.4, 0.8], [1, 0]);
  const revealOpacity = useTransform(heroScroll, [0.25, 0.5], [0, 1]);
  const revealY = useTransform(heroScroll, [0.25, 0.5], [50, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-obsidian min-h-screen"
    >
      {/* ══════════════ BLOCK 1: HERO SLIDER + SCROLL ZOOM ══════════════ */}
      <section ref={heroRef} className="h-[200vh] relative w-full">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-obsidian">

          {/* Reveal Text Behind */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-0"
            style={{ opacity: revealOpacity, y: revealY }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-metal-brown glow-text mb-6">重新定義奢華本質</h2>
            <p className="text-lg md:text-xl font-light tracking-widest text-white/50 leading-relaxed max-w-2xl">
              從精密選材到完美落地，<br/>展現無與倫比的建築工藝。
            </p>
          </motion.div>

          {/* Scalable Slider */}
          <motion.div
            className="relative w-full h-full overflow-hidden z-10 bg-black"
            style={{ scale: heroScale, borderRadius: heroRadius, opacity: heroOpacity, boxShadow: '0 0 80px rgba(0,0,0,0.9)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{ backgroundImage: `url(${heroSlides[currentSlide].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-obsidian/50"></div>
              </motion.div>
            </AnimatePresence>

            {/* Hero Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-20 px-6">
              <h1
                className="text-4xl md:text-7xl font-black tracking-tighter text-metal-brown mb-4"
                style={{ textShadow: '0 0 40px rgba(197, 168, 128, 0.85)' }}
              >
                從材料源頭開始
              </h1>
              <p
                className="text-xl md:text-3xl font-light tracking-widest text-white mb-10"
                style={{ textShadow: '0 0 25px rgba(255,255,255,0.5)' }}
              >
                打造安心落地的空間
              </p>
              <div className="pointer-events-auto">
                <button onClick={() => navigate('/projects')} className="apple-btn text-sm text-white hover:text-metal-brown">
                  查看作品案例 ➔
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-auto">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[3px] transition-all duration-500 ${currentSlide === idx ? 'w-12 bg-metal-brown shadow-[0_0_12px_rgba(197,168,128,0.9)]' : 'w-4 bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ BLOCK 2: DATA TRUST INDICATORS ══════════════ */}
      <section className="w-full bg-titanium py-32 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { num: '100%', label: '原木進口追蹤', desc: '每一塊板材皆有完整的產地認證與含水率檢測報告' },
              { num: '0', label: '惡意追加預算', desc: '合約即為最終報價，杜絕一切隱藏費用' },
              { num: '24/7', label: '雲端監造查看', desc: '隨時透過手機查看施工進度，每日實拍回報' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <span
                  className="text-6xl md:text-8xl font-black tracking-tighter text-metal-brown block mb-6"
                  style={{ textShadow: '0 0 40px rgba(197, 168, 128, 0.7)' }}
                >
                  {item.num}
                </span>
                <h3 className="text-lg font-black tracking-tighter text-white mb-3">{item.label}</h3>
                <p className="text-sm font-light tracking-widest text-white/40 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BLOCK 3: SERVICES 1-2-3 INTERACTIVE ══════════════ */}
      <ServicesSection />

      {/* ══════════════ BLOCK 4: BEFORE / AFTER MAGIC ══════════════ */}
      <section className="w-full bg-obsidian py-32">
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <FadeInSection>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tighter text-metal-brown glow-text mb-6"
            >
              空間魔術：擦除對照
            </h2>
            <p className="text-lg font-light tracking-widest text-white/50 max-w-2xl leading-relaxed">
              左右拖曳滑桿，親手見證破舊空間蛻變為頂級住宅的震撼反差。
            </p>
          </FadeInSection>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* ══════════════ BLOCK 5: PORTFOLIO WALL ══════════════ */}
      <section className="w-full bg-titanium py-32">
        <div className="container mx-auto px-6 md:px-12">
          <FadeInSection className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-metal-brown glow-text mb-6">
              極精選作品
            </h2>
            <p className="text-lg font-light tracking-widest text-white/40">
              點擊探索每一個空間的完整故事。
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <motion.div
                  className="relative overflow-hidden cursor-pointer group"
                  whileHover={{ y: -6 }}
                  onClick={() => navigate('/projects')}
                >
                  <div className="aspect-[4/3] relative">
                    <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-80"></div>
                    <div className="absolute bottom-5 left-5">
                      <span className="text-[10px] font-light tracking-widest text-metal-brown uppercase block mb-1">{item.type}</span>
                      <h3 className="text-xl font-black tracking-tighter text-white" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BLOCK 6: CTA FULL-WIDTH ══════════════ */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img src="/images/style_luxury_dark_1779301949701.png" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="CTA" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <FadeInSection>
            <h2
              className="text-4xl md:text-7xl font-black tracking-tighter text-metal-brown mb-8"
              style={{ textShadow: '0 0 50px rgba(197, 168, 128, 0.9)' }}
            >
              開啟您的空間之旅
            </h2>
            <p className="text-lg md:text-xl font-light tracking-widest text-white/70 mb-12 max-w-2xl leading-relaxed">
              從一次免費諮詢開始，讓南源的頂級職人為您的夢想空間量身打造。
            </p>
            <button onClick={() => navigate('/contact')} className="apple-btn text-white hover:text-metal-brown text-base">
              立即預約諮詢 ➔
            </button>
          </FadeInSection>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
