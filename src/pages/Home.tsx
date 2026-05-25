import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesSection from '../components/Home/ServicesSection';

gsap.registerPlugin(ScrollTrigger);

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
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: "url('/images/old_house_after.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(5,5,5,0.15)' }}></div>
        <div className="position-absolute bottom-0 end-0 m-3 m-md-4 px-3 py-2" style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300, backgroundColor: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)' }}>完工後 AFTER</div>
      </div>
      {/* Before */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/images/old_house_before.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
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

/* ─── 3D Tunnel Matrix Items ─── */
const tunnelItems = [
  { img: '/images/luxury_tianmu_home_1779301841564.png', title: '天母森光 頂級住宅', tag: 'LUXURY RESIDENTIAL', x: -28, y: -22, z: -600, r: 6 },
  { img: '/images/high_end_cafe_1779301868615.png', title: '琥珀香醇 商業空間', tag: 'COMMERCIAL CAFE', x: 26, y: -16, z: -1100, r: -5 },
  { img: '/images/minimal_wood_kitchen_1779301855424.png', title: '極簡廚境 廚房改裝', tag: 'KITCHEN MINIMALISM', x: -22, y: 20, z: -1700, r: -8 },
  { img: '/images/japanese_wabi_sabi_1779301881798.png', title: '侘寂茶韻 日式空間', tag: 'JAPANESE WABI-SABI', x: 24, y: 22, z: -2200, r: 10 },
  { img: '/images/luxury_bathroom_1779301913582.png', title: '沐光水域 衛浴翻新', tag: 'BOUTIQUE BATHROOM', x: -32, y: -8, z: -2800, r: -3 },
  { img: '/images/modern_office_1779301899552.png', title: '曜石辦公 企業總部', tag: 'OFFICE HEADQUARTERS', x: 30, y: -10, z: -3300, r: 5 },
  { img: '/images/style_luxury_dark_1779301949701.png', title: '奢華暗灰 工藝美學', tag: 'DARK MODERN STYLE', x: -18, y: -26, z: -3900, r: 12 },
  { img: '/images/style_minimal_wood_1779301932325.png', title: '北歐極簡 原木溫潤', tag: 'MINIMAL WOOD STYLE', x: 20, y: -24, z: -4400, r: -10 },
  { img: '/images/style_wabi_sabi_1779301962644.png', title: '日式靜謐 侘寂美感', tag: 'ZEN RETREAT STYLE', x: -28, y: 24, z: -5000, r: -6 },
  { img: '/images/style_industrial_1779301976370.png', title: '精品工業 藝廊質感', tag: 'INDUSTRIAL LOFT STYLE', x: 28, y: 18, z: -5500, r: 8 },
  { img: '/images/budget_smart_home.png', title: '小資宅機能 收納美學', tag: 'SMART FUNCTIONAL LIVING', x: -30, y: -14, z: -6100, r: 4 },
  { img: '/images/renovation_detail.png', title: '職人工法 節點檢核', tag: 'CRAFTSMANSHIP CHECK', x: 26, y: -20, z: -6600, r: -7 },
  { img: '/images/luxury_tianmu_home_1779301841564.png', title: '黑胡桃拼貼 紋理對話', tag: 'NATURAL WALNUT SPECS', x: -20, y: 22, z: -7200, r: -9 },
  { img: '/images/high_end_cafe_1779301868615.png', title: '台灣檜木 吧台手作', tag: 'CYPRESS TABLECRAFT', x: 22, y: 16, z: -7700, r: 11 },
  { img: '/images/minimal_wood_kitchen_1779301855424.png', title: '大理石對花 鏡面對稱', tag: 'MARBLE BOOKMATCHING', x: -32, y: -6, z: -8300, r: -4 },
  { img: '/images/japanese_wabi_sabi_1779301881798.png', title: '微水泥牆 手工刷紋', tag: 'MICRO CEMENT TACTILITY', x: 30, y: -2, z: -8800, r: 6 }
];

/* ─── Home Page ─── */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. GSAP ScrollTrigger - 3D Camera zoom parallax scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrolling linkage
        pin: true, // Pin the viewport container
      }
    });

    // Translate the gallery frame along the Z-axis (pushing elements towards & past the camera)
    tl.to('.gallery-frame', {
      z: 9600, // Move the frame forward
      ease: 'none'
    });

    // Fade out the gallery frame as we reach the end of the tunnel
    tl.to('.gallery-frame', {
      opacity: 0,
      duration: 0.15
    }, '>-0.25'); // start fading out in the final 25% of the scrub

    // Fade in the branding title overlay
    tl.fromTo('.branding-overlay', 
      { opacity: 0, scale: 0.85, z: -300 },
      { opacity: 1, scale: 1, z: 0, duration: 0.3, ease: 'power2.out' },
      '>-0.15' // triggers fade-in in coordination with the fade-out
    );

    // 2. Mouse Move Parallax Tilt Effect
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate rotation angles based on cursor offset from screen center
      const xAngle = (e.clientX / window.innerWidth - 0.5) * 12; // Y-axis rotation (left/right looking)
      const yAngle = (e.clientY / window.innerHeight - 0.5) * -12; // X-axis rotation (up/down looking)
      
      gsap.to('.gallery-frame', {
        rotationY: xAngle,
        rotationX: yAngle,
        ease: 'power2.out',
        duration: 0.8
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector('.advantages-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: '#050505', minHeight: '100vh' }}
    >
      {/* ══════════════ BLOCK 1: 3D PORTFOLIO TUNNEL PARALLAX ══════════════ */}
      <div ref={heroRef} className="scroll-track">
        <div className="gallery-container">
          <div className="gallery-frame" style={{ transformStyle: 'preserve-3d' }}>
            {tunnelItems.map((item, idx) => (
              <div 
                key={idx}
                className="gallery-item-card"
                style={{
                  transform: `translate3d(calc(-50% + ${item.x}vw), calc(-50% + ${item.y}vh), ${item.z}px) rotate(${item.r}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img src={item.img} className="gallery-item-img" alt={item.title} />
                <div className="gallery-item-info">
                  <h4 className="gallery-item-title">{item.title}</h4>
                  <span className="gallery-item-tag">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Branding overlay at the end of the Z tunnel */}
          <div className="branding-overlay" style={{ transformStyle: 'preserve-3d' }}>
            <div className="branding-overlay-content">
              <h1 
                className="fw-bold mb-3"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#C5A880', textShadow: '0 0 45px rgba(197, 168, 128, 0.85)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                南源木材有限公司
              </h1>
              <h3 
                className="fw-light mb-4" 
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)', color: '#fff', letterSpacing: '0.1em', textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
              >
                從材料源頭開始，打造安心落地的空間
              </h3>
              <p 
                className="mx-auto mb-5 text-muted-custom" 
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '750px', lineHeight: 1.8 }}
              >
                結合木材與材料背景，整合設計、選材與施工流程，讓裝修成果更穩定、更透明、更接近想像。
              </p>
              
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button 
                  onClick={scrollToContent} 
                  className="px-4 py-2.5 font-bold border border-metal-brown text-metal-brown bg-transparent"
                  style={{ fontSize: '13px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197,168,128,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  探索南源工藝 ➔
                </button>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="px-4 py-2.5 font-bold"
                  style={{ fontSize: '13px', letterSpacing: '0.1em', backgroundColor: '#C5A880', color: '#050505', border: '1px solid #C5A880', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(197,168,128,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  立即預約諮詢
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ BLOCK 2: THREE CORE ADVANTAGES ══════════════ */}
      <section className="advantages-section w-100 py-5 py-lg-5" style={{ backgroundColor: '#0D0D0E', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container py-4 py-lg-5">
          <FadeInSection className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.5)' }}>三大核心優勢</h2>
            <p className="mx-auto text-muted-custom" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '600px' }}>
              從選材到施工，南源以三大核心堅持，為您打造安心穩定的裝修體驗。
            </p>
          </FadeInSection>
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: <Trees size={32} style={{ color: '#C5A880' }} />,
                title: '源頭理解',
                desc: '擁有深厚的木材與材料背景，從源頭精準理解各種材料的物理特性與適用性，為您的空間挑選最合適、最耐用的高品質用料。'
              },
              {
                icon: <ShieldCheck size={32} style={{ color: '#C5A880' }} />,
                title: '細節品質',
                desc: '在每一項施工環節皆設立嚴格的檢核點，尤其是防水、木作與油漆工程，我們堅持多次逐項驗收，不放過任何影響居住安全的微小細節。'
              },
              {
                icon: <ClipboardCheck size={32} style={{ color: '#C5A880' }} />,
                title: '誠信透明',
                desc: '提供完全透明、逐項列出的工程報價單，簽約金額即為最終造價，絕不惡意追加任何隱藏預算；施工過程全程記錄，讓您住得安心、放心。'
              }
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <FadeInSection delay={i * 0.15}>
                  <div
                    className="p-4 p-lg-5 h-100 rounded-1 transition-all"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(197, 168, 128, 0.1)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.4s ease'
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = '#C5A880';
                      el.style.backgroundColor = 'rgba(197, 168, 128, 0.05)';
                      el.style.boxShadow = '0 10px 30px rgba(197, 168, 128, 0.15)';
                      el.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(197, 168, 128, 0.1)';
                      el.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                      el.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center mb-4 rounded-circle mx-auto" style={{ width: '70px', height: '70px', backgroundColor: 'rgba(197, 168, 128, 0.1)' }}>
                      {item.icon}
                    </div>
                    <h3 className="text-center mb-3" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, color: '#C5A880' }}>{item.title}</h3>
                    <p style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'justify', margin: 0 }}>{item.desc}</p>
                  </div>
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
              設計與落地的真實對照
            </h2>
            <p className="mb-4" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', maxWidth: '750px', lineHeight: 1.8 }}>
              許多裝修最怕「設計圖好看，實際落地卻走樣」。南源從材料源頭與施工細節雙重控管，確保所見即所得。左右拖曳滑桿，親手見證老屋翻修前後的精準落地對照。
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
