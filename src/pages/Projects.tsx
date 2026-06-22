import React, { useState, useCallback } from 'react';
import './Projects.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Projects.tsx — 作品案例頁完全體（Complete Rewrite from Scratch）
   ═══════════════════════════════════════════════════════════════════════════
   雙視態架構：
     §1  List View — 分類膠囊 + 多列卡片網格
     §2  Detail View — 全頁滿版深度開箱專題（Hero / Story / Gallery）

   ⚠ 鐵律：零行內 style / 零 <style> 標籤 / 100% 樣式在 Projects.css
   ⚠ CTA 由 Footer.tsx 全局統一掛載，此處不 import
   ═══════════════════════════════════════════════════════════════════════════ */


/* ─── 案例 1：機能小宅改造（局部改造系列照片） ─── */
import photo1A from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import photo1B from '../assets/LINE_ALBUM_2026.6.17_260621_6.jpg';
import photo1C from '../assets/LINE_ALBUM_2026.6.17_260621_7.jpg';
import photo1D from '../assets/LINE_ALBUM_2026.6.17_260621_8.jpg';

/* ─── 案例 2：曜石黑金大器邸（豪宅系列照片） ─── */
import photo2A from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import photo2B from '../assets/LINE_ALBUM_2026.6.17_260621_83.jpg';
import photo2C from '../assets/LINE_ALBUM_2026.6.17_260621_84.jpg';
import photo2D from '../assets/LINE_ALBUM_2026.6.17_260621_85.jpg';

/* ─── 案例 3：暖心交誼輕食區（木作廚房系列照片） ─── */
import photo3A from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import photo3B from '../assets/LINE_ALBUM_2026.6.17_260621_21.jpg';
import photo3C from '../assets/LINE_ALBUM_2026.6.17_260621_22.jpg';
import photo3D from '../assets/LINE_ALBUM_2026.6.17_260621_23.jpg';

/* ─── 案例 4：隱世侘寂睡眠艙（臥室系列照片） ─── */
import photo4A from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import photo4B from '../assets/LINE_ALBUM_2026.6.17_260621_11.jpg';
import photo4C from '../assets/LINE_ALBUM_2026.6.17_260621_12.jpg';
import photo4D from '../assets/LINE_ALBUM_2026.6.17_260621_13.jpg';


/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & DATA — 分類
   ═══════════════════════════════════════════════════════════════════════════ */
type CategoryId = 'all' | 'all-house' | 'wood-craft' | 'partial';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',        label: '全部作品', en: 'ALL' },
  { id: 'all-house',  label: '全屋統包', en: 'FULL REMODEL' },
  { id: 'wood-craft', label: '高級木作', en: 'WOOD CRAFT' },
  { id: 'partial',    label: '局部改造', en: 'PARTIAL RENO' },
];


/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & DATA — 案例（多圖陣列）
   ═══════════════════════════════════════════════════════════════════════════ */
interface Project {
  id:        string;
  category:  CategoryId;
  title:     string;
  subtitle:  string;
  type:      string;
  location:  string;
  size:      string;
  layout:    string;
  style:     string;
  materials: string;
  story:     string[];
  images:    string[];
  captions:  string[];
}

const PROJECTS: Project[] = [
  {
    id:        '1',
    category:  'partial',
    title:     '機能小宅改造',
    subtitle:  '22坪空間極大化',
    type:      '局部改造',
    location:  '台北市文山區',
    size:      '22坪',
    layout:    '一房一廳 + 多功能區',
    style:     '極簡機能 × 小坪數極大化',
    materials: '高級樺木合板、低甲醛全室系統櫃、LED 線性燈帶',
    story: [
      '22 坪需同時滿足臥室、書房、客廳與大量收納，總預算嚴格控制在 60 萬以內——這是南源最能體現「精準選材 + 機能設計」功力的小宅改造挑戰。',
      '核心設計以「多功能架高木質地坪」展開：客廳區域架高 40 公分，地坪下方全面規劃為抽屜式收納，白天是工作區、晚上攤平即為客臥，單一空間同時承擔三種生活功能。',
      '「小預算不等於妥協品質」——透過南源精準的選材配置與機能設計思維，22 坪擁有了超越坪數三倍的視覺開闊感與生活機能，完美實現小資業主的精品居住夢想。',
    ],
    images:   [photo1A, photo1B, photo1C, photo1D],
    captions: ['客廳主景全覽', '架高地坪收納細節', '多功能書桌區', '自然光廊道'],
  },
  {
    id:        '2',
    category:  'all-house',
    title:     '曜石黑金大器邸',
    subtitle:  '頂奢豪宅大廳',
    type:      '全屋統包',
    location:  '台中市七期',
    size:      '58坪',
    layout:    '三房兩廳',
    style:     '現代高奢 × 義式極簡',
    materials: '北美胡桃木實木皮、大理石紋奢石、超耐磨防潮木地板',
    story: [
      '針對大坪數豪宅，以「大開大合」的木作天花板隱藏大樑，採用進口北美胡桃木實木皮板進行縱向延伸，從玄關一路延展至客廳主牆，建立一氣呵成的頂級空間敘事。',
      '三十年木作老師傅手工微調，格柵間距與拼花紋理完全對齊，收口精度嚴控在 ±1mm 以內。每一片木皮的色澤、走向都經過嚴格配對，確保視覺上無縫連續、質感統一。',
      '結合電視牆大理石的冷冽質地與木質天花的溫潤呼吸，冷暖對話間為高奢住宅奠定沉穩、大氣且健康的空間基底，完整體現南源「匠心鑄就傳世細節」的品牌承諾。',
    ],
    images:   [photo2A, photo2B, photo2C, photo2D],
    captions: ['大廳全景', '天花板木作格柵細節', '電視牆冷暖對話', '玄關延伸視角'],
  },
  {
    id:        '3',
    category:  'wood-craft',
    title:     '暖心交誼輕食區',
    subtitle:  '職人木作中島餐廳',
    type:      '高級木作',
    location:  '新北市板橋區',
    size:      '35坪',
    layout:    '開放式餐廚',
    style:     '日系無印 × 溫潤木質',
    materials: '防潮防水木芯板、天然香杉木、霧面金屬收邊條',
    story: [
      '打破傳統廚房隔局，將木作中島與開放式餐廳完美整合。大面積使用天然香杉木皮，自帶淡雅木香，讓烹飪時光充滿自然療癒的溫度。',
      '針對廚房高濕度環境，特選高規防水防蛀底料與耐磨塗層，所有接縫以德國全效防水密封膠條處理，即便長年接觸水蒸氣也不翹邊、不發霉。',
      '微米級的拼花工藝與隱藏式暗扣收納系統，打造兼具機能與視覺溫度的核心餐廚空間。完工後業主邀請親友舉辦首場家宴，全場驚嘆「根本在飯店主廚廚房做菜」。',
    ],
    images:   [photo3A, photo3B, photo3C, photo3D],
    captions: ['中島餐廳全景', '木作櫃體收邊細節', '吧檯區採光面', '開放式動線俯視'],
  },
  {
    id:        '4',
    category:  'partial',
    title:     '隱世侘寂睡眠艙',
    subtitle:  '靜謐禪風臥室',
    type:      '局部改造',
    location:  '台北市大安區',
    size:      '18坪',
    layout:    '單一臥室',
    style:     '日式侘寂 × 北歐溫潤',
    materials: 'F1 級低甲醛綠建材、珪藻土、橡木實木格柵',
    story: [
      '以睡眠品質為最高導向。床頭背景採用大面積橡木實木格柵放線微調，營造層次分明的光影韻律，讓每一次醒來都沉浸在自然木質的溫潤之中。',
      '全室塗料選用珪藻土調濕壁材，配合 F1 級低甲醛系統板材，從源頭為業主的呼吸道健康嚴格把關。落地 60 天後甲醛濃度低於國家標準四倍以上。',
      '純粹、無毒、零壓迫感——還原生活本質的極致靜謐儀式感，打造一座讓身心真正卸下防備、進入最深層修復睡眠的隱世睡眠艙。',
    ],
    images:   [photo4A, photo4B, photo4C, photo4D],
    captions: ['床頭格柵主視覺', '側面光影韻律', '衣櫃隱藏系統', '窗邊閱讀角'],
  },
];


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {

  /* ─── 視態狀態機 ─── */
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  /* ─── 進入全頁專題 ─── */
  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  }, []);

  /* ─── 返回列表 ─── */
  const backToList = useCallback(() => {
    setCurrentView('list');
    setActiveProject(null);
    window.scrollTo(0, 0);
  }, []);

  /* ─── 分類篩選 ─── */
  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);


  /* ═══════════════════════════════════════════════════════════════════════
     RENDER — LIST VIEW（分類膠囊 + 卡片網格）
     ═══════════════════════════════════════════════════════════════════════ */
  if (currentView === 'list') {
    return (
      <div className="projects-page">

        {/* ── 頁面大標題 ── */}
        <div className="projects-page-header">
          <p className="projects-page-eyebrow">OUR PROJECTS</p>
          <h1 className="projects-page-title">匠心落地，經典案例</h1>
          <p className="projects-page-subtitle">
            從北歐極簡小宅到現代奢華大宅，南源以木為魂，將每一個空間雕琢成獨一無二的生活藝術品。
          </p>
        </div>

        {/* ── 分類膠囊列 ── */}
        <div className="filter-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={
                activeCategory === cat.id
                  ? 'filter-pill filter-pill--active'
                  : 'filter-pill'
              }
              onClick={() => setActiveCategory(cat.id)}
              aria-label={`篩選 ${cat.label}`}
            >
              <span className="filter-pill-zh">{cat.label}</span>
              <span className="filter-pill-en">{cat.en}</span>
            </button>
          ))}
        </div>

        {/* ── 卡片網格 ── */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="projects-grid-card"
              onClick={() => openProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') openProject(project); }}
              aria-label={`查看案例：${project.title}`}
            >
              <img
                className="projects-grid-card-img"
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
              />
              <div className="projects-grid-card-overlay">
                <span className="projects-grid-card-type">{project.type}</span>
                <h2 className="projects-grid-card-title">{project.title}</h2>
                <p className="projects-grid-card-sub">{project.subtitle} · {project.size}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 由 Footer.tsx 全局統一掛載 */}
      </div>
    );
  }


  /* ═══════════════════════════════════════════════════════════════════════
     RENDER — DETAIL VIEW（全頁滿版深度開箱專題）
     ═══════════════════════════════════════════════════════════════════════ */
  if (currentView === 'detail' && activeProject) {
    const p = activeProject;
    const heroImage = p.images[0];
    const galleryImages = p.images.slice(1);

    return (
      <div className="project-full-page">

        {/* ── 返回按鈕 ── */}
        <button
          className="project-back-btn"
          onClick={backToList}
          aria-label="返回作品列表"
        >
          ⟪ 返回作品列表
        </button>

        {/* ══════════════════════════════════════════════════════════
            HERO — 滿版主視覺
        ══════════════════════════════════════════════════════════ */}
        <div className="project-hero">
          <img
            className="project-hero-img"
            src={heroImage}
            alt={p.title}
            loading="eager"
          />
          <div className="project-hero-overlay">
            <span className="project-hero-type">{p.type} · {p.location}</span>
            <h1 className="project-hero-title">{p.title}</h1>
            <p className="project-hero-subtitle">{p.subtitle}</p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            STORY — 雙列故事 + 規格表
        ══════════════════════════════════════════════════════════ */}
        <div className="project-story">

          {/* 左側：設計理念 */}
          <div className="project-story-left">
            <p className="project-story-eyebrow">DESIGN CONCEPT</p>
            <h2 className="project-story-heading">設計理念</h2>
            {p.story.map((paragraph, i) => (
              <p key={i} className="project-story-paragraph">{paragraph}</p>
            ))}
          </div>

          {/* 右側：曜石黑規格表 */}
          <div className="project-story-right">
            <div className="project-specs-card">
              <p className="project-specs-title">PROJECT SPECIFICATIONS</p>
              <div className="project-spec-row">
                <span className="project-spec-label">案例類型</span>
                <span className="project-spec-value">{p.type}</span>
              </div>
              <div className="project-spec-row">
                <span className="project-spec-label">所在區域</span>
                <span className="project-spec-value">{p.location}</span>
              </div>
              <div className="project-spec-row">
                <span className="project-spec-label">坪數</span>
                <span className="project-spec-value">{p.size}</span>
              </div>
              <div className="project-spec-row">
                <span className="project-spec-label">格局</span>
                <span className="project-spec-value">{p.layout}</span>
              </div>
              <div className="project-spec-row">
                <span className="project-spec-label">設計風格</span>
                <span className="project-spec-value">{p.style}</span>
              </div>
              <div className="project-spec-row">
                <span className="project-spec-label">核心建材</span>
                <span className="project-spec-value">{p.materials}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            GALLERY — 多圖藝廊牆
        ══════════════════════════════════════════════════════════ */}
        <div className="project-gallery">
          <p className="project-gallery-eyebrow">SPACE GALLERY</p>
          <div className="project-gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="project-gallery-item">
                <img
                  className="project-gallery-img"
                  src={img}
                  alt={p.captions[i + 1] || `${p.title} 空間細節 ${i + 1}`}
                  loading="lazy"
                />
                <span className="project-gallery-caption">
                  {p.captions[i + 1] || `Detail ${i + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 由 Footer.tsx 全局統一掛載 */}
      </div>
    );
  }

  return null;
};

export default Projects;
