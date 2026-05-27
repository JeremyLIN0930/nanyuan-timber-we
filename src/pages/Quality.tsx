import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Quality.css';

/* ═══════════════════════════════════════════════════════════════
   REUSABLE FADE-IN
═══════════════════════════════════════════════════════════════ */
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DATA — THREE QUALITY TABS
═══════════════════════════════════════════════════════════════ */
type TabId = 'waterproof' | 'electrical' | 'woodwork';

interface QualityItem {
  title: string;
  desc: string;
}

interface QualityTab {
  id: TabId;
  title: string;
  en: string;
  icon: string;
  items: QualityItem[];
}

const TABS: QualityTab[] = [
  {
    id: 'waterproof',
    title: '防水工程',
    en: 'WATERPROOF ENGINEERING',
    icon: '🛡️',
    items: [
      {
        title: '三層防水系統',
        desc: '標準施作防塵底漆層＋不織布抗裂強化層＋高彈性水泥面漆層，浴室濕區防水層一律塗刷直達天花板。',
      },
      {
        title: '72 小時蓄水測試',
        desc: '防水層完工後實施 48 至 72 小時蓄水測試，雙重確認零滲漏方可進行下一步泥作工程。',
      },
      {
        title: '零死角全覆蓋',
        desc: '絕不留水氣滲透死角，所有牆角、管道穿越處皆施作加強防水帶處理。',
      },
    ],
  },
  {
    id: 'electrical',
    title: '水電管線',
    en: 'ELECTRICAL & PLUMBING',
    icon: '⚡',
    items: [
      {
        title: 'Cat6A 高速網路',
        desc: '全屋網絡布線升級 Cat6A 雙屏蔽高速網路線，完美支援 10G 寬頻傳輸。',
      },
      {
        title: '紅藍線分明配置',
        desc: '老屋一律重拉大廠線材，強弱電管線保持 30cm 安全間距，弱電加裝防干擾屏蔽金屬管。',
      },
      {
        title: '迴路標示系統',
        desc: '所有出線盒、天花維修口施作防塵保護蓋並標示明確專屬電路迴路編號。',
      },
    ],
  },
  {
    id: 'woodwork',
    title: '木作板材',
    en: 'WOODWORK & MATERIALS',
    icon: '🪵',
    items: [
      {
        title: 'F1 低甲醛認證',
        desc: '全室板材與接著劑一律採用符合國家級 F1/F2 低甲醛環保綠建材認證。',
      },
      {
        title: '±1mm 精準工藝',
        desc: '結構接合收口精度嚴控於 ±1mm 誤差內，鉸鏈與滑軌選用奧地利 Blum 頂級五金。',
      },
      {
        title: '永續產地追溯',
        desc: '木材含水率嚴格控制 8%-12%，實木與天然皮板皆具備進口檢疫與永續產地追溯報告。',
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
const Quality: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('waterproof');
  const currentTab = TABS.find(t => t.id === activeTab)!;

  return (
    <main className="quality-page">

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="quality-header-section">
        <FadeInSection>
          <h1 className="quality-title">品質控管</h1>
          <p className="quality-subtitle">
            魔鬼藏在細節裡，南源對品質的堅持不容妥協
          </p>
          <p className="quality-en">
            QUALITY ASSURANCE — NANYUAN TIMBER STANDARD
          </p>
        </FadeInSection>
      </section>

      {/* ── Accordion / Tabs ────────────────────────────────── */}
      <section className="quality-accordion-section container">

        <div className="quality-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`quality-tab ${activeTab === tab.id ? 'quality-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="quality-tab-icon">{tab.icon}</span>
              <span className="quality-tab-title">{tab.title}</span>
              <span className="quality-tab-en">{tab.en}</span>
            </button>
          ))}
        </div>

        <div className="quality-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="quality-panel-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentTab.items.map((item, idx) => (
                <article key={idx} className="quality-item">
                  <h4 className="quality-item-title">{item.title}</h4>
                  <p className="quality-item-desc">{item.desc}</p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className={`quality-geometric-bg quality-geometric-bg--${activeTab}`} />
        </div>

      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="quality-cta-section container">
        <FadeInSection>
          <h2 className="quality-cta-title">
            準備好開始您的空間改造了嗎？
          </h2>
          <p className="quality-cta-desc">
            南源木材堅持品質至上的職人精神，從材料源頭到精湛施工，為您打造經得起時間考驗的理想居所。
          </p>
          <nav className="quality-cta-buttons" aria-label="預約服務快速連結">
            <Link to="/contact" className="quality-cta-primary">
              立即預約諮詢 ➜
            </Link>
            <Link to="/projects" className="quality-cta-secondary">
              查看作品案例
            </Link>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="quality-cta-secondary"
            >
              加入 LINE 詢問
            </a>
          </nav>
        </FadeInSection>
      </section>

    </main>
  );
};

export default Quality;
