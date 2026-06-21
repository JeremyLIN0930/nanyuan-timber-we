import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import CTA from '../components/CTA/CTA';

/* ═══════════════════════════════════════════════════════════════
   REAL PROJECT PHOTOS — semantic picks from src/assets/ album
═══════════════════════════════════════════════════════════════ */
import projPhoto01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import projPhoto02 from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import projPhoto03 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import projPhoto04 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import projPhoto05 from '../assets/LINE_ALBUM_2026.6.17_260621_50.jpg';
import projPhoto06 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';


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
   PROJECT DATA — B2C semantic fields
   Each project binds to a real photo from the album.
═══════════════════════════════════════════════════════════════ */
interface Project {
  id:          string;
  category:    CategoryId;
  title:       string;
  subtitle:    string;
  type:        string;
  location:    string;
  size:        string;
  layout:      string;
  style:       string;
  materials:   string;
  story:       string[];
  img:         string;
  altText:     string;
}

const PROJECTS: Project[] = [
  {
    id:        '1',
    category:  'all-house',
    title:     '天母森光御所',
    subtitle:  '三代同堂原木全宅',
    type:      '全屋統包',
    location:  '台北市天母區',
    size:      '45坪',
    layout:    '三房兩廳兩衛',
    style:     '日式侘寂 × 溫潤原木',
    materials: '北美黑胡桃木實木板、F1 低甲醛環保塗料、進口三層防水系統',
    story: [
      '全室格局打通，引入大面積天然採光，將原本陰暗封閉的三房格局重塑為光線流動、視野開闊的現代開放式公領域，三代同堂的每日起居皆在自然光與原木芬芳中舒展。',
      '地板選用北美黑胡桃木實木板（含水率嚴控 8–12%），以「人字拼」工法鋪設，每一片木料均由南源自有工坊紋理配對與預處理，確保色澤一致、質感頂級。',
      '全屋採用 F1 低甲醛環保塗料，從源頭為三代成員的健康嚴格把關，落地 90 天後甲醛濃度檢測值低於國家標準五倍以上，讓老人與幼兒安心共居。',
    ],
    img:       projPhoto01,
    altText:   '南源木材 天母森光御所 三代同堂原木室內設計完工實景',
  },
  {
    id:        '2',
    category:  'all-house',
    title:     '竹北頂奢現代宅',
    subtitle:  '職人格柵大器美學',
    type:      '全屋統包',
    location:  '新竹縣竹北市',
    size:      '60坪',
    layout:    '四房兩廳三衛',
    style:     '現代奢華 × 石材格柵',
    materials: '義大利卡拉拉大理石大板、鍍鈦黃銅格柵木作、隱藏式天花冷氣系統',
    story: [
      '60 坪的竹北新豪宅，業主期待「一進門就感受到五星飯店的震撼感」。南源設計師以義大利進口卡拉拉大理石大板為核心視覺，配合客製化鍍鈦黃銅格柵木作，落地大器沉穩的現代奢華語彙。',
      '客廳以「雙軸對稱」為設計語彙——電視主牆與沙發背牆各以大理石對花呈現，格柵間距、比例與鍍鈦工藝均由南源職人手工精密調整，視覺上達到絕對精準的落地效果。',
      '天花板全面整平並嵌入隱藏式冷氣出風口，搭配 3000K 暖色溫間接燈帶，讓石材和木作在不同時段的光影中各自呈現獨特質感肌理。',
    ],
    img:       projPhoto03,
    altText:   '南源木材 竹北頂奢現代宅 大理石主牆格柵木作完工實景',
  },
  {
    id:        '3',
    category:  'wood-craft',
    title:     '大安區陳宅木作',
    subtitle:  '頂天立地收納美學',
    type:      '高級木作',
    location:  '台北市大安區',
    size:      '28坪',
    layout:    '兩房一書房',
    style:     '學院知性 × 隱藏門整合',
    materials: '鋼刷梣木皮板、低甲醛 F1 木心板、隱藏鉸鏈五金、奧地利 OSMO 木蠟油',
    story: [
      '大安區陳宅業主是位藏書豐富的學者，期待一面既能展示千冊藏書、又能隱藏書房入口的頂天立地書牆。南源木作師傅以鋼刷梣木皮板為主材，量身打造高達 2.8 公尺的整面書牆。',
      '書牆右側設計一扇無把手隱藏門——外觀與書牆板材完全融合，輕按特定位置即可彈開進入書房。隱藏鉸鏈採用德國進口重型五金，確保數萬次開合後仍保持精準對齊。',
      '奧地利 OSMO 木蠟油全面塗裝，歷經八道打磨工序，讓梣木的天然木紋在光線下呈現溫潤立體的層次感。',
    ],
    img:       projPhoto04,
    altText:   '南源木材 大安區陳宅 頂天立地書牆隱藏門木作完工實景',
  },
  {
    id:        '4',
    category:  'wood-craft',
    title:     '信義區主臥木作',
    subtitle:  '奢華床頭背板工藝',
    type:      '高級木作',
    location:  '台北市信義區',
    size:      '18坪主臥',
    layout:    '主臥 + 更衣室',
    style:     '五星精品飯店感',
    materials: '進口義大利超纖皮革繃布、北美白橡木實木、黃銅嵌入線條收邊',
    story: [
      '信義區豪宅業主要求「睡醒時看到的第一眼必須是五星精品飯店等級」——這是對臥室木作工藝最高規格的挑戰。',
      '床頭背板以進口義大利超纖皮革繃布為面材，內填 5cm 高密度吸震棉，邊緣以黃銅線條精工收邊。繃布工藝要求每一個轉角弧度均勻，布面張力一致，無任何皺褶或氣泡。',
      '兩側弧形實木衣廚以北美白橡木為主材，底部懸空設計搭配 LED 地腳燈，製造輕盈漂浮感；頂部與天花板完美齊平，收口精度 ±1mm。',
    ],
    img:       projPhoto06,
    altText:   '南源木材 信義區主臥木作 義大利繃布床頭背板弧形衣廚完工實景',
  },
  {
    id:        '5',
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
      '22 坪需同時滿足臥室、書房、客廳與大量收納，總預算嚴格控制在 60 萬以內——這是南源最能體現「精準選材+機能設計」功力的小宅改造挑戰。',
      '核心設計以「多功能架高木質地坪」展開：客廳區域架高 40 公分，地坪下方全面規劃為抽屜式收納，白天是工作區、晚上攤平即為客臥。',
      '「小預算不等於妥協品質」——透過精準的選材與機能設計，22 坪擁有了超越坪數三倍的視覺開闊感與生活機能。',
    ],
    img:       projPhoto02,
    altText:   '南源木材 機能小宅改造 架高木地坪隱藏收納完工實景',
  },
  {
    id:        '6',
    category:  'partial',
    title:     '沐光精品衛浴',
    subtitle:  '大理石飯店級沐浴',
    type:      '局部改造',
    location:  '台北市天母區',
    size:      '10坪衛浴',
    layout:    '主衛 + 乾濕分離',
    style:     '大理石對花 × 懸浮木質',
    materials: '義大利 Nero Marquina 黑色大理石、北美白橡木浴櫃板、德國 Hansgrohe 恆溫花灑',
    story: [
      '僅 10 坪的衛浴空間，業主卻要求「比五星飯店浴室更奢華」。南源以義大利 Nero Marquina 黑色大理石大板為主牆，採用 bookmatching 對花工法，完美呈現鏡面對稱的自然紋理。',
      '浴櫃以北美白橡木搭配黃銅拉手，底部懸浮設計配合 LED 地腳燈。淋浴區採用無框超白玻璃屏風，搭配德國 Hansgrohe 恆溫花灑系統。',
      '每一片石材、每一個五金件，都經過南源團隊的嚴格三道篩選。「小空間也值得被認真對待」——這就是南源局部改造的最高信仰。',
    ],
    img:       projPhoto05,
    altText:   '南源木材 沐光精品衛浴 大理石對花懸浮浴櫃完工實景',
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
   PROJECT DETAIL MODAL COMPONENT
   Left-right split: hero image | rich text info
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

            {/* Title block */}
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

            {/* Highlight bar */}
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
  const [activeFilter, setActiveFilter] = useState<CategoryId>('all');
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
                  className="projects-grid-item"
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
                      <div className="project-card-badge-year">{project.size}</div>
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
                          <span className="project-card-badge-size">{project.size}</span>
                          <span className="project-card-badge-loc">{project.location}</span>
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

      {/* ── Unified global CTA ── */}
      <CTA />

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
