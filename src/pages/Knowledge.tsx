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
type CategoryId = 'all' | 'kitchen' | 'bathroom' | 'storage';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',      label: '全部知識', en: 'ALL'      },
  { id: 'kitchen',  label: '廚房空間', en: 'KITCHEN'  },
  { id: 'bathroom', label: '衛浴細節', en: 'BATHROOM' },
  { id: 'storage',  label: '收納規劃', en: 'STORAGE'  },
];

/* ═══════════════════════════════════════════════════════════════
   KNOWLEDGE ARTICLE DATA
═══════════════════════════════════════════════════════════════ */
interface Article {
  id:       string;
  category: CategoryId;
  title:    string;
  en:       string;
  img:      string;
  metrics:  { label: string; value: string }[];
  desc:     string;
}

const ARTICLES: Article[] = [
  {
    id:       '1',
    category: 'kitchen',
    title:    '中島與流理台工作高度',
    en:       'ISLAND & WORKTOP HEIGHT',
    img:      '/images/minimal_wood_kitchen_1779301855424.png',
    metrics: [
      { label: '中島舒適高度', value: '85 - 90 cm' },
      { label: '通道錯身寬度', value: '至少 90 cm' },
      { label: '流理台工作深度', value: '60 - 65 cm' }
    ],
    desc: '依據人體工學，備料區台面應以使用者手肘高度減去 10-15cm 為最舒適高度，避免長時間彎腰造成肌肉疲勞。走道寬度保留 90cm 以上可確保兩人流暢錯身而不過度擁擠。'
  },
  {
    id:       '2',
    category: 'storage',
    title:    '客廳視聽與地坪收納',
    en:       'LIVING ROOM & CONSOLE SCALE',
    img:      '/images/budget_smart_home.png',
    metrics: [
      { label: '電視櫃黃金高度', value: '40 - 45 cm' },
      { label: '茶几與沙發間距', value: '30 - 40 cm' },
      { label: '鞋櫃層板自適應', value: '15 - 20 cm' }
    ],
    desc: '客廳電視櫃高度控制在 40-45cm 可確保沙發坐姿視線水平微俯，減輕頸部壓力。茶几與沙發邊緣保留 30-40cm 可維持舒適腿部空間並兼顧物品拿取的便利性。'
  },
  {
    id:       '3',
    category: 'bathroom',
    title:    '浴室濕區防護與高度',
    en:       'SHOWER WET ZONE HEIGHT',
    img:      '/images/luxury_bathroom_1779301913582.png',
    metrics: [
      { label: '淋浴龍頭高度', value: '90 - 100 cm' },
      { label: '濕區防水牆高度', value: '至少 180 cm' },
      { label: '洗手台面防濺牆', value: '至少 30 cm' }
    ],
    desc: '浴室防水是健康居住的基石，淋浴區防水層高度必須施作至 180cm 以上，防止水氣透過磚縫滲透牆體。淋浴龍頭高度設定在 90-100cm 符合多數成人站立淋浴時伸手調溫的直覺動作。'
  },
  {
    id:       '4',
    category: 'storage',
    title:    '系統衣櫃黃金收納深度',
    en:       'WARDROBE DEPTH & STORAGE',
    img:      '/images/style_minimal_wood_1779301932325.png',
    metrics: [
      { label: '衣櫃標準總深度', value: '60 cm' },
      { label: '短衣掛桿高度', value: '110 - 130 cm' },
      { label: '大衣掛桿高度', value: '150 - 170 cm' }
    ],
    desc: '大衣與西裝的外套肩寬約在 55-58cm，因此衣櫃內部淨深需預留 55cm（總深 60cm），方能確保關門時衣服袖子不被夾持。長短衣服分區掛置，能有效增加櫃底抽屜的配置空間。'
  },
  {
    id:       '5',
    category: 'kitchen',
    title:    '廚房工作黃金三角動線',
    en:       'KITCHEN WORK TRIANGLE',
    img:      '/images/minimal_wood_kitchen_1779301855424.png',
    metrics: [
      { label: '動線三角總長度', value: '3.6 - 6.6 m' },
      { label: '水槽與瓦斯爐距', value: '80 - 120 cm' },
      { label: '備料切菜區寬度', value: '至少 80 cm' }
    ],
    desc: '廚房工作三角由冰箱、水槽與瓦斯爐組成。三點之間的總動線長度應控制在 3.6 至 6.6 公尺內，過長會增加走動疲勞，過短則會顯得擁擠。水槽與瓦斯爐之間的黃金備料區保留 80-120cm 可維持最高效的工作效率。'
  },
  {
    id:       '6',
    category: 'bathroom',
    title:    '獨立洗手台面高度',
    en:       'VANITY TOP HEIGHT & DEPTH',
    img:      '/images/luxury_bathroom_1779301913582.png',
    metrics: [
      { label: '洗手台面人體工學', value: '80 - 85 cm' },
      { label: '鏡櫃收納總深度', value: '15 - 20 cm' },
      { label: '水龍頭出水延伸', value: '10 - 15 cm' }
    ],
    desc: '洗手台台面過低會導致刷牙洗臉時過度彎腰，過高則會使水流順著手臂回流至手肘。台面高度以 80-85cm 為亞洲成人黃金標準，搭配 15-20cm 深度的壁掛鏡櫃，可兼顧收納與洗漱時的俯身空間。'
  }
];

/* ── Reusable scroll reveal component ── */
const RevealSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FILTER TABS
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
        style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', marginBottom: '2.5rem', paddingBottom: '6px', paddingTop: '4px' }}
      >
        <div
          style={{ display: 'inline-flex', alignItems: 'stretch', borderRadius: '9999px', background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(197,168,128,0.18)', boxShadow: '0 4px 32px rgba(0,0,0,0.55)', padding: '5px' }}
        >
          {CATEGORIES.map((cat) => {
            const isActive  = active  === cat.id;
            const isHovered = hovered === cat.id;

            return (
              <div key={cat.id} style={{ position: 'relative' }}>
                {isActive && (
                  <motion.div
                    layoutId="knowledge-pill"
                    style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'linear-gradient(135deg, rgba(197,168,128,0.16) 0%, rgba(197,168,128,0.07) 100%)', border: '1px solid rgba(197,168,128,0.35)', boxShadow: '0 0 18px rgba(197,168,128,0.22), inset 0 0 12px rgba(197,168,128,0.06)', zIndex: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.9 }}
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
                    gap:             '4px',
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
                      letterSpacing: '0.06em',
                      color:         isActive ? '#ffffff' : isHovered ? GOLD : 'rgba(255,255,255,0.42)',
                      textShadow:    isActive ? `0 0 18px rgba(197,168,128,0.7), 0 0 6px rgba(255,255,255,0.3)` : 'none',
                      transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {cat.label}
                  </span>

                  <span
                    style={{
                      fontSize:      '8px',
                      fontWeight:    300,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         isActive ? 'rgba(197,168,128,0.75)' : isHovered ? 'rgba(197,168,128,0.55)' : 'rgba(255,255,255,0.2)',
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
    ? ARTICLES
    : ARTICLES.filter(a => a.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: BG, minHeight: '100vh', color: '#fff', paddingBottom: '80px' }}
    >
      <style>{`
        .knowledge-card {
          background-color: ${BG_CARD};
          border: 1px solid ${BORDER};
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .knowledge-card:hover {
          border-color: ${GOLD};
          background: linear-gradient(135deg, ${GOLD_DIM} 0%, ${BG_CARD} 100%);
          box-shadow: 0 16px 40px rgba(197,168,128,0.15);
          transform: translateY(-4px);
        }
        .metric-badge {
          background-color: rgba(255,255,255,0.03);
          border: 1px solid ${BORDER};
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s;
        }
        .knowledge-card:hover .metric-badge {
          border-color: rgba(197,168,128,0.35);
          background-color: rgba(197,168,128,0.04);
        }
      `}</style>

      {/* Header section */}
      <div className="container px-3 px-md-4" style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: '30px' }}>
        <RevealSection>
          <div className="text-center mb-4">
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, marginBottom: '0.75rem' }}>
              裝修知識
            </h1>
            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.18em', color: TEXT_DIM, textTransform: 'uppercase', maxWidth: '600px', margin: '0 auto' }}>
              職人尺寸手冊：空間美學與人體工學的精確解讀
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
            共顯示 {filtered.length} 篇尺寸指南
          </span>
        </div>

        {/* Grid articles */}
        <motion.div layout className="row g-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((art, i) => (
              <motion.div
                key={art.id}
                layout
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="knowledge-card">
                  {/* Image strip */}
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                    <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,14,0.9) 0%, transparent 60%)' }} />
                    <div className="position-absolute bottom-0 start-0 p-3">
                      <span style={{ fontSize: '8.5px', fontWeight: 300, letterSpacing: '0.22em', color: GOLD, display: 'block', textTransform: 'uppercase' }}>{art.en}</span>
                      <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', fontWeight: 900, color: '#fff', margin: 0, marginTop: '2px' }}>{art.title}</h3>
                    </div>
                  </div>

                  {/* Body metrics */}
                  <div className="p-3 p-xl-4 d-flex flex-column flex-grow-1" style={{ gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {art.metrics.map((m, idx) => (
                        <div key={idx} className="metric-badge">
                          <span style={{ fontSize: '11px', fontWeight: 300, color: TEXT_DIM, letterSpacing: '0.08em' }}>{m.label}</span>
                          <span style={{ fontSize: '12px', fontWeight: 900, color: GOLD, textShadow: `0 0 10px ${GOLD_DIM}` }}>{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.86rem)', fontWeight: 300, color: TEXT_MID, lineHeight: 1.75, margin: 0, textAlign: 'justify' }}>
                      {art.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Knowledge;
