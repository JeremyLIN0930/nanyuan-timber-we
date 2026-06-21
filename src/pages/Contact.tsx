import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const BG_DARK     = '#050505';

const slideTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

/* ═══════════════════════════════════════════════════════════════
   SERVICE DEFINITIONS  (Step 1 cards)
═══════════════════════════════════════════════════════════════ */
type ServiceId = 'full_remodel' | 'utility_eng' | 'paint_craft' | 'partial_remodel';

interface ServiceDef {
  id:    ServiceId;
  label: string;
  en:    string;
  img:   string;
  desc:  string;
  accent: string;
}

const SERVICES: ServiceDef[] = [
  {
    id:     'full_remodel',
    label:  '全屋改造統包',
    en:     'FULL HOUSE REMODEL',
    img:    '/images/style_luxury_dark_1779301949701.png',
    desc:   '從格局重塑、木作美學到軟裝鋪陳，提供一條龍的高端精緻統包服務。',
    accent: '一條龍整合',
  },
  {
    id:     'utility_eng',
    label:  '水電基礎工程',
    en:     'UTILITY ENGINEERING',
    img:    '/images/renovation_detail.png',
    desc:   '針對老屋與新成屋，進行全室管線重拉、強弱電規劃、防潮防水基礎加固工程。',
    accent: '老屋改建必備',
  },
  {
    id:     'paint_craft',
    label:  '工藝油漆工程',
    en:     'ARTISTIC PAINTING',
    img:    '/images/style_wabi_sabi_1779301962644.png',
    desc:   '精選環保無毒頂級漆料，由資深職人手工操刀，刻劃具備細膩紋理與光澤的牆面藝術。',
    accent: '職人手工塗裝',
  },
  {
    id:     'partial_remodel',
    label:  '局部空間改造',
    en:     'PARTIAL RENOVATION',
    img:    '/images/minimal_wood_kitchen_1779301855424.png',
    desc:   '針對衛浴、廚房、臥室等局部空間進行機能重組與視覺美化，打造精緻的生活角落。',
    accent: '精準局部升級',
  },
];

/* ═══════════════════════════════════════════════════════════════
   CONDITIONAL DATA
═══════════════════════════════════════════════════════════════ */
interface BudgetOption  { label: string; en: string; tier: string; }
interface ScopeOption   { id: string; label: string; }
interface StyleOption   {
  id:         string;
  label:      string;
  img:        string;
  isConsult?: boolean;
  desc?:      string;
}

interface ServiceConfig {
  budgets: BudgetOption[];
  scopes:  ScopeOption[];
  styles:  StyleOption[];
}

const SERVICE_CONFIG: Record<ServiceId, ServiceConfig> = {

  full_remodel: {
    budgets: [
      { label: '150萬 — 300萬',  en: '高質感全屋規劃',  tier: 'PREMIUM'   },
      { label: '300萬 — 600萬',  en: '旗艦級精工改造',  tier: 'FLAGSHIP'  },
      { label: '600萬 — 1200萬', en: '頂奢全宅工藝',    tier: 'PRESTIGE'  },
      { label: '與設計師詳談',    en: '無限制頂級訂製',  tier: 'BESPOKE'   },
    ],
    scopes: [
      { id: 'layout',     label: '全室格局變動'          },
      { id: 'base',       label: '基礎工程（水電 / 拆除）' },
      { id: 'woodwork',   label: '木作美學工程'           },
      { id: 'softdeco',   label: '軟裝陳設'              },
      { id: 'lighting',   label: '照明規劃'              },
    ],
    styles: [
      { id: 'minimal',    label: '極簡無印', img: '/images/style_minimal_wood_1779301932325.png'  },
      { id: 'dark',       label: '奢華暗灰', img: '/images/style_luxury_dark_1779301949701.png'   },
      { id: 'wabi',       label: '日式侘寂', img: '/images/style_wabi_sabi_1779301962644.png'     },
      { id: 'industrial', label: '精品工業', img: '/images/style_industrial_1779301976370.png'    },
      {
        id:        'consult_full',
        label:     '與設計總監討論',
        img:       '/images/luxury_tianmu_home_1779301841564.png',
        isConsult: true,
        desc:      '想打破現有的風格框架，創造完全不受限的頂級居住體驗？由南源設計總監與大木作匠人聯合參與，純手工高級定制屬於您的傳世私人空間。',
      },
    ],
  },

  utility_eng: {
    budgets: [
      { label: '10萬 — 50萬',  en: '單項管線更新',   tier: 'ENTRY'    },
      { label: '50萬 — 100萬', en: '全室基礎加固',   tier: 'STANDARD' },
      { label: '100萬 — 200萬', en: '老屋全面整治',  tier: 'PREMIUM'  },
      { label: '與設計師詳談',  en: '無限制頂級規劃', tier: 'BESPOKE'  },
    ],
    scopes: [
      { id: 'electric',  label: '全室電線重拉'          },
      { id: 'plumbing',  label: '水路管線更新'          },
      { id: 'bathroom',  label: '衛浴設備更換'          },
      { id: 'smarthome', label: '弱電 / 智能家居系統'   },
      { id: 'waterproof',label: '防水基底強化'          },
    ],
    styles: [
      { id: 'safe',      label: '隱蔽工程安全感', img: '/images/renovation_detail.png'              },
      { id: 'expipe',    label: '工業風明管設計', img: '/images/style_industrial_1779301976370.png'  },
      { id: 'bathroom',  label: '現代簡約衛浴',   img: '/images/luxury_bathroom_1779301913582.png'  },
      { id: 'func',      label: '極致功能主義',   img: '/images/style_minimal_wood_1779301932325.png'},
      {
        id:        'consult_utility',
        label:     '與水電師傅討論',
        img:       '/images/renovation_detail.png',
        isConsult: true,
        desc:      '針對老屋繁複配電安全、智能弱電系統整合，或高端隱蔽衛浴水路管線變更，由南源甲級水電職人直接與您對接，評估最安全的工法技術細節。',
      },
    ],
  },

  paint_craft: {
    budgets: [
      { label: '5萬 — 15萬',  en: '單空間油漆更新', tier: 'ENTRY'    },
      { label: '15萬 — 30萬', en: '全室乳膠漆工程', tier: 'STANDARD' },
      { label: '30萬 — 60萬', en: '藝術塗料工藝',   tier: 'PREMIUM'  },
      { label: '與設計師詳談', en: '大師級私人訂製', tier: 'BESPOKE'  },
    ],
    scopes: [
      { id: 'artpaint',  label: '藝術塗料（特殊漆）'  },
      { id: 'latex',     label: '全室乳膠漆更新'       },
      { id: 'ceiling',   label: '天花板噴漆'           },
      { id: 'lacquer',   label: '木作烤漆'             },
      { id: 'putty',     label: '牆面修補 / 批土工程'  },
    ],
    styles: [
      { id: 'mineral',   label: '礦物自然紋理', img: '/images/style_wabi_sabi_1779301962644.png'    },
      { id: 'velvet',    label: '絲絨觸感霧面', img: '/images/style_luxury_dark_1779301949701.png'  },
      { id: 'morandi',   label: '莫蘭迪色系',   img: '/images/style_minimal_wood_1779301932325.png' },
      { id: 'gradient',  label: '光影漸層',     img: '/images/japanese_wabi_sabi_1779301881798.png' },
      {
        id:        'consult_paint',
        label:     '與油漆職人討論',
        img:       '/images/style_wabi_sabi_1779301962644.png',
        isConsult: true,
        desc:      '對特殊藝術漆、特殊紋理表現、特殊手感工法或現場調色有獨特想法？讓南源資深塗裝職人直接與您現場對接，量身調配專屬牆面藝術。',
      },
    ],
  },

  partial_remodel: {
    budgets: [
      { label: '15萬 — 50萬',  en: '單一空間精修', tier: 'ENTRY'    },
      { label: '50萬 — 100萬', en: '雙空間整合',   tier: 'STANDARD' },
      { label: '100萬 — 150萬',en: '精工局部翻新', tier: 'PREMIUM'  },
      { label: '與設計師詳談', en: '無限制頂級訂製', tier: 'BESPOKE'  },
    ],
    scopes: [
      { id: 'kitchen',   label: '核心廚房改造'    },
      { id: 'bath',      label: '衛浴空間升級'    },
      { id: 'study',     label: '獨立書房 / 臥室' },
      { id: 'living',    label: '客廳公領域'      },
    ],
    styles: [
      { id: 'match',     label: '配合現有風格',   img: '/images/style_minimal_wood_1779301932325.png' },
      { id: 'accent',    label: '重點跳色設計',   img: '/images/style_luxury_dark_1779301949701.png'  },
      { id: 'func',      label: '機能最大化',     img: '/images/minimal_wood_kitchen_1779301855424.png'},
      { id: 'boutique',  label: '精品氛圍質感',   img: '/images/high_end_cafe_1779301868615.png'      },
      {
        id:        'consult_partial',
        label:     '與工班總監討論',
        img:       '/images/minimal_wood_kitchen_1779301855424.png',
        isConsult: true,
        desc:      '局部生活場域（如廚房／浴室／臥室）想挑戰特殊格局變更或異材質拼接？由現場經驗豐富的工班總監親自為您評估，在既有骨架下創造最穩固的工法可能。',
      },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   FORM STATE SHAPE
═══════════════════════════════════════════════════════════════ */
interface FormData {
  serviceType:   ServiceId | '';
  budget:        string;
  isBespoke:     boolean;
  style:         string;
  ping:          number;
  scopes:        string[];
  name:          string;
  phone:         string;
  email:         string;
  address:       string;
  description:   string;
  preferredTime: string;
}

const INITIAL_FORM: FormData = {
  serviceType:   '',
  budget:        '',
  isBespoke:     false,
  style:         '',
  ping:          25,
  scopes:        [],
  name:          '',
  phone:         '',
  email:         '',
  address:       '',
  description:   '',
  preferredTime: '',
};

/* ═══════════════════════════════════════════════════════════════
   SMALL REUSABLE ATOMS
═══════════════════════════════════════════════════════════════ */

/* Gold glow input */
const GoldInput: React.FC<{
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  required?: boolean;
}> = ({ label, type = 'text', value, placeholder, onChange, required }) => (
  <div>
    <label className="contact-gold-label">
      {label}{required && ' *'}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className={`contact-gold-input ${required ? 'contact-gold-input--required' : 'contact-gold-input--optional'}`}
    />
  </div>
);

/* Section heading inside step */
const StepSubtitle: React.FC<{ children: React.ReactNode; className?: string; noTopMargin?: boolean }> = ({ children, className = '', noTopMargin }) => (
  <h3 className={`contact-step-subtitle${noTopMargin ? ' contact-step-subtitle--no-top' : ''} ${className}`}>
    {children}
  </h3>
);

/* ═══════════════════════════════════════════════════════════════
   STEP 1 — SERVICE CARD GRID
═══════════════════════════════════════════════════════════════ */
const Step1: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, setFormData }) => (
  <motion.div key="s1" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
    <h2 className="contact-step-heading">
      01 &nbsp;服務選配 &nbsp;<span className="contact-step-heading-dim">SERVICE</span>
    </h2>

    <div className="row g-3">
      {SERVICES.map(service => {
        const active = formData.serviceType === service.id;
        return (
          <div className="col-12 col-sm-6" key={service.id}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => setFormData({
                ...INITIAL_FORM,
                serviceType: service.id,
              })}
              className={`contact-svc-card ${active ? 'contact-svc-card--active' : 'contact-svc-card--inactive'}`}
            >
              {/* Image */}
              <div className="contact-svc-img-wrap">
                <img
                  src={service.img}
                  alt={service.label}
                  className={`contact-svc-img ${active ? 'contact-svc-img--active' : 'contact-svc-img--inactive'}`}
                />
                {/* Active badge */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="contact-svc-active-badge"
                    >
                      ✓ SELECTED
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`contact-svc-overlay ${active ? 'contact-svc-overlay--active' : 'contact-svc-overlay--inactive'}`} />
              </div>

              {/* Text body */}
              <div className="contact-svc-body">
                <span className={`contact-svc-label ${active ? 'contact-svc-label--active' : 'contact-svc-label--inactive'}`}>
                  {service.label}
                </span>
                <span className="contact-svc-en">
                  {service.en}
                </span>
                <p className={`contact-svc-desc ${active ? 'contact-svc-desc--active' : 'contact-svc-desc--inactive'}`}>
                  {service.desc}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   STEP 2 — BUDGET + PING + SCOPE + STYLE
═══════════════════════════════════════════════════════════════ */
const Step2: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, setFormData }) => {

  if (!formData.serviceType) return null;
  const cfg = SERVICE_CONFIG[formData.serviceType as ServiceId];
  const isBespoke = (b: BudgetOption) => b.tier === 'BESPOKE';

  const toggleScope = (id: string) =>
    setFormData(prev => ({
      ...prev,
      scopes: prev.scopes.includes(id) ? prev.scopes.filter(s => s !== id) : [...prev.scopes, id],
    }));

  const sliderPct = ((formData.ping - 5) / 195) * 100;

  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
      <h2 className="contact-step-heading">
        02 &nbsp;需求 · 預算 · 風格 &nbsp;<span className="contact-step-heading-dim">SCOPE & STYLE</span>
      </h2>

      {/* ── A. BUDGET ── */}
      <StepSubtitle>預算區間</StepSubtitle>
      <div className="contact-budget-list">
        {cfg.budgets.map(b => {
          const isBespOpt = isBespoke(b);
          const isActive  = isBespOpt ? formData.isBespoke : (formData.budget === b.label && !formData.isBespoke);
          const btnClass = isActive
            ? 'contact-budget-btn contact-budget-btn--active'
            : isBespOpt
              ? 'contact-budget-btn contact-budget-btn--bespoke'
              : 'contact-budget-btn contact-budget-btn--default';
          return (
            <button
              key={b.label}
              onClick={() => setFormData(prev => ({
                ...prev,
                budget:    b.label,
                isBespoke: isBespOpt,
              }))}
              className={btnClass}
            >
              <div>
                <span className="contact-budget-label">
                  {b.label}
                </span>
                {isBespOpt && (
                  <span className={`contact-budget-bespoke-sub ${isActive ? 'contact-budget-bespoke-sub--active' : 'contact-budget-bespoke-sub--inactive'}`}>
                    無預算上限的頂級私人工藝空間
                  </span>
                )}
              </div>
              <span className={`contact-budget-en ${isActive ? 'contact-budget-en--active' : 'contact-budget-en--inactive'}`}>
                {b.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bespoke note */}
      <AnimatePresence>
        {formData.isBespoke && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="contact-bespoke-note"
          >
            我們將安排資深職人與設計總監，為您量身訂製完全不受限的頂級私人工藝空間。
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── B. PING SLIDER ── */}
      <StepSubtitle>空間坪數</StepSubtitle>
      <div className="contact-slider-wrap">
        <div className="contact-slider-track-wrap">
          <div className="contact-slider-track-bg" />
          <div className="contact-slider-track-fill" style={{ width: `${sliderPct}%` }} />
          <input
            type="range"
            min="5"
            max="200"
            value={formData.ping}
            onChange={e => setFormData(prev => ({ ...prev, ping: parseInt(e.target.value) }))}
            className="contact-slider-native"
          />
          <div className="contact-slider-thumb" style={{ left: `calc(${sliderPct}% - 9px)` }} />
        </div>

        <div className="contact-slider-value-wrap">
          <span className="contact-slider-value">
            {formData.ping}
          </span>
          <span className="contact-slider-unit">坪</span>
        </div>
      </div>
      <div className="contact-slider-range">
        <span className="contact-slider-range-label">5 坪</span>
        <span className="contact-slider-range-label">200 坪</span>
      </div>

      {/* ── C. RENOVATION SCOPE ── */}
      <StepSubtitle>裝修範圍</StepSubtitle>
      <div className="row g-2">
        {cfg.scopes.map(scope => {
          const checked = formData.scopes.includes(scope.id);
          return (
            <div className="col-12 col-sm-6" key={scope.id}>
              <button
                onClick={() => toggleScope(scope.id)}
                className={`contact-scope-btn ${checked ? 'contact-scope-btn--checked' : 'contact-scope-btn--unchecked'}`}
              >
                <div className={`contact-scope-checkbox ${checked ? 'contact-scope-checkbox--checked' : 'contact-scope-checkbox--unchecked'}`}>
                  {checked && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BG_DARK} strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`contact-scope-label ${checked ? 'contact-scope-label--checked' : 'contact-scope-label--unchecked'}`}>
                  {scope.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* ── D. STYLE INTENT ── */}
      <div className="contact-style-divider">
        <StepSubtitle noTopMargin>視覺意境 STYLE</StepSubtitle>
      </div>
      <div className="row g-3">
        {cfg.styles.map(style => {
          const active = formData.style === style.id;

          /* ── Special "Consult with Master" card (5th slot) ── */
          if (style.isConsult) {
            return (
              <div className="col-12" key={style.id}>
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                  className={`contact-consult-card ${active ? 'contact-consult-card--active' : 'contact-consult-card--inactive'}`}
                >
                  {/* Left: thumbnail strip */}
                  <div className="contact-consult-img-wrap">
                    <img
                      src={style.img}
                      alt={style.label}
                      className={`contact-consult-img ${active ? 'contact-consult-img--active' : 'contact-consult-img--inactive'}`}
                    />
                    <div className="contact-consult-img-gradient" />
                  </div>

                  {/* Right: text block */}
                  <div className="contact-consult-body">
                    <div className="contact-consult-badge-row">
                      <span className={`contact-consult-badge ${active ? 'contact-consult-badge--active' : 'contact-consult-badge--inactive'}`}>
                        CONSULT WITH MASTER
                      </span>
                    </div>

                    <span className={`contact-consult-title ${active ? 'contact-consult-title--active' : 'contact-consult-title--inactive'}`}>
                      {style.label}
                    </span>

                    <p className={`contact-consult-desc ${active ? 'contact-consult-desc--active' : 'contact-consult-desc--inactive'}`}>
                      {style.desc}
                    </p>
                  </div>

                  {/* Active check badge */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        className="contact-consult-check"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BG_DARK} strokeWidth="3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          }

          /* ── Standard image style card (slots 1–4) ── */
          return (
            <div className="col-6 col-md-3" key={style.id}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                className={`contact-style-card ${active ? 'contact-style-card--active' : 'contact-style-card--inactive'}`}
              >
                <img
                  src={style.img}
                  alt={style.label}
                  className={`contact-style-img ${active ? 'contact-style-img--active' : 'contact-style-img--inactive'}`}
                />
                <div className={`contact-style-overlay ${active ? 'contact-style-overlay--active' : 'contact-style-overlay--inactive'}`}>
                  <span className={`contact-style-label ${active ? 'contact-style-label--active' : 'contact-style-label--inactive'}`}>
                    {style.label}
                  </span>
                </div>
                {active && (
                  <div className="contact-style-check">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={BG_DARK} strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   STEP 3 — CONTACT INFO + FILE UPLOAD
═══════════════════════════════════════════════════════════════ */
const Step3: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  uploadedFile: string | null;
  setUploadedFile: (f: string | null) => void;
}> = ({ formData, setFormData, uploadedFile, setUploadedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) setUploadedFile(e.dataTransfer.files[0].name);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0].name);
  };

  return (
    <motion.div key="s3" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
      <h2 className="contact-step-heading">
        03 &nbsp;聯繫資訊 · 上傳 &nbsp;<span className="contact-step-heading-dim">CONTACT</span>
      </h2>

      <div className="contact-fields-stack">
        <GoldInput label="姓名 / NAME" value={formData.name}  onChange={v => setFormData(p => ({ ...p, name: v }))}  placeholder="請輸入姓名" required />
        <GoldInput label="電話 / PHONE" type="tel" value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} placeholder="請輸入電話" required />
        <GoldInput label="信箱 / EMAIL" type="email" value={formData.email} onChange={v => setFormData(p => ({ ...p, email: v }))} placeholder="請輸入信箱（選填）" />
        <GoldInput label="基地地址 / ADDRESS" value={formData.address} onChange={v => setFormData(p => ({ ...p, address: v }))} placeholder="請輸入基地地址（選填）" />

        {/* Preferred Time */}
        <div>
          <label className="contact-gold-label">希望聯絡時間 / CONTACT TIME</label>
          <select
            value={formData.preferredTime}
            onChange={e => setFormData(p => ({ ...p, preferredTime: e.target.value }))}
            className={`contact-select ${formData.preferredTime ? 'contact-select--filled' : 'contact-select--empty'}`}
          >
            <option value="" disabled>請選擇方便聯絡的時間</option>
            {['隨時皆可','平日上午 (09:00 - 12:00)','平日下午 (12:00 - 18:00)','平日晚上 (18:00 - 21:00)','假日上午 (09:00 - 12:00)','假日中午與下午 (12:00 - 18:00)','假日晚上 (18:00 - 21:00)'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="contact-gold-label">裝修需求描述 / DESCRIPTION</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            placeholder="請簡述您的裝修需求，例如：偏好建材、隔間變動、特殊收納需求或家庭成員組成等…"
            className="contact-textarea"
          />
        </div>

        {/* Drag & Drop Upload */}
        <div>
          <label className="contact-gold-label">平面圖 / 現況照片上傳</label>
          <input type="file" ref={fileInputRef} className="contact-file-input-hidden" accept="image/*,.pdf" onChange={handleFileSelect} />
          <motion.div
            whileHover={{ scale: 1.012 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleFileDrop}
            className={`contact-file-dropzone ${isDragOver ? 'contact-file-dropzone--dragover' : uploadedFile ? 'contact-file-dropzone--uploaded' : 'contact-file-dropzone--default'}`}
          >
            {uploadedFile ? (
              <div className="contact-file-upload-text">
                <span className="contact-file-done">✓ 已上傳</span>
                <span className="contact-file-name">{uploadedFile}</span>
                <span className="contact-file-reselect">點擊重新選擇</span>
              </div>
            ) : (
              <div className="contact-file-upload-text">
                <span className="contact-file-arrow">⬆</span>
                <span className="contact-file-hint">拖拽檔案至此，或點擊上傳</span>
                <span className="contact-file-formats">支援 JPG、PNG、PDF</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   STEP 4 — SUCCESS
═══════════════════════════════════════════════════════════════ */
const Step4: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <motion.div
    key="s4"
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="contact-success-wrap"
  >
    {/* Animated ring */}
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="contact-success-ring"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="contact-success-title"
    >
      南源已收到您的服務預約
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="contact-success-desc"
    >
      職人團隊正在檢閱您的需求，<br />專員將於 24 小時內與您聯繫。
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      onClick={onReset}
      className="contact-success-btn"
    >
      返回服務預約 ➔
    </motion.button>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   STEP TRAIL  (left sidebar)
═══════════════════════════════════════════════════════════════ */
const STEP_DEFS = [
  { s: 1, title: '服務項目',      desc: '選擇您的服務類別'   },
  { s: 2, title: '需求 · 預算 · 風格', desc: '精細定義服務範疇' },
  { s: 3, title: '聯繫 · 上傳',  desc: '聯絡資訊與平面圖'   },
];

const StepTrail: React.FC<{ step: number; serviceLabel: string }> = ({ step, serviceLabel }) => (
  <div>
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="contact-main-title"
    >
      預約服務
    </motion.h1>

    {/* Active service label badge */}
    <AnimatePresence>
      {serviceLabel && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="contact-service-badge"
        >
          <div className="contact-service-badge-dot" />
          <span className="contact-service-badge-text">{serviceLabel}</span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Step trail */}
    <div className="contact-trail-wrap">
      <div className="contact-trail-bg-rail" />
      <motion.div
        className="contact-trail-progress"
        initial={{ height: '0%' }}
        animate={{ height: `${(Math.min(step, 3) / 3) * 100}%` }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />

      <div className="contact-trail-items">
        {STEP_DEFS.map(item => {
          const done    = step > item.s;
          const current = step === item.s;
          const dotClass = done
            ? 'contact-trail-dot contact-trail-dot--done'
            : current
              ? 'contact-trail-dot contact-trail-dot--current'
              : 'contact-trail-dot contact-trail-dot--future';
          const titleClass = step >= item.s
            ? 'contact-trail-step-title contact-trail-step-title--active'
            : 'contact-trail-step-title contact-trail-step-title--inactive';
          return (
            <div key={item.s} className="contact-trail-item">
              <div className={dotClass} />
              <div>
                <h3 className={titleClass}>
                  {item.title}
                </h3>
                <p className="contact-trail-step-desc">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Decorative company note at bottom of sidebar (desktop only) */}
    <div className="d-none d-lg-block contact-trail-footer">
      <p className="contact-trail-company">
        南源木材有限公司<br />
        <span className="contact-trail-company-en">NANYUAN TIMBER DESIGN</span>
      </p>
      <p className="contact-trail-note">
        專員將於 24 小時內與您聯繫<br />
        填寫完整將加快服務配對速度
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN CONTACT PAGE
═══════════════════════════════════════════════════════════════ */
const Contact: React.FC = () => {
  const [step,         setStep]         = useState<1|2|3|4>(1);
  const [formData,     setFormData]     = useState<FormData>(INITIAL_FORM);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const formPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    formPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => setStep(s => Math.min(s + 1, 4) as 1|2|3|4);
  const handlePrev = () => setStep(s => Math.max(s - 1, 1) as 1|2|3|4);

  const resetForm = () => {
    setStep(1);
    setFormData(INITIAL_FORM);
    setUploadedFile(null);
  };

  const canProceed = (): boolean => {
    if (step === 1) return !!formData.serviceType;
    if (step === 2) return !!formData.budget && !!formData.style;
    if (step === 3) return !!formData.name && !!formData.phone;
    return true;
  };

  const activeServiceLabel = SERVICES.find(s => s.id === formData.serviceType)?.label ?? '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="contact-page"
    >
      <div className="container px-3 px-md-4 contact-container">
        <div className="row g-4 g-lg-5 align-items-start">

          {/* ════ LEFT: STEP TRAIL ════ */}
          <div className="col-12 col-lg-4">
            <div className="contact-trail-sticky">
              <StepTrail step={step} serviceLabel={activeServiceLabel} />
            </div>
          </div>

          {/* ════ RIGHT: STEP CONTENT ════ */}
          <div
            ref={formPanelRef}
            className="col-12 col-lg-8 contact-form-panel"
          >
            <AnimatePresence mode="wait">

              {step === 1 && (
                <Step1
                  key="step1"
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 2 && (
                <Step2
                  key="step2"
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 3 && (
                <Step3
                  key="step3"
                  formData={formData}
                  setFormData={setFormData}
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                />
              )}

              {step === 4 && (
                <Step4 key="step4" onReset={resetForm} />
              )}

            </AnimatePresence>

            {/* ── Navigation ── */}
            {step < 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="contact-nav-bar"
              >
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="border-0 bg-transparent contact-nav-back"
                  >
                    ⬅ 返回上一步
                  </button>
                ) : <div />}
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`apple-btn contact-nav-next ${canProceed() ? 'contact-nav-next--enabled' : 'contact-nav-next--disabled'}`}
                >
                  {step === 3 ? '送出預約 ➔' : '下一步 ➔'}
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
