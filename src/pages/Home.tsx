import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════════════
   Home.tsx — 南源木材首頁完全體（From-Scratch Rewrite）
   ═══════════════════════════════════════════════════════════════════════
   五大版塊：
     §1  Brand Intro Viewport — 0ms 瞬間發光序幕（2.5s 退場 → 3.5s 銷毀）
     §2  Hero Scroll Theatre  — 400vh sticky 優點鎖定劇場
     §3  Comparison Section   — 設計模擬圖 vs. 實景完工照
     §4  Page Teasers         — 關於南源 / 服務流程 / 作品案例
     §5  公共底座             — <CTA /> 由 Footer.tsx 全局統一掛載

   ⚠ 鐵律：零行內 style / 零 <style> 標籤 / 100% 樣式在 Home.css
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── HERO IMAGES — 每張對應一個優點 ─── */
import heroImg01 from '../assets/home-hero-material.jpg';
import heroImg02 from '../assets/home-hero-craft.jpg';
import heroImg03 from '../assets/home-hero-transparency.jpg';
import heroImg04 from '../assets/home-hero-realization.jpg';

/* ─── COMPARISON IMAGES ─── */
import compareRender  from '../assets/compare-render.jpg';
import compareReality from '../assets/compare-reality.jpg';

/* ─── PROJECTS TEASER THUMBNAILS ─── */
import projectThumb01 from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import projectThumb02 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import projectThumb03 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';


/* ═══════════════════════════════════════════════════════════════════════
   DATA — 四大優點資料陣列
   ═══════════════════════════════════════════════════════════════════════ */
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

const PROJECT_TEASERS = [
  { name: '北歐極簡小宅', image: projectThumb01 },
  { name: '現代奢華大宅', image: projectThumb02 },
  { name: '暖木系廚房', image: projectThumb03 },
];


/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
const Home: React.FC = () => {

  /* ─────────────────────────────────────────────────────────────
     §1 STATE — Brand Intro Viewport
     ───────────────────────────────────────────────────────────── */
  const [introVisible, setIntroVisible] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIntroExiting(true);
    }, 2500);

    const destroyTimer = window.setTimeout(() => {
      setIntroVisible(false);
    }, 3500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(destroyTimer);
    };
  }, []);


  /* ─────────────────────────────────────────────────────────────
     §2 STATE — Hero Scroll Theatre
     ───────────────────────────────────────────────────────────── */
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
    const newIndex = Math.floor(progress * 4);
    const clampedIndex = Math.max(0, Math.min(newIndex, 3));

    setActiveIndex(clampedIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  /* ─────────────────────────────────────────────────────────────
     HELPER — 字卡位置 className
     ───────────────────────────────────────────────────────────── */
  const getCardClass = (index: number): string => {
    if (index === activeIndex) return 'hero-card card-active';
    if (index < activeIndex) return 'hero-card card-left';
    return 'hero-card card-right';
  };


  /* ─────────────────────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────────────────────── */
  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════════════════════
          §1  BRAND INTRO VIEWPORT — 0ms 瞬間發光品牌帷幕
      ══════════════════════════════════════════════════════════ */}
      {introVisible && (
        <div
          className={
            introExiting
              ? 'brand-intro-viewport viewport-exit-slide'
              : 'brand-intro-viewport'
          }
          aria-hidden="true"
        >
          <h1 className="brand-intro-title">南源木材</h1>
          <p className="brand-intro-subtitle">NANYUAN TIMBER DESIGN</p>
        </div>
      )}


      {/* ══════════════════════════════════════════════════════════
          §2  HERO SCROLL THEATRE — 400vh 優點鎖定劇場
      ══════════════════════════════════════════════════════════ */}
      <div className="hero-scroll-container" ref={scrollContainerRef}>
        <div className="hero-sticky-stage">

          {/* ── 背景圖片層（四張疊加，只顯示激活的） ── */}
          <div className="hero-bg-layer">
            {ADVANTAGES.map((adv, i) => (
              <img
                key={adv.number}
                src={adv.image}
                alt={adv.title}
                className={
                  i === activeIndex
                    ? 'hero-bg-image hero-bg-active'
                    : 'hero-bg-image'
                }
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>

          {/* ── 暗色遮罩層 ── */}
          <div className="hero-overlay" />

          {/* ── 前景內容層 ── */}
          <div className="hero-content-layer">

            {/* 左側巨型幾何序號 */}
            <span className="hero-giant-number" aria-hidden="true">
              {ADVANTAGES[activeIndex].number}
            </span>

            {/* 右側字卡滑入載具 */}
            <div className="hero-cards-track">
              {ADVANTAGES.map((adv, i) => (
                <div key={adv.number} className={getCardClass(i)}>
                  <p className="hero-card-number">{adv.number}</p>
                  <h2 className="hero-card-title">{adv.title}</h2>
                  <p className="hero-card-desc">{adv.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════
          §3  COMPARISON SECTION — 設計模擬圖 vs. 實景完工照
      ══════════════════════════════════════════════════════════ */}
      <section className="comparison-section" aria-label="設計與落地真實對照">
        <div className="comparison-header">
          <p className="comparison-eyebrow">DESIGN vs. REALITY</p>
          <h2 className="comparison-title">設計與落地，眼見為憑</h2>
          <p className="comparison-subtitle">
            許多裝修最怕「設計圖好看，實際落地卻走樣」。
            南源從材料源頭與施工細節雙重把關，確保所見即所得——
            以下是同一空間的設計模擬與完工實景真實對照。
          </p>
        </div>

        <div className="comparison-panels">
          {/* 左：設計模擬圖 */}
          <div className="comparison-panel">
            <img
              className="comparison-panel-image"
              src={compareRender}
              alt="設計模擬圖"
              loading="lazy"
            />
            <span className="comparison-panel-label">設計模擬圖 / RENDER</span>
          </div>

          {/* 右：實景完工照 */}
          <div className="comparison-panel">
            <img
              className="comparison-panel-image"
              src={compareReality}
              alt="實景完工照"
              loading="lazy"
            />
            <span className="comparison-panel-label">實景完工照 / REALITY</span>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          §4  PAGE TEASERS — 三大內頁導覽
      ══════════════════════════════════════════════════════════ */}
      <div className="page-teasers">

        {/* ── 4-A：關於南源 ── */}
        <div className="teaser-block">
          <div className="teaser-inner">
            <p className="teaser-eyebrow">ABOUT NANYUAN</p>
            <h2 className="teaser-title">三十年職人傳承，只為健康成家</h2>
            <p className="teaser-desc">
              南源木材創立於上一個世代的木業全盛時期，三十年來始終堅守「源頭理解、細節品質、誠信透明」的品牌信條。
              我們深信，一個家的溫度不該只停留在設計圖上——它應該從每一片木紋的觸感、每一道榫卯的密合、
              每一次與屋主真誠的溝通中，被真實地建構出來。
            </p>
            <Link to="/about" className="teaser-link">
              探索品牌故事 ➜
            </Link>
          </div>
        </div>

        {/* ── 4-B：服務流程 ── */}
        <div className="teaser-block">
          <div className="teaser-inner">
            <p className="teaser-eyebrow">OUR PROCESS</p>
            <h2 className="teaser-title">六大職人流程，從諮詢到售後</h2>
            <p className="teaser-desc">
              初步諮詢、現場丈量、方案設計、材料精選、精工施作、驗收售後——
              南源將每一個環節都視為不可跳過的儀式。我們以「一條龍整合服務」取代傳統碎片化發包，
              讓業主從第一通電話到最終入住，全程只需面對一個值得信賴的專業團隊。
            </p>
            <Link to="/services" className="teaser-link">
              查看完整流程 ➜
            </Link>
          </div>
        </div>

        {/* ── 4-C：作品案例 ── */}
        <div className="teaser-block">
          <div className="teaser-inner">
            <p className="teaser-eyebrow">FEATURED PROJECTS</p>
            <h2 className="teaser-title">匠心落地，經典案例</h2>
            <p className="teaser-desc">
              從北歐極簡小宅到現代奢華大宅，南源以木為魂，
              將每一個空間雕琢成獨一無二的生活藝術品。
            </p>
            <div className="teaser-project-grid">
              {PROJECT_TEASERS.map((proj) => (
                <div className="teaser-project-card" key={proj.name}>
                  <img src={proj.image} alt={proj.name} loading="lazy" />
                  <div className="teaser-project-card-overlay">
                    <span className="teaser-project-card-name">{proj.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/projects" className="teaser-link">
              瀏覽更多案例 ➜
            </Link>
          </div>
        </div>

      </div>
      {/* §5 — <CTA /> 由 Footer.tsx 全局統一掛載，此處不重複渲染 */}

    </div>
  );
};

export default Home;
