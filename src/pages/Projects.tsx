import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import './Projects.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN CONSTANTS
═══════════════════════════════════════════════════════════════ */
const GOLD = '#C5A880';

/* ═══════════════════════════════════════════════════════════════
   FILTER CATEGORIES
═══════════════════════════════════════════════════════════════ */
type CategoryId = 'all' | 'all-house' | 'utility' | 'painting' | 'partial';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',       label: '全部作品', en: 'ALL'          },
  { id: 'all-house', label: '全屋統包', en: 'FULL REMODEL' },
  { id: 'utility',   label: '水電工程', en: 'UTILITY'      },
  { id: 'painting',  label: '工藝油漆', en: 'PAINTING'     },
  { id: 'partial',   label: '局部改造', en: 'PARTIAL'      },
];

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════════════════ */
interface Project {
  id:          string;
  category:    CategoryId;
  title:       string;
  subtitle:    string;
  type:        string;
  size:        string;
  year:        string;
  budget:      string;
  designFocus: string;
  materials:   string;
  highlight:   string;
  img:         string;
  altText:     string;
  beforeImg:   string;
  beforeAlt:   string;
  afterImg:    string;
  afterAlt:    string;
  galleryImgs: string[];
  description: string[];
}

const PROJECTS: Project[] = [
  {
    id:          '1',
    category:    'all-house',
    title:       '天母森光',
    subtitle:    '三代同堂御所',
    type:        '全屋統包 / FULL REMODEL',
    size:        '45坪',
    year:        '2025',
    budget:      '280萬',
    designFocus: '全室格局打通、北美胡桃木實木地板、奢華暗灰石材融合',
    materials:   '北美黑胡桃木實木地板、高級無毒環保塗料、進口三層防水系統',
    highlight:   '全室格局打通 × 北美胡桃木實木地板 × 奢華暗灰石材',
    img:         '/images/luxury_tianmu_home_1779301841564.png',
    altText:     '南源木材 天母森光 台北天母奢華住宅 三代同堂原木室內設計案實景',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 老屋翻新施工前 天母住宅漏水與舊格局拆除工程',
    afterImg:    '/images/old_house_after.png',
    afterAlt:    '南源木材 天母豪宅老屋改裝完工後 北美胡桃木地板實景',
    galleryImgs: ['/images/renovation_detail.png', '/images/luxury_tianmu_home_1779301841564.png'],
    description: [
      '全室格局打通，引入大面積天然採光，將原本陰暗封閉的三房格局，重塑為光線流動、視野開闊的現代開放式公領域。',
      '地板選用北美黑胡桃木實木地板（含水率嚴控 8-12%），以「人字拼」工法鋪設，每一片木料皆經過南源自有工坊的紋理配對與預處理，確保色澤一致、質感頂級。',
      '主牆面以奢華暗灰天然石材大板鋪陳，搭配嵌入式黃銅金屬線條收邊，完美調和木質的溫潤與石材的剛硬。',
      '完美調和北美胡桃木實木地板與奢華暗灰石材，打造三代同堂的傳世御所——這就是南源「從源頭解決問題」的一條龍落地精神。',
    ],
  },
  {
    id:          '2',
    category:    'all-house',
    title:       '竹北奢華現代',
    subtitle:    '頂級格柵美學',
    type:        '全屋統包 / FULL REMODEL',
    size:        '60坪',
    year:        '2024',
    budget:      '480萬',
    designFocus: '頂級大理石客廳、客製化格柵木作、現代奢華大器落地',
    materials:   '義大利進口卡拉拉大理石、定製鍍鈦黃銅格柵、天花隱藏式冷氣系統',
    highlight:   '頂級大理石 × 客製化格柵木作 × 精工落地高階美學',
    img:         '/images/style_luxury_dark_1779301949701.png',
    altText:     '南源木材 竹北奢華現代 台灣竹北現代大氣客廳 頂級大理石格柵設計案',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 竹北客廳裝修前 水電基礎工程現場診斷',
    afterImg:    '/images/style_luxury_dark_1779301949701.png',
    afterAlt:    '南源木材 竹北客廳大理石主牆與鈦金格柵完工實拍',
    galleryImgs: ['/images/style_luxury_dark_1779301949701.png', '/images/modern_office_1779301899552.png'],
    description: [
      '現代奢華大器客廳，以義大利進口卡拉拉大理石大板為主視覺，搭配客製化鍍鈦黃銅格柵木作，完美落地高階精緻美學。',
      '60坪的空間以「雙軸對稱」為設計語彙，電視主牆與沙發背牆各自以大理石書牆呈現，形成莊嚴而不失溫度的對話關係。',
      '天花板全面整平並嵌入隱藏式冷氣出風口，搭配 3000K 暖色溫間接燈帶，光線層次豐富而不刺眼。',
      '每一個木作格柵的間距、比例與鍍鈦工藝，均由南源工班現場手工精密調整，確保視覺上的絕對精準落地。',
    ],
  },
  {
    id:          '3',
    category:    'utility',
    title:       '青埔弱電安全宅',
    subtitle:    '老屋全面升級',
    type:        '水電基礎工程 / UTILITY',
    size:        '30坪',
    year:        '2025',
    budget:      '95萬',
    designFocus: '40年老屋壁癌根治、全室電線重拉、智能家居整合',
    materials:   '無鹵低煙阻燃電線、不銹鋼熱浸鍍鋅明管、Cat6A 資訊線路',
    highlight:   '壁癌漏水根治 × 全室電線重拉 × 智能家居整合',
    img:         '/images/renovation_detail.png',
    altText:     '南源木材 青埔弱電安全宅 青埔老屋翻新工程 水電電線管線重拉配置實景',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 青埔老屋原狀 陰暗漏水壁癌嚴重的舊廚衛浴水電管線',
    afterImg:    '/images/renovation_detail.png',
    afterAlt:    '南源木材 青埔水電管路重拉完成 甲級弱電箱排線實景',
    galleryImgs: ['/images/renovation_detail.png', '/images/style_industrial_1779301976370.png'],
    description: [
      '40年屋齡老公寓，原始屋況嚴峻——主臥壁癌面積達牆面 40%、浴室長年漏水滲透至樓下、全室老舊電線超載嚴重。',
      '南源甲級水電職人從「安全工程」做起：全室電線重拉採用無鹵低煙阻燃線材，配電箱全面升級為 200A 雙迴路設計，並同步暗埋 Cat6A 資訊線路至每個房間。',
      '浴室防水層全面剔除重做三層防水（底層瀝青＋中層不織布＋面層彈性水泥），確保 48 小時試水零滲漏，徹底杜絕漏水隱患。',
      '同步整合全自動智能家居系統：一鍵場景控制、遠端監控、語音操作。40 年老屋從此升級為智慧安全住宅。',
    ],
  },
  {
    id:          '4',
    category:    'utility',
    title:       '曜石辦公',
    subtitle:    '企業總部智能化',
    type:        '水電基礎工程 / UTILITY',
    size:        '200坪',
    year:        '2024',
    budget:      '320萬',
    designFocus: 'DALI智能照明、聲學天花板、電控霧化玻璃弱電整合',
    materials:   '進口電控霧化玻璃、DALI 智能照明系統、光纖超高速網路佈線',
    highlight:   'DALI 智能照明 × 電控霧化玻璃 × 聲學天花板整合',
    img:         '/images/modern_office_1779301899552.png',
    altText:     '南源木材 曜石辦公 台北金融科技總部 弱電工程智慧整合案實景',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 商業空間水電交班 複雜線路重新理線工程',
    afterImg:    '/images/modern_office_1779301899552.png',
    afterAlt:    '南源木材 商業辦公室完工後 電控玻璃與智能燈光控制',
    galleryImgs: ['/images/modern_office_1779301899552.png', '/images/style_industrial_1779301976370.png'],
    description: [
      '為一間金融科技公司 200 坪辦公總部打造全面弱電智能化系統，是南源迄今最複雜的智能整合工程。',
      '全區導入 DALI 智能照明系統，可依據日照自動調節色溫與亮度；主管辦公室採用電控霧化玻璃隔間，一鍵切換透明與隱私模式。',
      '聲學天花板（NRC 0.85 以上）搭配吸音岩棉板，有效降低開放式辦公區噪音超過 12 分貝。',
      '光纖超高速網路佈線採 Tier-3 標準雙路由設計，確保商業辦公連線的絕對穩定性與安全性。',
    ],
  },
  {
    id:          '5',
    category:    'painting',
    title:       '侘寂茶韻',
    subtitle:    '礦物手刷美學',
    type:        '工藝油漆 / ARTISTIC PAINTING',
    size:        '40坪',
    year:        '2024',
    budget:      '85萬',
    designFocus: '義大利礦物塗料手工堆疊、珪藻土手刷紋理、無主燈光影層次',
    materials:   '義大利進口無縫微水泥、手刷珪藻土塗料、碳化防潮橡木地板',
    highlight:   '義大利礦物塗料 × 手工堆疊批土 × 光影漸層牆面藝術',
    img:         '/images/japanese_wabi_sabi_1779301881798.png',
    altText:     '南源木材 侘寂茶韻 台北日式空間裝潢 職人手工刷塗義大利礦物漆牆面',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 牆面批土打磨前 粗糙水泥底層診斷',
    afterImg:    '/images/japanese_wabi_sabi_1779301881798.png',
    afterAlt:    '南源木材 手刷塗料完工 微水泥斑駁質感牆面與榻榻米',
    galleryImgs: ['/images/japanese_wabi_sabi_1779301881798.png', '/images/style_wabi_sabi_1779301962644.png'],
    description: [
      '精選環保無毒義大利頂級特殊礦物塗料，由資深職人純手工層層堆疊批土、噴漆，刻劃出具備細膩紋理與光影漸層的牆面藝術。',
      '客廳主牆以 3 層手工塗抹的微水泥打造，每一道刮痕都是工匠手作的獨一無二紋理，在不同時段的自然光線下呈現出截然不同的光影肌理。',
      '珪藻土手刷紋理應用於主臥床頭牆，以扇形交疊手法創造深淺有致的立體感，同時具備優異的吸濕調溼功能。',
      '全室無主燈設計，以 2700K 暖色溫 LED 線性燈與壁燈為主，讓手工塗裝的每一道紋理在光影中盡情呼吸。',
    ],
  },
  {
    id:          '6',
    category:    'painting',
    title:       '琥珀香醇',
    subtitle:    '職人手作吧台',
    type:        '工藝油漆 / ARTISTIC PAINTING',
    size:        '60坪',
    year:        '2024',
    budget:      '120萬',
    designFocus: '品牌調色手工噴漆、台灣檜木烤漆吧台、暖金光影整合',
    materials:   '台灣檜木原木大板、訂製黃銅管金屬件、頂級調光暖色 LED 燈具',
    highlight:   '品牌色調手工噴漆 × 檜木烤漆吧台 × 暖金光影整合',
    img:         '/images/high_end_cafe_1779301868615.png',
    altText:     '南源木材 琥珀香醇 職人手工噴漆 台灣檜木烤漆吧台 奢華咖啡廳空間',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 商業空間木作框架打底 現場打磨工序',
    afterImg:    '/images/high_end_cafe_1779301868615.png',
    afterAlt:    '南源木材 台灣檜木吧台手工噴漆保護漆完工光澤',
    galleryImgs: ['/images/high_end_cafe_1779301868615.png', '/images/style_luxury_dark_1779301949701.png'],
    description: [
      '為精品咖啡旗艦店打造品牌專屬調色系統——從牆面的深琥珀棕到天花板的煙燻黑，每一個色彩均依據品牌 Pantone 色號現場精密調配。',
      '8 米長一體成型台灣檜木吧台，經過 8 道手工打磨與 5 層木蠟油塗裝，保留最原始的木紋肌理，同時賦予耐磨防水的長效保護。',
      '天花板訂製鐵件噴漆採霧黑色金屬漆，由南源職人以靜電噴塗工藝完成，呈現均勻細緻、無橘皮紋路的頂級塗裝品質。',
      '從室內牆面到戶外招牌、從吧台烤漆到椅面皮革，我們提供完整的品牌色彩整合服務，確保每一個視覺觸點高度一致。',
    ],
  },
  {
    id:          '7',
    category:    'partial',
    title:       '機能極大化小宅',
    subtitle:    '小資精品美學',
    type:        '局部空間改造 / PARTIAL RENOVATION',
    size:        '22坪',
    year:        '2025',
    budget:      '58萬',
    designFocus: '隱藏式收納、多功能架高木質地坪、系統櫃與手作木件混搭',
    materials:   '高級樺木合板、雙面塗裝板、低甲醛全室系統櫃、LED 線性燈',
    highlight:   '隱藏式收納 × 多功能木質地坪 × 小資精品感落地',
    img:         '/images/budget_smart_home.png',
    altText:     '南源木材 機能極大化小宅 隱藏式收納 多功能木質地坪 系統櫃與手作木件',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 小宅改裝前格局 陰暗老舊天花板拆除現場',
    afterImg:    '/images/budget_smart_home.png',
    afterAlt:    '南源木材 架高木地板收納地坪與多功能隱藏桌面完工實景',
    galleryImgs: ['/images/budget_smart_home.png', '/images/style_minimal_wood_1779301932325.png'],
    description: [
      '22 坪小宅需同時滿足臥室、書房、客廳與大量收納，總預算嚴格控制在 60 萬以內。南源以「有限預算混搭系統櫃與職人手作木件」為核心策略。',
      '以「多功能木質架高地坪」為核心設計：客廳區域架高 40 公分，地坪下方全面規劃為抽屜式收納，地坪上方搭配可掀式桌板，白天是工作區、晚上攤平即為客臥。',
      '獨立機能主臥藏入大量隱藏式收納：床頭兩側對稱衣櫃、床底液壓式掀床、牆面頂天立地書牆，創造 100% 收納極大化的小資精品感。',
      '這個案例完美證明：小預算不等於妥協品質，透過南源的精準選材與機能設計，22 坪也能擁有遠超預算的視覺落地感。',
    ],
  },
  {
    id:          '8',
    category:    'partial',
    title:       '沐光水域',
    subtitle:    '精品衛浴藝術',
    type:        '局部空間改造 / PARTIAL RENOVATION',
    size:        '10坪',
    year:        '2025',
    budget:      '120萬',
    designFocus: '大理石對花貼附、浮懸木質浴櫃、德國恆溫花灑系統',
    materials:   '義大利 Nero Marquina 黑色大理石、北美白橡木、德國 Hansgrohe 恆溫花灑',
    highlight:   '大理石對花 × 浮懸木質浴櫃 × 無框淋浴屏',
    img:         '/images/luxury_bathroom_1779301913582.png',
    altText:     '南源木材 沐光水域 大理石對花 懸浮木質浴櫃 台北天母奢華住宅衛浴改裝',
    beforeImg:   '/images/old_house_before.png',
    beforeAlt:   '南源木材 舊浴室壁磚敲除及水泥粗胚打底工程',
    afterImg:    '/images/luxury_bathroom_1779301913582.png',
    afterAlt:    '南源木材 Nero Marquina 大理石對花主牆與無框淋浴門完工實景',
    galleryImgs: ['/images/luxury_bathroom_1779301913582.png', '/images/renovation_detail.png'],
    description: [
      '僅 10 坪的衛浴空間，打造如同精品飯店般的沐浴體驗。主牆面選用義大利 Nero Marquina 黑色大理石大板，以 bookmatching 對花工法呈現鏡面對稱的自然紋理。',
      '浴櫃以北美白橡木搭配黃銅拉手，底部懸浮設計配合 LED 地腳燈，營造出輕盈漂浮感。淋浴區採用無框超白玻璃屏風，搭配德國 Hansgrohe 恆溫花灑系統。',
      '地坪以 600×1200mm 義大利進口大板斜切45度拼貼，視覺上拉長空間縱深。所有填縫劑均採用抗菌防霉配方，長效維持潔白品質。',
      '每一片石材、每一個五金件，都經過南源團隊的嚴格篩選——即使是小空間，也值得被認真對待。',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   FADE-IN  (scroll-driven reveal)
═══════════════════════════════════════════════════════════════ */
const FadeIn: React.FC<{
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
═══════════════════════════════════════════════════════════════ */
const BeforeAfterSlider: React.FC<{
  beforeImg: string;
  beforeAlt: string;
  afterImg:  string;
  afterAlt:  string;
}> = ({ beforeImg, beforeAlt, afterImg, afterAlt }) => {
  const [pos,  setPos]  = useState(50);
  const boxRef          = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={boxRef}
      className="ba-slider-container"
      onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onMouseDown={e => handleMove(e.clientX)}
    >
      {/* After layer */}
      <div
        className="ba-reality-side"
        style={{ backgroundImage: `url('${afterImg}')` }}
        role="img"
        aria-label={afterAlt}
      >
        <div className="ba-reality-label">完工後 AFTER</div>
      </div>

      {/* Before layer */}
      <div
        className="ba-blueprint-side"
        style={{
          backgroundImage: `url('${beforeImg}')`,
          clipPath: `polygon(0 0,${pos}% 0,${pos}% 100%,0 100%)`,
        }}
        role="img"
        aria-label={beforeAlt}
      >
        <div className="ba-blueprint-label">施工前 BEFORE</div>
      </div>

      {/* Divider handle */}
      <div
        className="ba-handle-line"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="ba-handle-circle">
          <span className="ba-handle-arrows">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════════ */
const ProjectCard: React.FC<{
  project: Project;
  delay:   number;
  onClick: () => void;
}> = ({ project, delay, onClick }) => (
  <FadeIn delay={delay}>
    <article onClick={onClick} className="portfolio-card">

      {/* Image */}
      <div className="portfolio-img-container">
        <img
          src={project.img}
          alt={project.altText}
          className="portfolio-img"
          loading="lazy"
        />
        <div className="portfolio-badge-style">
          {CATEGORIES.find(c => c.id === project.category)?.en ?? ''}
        </div>
        <div className="portfolio-badge-geo">{project.year}</div>
        <div className="portfolio-img-gradient" />
      </div>

      {/* Body */}
      <div className="portfolio-card-content">

        <div className="portfolio-card-header">
          <div>
            <h3 className="portfolio-card-title">{project.title}</h3>
            <p className="portfolio-card-type">{project.subtitle}</p>
          </div>
          <span className="portfolio-badge-size">{project.size}</span>
        </div>

        <div className="portfolio-card-specs">
          {[
            { label: '設計重點', value: project.designFocus },
            { label: '使用材料', value: project.materials   },
          ].map(row => (
            <div key={row.label} className="portfolio-spec-row">
              <span className="portfolio-spec-label">{row.label}：</span>
              <span className="portfolio-spec-val">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="portfolio-divider">
          <p className="portfolio-card-highlight">{project.highlight}</p>
        </div>

        <div className="portfolio-card-action">
          <span className="portfolio-action-text">查看完整案例 ➔</span>
        </div>
      </div>
    </article>
  </FadeIn>
);

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL OVERLAY
═══════════════════════════════════════════════════════════════ */
const ProjectDetail: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="detail-modal-overlay"
    >
      <div ref={scrollRef} className="detail-modal-scroll">

        {/* Close button */}
        <button
          onClick={onClose}
          className="detail-modal-close-btn"
          aria-label="關閉作品詳情"
        >
          ✕
        </button>

        {/* Hero image */}
        <div className="detail-hero-banner">
          <img
            src={project.img}
            alt={project.altText}
            className="detail-hero-img"
          />
          <div className="detail-hero-gradient" />
          <div className="detail-hero-badge-container">
            <span className="detail-hero-category">{project.type}</span>
            {[project.size, project.year, `預算 ${project.budget}`].map(tag => (
              <span key={tag} className="detail-hero-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Main body */}
        <div className="container px-3 px-md-4 detail-body-container">

          {/* Title */}
          <div className="detail-header-block">
            <h2 className="detail-title">{project.title}</h2>
            <p className="detail-subtitle-en">{project.subtitle}</p>
          </div>

          {/* Highlight quote */}
          <div className="detail-concept-border">
            <p className="detail-concept-text">{project.highlight}</p>
          </div>

          {/* Description */}
          <div className="detail-desc-max-width">
            {project.description.map((para, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="detail-desc-text">{para}</p>
              </FadeIn>
            ))}
          </div>

          {/* Before / After slider */}
          <FadeIn className="mb-5">
            <h3 className="detail-section-title">空間重生：擦除對照</h3>
            <p className="detail-section-subtitle-en">左右拖曳滑桿，見證空間蛻變。</p>
            <BeforeAfterSlider
              beforeImg={project.beforeImg}
              beforeAlt={project.beforeAlt}
              afterImg={project.afterImg}
              afterAlt={project.afterAlt}
            />
          </FadeIn>

          {/* Gallery */}
          <FadeIn>
            <h3 className="detail-gallery-title">更多細節</h3>
            <div className="row g-3">
              {project.galleryImgs.map((gImg, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <div className="detail-gallery-img-wrapper">
                    <img
                      src={gImg}
                      alt={`南源木材 ${project.title} 施工細節圖 ${i + 1}`}
                      className="detail-gallery-img"
                      loading="lazy"
                    />
                    <div className="detail-gallery-img-shadow-overlay" />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="cta-section">
              <p className="cta-desc">
                喜歡這個作品？南源木材為您打造台北天母、竹北、青埔客裝與老屋翻新精品空間。
              </p>
              <button
                onClick={() => { onClose(); window.location.href = '/contact'; }}
                className="cta-btn"
                aria-label="立即預約諮詢"
              >
                立即預約諮詢 ➔
              </button>
            </div>
          </FadeIn>

        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FILTER TABS  —  Bespoke Craftsmanship Edition
═══════════════════════════════════════════════════════════════ */
const FilterTabs: React.FC<{
  active:   CategoryId;
  onChange: (id: CategoryId) => void;
}> = ({ active, onChange }) => {
  const [hovered, setHovered] = React.useState<CategoryId | null>(null);

  return (
    /*
      .filter-track  → outer scroll wrapper with centred flex
      .tab-track-container → the frosted obsidian pill capsule
      Tasks 2 & 3: centering is handled entirely in Projects.css.
      No inline justify-content here — CSS owns the layout.
    */
    <div className="filter-track">
      <div className="tab-track-container">
        {CATEGORIES.map(cat => {
          const isActive  = active  === cat.id;
          const isHovered = hovered === cat.id;

          return (
            <div key={cat.id} className="position-relative d-inline-block">
              {/* Sliding active pill background */}
              {isActive && (
                <motion.div
                  layoutId="filter-pill"
                  className="material-pill-glow"
                  transition={{
                    type:      'spring',
                    stiffness: 380,
                    damping:   34,
                    mass:      0.9,
                  }}
                />
              )}

              <button
                onClick={() => onChange(cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="filter-pill-btn"
                aria-label={`篩選 ${cat.label}`}
                style={{
                  transform: isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {/* Chinese label */}
                <span
                  className="filter-pill-label"
                  style={{
                    fontWeight: isActive ? 800 : isHovered ? 500 : 300,
                    color:      isActive
                      ? '#ffffff'
                      : isHovered
                        ? GOLD
                        : 'rgba(255,255,255,0.42)',
                    textShadow: isActive
                      ? `0 0 18px rgba(197,168,128,0.7), 0 0 6px rgba(255,255,255,0.3)`
                      : 'none',
                  }}
                >
                  {cat.label}
                </span>

                {/* English sub-label */}
                <span
                  className="filter-pill-en"
                  style={{
                    color: isActive
                      ? 'rgba(197,168,128,0.75)'
                      : isHovered
                        ? 'rgba(197,168,128,0.55)'
                        : 'rgba(255,255,255,0.22)',
                  }}
                >
                  {cat.en}
                </span>

                {/* Gold wire underline (active only) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="gold-wire"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{   scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                      className="position-absolute bottom-0 start-50 translate-middle-x"
                      style={{
                        display:         'block',
                        width:           '24px',
                        height:          '1.5px',
                        borderRadius:    '2px',
                        background:      `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                        boxShadow:       `0 0 8px rgba(197,168,128,0.9), 0 0 20px rgba(197,168,128,0.4)`,
                        transformOrigin: 'center',
                        marginBottom:    '2px',
                      }}
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
};

/* ═══════════════════════════════════════════════════════════════
   PROJECTS PAGE
═══════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryId>('all');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = searchParams.get('project');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const selectedProject = selectedId
    ? PROJECTS.find(p => p.id === selectedId) ?? null
    : null;

  const handleFilterChange = (id: CategoryId) => {
    setActiveFilter(id);
    setSearchParams({});
  };

  return (
    <main className="projects-page">
      <div className="container px-3 px-md-4 projects-container">

        {/* Page header */}
        <section className="mb-4">
          <FadeIn>
            <h1 className="projects-title">作品案例</h1>
            <p className="projects-subtitle">
              南源木材高端住宅、客廳、老屋翻修與油漆水電精工作品。台北天母、竹北、青埔全屋統包翻新設計案例一覽。
            </p>
          </FadeIn>
        </section>

        {/* Filter tabs */}
        <section>
          <FilterTabs active={activeFilter} onChange={handleFilterChange} />
        </section>

        {/* Count hint */}
        <div className="projects-count-hint">
          <span className="projects-count-text">
            顯示 {filtered.length} / {PROJECTS.length} 件作品
          </span>
        </div>

        {/* Card grid */}
        <section>
          <motion.div layout className="row g-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  className="col-12 col-md-6 col-lg-4"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    delay={i * 0.04}
                    onClick={() => setSearchParams({ project: project.id })}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSearchParams({})}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Projects;
