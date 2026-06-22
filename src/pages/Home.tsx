import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Home.tsx — 南源木材首頁完全體 v4（Complete Rewrite from Scratch）
   ═══════════════════════════════════════════════════════════════════════════
   七大劇場版塊：
     §1  Brand Intro Viewport     — 0ms 死亮進站序幕（2s 退場 → 3s 銷毀）
     §2  Hero Scroll Theatre      — 400vh sticky 優點鎖定劇場（4 張）
     §3  About Nanyuan             — 滿版職人背景品牌介紹
     §4  Process Timeline          — 圖形化六大流程軸（Hover 互動）
     §5  Comparison Slider         — 推拉式前後對照滑桿
     §6  Projects Wall             — 精選案例卡片牆（16:10 橫圖）
     §7  CTA                       — 由 Footer.tsx 全局統一掛載，此處不重複渲染

   ⚠ 鐵律：零行內 style={{}} / 零 <style> 標籤 / 100% 樣式在 Home.css
   ═══════════════════════════════════════════════════════════════════════════ */


/* ─── §2 HERO IMAGES — 每張對應一個優點 ─── */
import heroImgBrand from '../assets/home-hero-brand-bg.jpg';
import heroImg01 from '../assets/home-advantage-01.jpg';
import heroImg02 from '../assets/home-advantage-02.jpg';
import heroImg03 from '../assets/home-advantage-03.jpg';
import heroImg04 from '../assets/home-advantage-04.jpg';

const HERO_IMAGES = [
  heroImgBrand,
  heroImg01,
  heroImg02,
  heroImg03,
  heroImg04,
];

/* ─── §3 ABOUT BACKGROUND ─── */
import aboutBrandBg from '../assets/home-about-artisan.jpg';

/* ─── §5 COMPARISON IMAGES ─── */
import compareRender  from '../assets/home-compare-render.jpg';
import compareReality from '../assets/home-compare-reality.jpg';

/* ─── §6 PROJECTS THUMBNAILS（嚴選橫圖場景照） ─── */
import projectThumb01 from '../assets/project-thumb-scand.jpg';
import projectThumb02 from '../assets/project-thumb-luxury.jpg';
import projectThumb03 from '../assets/project-thumb-kitchen.jpg';
import projectThumb04 from '../assets/project-thumb-zen-home.jpg';


/* ═══════════════════════════════════════════════════════════════════════════
   DATA — 四大優點
   ═══════════════════════════════════════════════════════════════════════════ */
interface Advantage {
  number: string;
  title: string;
  desc: string;
  image: string;
}

const ADVANTAGES: Advantage[] = [
  {
    number: '01',
    title: '嚴選頂級建材',
    desc: '南源深入木材產地源頭，逐批精選北美硬楓木、歐洲白橡與日本檜木，每片板材皆經含水率、密度與紋理三重品管，確保您家中的每一寸木質，都是自然與工藝的極致呈現。',
    image: heroImg01,
  },
  {
    number: '02',
    title: '精細職人工藝',
    desc: '傳承三十年的老師傅手藝，從榫卯接合到漆面打磨，每一道工序都以「不可逆的細節堅持」為信條。機器量產無法複製的手感溫潤，正是南源木材作品歷久彌新的秘密。',
    image: heroImg02,
  },
  {
    number: '03',
    title: '透明報價零隱藏',
    desc: '業界首創「全明細攤開式報價」——材料品牌、工法規格、施作單價一目了然。拒絕模糊灌水、拒絕事後追加，讓您的每一分預算都花在看得見的品質上。',
    image: heroImg03,
  },
  {
    number: '04',
    title: '一條龍完美成家',
    desc: '從空間丈量、風格設計、建材採購到現場施工與驗收售後，南源提供一站式整合服務。您只需描繪理想生活的樣貌，剩下的，交給我們用木頭實現。',
    image: heroImg04,
  },
];


/* ═══════════════════════════════════════════════════════════════════════════
   DATA — 六大流程
   ═══════════════════════════════════════════════════════════════════════════ */
interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: '初步諮詢',
    desc: '深入了解您的生活方式、空間需求與風格偏好，建立專案的核心設計方向。',
  },
  {
    number: '02',
    title: '現場丈量',
    desc: '專業團隊到府實地丈量，精確記錄每一寸空間尺度、管線位置與採光條件。',
  },
  {
    number: '03',
    title: '方案設計',
    desc: '依據丈量數據與諮詢結論，打造量身訂製的3D設計方案與完整材料計畫書。',
  },
  {
    number: '04',
    title: '材料精選',
    desc: '帶領業主親赴建材展廳，逐一精選木種、五金與板材，確認每項材料的品牌與規格。',
  },
  {
    number: '05',
    title: '精工施作',
    desc: '資深職人團隊進場施工，每日回報進度照片，全程接受業主巡場與即時溝通。',
  },
  {
    number: '06',
    title: '驗收售後',
    desc: '逐項清點驗收每一處工藝細節，提供完善的保固服務與長期售後維護支持。',
  },
];


/* ═══════════════════════════════════════════════════════════════════════════
   DATA — 精選作品（4 張 16:10 橫圖）
   ═══════════════════════════════════════════════════════════════════════════ */
interface ProjectCard {
  id: string;
  name: string;
  category: string;
  image: string;
}

const PROJECT_CARDS: ProjectCard[] = [
  { id: '1', name: '北歐極簡小宅', category: 'SCANDINAVIAN', image: projectThumb01 },
  { id: '2', name: '現代奢華大宅', category: 'MODERN LUXURY', image: projectThumb02 },
  { id: '3', name: '暖木系廚房',   category: 'WARM KITCHEN', image: projectThumb03 },
  { id: '4', name: '日式禪風居所', category: 'JAPANESE ZEN', image: projectThumb04 },
];


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /* ─────────────────────────────────────────────────────────────────────
     §2 STATE — Hero Scroll Theatre (5 Panels: 0 to 4)
     ───────────────────────────────────────────────────────────────────── */
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const scrollableHeight = container.offsetHeight - window.innerHeight;

    if (scrollableHeight <= 0) return;

    const scrolled = -containerTop;
    const progress = Math.max(0, Math.min(scrolled / scrollableHeight, 0.9999));
    const newIndex = Math.floor(progress * 5);
    const clampedIndex = Math.max(0, Math.min(newIndex, 4));

    setActiveIndex(clampedIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  /* ─────────────────────────────────────────────────────────────────────
     §5 STATE — Comparison Slider
     ───────────────────────────────────────────────────────────────────── */
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  /* 同步 CSS 自訂屬性 --slider-pos */
  useEffect(() => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.style.setProperty('--slider-pos', `${sliderPos}%`);
    }
  }, [sliderPos]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPos(val);
  }, []);


  /* ─────────────────────────────────────────────────────────────────────
     HELPER — 字卡位置 className
     ───────────────────────────────────────────────────────────────────── */
  const getCardClass = (index: number): string => {
    if (index === activeIndex) return 'hero-card card-active';
    if (index < activeIndex) return 'hero-card card-left';
    return 'hero-card card-right';
  };


  /* ─────────────────────────────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────────────────────────────── */
  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════════════════════════════
          §2  HERO SCROLL THEATRE — 500vh 優點鎖定劇場 (Panel 0-4)
          ══════════════════════════════════════════════════════════════ */}
      <div className="hero-scroll-container" ref={scrollContainerRef}>
        <div className="hero-sticky-stage">

          {/* 背景圖片層 */}
          <div className="hero-bg-layer">
            {HERO_IMAGES.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={
                  i === activeIndex
                    ? 'hero-bg-image hero-bg-active'
                    : 'hero-bg-image'
                }
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>

          {/* 暗色遮罩 */}
          <div className="hero-overlay" />

          {/* 前景內容層 */}
          <div className="hero-content-layer">

            {/* 0號：品牌大字 (滿版置中，activeIndex === 0 時激活) */}
            <div className={
              activeIndex === 0
                ? 'hero-brand-card card-active'
                : 'hero-brand-card card-left'
            }>
              <div className="brand-intro-logo-box">
                <h1 className="brand-intro-title">南源木材</h1>
                <p className="brand-intro-subtitle">NANYUAN TIMBER DESIGN</p>
              </div>
            </div>

            {/* 左側幾何序號 */}
            <span className={
              activeIndex > 0
                ? 'hero-giant-number'
                : 'hero-giant-number hero-giant-number-hidden'
            } aria-hidden="true">
              {activeIndex > 0 ? ADVANTAGES[activeIndex - 1].number : '01'}
            </span>

            {/* 右側字卡滑入載具 */}
            <div className={
              activeIndex > 0
                ? 'hero-cards-track track-active'
                : 'hero-cards-track track-right'
            }>
              {ADVANTAGES.map((adv, i) => (
                <div key={adv.number} className={getCardClass(i + 1)}>
                  <p className="hero-card-number">{adv.number}</p>
                  <h2 className="hero-card-title">{adv.title}</h2>
                  <p className="hero-card-desc">{adv.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          §3  ABOUT NANYUAN — 滿版職人背景品牌介紹
          ══════════════════════════════════════════════════════════════ */}
      <section className="about-section" aria-label="關於南源">
        <img
          className="about-bg-image"
          src={aboutBrandBg}
          alt=""
          loading="lazy"
        />
        <div className="about-overlay" />
        <div className="about-inner">
          <div className="about-left">
            <p className="about-eyebrow">ABOUT NANYUAN</p>
            <h2 className="about-title">三十年職人傳承，只為健康成家</h2>
            <p className="about-title-en">CRAFTSMANSHIP SINCE 1995</p>
          </div>
          <div className="about-right">
            <p className="about-desc">
              南源木材創立於上一個世代的木業全盛時期，三十年來始終堅守「源頭理解、細節品質、誠信透明」的品牌信條。
              我們深信，一個家的溫度不該只停留在設計圖上——它應該從每一片木紋的觸感、每一道榫卯的密合、
              每一次與屋主真誠的溝通中，被真實地建構出來。只為健康成家，是南源永恆不變的初衷。
            </p>
            <Link to="/about" className="capsule-link">
              探索品牌故事 ➜
            </Link>
          </div>
        </div>
        {/* 底部黑金過渡漸層 */}
        <div className="about-bottom-gradient" />
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          §4  PROCESS TIMELINE — 圖形化六大職人流程軸
          ══════════════════════════════════════════════════════════════ */}
      <section className="process-section" aria-label="服務流程">
        <div className="process-header">
          <p className="process-eyebrow">OUR PROCESS</p>
          <h2 className="process-title">六大職人流程，從諮詢到售後</h2>
          <p className="process-subtitle">
            每一個環節都是不可跳過的儀式。一條龍整合服務，全程只需面對一個值得信賴的專業團隊。
          </p>
        </div>

        <div className="process-timeline">
          {/* 金色連接主軸線 */}
          <div className="process-timeline-line" aria-hidden="true" />

          {PROCESS_STEPS.map((step) => (
            <div className="process-node" key={step.number}>
              <div className="process-node-dot" aria-hidden="true" />
              <div className="process-node-content">
                <p className="process-node-number">{step.number}</p>
                <h3 className="process-node-title">{step.title}</h3>
                <p className="process-node-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="process-footer">
          <Link to="/services" className="capsule-link">
            查看完整流程 ➜
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          §5  COMPARISON SLIDER — 推拉式前後對照滑桿
          ══════════════════════════════════════════════════════════════ */}
      <section className="comparison-section" aria-label="設計與落地對照">
        <div className="comparison-header">
          <p className="comparison-eyebrow">DESIGN vs. REALITY</p>
          <h2 className="comparison-title">設計與落地，眼見為憑</h2>
          <p className="comparison-subtitle">
            許多裝修最怕「設計圖好看，實際落地卻走樣」。
            南源從材料源頭與施工細節雙重把關，確保所見即所得。
            請拖曳中央滑桿，親手體驗設計圖與完工實景的無縫切換。
          </p>
        </div>

        <div className="comparison-slider" ref={sliderContainerRef}>

          {/* 底層：實景完工照（滿版鋪底） */}
          <img
            className="comparison-slider-bg"
            src={compareReality}
            alt="實景完工照"
            loading="lazy"
          />

          {/* 上層：設計模擬圖（寬度由 --slider-pos 剪裁） */}
          <div className="comparison-slider-overlay">
            <img
              className="comparison-slider-fg"
              src={compareRender}
              alt="設計模擬圖"
              loading="lazy"
            />
          </div>

          {/* 視覺把手：金色垂直中線 + 圓形拖曳鈕 */}
          <div className="comparison-slider-handle">
            <div className="comparison-slider-handle-circle">
              <span className="comparison-slider-arrows">◀ ▶</span>
            </div>
          </div>

          {/* 左右標籤 */}
          <div className="comparison-slider-labels">
            <span className="comparison-slider-label">設計模擬圖 / RENDER</span>
            <span className="comparison-slider-label">實景完工照 / REALITY</span>
          </div>

          {/* 透明互動控制條（唯一一個 range input） */}
          <input
            type="range"
            className="comparison-slider-input"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            aria-label="設計與實景對照滑桿"
          />

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          §6  PROJECTS WALL — 精選案例卡片牆（16:10 橫向黃金比例）
          ══════════════════════════════════════════════════════════════ */}
      <section className="projects-section py-5" aria-label="精選案例">
        <div className="container">
          <div className="text-center mb-5 projects-header">
            <p className="projects-eyebrow">FEATURED PROJECTS</p>
            <h2 className="projects-title">匠心落地，經典案例</h2>
          </div>

          <div className="row g-4 justify-content-center projects-grid-bootstrap">
            {PROJECT_CARDS.map((proj) => (
              <div className="col-12 col-lg-6" key={proj.name}>
                <div
                  className="projects-card home-project-card"
                  onClick={() => navigate('/projects', { state: { projectId: proj.id } })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/projects', { state: { projectId: proj.id } });
                    }
                  }}
                  aria-label={`查看案例：${proj.name}`}
                >
                  <img
                    className="projects-card-image"
                    src={proj.image}
                    alt={proj.name}
                    loading="lazy"
                  />
                  <div className="projects-card-overlay">
                    <h3 className="projects-card-name">{proj.name}</h3>
                    <p className="projects-card-category">{proj.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 projects-footer">
            <Link to="/projects" className="capsule-link">
              瀏覽更多案例 ➜
            </Link>
          </div>
        </div>
      </section>


      {/* §7 — <CTA /> 由 Footer.tsx 全局統一掛載，此處不重複渲染 */}

    </div>
  );
};

export default Home;
