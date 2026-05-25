import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.85)';
const GOLD_DIM  = 'rgba(197,168,128,0.1)';
const BG        = '#050505';
const BORDER    = 'rgba(255,255,255,0.06)';
const TEXT_DIM  = 'rgba(255,255,255,0.4)';
const TEXT_MID  = 'rgba(255,255,255,0.65)';

/* ═══════════════════════════════════════════════════════════════
   CATEGORIES LIST
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
   MATERIALS GALLERY DATA
═══════════════════════════════════════════════════════════════ */
interface MaterialItem {
  id:       string;
  category: CategoryId;
  title:    string;
  en:       string;
  img:      string;
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
    visual:   '呈現深沉細緻的拋物線天然紋理，隨時間推移會散發優雅的琥珀光澤。',
    desc:     '100% 實木裁切，具備溫潤、厚實的落地腳感與極佳的吸音特質。最適合運用於公領域客廳與獨立書房，營造大氣內斂的傳世大宅氣度。'
  },
  {
    id:       '2',
    category: 'wood',
    title:    '高階海島型複合木地板',
    en:       'ENGINEERED HARDWOOD',
    img:      '/images/minimal_wood_kitchen_1779301855424.png',
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
    visual:   '沉穩的黑硬石材表面帶有如閃電般的白色天然結晶脈絡，交織著極細的發光不鏽鋼鍍鈦金屬條。',
    desc:     '將剛硬的石材與冷冽的金屬絲線交融，運用在電視主牆或中島立面，能與木料的溫潤產生強烈的「剛柔並濟」視覺張力，拉滿精品飯店級的輕奢層次。'
  },
  {
    id:       '5',
    category: 'stone-metal',
    title:    '極光白石英石與鈦金',
    en:       'QUARTZ & TITANIUM ACCENTS',
    img:      '/images/luxury_tianmu_home_1779301841564.png',
    visual:   '潔白如雪的石英石底色，夾帶淡灰色的優雅雲霧紋路，邊緣收口鑲嵌鈦金細絲。',
    desc:     '抗污、防刮、極耐高溫，硬度僅次於鑽石。最適合運用於中島廚房檯面，防菌抗潮之餘，微反射的光澤能為餐廚空間帶來澄淨的高雅質感。'
  },
  {
    id:       '6',
    category: 'painting',
    title:    '日本灰泥珪藻土',
    en:       'SHIKKUI PLASTER DIATOMACEOUS',
    img:      '/images/japanese_wabi_sabi_1779301881798.png',
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
    <>
      <style>{`
        .tab-track::-webkit-scrollbar { display: none; }
      `}</style>

      <div
        className="tab-track"
        style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', marginBottom: '3rem', paddingBottom: '8px', paddingTop: '4px' }}
      >
        <div
          className="d-inline-flex align-items-stretch"
          style={{ 
            borderRadius: '9999px', 
            background: 'rgba(12, 12, 13, 0.6)', 
            backdropFilter: 'blur(12px)', 
            WebkitBackdropFilter: 'blur(12px)', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            boxShadow: '0 4px 32px rgba(0,0,0,0.5)', 
            padding: '5px' 
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive  = active  === cat.id;
            const isHovered = hovered === cat.id;

            return (
              <div key={cat.id} style={{ position: 'relative' }}>
                {isActive && (
                  <motion.div
                    layoutId="material-pill"
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      borderRadius: '9999px', 
                      background: 'linear-gradient(135deg, rgba(197,168,128,0.15) 0%, rgba(197,168,128,0.06) 100%)', 
                      border: `1px solid ${GOLD}`, 
                      boxShadow: `0 0 15px ${GOLD_GLOW}, inset 0 0 10px rgba(197,168,128,0.05)`, 
                      zIndex: 0 
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 33, mass: 0.9 }}
                  />
                )}

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
                    gap:             '3px',
                    padding:         '10px clamp(16px, 2.5vw, 28px)',
                    borderRadius:    '9999px',
                    background:      'none',
                    border:          'none',
                    cursor:          'pointer',
                    outline:         'none',
                    whiteSpace:      'nowrap',
                    transform:       isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                    transition:      'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <span
                    style={{
                      fontSize:      'clamp(0.8rem,1.2vw,0.92rem)',
                      fontWeight:    isActive ? 800 : isHovered ? 500 : 300,
                      letterSpacing: '0.08em',
                      color:         isActive ? '#ffffff' : isHovered ? GOLD : 'rgba(255,255,255,0.45)',
                      textShadow:    isActive ? `0 0 15px ${GOLD_GLOW}` : 'none',
                      transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {cat.label}
                  </span>

                  <span
                    style={{
                      fontSize:      '8px',
                      fontWeight:    300,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         isActive ? 'rgba(197,168,128,0.8)' : isHovered ? 'rgba(197,168,128,0.5)' : 'rgba(255,255,255,0.18)',
                      transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1)',
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
    </>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', paddingBottom: '80px', overflowX: 'hidden' }}
    >
      {/* CSS Injected Styles for Luxury Card Micro-Interactions */}
      <style>{`
        .material-card {
          background-color: rgba(15, 15, 15, 0.6);
          border: 1px solid ${BORDER};
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
        }

        .material-card:hover {
          border-color: ${GOLD};
          background: linear-gradient(135deg, ${GOLD_DIM} 0%, rgba(15, 15, 15, 0.85) 100%);
          box-shadow: 0 16px 40px rgba(197, 168, 128, 0.15);
          transform: translateY(-4px);
        }

        .visual-badge {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.25rem 1rem;
          border-radius: 6px;
          transition: all 0.4s;
        }

        .material-card:hover .visual-badge {
          border-color: rgba(197, 168, 128, 0.25);
          background-color: rgba(197, 168, 128, 0.04);
        }
      `}</style>

      {/* Header section */}
      <div className="container px-3 px-md-4" style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: '30px' }}>
        <RevealSection>
          <div className="text-center mb-4">
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, marginBottom: '0.75rem' }}>
              選材與工藝圖鑑
            </h1>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
              探索極致材質在光影間的精緻質地，預設您的私屬美學空間。
            </p>
          </div>
        </RevealSection>
      </div>

      {/* Filter tabs */}
      <div className="container px-3 px-md-4">
        
        <RevealSection>
          <FilterTabs active={filter} onChange={setFilter} />
        </RevealSection>

        {/* Count hint */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: TEXT_DIM }}>
            共收錄 {filtered.length} 種奢華選材
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
                <div className="material-card">
                  
                  {/* High Quality Close-up Image strip */}
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                    <img src={mat.img} alt={mat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 60%)' }} />
                    <div className="position-absolute bottom-0 start-0 p-3">
                      <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', color: GOLD, display: 'block', textTransform: 'uppercase' }}>
                        {mat.en}
                      </span>
                      <h3 style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 900, color: '#fff', margin: 0, marginTop: '2px' }}>
                        {mat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body description & visuals */}
                  <div className="p-3 p-xl-4 d-flex flex-column flex-grow-1" style={{ gap: '1.25rem' }}>
                    
                    {/* Visual representation card */}
                    <div className="visual-badge">
                      <span style={{ fontSize: '9px', fontWeight: 300, color: GOLD, letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>
                        視覺呈現 / VISUAL ASPECT
                      </span>
                      <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.86rem)', fontWeight: 300, color: '#fff', lineHeight: 1.6, margin: 0 }}>
                        {mat.visual}
                      </p>
                    </div>

                    {/* Master interpretation */}
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 300, color: TEXT_DIM, letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>
                        匠人解讀 / MASTER INTERPRETATION
                      </span>
                      <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.86rem)', fontWeight: 300, color: TEXT_MID, lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>
                        {mat.desc}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── CTA Consultation Button ─────────────────────── */}
      <div className="container py-5 text-center mt-5">
        <RevealSection>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            對特定材質或工藝心動？
          </h3>
          <p style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', fontWeight: 300, color: TEXT_DIM, letterSpacing: '0.12em', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            南源提供專屬一對一職人諮詢，協助您在現實空間中將奢華質感具體落地。
          </p>
          <Link
            to="/contact"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.15em',
              padding: '1em 3.2em',
              border: `1px solid ${GOLD}`,
              color: '#050505',
              backgroundColor: GOLD,
              cursor: 'pointer',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 32px ${GOLD_GLOW}`;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            與匠人預約對話 ➔
          </Link>
        </RevealSection>
      </div>

    </motion.div>
  );
};

export default Knowledge;
