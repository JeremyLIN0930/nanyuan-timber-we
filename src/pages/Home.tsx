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
      className="position-relative w-100 overflow-hidden"
      style={{ height: 'clamp(300px, 60vh, 80vh)', cursor: 'ew-resize', userSelect: 'none' }}
      onMouseMove={(e) => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseDown={(e) => handleMove(e.clientX)}
    >
      {/* After */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: "url('/images/luxury_tianmu_home_1779301841564.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(5,5,5,0.1)' }}></div>
        <div className="position-absolute bottom-0 end-0 m-3 m-md-4 px-3 py-2" style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>完工後 AFTER</div>
      </div>
      {/* Before */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/images/japanese_wabi_sabi_1779301881798.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(110%) brightness(60%)',
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`
        }}
      >
        <div className="position-absolute bottom-0 start-0 m-3 m-md-4 px-3 py-2" style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>施工前 BEFORE</div>
      </div>
      {/* Handle */}
      <div className="position-absolute top-0 bottom-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '2px', backgroundColor: '#C5A880', boxShadow: '0 0 25px rgba(197,168,128,0.8)', zIndex: 10 }}>
        <div className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #C5A880', backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 0 20px rgba(197,168,128,0.5)' }}>
          <span style={{ color: '#C5A880', fontSize: '12px', fontWeight: 300 }}>⟨⟩</span>
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      style={{ backgroundColor: '#050505', minHeight: '100vh' }}
    >
      {/* ══════════════ BLOCK 1: HERO SLIDER + SCROLL ZOOM ══════════════ */}
      <section ref={heroRef} className="position-relative w-100" style={{ height: '200vh' }}>
        <div className="position-sticky top-0 w-100 d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '100vh', backgroundColor: '#050505' }}>

          {/* Reveal Text Behind */}
          <motion.div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-md-5"
            style={{ opacity: revealOpacity, y: revealY, zIndex: 0 }}
          >
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.7)', lineHeight: 1.1 }}>重新定義奢華本質</h2>
            <p className="mx-auto" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.8 }}>
              從精密選材到完美落地，<br/>展現無與倫比的建築工藝。
            </p>
          </motion.div>

          {/* Scalable Slider */}
          <motion.div
            className="position-relative w-100 h-100 overflow-hidden"
            style={{ scale: heroScale, borderRadius: heroRadius, opacity: heroOpacity, boxShadow: '0 0 80px rgba(0,0,0,0.9)', zIndex: 10, backgroundColor: '#000' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundImage: `url(${heroSlides[currentSlide].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(5,5,5,0.5)' }}></div>
              </motion.div>
            </AnimatePresence>

            {/* Hero Text */}
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-md-5" style={{ zIndex: 20, pointerEvents: 'none' }}>
              <h1
                className="fw-bold mb-2 mb-md-4"
                style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.85)', lineHeight: 1.1 }}
              >
                從材料源頭開始
              </h1>
              <p
                className="mb-4 mb-md-5"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', fontWeight: 300, letterSpacing: '0.15em', color: '#fff', textShadow: '0 0 25px rgba(255,255,255,0.5)' }}
              >
                打造安心落地的空間
              </p>
              <div style={{ pointerEvents: 'auto' }}>
                <button onClick={() => navigate('/projects')} className="apple-btn" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', color: '#fff' }}>
                  查看作品案例 ➔
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center gap-3 pb-4" style={{ zIndex: 20, pointerEvents: 'auto' }}>
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="border-0 p-0"
                  style={{ height: '3px', width: currentSlide === idx ? '48px' : '16px', backgroundColor: currentSlide === idx ? '#C5A880' : 'rgba(255,255,255,0.25)', transition: 'all 0.5s', boxShadow: currentSlide === idx ? '0 0 12px rgba(197,168,128,0.9)' : 'none' }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ BLOCK 2: DATA TRUST INDICATORS ══════════════ */}
      <section className="w-100 py-5 py-lg-5" style={{ backgroundColor: '#0D0D0E', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container py-4 py-lg-5">
          <div className="row g-4 g-lg-5 text-center">
            {[
              { num: '100%', label: '原木進口追蹤', desc: '每一塊板材皆有完整的產地認證與含水率檢測報告' },
              { num: '0', label: '惡意追加預算', desc: '合約即為最終報價，杜絕一切隱藏費用' },
              { num: '24/7', label: '雲端監造查看', desc: '隨時透過手機查看施工進度，每日實拍回報' },
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <FadeInSection delay={i * 0.15}>
                  <span
                    className="d-block fw-bold mb-3"
                    style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.7)', lineHeight: 1.1 }}
                  >
                    {item.num}
                  </span>
                  <h3 className="mb-2" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>{item.label}</h3>
                  <p className="mx-auto" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', maxWidth: '280px', lineHeight: 1.8 }}>{item.desc}</p>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BLOCK 3: SERVICES 1-2-3 INTERACTIVE ══════════════ */}
      <ServicesSection />

      {/* ══════════════ BLOCK 4: BEFORE / AFTER MAGIC ══════════════ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#050505' }}>
        <div className="container py-4">
          <FadeInSection>
            <h2
              className="fw-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}
            >
              空間魔術：擦除對照
            </h2>
            <p className="mb-4" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.8 }}>
              左右拖曳滑桿，親手見證破舊空間蛻變為頂級住宅的震撼反差。
            </p>
          </FadeInSection>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* ══════════════ BLOCK 5: PORTFOLIO WALL ══════════════ */}
      <section className="w-100 py-5" style={{ backgroundColor: '#0D0D0E' }}>
        <div className="container py-4">
          <FadeInSection className="mb-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>
              極精選作品
            </h2>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
              點擊探索每一個空間的完整故事。
            </p>
          </FadeInSection>

          {/* Bootstrap Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="row g-4">
            {portfolioItems.map((item, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <FadeInSection delay={i * 0.08}>
                  <motion.div
                    className="position-relative overflow-hidden"
                    style={{ cursor: 'pointer' }}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate('/projects')}
                  >
                    <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                      <img src={item.img} className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.7, transition: 'all 0.7s' }} alt={item.title}
                        onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '1'; (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.7'; (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.3) 50%, transparent 100%)', opacity: 0.8 }}></div>
                      <div className="position-absolute bottom-0 start-0 p-3 p-md-4">
                        <span className="d-block mb-1" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textTransform: 'uppercase' }}>{item.type}</span>
                        <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BLOCK 6: CTA FULL-WIDTH ══════════════ */}
      <section className="position-relative w-100 overflow-hidden" style={{ height: 'clamp(400px, 70vh, 80vh)' }}>
        <img src="/images/style_luxury_dark_1779301949701.png" className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', opacity: 0.4 }} alt="CTA" />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.3) 100%)' }}></div>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-md-5">
          <FadeInSection>
            <h2
              className="fw-bold mb-3 mb-md-4"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 50px rgba(197,168,128,0.9)', lineHeight: 1.1 }}
            >
              開啟您的空間之旅
            </h2>
            <p className="mx-auto mb-4 mb-md-5" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.8 }}>
              從一次免費諮詢開始，讓南源的頂級職人為您的夢想空間量身打造。
            </p>
            <button onClick={() => navigate('/contact')} className="apple-btn" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: '#fff' }}>
              立即預約諮詢 ➔
            </button>
          </FadeInSection>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
