import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';


/* ═══════════════════════════════════════════════════════════════
   REAL PROJECT PHOTOS — semantic picks from src/assets/ album
   Each photo is carefully matched to a project's content theme.
═══════════════════════════════════════════════════════════════ */
import photoSmallHome    from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import photoLuxuryLiving from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import photoKitchen      from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import photoZenBedroom   from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';


/* ═══════════════════════════════════════════════════════════════
   FILTER CATEGORIES
═══════════════════════════════════════════════════════════════ */
type CategoryId = 'all' | 'all-house' | 'wood-craft' | 'partial';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',        label: '全部作品', en: 'ALL'          },
  { id: 'all-house',  label: '全屋統包', en: 'FULL REMODEL' },
  { id: 'wood-craft', label: '高級木作', en: 'WOOD CRAFT'   },
  { id: 'partial',    label: '局部改造', en: 'PARTIAL RENO' },
];


/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA — 4 COMPLETE CASES WITH B2C SEMANTIC FIELDS
   Each project is mapped to a real photo from the album.
═══════════════════════════════════════════════════════════════ */
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
  img:       string;
  altText:   string;
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
    img:       photoSmallHome,
    altText:   '南源木材 機能小宅改造 架高木地坪隱藏收納完工實景',
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
    img:       photoLuxuryLiving,
    altText:   '南源木材 曜石黑金大器邸 頂奢豪宅大廳木作完工實景',
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
    img:       photoKitchen,
    altText:   '南源木材 暖心交誼輕食區 職人木作中島餐廳完工實景',
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
    img:       photoZenBedroom,
    altText:   '南源木材 隱世侘寂睡眠艙 靜謐禪風臥室完工實景',
  },
];


/* ═══════════════════════════════════════════════════════════════
   FILTER TABS COMPONENT
═══════════════════════════════════════════════════════════════ */
const FilterTabs: React.FC<{
  active:   CategoryId;
  onChange: (id: CategoryId) => void;
}> = ({ active, onChange }) => (
  <div className="filter-track">
    <div className="filter-track-inner">
      {CATEGORIES.map(cat => {
        const isActive = active === cat.id;
        return (
          <div key={cat.id} className="filter-pill-slot">
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="filter-pill-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.9 }}
              />
            )}
            <button
              onClick={() => onChange(cat.id)}
              className={`filter-pill-btn${isActive ? ' filter-pill-btn--active' : ''}`}
              aria-label={`篩選 ${cat.label}`}
            >
              <span className={`filter-pill-zh${isActive ? ' filter-pill-zh--active' : ''}`}>
                {cat.label}
              </span>
              <span className={`filter-pill-en${isActive ? ' filter-pill-en--active' : ''}`}>
                {cat.en}
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="wire"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{   scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className="filter-pill-wire"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL MODAL
   Left-right split: hero image | rich text info.
   className-driven, zero inline styles.
═══════════════════════════════════════════════════════════════ */
const ProjectDetailModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {

  /* Lock body scroll while modal is open */
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => { document.body.classList.remove('modal-open'); };
  }, []);

  /* Close on Escape key */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div
        className="project-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 作品詳情`}
      >
        {/* Close button */}
        <button
          className="project-detail-close"
          onClick={onClose}
          aria-label="關閉作品詳情"
        >
          ✕
        </button>

        {/* Split layout */}
        <div className="project-detail-split">

          {/* LEFT — Hero image */}
          <div className="project-detail-img-side">
            <img
              src={project.img}
              alt={project.altText}
              className="project-detail-hero-img"
            />
            <div className="project-detail-img-gradient" />
          </div>

          {/* RIGHT — Text content */}
          <div className="project-detail-content-side">

            {/* Title */}
            <div>
              <h2 className="project-detail-title">{project.title}</h2>
              <p className="project-detail-subtitle">{project.subtitle}</p>
            </div>

            {/* Meta tags */}
            <div className="project-detail-tags">
              <span className="project-detail-tag project-detail-tag--primary">{project.type}</span>
              <span className="project-detail-tag">{project.location}</span>
              <span className="project-detail-tag">{project.size}</span>
              <span className="project-detail-tag">{project.layout}</span>
            </div>

            {/* Specs */}
            <div className="project-detail-specs">
              <div className="project-detail-spec-row">
                <span className="project-detail-spec-label">風格</span>
                <span className="project-detail-spec-val">{project.style}</span>
              </div>
              <div className="project-detail-spec-row">
                <span className="project-detail-spec-label">建材</span>
                <span className="project-detail-spec-val">{project.materials}</span>
              </div>
            </div>

            {/* Design story */}
            <div className="project-detail-story">
              <h3 className="project-detail-story-title">設計理念</h3>
              {project.story.map((para, i) => (
                <p key={i} className="project-detail-story-para">{para}</p>
              ))}
            </div>

            {/* Highlight */}
            <div className="project-detail-highlight-box">
              <p className="project-detail-highlight-text">
                {project.style} — {project.materials.split('、')[0]}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   PROJECTS PAGE — MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter]     = useState<CategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <main className="projects-page">
      <div className="projects-container">

        {/* ── Page header ── */}
        <header className="projects-header">
          <h1 className="projects-title">作品案例</h1>
          <p className="projects-subtitle">
            南源木材高端住宅、職人木作與老屋翻修精工作品。全屋統包翻新設計案例一覽。
          </p>
        </header>

        {/* ── Filter tabs ── */}
        <section>
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </section>

        {/* ── Count ── */}
        <div className="projects-count-bar">
          <span className="projects-count-text">
            顯示 {filtered.length} / {PROJECTS.length} 件作品
          </span>
        </div>

        {/* ── Card grid ── */}
        <section>
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <article
                    className="project-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Card image */}
                    <div className="project-card-img-wrap">
                      <img
                        src={project.img}
                        alt={project.altText}
                        className="project-card-img"
                        loading="lazy"
                      />
                      <div className="project-card-badge-cat">
                        {CATEGORIES.find(c => c.id === project.category)?.en ?? ''}
                      </div>
                      <div className="project-card-badge-size">{project.size}</div>
                      <div className="project-card-img-gradient" />
                    </div>

                    {/* Card body */}
                    <div className="project-card-body">
                      <div className="project-card-header">
                        <div>
                          <h3 className="project-card-title">{project.title}</h3>
                          <p className="project-card-sub">{project.subtitle}</p>
                        </div>
                        <div className="project-card-meta-col">
                          <span className="project-card-meta-badge">{project.size}</span>
                          <span className="project-card-meta-loc">{project.location}</span>
                        </div>
                      </div>

                      <div className="project-card-specs">
                        <div className="project-card-spec-row">
                          <span className="project-card-spec-label">風格</span>
                          <span className="project-card-spec-val">{project.style}</span>
                        </div>
                        <div className="project-card-spec-row">
                          <span className="project-card-spec-label">建材</span>
                          <span className="project-card-spec-val">{project.materials}</span>
                        </div>
                      </div>

                      <div className="project-card-highlight-bar">
                        <p className="project-card-highlight">{project.layout} ｜ {project.style}</p>
                      </div>

                      <div className="project-card-action">
                        <span className="project-card-action-text">查看完整案例 ➔</span>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>



      {/* ── Detail modal ── */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
};

export default Projects;
