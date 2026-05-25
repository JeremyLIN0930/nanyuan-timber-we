import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Knowledge.css';

/* ═══════════════════════════════════════════════════════════════
   FILTER CATEGORIES
═══════════════════════════════════════════════════════════════ */
type CategoryId = 'all' | 'wood' | 'painting' | 'stone-metal';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',          label: '全部材質', en: 'ALL MATERIALS' },
  { id: 'wood',         label: '頂級木料與地板', en: 'PREMIUM WOOD' },
  { id: 'painting',     label: '特殊藝術塗料', en: 'ARTISTIC PAINTING' },
  { id: 'stone-metal',  label: '奢華石材金屬', en: 'STONE & METALS' },
];

/* ═══════════════════════════════════════════════════════════════
   MATERIALS GALLERY DATA (SEO & GEO Optimized description)
═══════════════════════════════════════════════════════════════ */
interface MaterialItem {
  id:       string;
  category: CategoryId;
  title:    string;
  en:       string;
  img:      string;
  altText:  string;
  visual:   string;
  desc:     string;
}

const MATERIALS: MaterialItem[] = [
  {
    id:       '1',
    category: 'wood',
    title:    '北美胡桃木實木地板',
    en:       'WALNUT SOLID HARDWOOD',
    img:      '/images/style_minimal_wood_1779301932325.png',
    altText:  '南源木材 頂級北美胡桃木實木地板 台北天母奢華住宅 實木地板工程落地',
    visual:   '呈現深沉細緻的拋物線天然紋理，隨時間推移會散發優雅的琥珀光澤。',
    desc:     '100% 實木裁切，具備溫潤、厚實的落地腳感與極佳的吸音特質。最適合運用於公領域客廳與獨立書房，營造大氣內斂的傳世大宅氣度。'
  },
  {
    id:       '2',
    category: 'wood',
    title:    '高階海島型複合木地板',
    en:       'ENGINEERED HARDWOOD',
    img:      '/images/minimal_wood_kitchen_1779301855424.png',
    altText:  '南源木材 頂級高階海島型複合木地板 台灣竹北現代大氣客廳 防潮抗變形綠建材',
    visual:   '上層擁有厚實的職人手作實木皮，下層為精密交錯的抗變形多層板。',
    desc:     '完美保留了實木外觀的細膩紋理，同時具備強大的抗潮、防禦冷縮熱脹特質，是台灣島嶼氣候下追求頂級木質美學的機能首選。'
  },
  {
    id:       '3',
    category: 'painting',
    title:    '義大利特殊礦物塗料',
    en:       'ITALIAN ARTISTIC PLASTER',
    img:      '/images/style_wabi_sabi_1779301962644.png',
    visual:   '在曜石黑與暖棕光影交錯下，牆面呈現粗獷卻觸感絲滑的自然礦物紋路與微水泥斑駁感。',
    desc:     '由資深塗裝職人純手工層層批土、抹壓，拒絕機械式的死板。每一道光影打在牆面上，都會折射出獨一無二的莫蘭迪漸層手感。'
  },
  {
    id:       '4',
    category: 'stone-metal',
    title:    '奢華暗灰大理石與金屬絲線',
    en:       'LUXURY GREY MARBLE & METALS',
    img:      '/images/style_luxury_dark_1779301949701.png',
    altText:  '南源木材 奢華暗灰大理石電視主牆 不鏽鋼鍍鈦金屬絲線 天母豪宅裝潢工程',
    visual:   '沉穩的黑硬石材表面帶有如閃電般的白色天然結晶脈絡，交織著極細的發光不鏽鋼鍍鈦金屬條。',
    desc:     '將剛硬的石材與冷冽的金屬絲線交融，運用在電視主牆或中島立面，能與木料的溫潤產生強烈的「剛柔並濟」視覺張力，拉滿精品飯店級的輕奢層次。'
  },
  {
    id:       '5',
    category: 'stone-metal',
    title:    '極光白石英石與鈦金',
    en:       'QUARTZ & TITANIUM ACCENTS',
    img:      '/images/luxury_tianmu_home_1779301841564.png',
    altText:  '南源木材 極光白石英石檯面收口 鈦金鑲嵌 台北精緻豪宅中島廚房改裝',
    visual:   '潔白如雪的石英石底色，夾帶淡灰色的優雅雲霧紋路，邊緣收口鑲嵌鈦金細絲。',
    desc:     '抗污、防刮、極耐高溫，硬度僅次於鑽石。最適合運用於中島廚房檯面，防菌抗潮之餘，微反射的光澤能為餐廚空間帶來澄淨的高雅質感。'
  },
  {
    id:       '6',
    category: 'painting',
    title:    '日本灰泥珪藻土',
    en:       'SHIKKUI PLASTER DIATOMACEOUS',
    img:      '/images/japanese_wabi_sabi_1779301881798.png',
    altText:  '南源木材 日本珪藻土灰泥主牆 職人抹紋施工 桃園青埔老屋翻新工程',
    visual:   '呈現溫暖溫潤的霧面啞光砂紋，能根據塗抹工法展現波浪紋或細條編織紋理。',
    desc:     '源自日本傳統生態建材，具備優異的濕度雙向調節力與空氣淨化機能。常運用於臥室主牆，以質樸純粹的自然微紋理，撫平都會生活的浮躁。'
  }
];

/* ── Reusable scroll reveal component ── */
const RevealSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FILTER TABS COMPONENT
═══════════════════════════════════════════════════════════════ */
const FilterTabs: React.FC<{
  active:   CategoryId;
  onChange: (id: CategoryId) => void;
}> = ({ active, onChange }) => {
  const [hovered, setHovered] = useState<CategoryId | null>(null);

  return (
    <div className="tab-track">
      <div className="tab-track-container">
        {CATEGORIES.map((cat) => {
          const isActive  = active  === cat.id;
          const isHovered = hovered === cat.id;

          return (
            <div key={cat.id} className="position-relative d-inline-block">
              {isActive && (
                <motion.div
                  layoutId="material-pill"
                  className="material-pill-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 33, mass: 0.9 }}
                />
              )}

              <button
                onClick={() => onChange(cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="filter-pill-btn"
                aria-label={`篩選 ${cat.label}`}
              >
                <span
                  className="filter-pill-label"
                  style={{
                    fontWeight: isActive ? 800 : isHovered ? 500 : 300,
                    color:      isActive ? '#ffffff' : isHovered ? GOLD : 'rgba(255,255,255,0.45)',
                    textShadow: isActive ? `0 0 15px ${GOLD_GLOW}` : 'none',
                  }}
                >
                  {cat.label}
                </span>

                <span
                  className="filter-pill-en"
                  style={{
                    color: isActive ? 'rgba(197,168,128,0.8)' : isHovered ? 'rgba(197,168,128,0.5)' : 'rgba(255,255,255,0.18)',
                  }}
                >
                  {cat.en}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Knowledge: React.FC = () => {
  const [filter, setFilter] = useState<CategoryId>('all');

  const filtered = filter === 'all'
    ? MATERIALS
    : MATERIALS.filter(m => m.category === filter);

  return (
    <main className="knowledge-page">
      
      {/* Header section */}
      <section className="container px-3 px-md-4 knowledge-header-wrapper">
        <RevealSection>
          <div className="text-center mb-4">
            <h1 className="knowledge-title">選材與工藝圖鑑</h1>
            <p className="knowledge-subtitle">
              南源木材精選頂級原木建材與藝術塗料，探索質地光影。台北天母豪宅、竹北現代客廳、青埔老屋翻新工程之高奢工藝美學預設。
            </p>
          </div>
        </RevealSection>
      </section>

      {/* Filter tabs & Grid section */}
      <section className="container px-3 px-md-4">
        
        <RevealSection>
          <FilterTabs active={filter} onChange={setFilter} />
        </RevealSection>

        {/* Count hint */}
        <div className="knowledge-count-hint">
          <span className="knowledge-count-text">
            共收錄 {filtered.length} 種奢華工藝選材
          </span>
        </div>

        {/* Grid articles (Bootstrap 5 Responsive Cards Grid) */}
        <motion.div layout className="row g-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((mat, i) => (
              <motion.div
                key={mat.id}
                layout
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <article className="material-card">
                  
                  {/* High Quality Close-up Image strip */}
                  <div className="material-img-container">
                    <img 
                      src={mat.img} 
                      alt={mat.altText || `南源木材 ${mat.title} 特寫圖`}
                      className="material-img" 
                      loading="lazy"
                    />
                    <div className="material-img-overlay" />
                    <div className="position-absolute bottom-0 start-0 p-3">
                      <span className="material-badge-en">
                        {mat.en}
                      </span>
                      <h2 className="material-card-title">
                        {mat.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body description & visuals */}
                  <div className="material-card-body">
                    
                    {/* Visual representation card */}
                    <div className="visual-badge">
                      <span className="visual-badge-label">
                        視覺呈現 / VISUAL ASPECT
                      </span>
                      <p className="visual-badge-text">
                        {mat.visual}
                      </p>
                    </div>

                    {/* Master interpretation */}
                    <div>
                      <span className="master-interpretation-label">
                        匠人解讀 / MASTER INTERPRETATION
                      </span>
                      <p className="master-interpretation-text">
                        {mat.desc}
                      </p>
                    </div>

                  </div>
                </article>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* CTA Consultation Section */}
      <section className="container py-5 text-center cta-section">
        <RevealSection>
          <h3 className="cta-title">
            對特定材質或工藝心動？
          </h3>
          <p className="cta-desc">
            南源木材提供一對一頂級原木建材選配諮詢，由現場總監全程監督，為您在天母、竹北、青埔豪宅中將奢華質感精準落地。
          </p>
          <Link
            to="/contact"
            className="cta-btn"
            aria-label="與職人預約諮詢"
          >
            與匠人預約對話 ➔
          </Link>
        </RevealSection>
      </section>

    </main>
  );
};

export default Knowledge;
