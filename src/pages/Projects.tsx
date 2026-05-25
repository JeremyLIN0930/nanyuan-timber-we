import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.85)';
const GOLD_DIM  = 'rgba(197,168,128,0.1)';
const BG        = '#050505';
const BG_CARD   = '#0D0D0E';
const BORDER    = 'rgba(255,255,255,0.08)';
const TEXT_DIM  = 'rgba(255,255,255,0.4)';
const TEXT_MID  = 'rgba(255,255,255,0.65)';

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
  { id: 'all',       label: '全部作品', en: 'ALL'         },
  { id: 'all-house', label: '全屋統包', en: 'FULL REMODEL'},
  { id: 'utility',   label: '水電工程', en: 'UTILITY'     },
  { id: 'painting',  label: '工藝油漆', en: 'PAINTING'    },
  { id: 'partial',   label: '局部改造', en: 'PARTIAL'     },
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
  beforeImg:   string;
  afterImg:    string;
  galleryImgs: string[];
  description: string[];
}

const PROJECTS: Project[] = [

  /* ── 全屋統包 ─────────────────────────────────────── */
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/old_house_after.png',
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/style_luxury_dark_1779301949701.png',
    galleryImgs: ['/images/style_luxury_dark_1779301949701.png', '/images/modern_office_1779301899552.png'],
    description: [
      '現代奢華大器客廳，以義大利進口卡拉拉大理石大板為主視覺，搭配客製化鍍鈦黃銅格柵木作，完美落地高階精緻美學。',
      '60坪的空間以「雙軸對稱」為設計語彙，電視主牆與沙發背牆各自以大理石書牆呈現，形成莊嚴而不失溫度的對話關係。',
      '天花板全面整平並嵌入隱藏式冷氣出風口，搭配 3000K 暖色溫間接燈帶，光線層次豐富而不刺眼。',
      '每一個木作格柵的間距、比例與鍍鈦工藝，均由南源工班現場手工精密調整，確保視覺上的絕對精準落地。',
    ],
  },

  /* ── 水電工程 ─────────────────────────────────────── */
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/renovation_detail.png',
    galleryImgs: ['/images/renovation_detail.png', '/images/style_industrial_1779301976370.png'],
    description: [
      '40年屋齡老公寓，原始屋況嚴峻——主臥壁癌面積達牆面 40%、浴室長年漏水滲透至樓下、全室老舊電線超載嚴重。',
      '南源甲級水電職人從「安全工程」做起：全室電線重拉採用無鹵低煙阻燃線材，配電箱全面升級為 200A 雙迴路設計，並同步暗埋 Cat6A 資訊線路至每個房間。',
      '浴室防水層全面剔除重做三層防水（底層瀝青＋中層不織布＋面層彈性水泥），確保 48 小時試水零滲漏，徹底杜絕漏水隱患。',
      '同步整合全自動智能家居系統：一鍵場景控制、遠端監控、語音操作。40 年老屋從此升級為現代智慧安全住宅。',
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/modern_office_1779301899552.png',
    galleryImgs: ['/images/modern_office_1779301899552.png', '/images/style_industrial_1779301976370.png'],
    description: [
      '為一間金融科技公司 200 坪辦公總部打造全面弱電智能化系統，是南源迄今最複雜的智能整合工程。',
      '全區導入 DALI 智能照明系統，可依據日照自動調節色溫與亮度；主管辦公室採用電控霧化玻璃隔間，一鍵切換透明與隱私模式。',
      '聲學天花板（NRC 0.85 以上）搭配吸音岩棉板，有效降低開放式辦公區噪音超過 12 分貝。',
      '光纖超高速網路佈線採 Tier-3 標準雙路由設計，確保商業辦公連線的絕對穩定性與安全性。',
    ],
  },

  /* ── 工藝油漆 ─────────────────────────────────────── */
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/japanese_wabi_sabi_1779301881798.png',
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/high_end_cafe_1779301868615.png',
    galleryImgs: ['/images/high_end_cafe_1779301868615.png', '/images/style_luxury_dark_1779301949701.png'],
    description: [
      '為精品咖啡旗艦店打造品牌專屬調色系統——從牆面的深琥珀棕到天花板的煙燻黑，每一個色彩均依據品牌 Pantone 色號現場精密調配。',
      '8 米長一體成型台灣檜木吧台，經過 8 道手工打磨與 5 層木蠟油塗裝，保留最原始的木紋肌理，同時賦予耐磨防水的長效保護。',
      '天花板訂製鐵件噴漆採霧黑色金屬漆，由南源職人以靜電噴塗工藝完成，呈現均勻細緻、無橘皮紋路的頂級塗裝品質。',
      '從室內牆面到戶外招牌、從吧台烤漆到椅面皮革，我們提供完整的品牌色彩整合服務，確保每一個視覺觸點高度一致。',
    ],
  },

  /* ── 局部改造 ─────────────────────────────────────── */
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/budget_smart_home.png',
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
    beforeImg:   '/images/old_house_before.png',
    afterImg:    '/images/luxury_bathroom_1779301913582.png',
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
  children:  React.ReactNode;
  className?: string;
  delay?:    number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
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
  afterImg:  string;
}> = ({ beforeImg, afterImg }) => {
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
      style={{
        position:   'relative',
        width:      '100%',
        height:     'clamp(260px,55vh,680px)',
        overflow:   'hidden',
        cursor:     'ew-resize',
        userSelect: 'none',
        border:     `1px solid ${BORDER}`,
      }}
      onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onMouseDown={e => handleMove(e.clientX)}
    >
      {/* After layer */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${afterImg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 300, color: '#fff', backgroundColor: 'rgba(5,5,5,0.65)', backdropFilter: 'blur(8px)', padding: '5px 14px' }}>完工後 AFTER</div>
      </div>
      {/* Before layer */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${beforeImg}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(80%) contrast(110%) brightness(50%)', clipPath: `polygon(0 0,${pos}% 0,${pos}% 100%,0 100%)` }}>
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 300, color: '#fff', backgroundColor: 'rgba(5,5,5,0.65)', backdropFilter: 'blur(8px)', padding: '5px 14px' }}>施工前 BEFORE</div>
      </div>
      {/* Divider handle */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: '2px', backgroundColor: GOLD, boxShadow: '0 0 25px rgba(197,168,128,0.8)', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${GOLD}`, backgroundColor: 'rgba(5,5,5,0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(197,168,128,0.5)' }}>
          <span style={{ color: GOLD, fontSize: '12px', fontWeight: 300 }}>⟨⟩</span>
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
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      style={{
        backgroundColor: BG_CARD,
        border:          `1px solid ${BORDER}`,
        boxShadow:       '0 4px 24px rgba(0,0,0,0.35)',
        cursor:          'pointer',
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
        transition:      'border-color 0.35s, box-shadow 0.35s',
        overflow:        'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(197,168,128,0.5)';
        (e.currentTarget as HTMLDivElement).style.boxShadow  = '0 8px 32px rgba(197,168,128,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
        (e.currentTarget as HTMLDivElement).style.boxShadow  = '0 4px 24px rgba(0,0,0,0.35)';
      }}
    >
      {/* ── Image ── */}
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img
          src={project.img}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82, transition: 'transform 0.7s, opacity 0.5s', display: 'block' }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';    (e.currentTarget as HTMLImageElement).style.opacity = '0.82'; }}
        />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: BG, backgroundColor: GOLD, padding: '4px 10px', textTransform: 'uppercase' }}>
          {CATEGORIES.find(c => c.id === project.category)?.en ?? ''}
        </div>
        {/* Year badge */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '9px', fontWeight: 300, letterSpacing: '0.15em', color: '#fff', backgroundColor: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)', padding: '4px 10px' }}>
          {project.year}
        </div>
        {/* Bottom gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,14,0.85) 0%, transparent 60%)' }} />
      </div>

      {/* ── Body ── */}
      <div style={{ padding: 'clamp(16px,2.5vw,24px)', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', margin: 0, lineHeight: 1.2 }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.12em', color: GOLD, margin: '3px 0 0', textShadow: `0 0 10px ${GOLD_DIM}` }}>
              {project.subtitle}
            </p>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: TEXT_DIM, border: `1px solid ${BORDER}`, padding: '3px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {project.size}
          </span>
        </div>

        {/* Meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { label: '設計重點', value: project.designFocus },
            { label: '使用材料', value: project.materials   },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: TEXT_DIM, flexShrink: 0, paddingTop: '1px', minWidth: '58px' }}>{row.label}：</span>
              <span style={{ fontSize: 'clamp(0.73rem,1.1vw,0.8rem)', fontWeight: 300, letterSpacing: '0.04em', color: TEXT_MID, lineHeight: 1.55 }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Highlight pill */}
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.08em', color: 'rgba(197,168,128,0.7)', margin: 0, lineHeight: 1.6 }}>
            {project.highlight}
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: GOLD, textShadow: `0 0 12px ${GOLD_DIM}`, cursor: 'pointer' }}>
            查看完整案例 ➔
          </span>
        </div>
      </div>
    </motion.div>
  </FadeIn>
);

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL OVERLAY
   — position:fixed, inset:0, z-index:9000, bg:#050505
   — completely isolates from grid; no bleed-through
═══════════════════════════════════════════════════════════════ */
const ProjectDetail: React.FC<{
  project:  Project;
  onClose:  () => void;
}> = ({ project, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        /* ── ISOLATION LAYER ──
           position:fixed + inset:0 + z-index:9000 + backgroundColor:#050505
           completely seals off the overlay from any underlying content.
           overflow:hidden on this element; inner div handles scroll. */
        position:        'fixed',
        inset:           0,
        zIndex:          9000,
        backgroundColor: BG,
        overflow:        'hidden',
      }}
    >
      {/* Scrollable inner container */}
      <div
        ref={scrollRef}
        style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
      >

        {/* ── Close button ──────────────────────────────────── */}
        <button
          onClick={onClose}
          style={{
            position:        'fixed',
            top:             'clamp(16px,3vh,28px)',
            right:           'clamp(16px,3vw,36px)',
            zIndex:          9010,
            background:      'none',
            border:          `1px solid ${BORDER}`,
            color:           TEXT_DIM,
            fontSize:        '11px',
            fontWeight:      700,
            letterSpacing:   '0.22em',
            padding:         '8px 18px',
            cursor:          'pointer',
            backdropFilter:  'blur(12px)',
            backgroundColor: 'rgba(5,5,5,0.75)',
            transition:      'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_DIM; }}
        >
          關閉 ✕
        </button>

        {/* ── Hero Image ──────────────────────────────────────── */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(280px,65vh,82vh)', overflow: 'hidden' }}>
          <img
            src={project.img}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Gradient to body bg — seamless transition */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.25) 55%, transparent 100%)` }} />
          {/* Type badge */}
          <div style={{ position: 'absolute', bottom: 'clamp(90px,14vw,140px)', left: 'clamp(16px,4vw,48px)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: GOLD, border: `1px solid rgba(197,168,128,0.35)`, padding: '4px 14px', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(5,5,5,0.4)' }}>
              {project.type}
            </span>
            {[project.size, project.year, `預算 ${project.budget}`].map(tag => (
              <span key={tag} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.15em', color: TEXT_DIM, backgroundColor: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(6px)', padding: '4px 12px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main content area ────────────────────────────────── */}
        <div
          className="container px-3 px-md-4"
          style={{ position: 'relative', marginTop: '-80px', zIndex: 10, paddingBottom: '80px' }}
        >

          {/* Title */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem,7vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.35)', lineHeight: 1.05, margin: 0 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: 'clamp(0.95rem,1.8vw,1.4rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(197,168,128,0.72)', marginTop: '0.5rem' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Highlight quote */}
          <div style={{ borderLeft: `3px solid ${GOLD}`, boxShadow: '-4px 0 20px rgba(197,168,128,0.28)', paddingLeft: '1.25rem', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: 'clamp(0.92rem,1.6vw,1.15rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, margin: 0 }}>
              {project.highlight}
            </p>
          </div>

          {/* Description paragraphs */}
          <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
            {project.description.map((para, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p style={{ fontSize: 'clamp(0.84rem,1.25vw,1rem)', fontWeight: 300, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.62)', lineHeight: 2.15, marginBottom: '1.25rem' }}>
                  {para}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* Before / After slider */}
          <FadeIn className="mb-5">
            <h3 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 900, letterSpacing: '-0.03em', color: GOLD, textShadow: `0 0 25px ${GOLD_GLOW}`, marginBottom: '0.6rem' }}>
              空間重生：擦除對照
            </h3>
            <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.12em', color: TEXT_DIM, marginBottom: '1rem' }}>
              左右拖曳滑桿，見證空間蛻變。
            </p>
            <BeforeAfterSlider beforeImg={project.beforeImg} afterImg={project.afterImg} />
          </FadeIn>

          {/* Gallery */}
          <FadeIn>
            <h3 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 900, letterSpacing: '-0.03em', color: GOLD, textShadow: `0 0 25px ${GOLD_GLOW}`, marginBottom: '1.25rem' }}>
              更多細節
            </h3>
            <div className="row g-3">
              {project.galleryImgs.map((gImg, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={gImg}
                      alt={`Detail ${i + 1}`}
                      style={{ width: '100%', height: 'clamp(180px,35vh,380px)', objectFit: 'cover', opacity: 0.82, transition: 'transform 0.7s, opacity 0.5s', display: 'block' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';    (e.currentTarget as HTMLImageElement).style.opacity = '0.82'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 100%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                喜歡這個作品？讓南源為您打造專屬空間
              </p>
              <button
                onClick={() => { onClose(); window.location.href = '/contact'; }}
                style={{ fontSize: 'clamp(0.82rem,1.3vw,0.95rem)', letterSpacing: '0.14em', padding: '0.9em 2.8em', border: `1px solid ${GOLD}`, color: BG, backgroundColor: GOLD, cursor: 'pointer', fontWeight: 900, transition: 'box-shadow 0.3s', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(197,168,128,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
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
   ─────────────────────────────────────────────────────────────
   Visual language:
   • Frosted obsidian pill container (backdrop-filter: blur)
   • Framer Motion shared layoutId "gold-wire" underline that
     slides smoothly between active tabs (no JS measurement needed)
   • Hover: translateY(-2px) + gold colour, cubic-bezier breath
   • Mobile: overflow-x:auto + scrollbar hidden, finger-swipe ready
═══════════════════════════════════════════════════════════════ */
const FilterTabs: React.FC<{
  active:   CategoryId;
  onChange: (id: CategoryId) => void;
}> = ({ active, onChange }) => {
  const [hovered, setHovered] = React.useState<CategoryId | null>(null);

  return (
    <>
      {/* ── Inject one-time global styles for webkit scrollbar hide ── */}
      <style>{`
        .filter-track::-webkit-scrollbar { display: none; }
      `}</style>

      {/*
        SCROLL WRAPPER
        ─────────────
        overflow-x:auto  → enables finger-swipe on mobile
        scrollbar-width:none + .filter-track::-webkit-scrollbar → hides
        scrollbar on every browser while keeping scroll functionality.
        -webkit-overflow-scrolling:touch → momentum scrolling on iOS.
      */}
      <div
        className="filter-track"
        style={{
          overflowX:                 'auto',
          overflowY:                 'hidden',
          scrollbarWidth:            'none',
          WebkitOverflowScrolling:   'touch',
          marginBottom:              'clamp(2rem,4vh,3.5rem)',
          /* Extra horizontal padding so the pill shadow isn't clipped */
          paddingBottom:             '6px',
          paddingTop:                '4px',
        }}
      >
        {/*
          FROSTED OBSIDIAN PILL CONTAINER
          ────────────────────────────────
          • width:max-content → inner tabs never wrap on narrow screens;
            the scroll wrapper handles overflow.
          • border-radius:9999px → perfect pill shape.
          • backdrop-filter:blur → premium frosted glass look.
          • The very faint gold outer ring lifts it off the page.
        */}
        <div
          style={{
            display:         'inline-flex',
            alignItems:      'stretch',
            width:           'max-content',
            gap:             0,
            borderRadius:    '9999px',
            background:      'rgba(10,10,10,0.55)',
            backdropFilter:  'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border:          '1px solid rgba(197,168,128,0.18)',
            boxShadow:       '0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
            padding:         '5px',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive  = active  === cat.id;
            const isHovered = hovered === cat.id;

            return (
              /*
                PER-TAB WRAPPER
                ───────────────
                position:relative so the absolute gold underline wire
                and the Framer Motion layout pill both anchor correctly.
              */
              <div
                key={cat.id}
                style={{ position: 'relative' }}
              >
                {/*
                  ACTIVE BACKGROUND PILL
                  ───────────────────────
                  layoutId="pill" → Framer Motion animates this pill's
                  position and size whenever `active` changes, creating
                  the smooth sliding highlight without any JS measurement.
                  It renders BEHIND the button label via z-index.
                */}
                {isActive && (
                  <motion.div
                    layoutId="filter-pill"
                    style={{
                      position:        'absolute',
                      inset:           0,
                      borderRadius:    '9999px',
                      background:      'linear-gradient(135deg, rgba(197,168,128,0.16) 0%, rgba(197,168,128,0.07) 100%)',
                      border:          '1px solid rgba(197,168,128,0.35)',
                      boxShadow:       '0 0 18px rgba(197,168,128,0.22), inset 0 0 12px rgba(197,168,128,0.06)',
                      zIndex:          0,
                    }}
                    transition={{
                      type:      'spring',
                      stiffness: 380,
                      damping:   34,
                      mass:      0.9,
                    }}
                  />
                )}

                {/*
                  TAB BUTTON
                  ──────────
                  z-index:1 keeps label above the sliding pill.
                  transform:translateY is controlled by isHovered so the
                  breathing hover effect works even on the active tab.
                */}
                <button
                  onClick={() => onChange(cat.id)}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position:        'relative',
                    zIndex:          1,
                    display:         'flex',
                    flexDirection:   'column',
                    alignItems:      'center',
                    justifyContent:  'center',
                    gap:             '4px',
                    padding:         'clamp(10px,1.4vw,14px) clamp(18px,2.8vw,32px)',
                    borderRadius:    '9999px',
                    background:      'none',
                    border:          'none',
                    cursor:          'pointer',
                    outline:         'none',
                    whiteSpace:      'nowrap',
                    /* Breathing hover lift */
                    transform:       isHovered && !isActive
                      ? 'translateY(-2px)'
                      : isActive && isHovered
                        ? 'translateY(-1px)'
                        : 'translateY(0)',
                    transition:      'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {/*
                    CHINESE LABEL
                    ─────────────
                    Active   → pure white, bold, gold glow text-shadow
                    Hovered  → gold colour, medium weight
                    Resting  → low-contrast rgba(255,255,255,0.4)
                    All transitions use the same cubic-bezier for cohesion.
                  */}
                  <span
                    style={{
                      fontSize:      'clamp(0.82rem,1.3vw,0.96rem)',
                      fontWeight:    isActive ? 800 : isHovered ? 500 : 300,
                      letterSpacing: '0.06em',
                      color:         isActive
                        ? '#ffffff'
                        : isHovered
                          ? GOLD
                          : 'rgba(255,255,255,0.42)',
                      textShadow:    isActive
                        ? `0 0 18px rgba(197,168,128,0.7), 0 0 6px rgba(255,255,255,0.3)`
                        : isHovered
                          ? `0 0 12px rgba(197,168,128,0.45)`
                          : 'none',
                      transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1), font-weight 0.35s, text-shadow 0.35s',
                    }}
                  >
                    {cat.label}
                  </span>

                  {/*
                    ENGLISH SUB-LABEL
                    ──────────────────
                    Stays dim and small; brightens proportionally on hover/active.
                  */}
                  <span
                    style={{
                      fontSize:      '8.5px',
                      fontWeight:    300,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color:         isActive
                        ? 'rgba(197,168,128,0.75)'
                        : isHovered
                          ? 'rgba(197,168,128,0.55)'
                          : 'rgba(255,255,255,0.22)',
                      transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {cat.en}
                  </span>

                  {/*
                    GOLD WIRE UNDERLINE
                    ────────────────────
                    Renders only when this tab is active.
                    AnimatePresence + initial/exit scale-x gives it a
                    draw-in / erase-out effect each time the active tab changes.
                    The wire sits 4px below the English sub-label.
                  */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="gold-wire"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{   scaleX: 0, opacity: 0 }}
                        transition={{
                          duration:   0.38,
                          ease:       [0.16, 1, 0.3, 1],
                          delay:      0.06,
                        }}
                        style={{
                          display:         'block',
                          width:           'clamp(18px,55%,36px)',
                          height:          '1.5px',
                          borderRadius:    '2px',
                          background:      `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                          boxShadow:       `0 0 8px rgba(197,168,128,0.9), 0 0 20px rgba(197,168,128,0.4)`,
                          transformOrigin: 'center',
                          marginTop:       '2px',
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
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROJECTS PAGE
═══════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryId>('all');
  const [selectedId,   setSelectedId]   = useState<string | null>(null);

  /* Derived: filtered list */
  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  /* Derived: selected project object */
  const selectedProject = selectedId
    ? PROJECTS.find(p => p.id === selectedId) ?? null
    : null;

  /* Handle filter change — reset scroll + selection */
  const handleFilterChange = (id: CategoryId) => {
    setActiveFilter(id);
    setSelectedId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh' }}
    >
      <div
        className="container px-3 px-md-4"
        style={{ paddingTop: 'clamp(80px,10vh,120px)', paddingBottom: '80px' }}
      >

        {/* ── Page header ─────────────────────────────────── */}
        <FadeIn className="mb-4">
          <h1 style={{ fontSize: 'clamp(2.2rem,6vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, lineHeight: 1.05, marginBottom: '0.5rem' }}>
            作品案例
          </h1>
          <p style={{ fontSize: 'clamp(0.68rem,1.1vw,0.82rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', margin: 0 }}>
            Portfolio / Masterpieces — {PROJECTS.length} Selected Works
          </p>
        </FadeIn>

        {/* ── Filter tabs ──────────────────────────────────── */}
        <FilterTabs active={activeFilter} onChange={handleFilterChange} />

        {/* ── Project count hint ───────────────────────────── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: TEXT_DIM }}>
            顯示 {filtered.length} / {PROJECTS.length} 件作品
          </span>
        </div>

        {/* ── Card grid ────────────────────────────────────── */}
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
                  onClick={() => setSelectedId(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── Detail overlay ────────────────────────────────────
          AnimatePresence ensures smooth in/out transitions.
          ProjectDetail renders with position:fixed + z:9000 +
          backgroundColor:#050505 — fully isolated from grid.
      ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
