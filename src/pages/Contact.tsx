import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD        = '#C5A880';
const GOLD_GLOW   = 'rgba(197,168,128,0.85)';
const GOLD_DIM    = 'rgba(197,168,128,0.1)';
const GOLD_MID    = 'rgba(197,168,128,0.2)';
const GOLD_BORDER = 'rgba(197,168,128,0.4)';
const BG_DARK     = '#050505';
const BG_CARD     = 'rgba(255,255,255,0.02)';
const BORDER_SUB  = 'rgba(255,255,255,0.1)';
const TEXT_DIM    = 'rgba(255,255,255,0.4)';
const TEXT_MID    = 'rgba(255,255,255,0.6)';

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
  accent: string; // short tagline shown on hover
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
   CONDITIONAL DATA  — one lookup per service id
   Each entry has: budgets[], scopes[], styles[]
═══════════════════════════════════════════════════════════════ */
interface BudgetOption  { label: string; en: string; tier: string; }
interface ScopeOption   { id: string; label: string; }
interface StyleOption   { id: string; label: string; img: string; }

interface ServiceConfig {
  budgets: BudgetOption[];
  scopes:  ScopeOption[];
  styles:  StyleOption[];
}

const SERVICE_CONFIG: Record<ServiceId, ServiceConfig> = {

  /* ── A. 全屋改造統包 ── */
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
    ],
  },

  /* ── B. 水電基礎工程 ── */
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
    ],
  },

  /* ── C. 工藝油漆工程 ── */
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
    ],
  },

  /* ── D. 局部空間改造 ── */
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
    <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, textShadow: `0 0 10px ${GOLD_DIM}` }}>
      {label}{required && ' *'}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        width:           '100%',
        backgroundColor: 'transparent',
        border:          `1px solid ${BORDER_SUB}`,
        padding:         '13px 16px',
        color:           '#fff',
        letterSpacing:   '0.08em',
        outline:         'none',
        transition:      'border-color 0.3s, box-shadow 0.3s',
        fontSize:        'clamp(0.85rem, 1.2vw, 1rem)',
        fontWeight:      required ? 700 : 300,
        boxSizing:       'border-box',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = `0 0 16px ${GOLD_DIM}`; }}
      onBlur={e => { e.currentTarget.style.borderColor = BORDER_SUB; e.currentTarget.style.boxShadow = 'none'; }}
    />
  </div>
);

/* Section heading inside step */
const StepSubtitle: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style = {} }) => (
  <h3 className={className} style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', fontWeight: 900, letterSpacing: '-0.01em', color: '#fff', textShadow: `0 0 15px rgba(255,255,255,0.3)`, margin: '1.5rem 0 0.85rem', ...style }}>
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
    <h2 style={{ fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', fontWeight: 900, color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: `1px solid ${BORDER_SUB}`, paddingBottom: '1rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
      01 &nbsp;服務選配 &nbsp;<span style={{ fontWeight: 200, fontSize: '0.7em', letterSpacing: '0.2em', color: TEXT_DIM }}>SERVICE</span>
    </h2>

    <div className="row g-3">
      {SERVICES.map(service => {
        const active = formData.serviceType === service.id;
        return (
          <div className="col-12 col-sm-6" key={service.id}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => setFormData({
                ...INITIAL_FORM,        // ← reset downstream selections on service change
                serviceType: service.id,
              })}
              style={{
                cursor:          'pointer',
                overflow:        'hidden',
                height:          '100%',
                display:         'flex',
                flexDirection:   'column',
                transition:      'all 0.45s',
                border:          active ? `2px solid ${GOLD}` : `1px solid ${BORDER_SUB}`,
                boxShadow:       active ? `0 0 30px rgba(197,168,128,0.35), inset 0 0 20px rgba(197,168,128,0.04)` : 'none',
                backgroundColor: active ? GOLD_DIM : BG_CARD,
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <img
                  src={service.img}
                  alt={service.label}
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'cover',
                    transition: 'transform 0.7s, filter 0.5s',
                    transform:  active ? 'scale(1.06)' : 'scale(1)',
                    filter:     active ? 'brightness(1.1)' : 'brightness(0.65)',
                  }}
                />
                {/* Active badge */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position:        'absolute',
                        top:             '10px',
                        right:           '10px',
                        backgroundColor: GOLD,
                        color:           BG_DARK,
                        fontSize:        '9px',
                        fontWeight:      900,
                        letterSpacing:   '0.15em',
                        padding:         '4px 10px',
                      }}
                    >
                      ✓ SELECTED
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: active ? 'rgba(197,168,128,0.06)' : 'rgba(5,5,5,0.35)', transition: 'all 0.5s' }} />
              </div>

              {/* Text body */}
              <div style={{ padding: 'clamp(14px,2vw,20px)', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: 'clamp(0.95rem,1.6vw,1.15rem)', fontWeight: 900, letterSpacing: '-0.02em', color: active ? GOLD : '#fff', textShadow: active ? `0 0 22px ${GOLD_GLOW}` : 'none', transition: 'all 0.4s' }}>
                  {service.label}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', color: TEXT_DIM, textTransform: 'uppercase' }}>
                  {service.en}
                </span>
                <p style={{ fontSize: 'clamp(0.78rem,1.1vw,0.85rem)', fontWeight: 300, lineHeight: 1.65, color: active ? 'rgba(255,255,255,0.82)' : TEXT_MID, margin: 0, marginTop: '4px' }}>
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
   STEP 2 — BUDGET + PING + SCOPE + STYLE  (service-driven)
═══════════════════════════════════════════════════════════════ */
const Step2: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, setFormData }) => {

  /* Guard: should never reach here without a selected service,
     but TypeScript needs the cast */
  if (!formData.serviceType) return null;
  const cfg = SERVICE_CONFIG[formData.serviceType as ServiceId];
  const isBespoke = (b: BudgetOption) => b.tier === 'BESPOKE';

  const toggleScope = (id: string) =>
    setFormData(prev => ({
      ...prev,
      scopes: prev.scopes.includes(id) ? prev.scopes.filter(s => s !== id) : [...prev.scopes, id],
    }));

  /* Slider track fill % */
  const sliderPct = ((formData.ping - 5) / 195) * 100;

  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
      <h2 style={{ fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', fontWeight: 900, color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: `1px solid ${BORDER_SUB}`, paddingBottom: '1rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        02 &nbsp;需求 · 預算 · 風格 &nbsp;<span style={{ fontWeight: 200, fontSize: '0.7em', letterSpacing: '0.2em', color: TEXT_DIM }}>SCOPE & STYLE</span>
      </h2>

      {/* ── A. BUDGET ────────────────────────────────────────── */}
      <StepSubtitle>預算區間</StepSubtitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {cfg.budgets.map(b => {
          const isBespOpt = isBespoke(b);
          const isActive  = isBespOpt ? formData.isBespoke : (formData.budget === b.label && !formData.isBespoke);
          return (
            <button
              key={b.label}
              onClick={() => setFormData(prev => ({
                ...prev,
                budget:    b.label,
                isBespoke: isBespOpt,
              }))}
              style={{
                display:         'flex',
                justifyContent:  'space-between',
                alignItems:      'center',
                width:           '100%',
                textAlign:       'left',
                padding:         isBespOpt ? '16px 18px' : '13px 18px',
                border:          isActive
                  ? `2px solid ${GOLD}`
                  : isBespOpt
                    ? `1px solid ${GOLD_BORDER}`
                    : `1px solid ${BORDER_SUB}`,
                backgroundColor: isActive ? GOLD_MID : 'transparent',
                color:           isActive ? GOLD : isBespOpt ? `rgba(197,168,128,0.7)` : TEXT_DIM,
                fontWeight:      isActive ? 900 : 300,
                boxShadow:       isActive ? `0 0 22px rgba(197,168,128,0.28)` : 'none',
                textShadow:      isActive ? `0 0 15px rgba(197,168,128,0.55)` : 'none',
                transition:      'all 0.35s',
                cursor:          'pointer',
                outline:         'none',
              }}
            >
              <div>
                <span style={{ fontSize: 'clamp(0.82rem,1.3vw,0.92rem)', letterSpacing: '0.08em', display: 'block' }}>
                  {b.label}
                </span>
                {isBespOpt && (
                  <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.14em', color: isActive ? 'rgba(197,168,128,0.8)' : 'rgba(255,255,255,0.3)', display: 'block', marginTop: '3px' }}>
                    無預算上限的頂級私人工藝空間
                  </span>
                )}
              </div>
              <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: isActive ? 0.85 : 0.38, flexShrink: 0, marginLeft: '12px' }}>
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
            style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(197,168,128,0.8)', borderLeft: `2px solid ${GOLD}`, paddingLeft: '1rem', lineHeight: 1.9, marginTop: '0.75rem', overflow: 'hidden' }}
          >
            我們將安排資深職人與設計總監，為您量身訂製完全不受限的頂級私人工藝空間。
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── B. PING SLIDER ───────────────────────────────────── */}
      <StepSubtitle>空間坪數</StepSubtitle>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Custom styled slider */}
        <div style={{ flexGrow: 1, position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
          {/* Track background */}
          <div style={{
            position:      'absolute',
            left:          0,
            right:         0,
            height:        '2px',
            backgroundColor: BORDER_SUB,
            borderRadius:  '2px',
          }} />
          {/* Track fill */}
          <div style={{
            position:      'absolute',
            left:          0,
            width:         `${sliderPct}%`,
            height:        '2px',
            backgroundColor: GOLD,
            borderRadius:  '2px',
            boxShadow:     `0 0 8px rgba(197,168,128,0.6)`,
            transition:    'width 0.05s',
          }} />
          {/* Native range (invisible but functional) */}
          <input
            type="range"
            min="5"
            max="200"
            value={formData.ping}
            onChange={e => setFormData(prev => ({ ...prev, ping: parseInt(e.target.value) }))}
            style={{
              position:    'absolute',
              left:        0,
              right:       0,
              width:       '100%',
              opacity:     0,
              height:      '20px',
              cursor:      'pointer',
              margin:      0,
            }}
          />
          {/* Custom thumb */}
          <div style={{
            position:        'absolute',
            left:            `calc(${sliderPct}% - 9px)`,
            width:           '18px',
            height:          '18px',
            borderRadius:    '50%',
            backgroundColor: GOLD,
            boxShadow:       `0 0 14px rgba(197,168,128,0.85), 0 0 0 3px rgba(197,168,128,0.2)`,
            pointerEvents:   'none',
            transition:      'left 0.05s',
          }} />
        </div>

        {/* Value display */}
        <div style={{ textAlign: 'right', minWidth: '80px', flexShrink: 0 }}>
          <span style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, color: GOLD, textShadow: `0 0 22px rgba(197,168,128,0.7)`, lineHeight: 1 }}>
            {formData.ping}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 300, color: TEXT_DIM, marginLeft: '4px' }}>坪</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '10px', color: TEXT_DIM, letterSpacing: '0.1em' }}>5 坪</span>
        <span style={{ fontSize: '10px', color: TEXT_DIM, letterSpacing: '0.1em' }}>200 坪</span>
      </div>

      {/* ── C. RENOVATION SCOPE ──────────────────────────────── */}
      <StepSubtitle>裝修範圍</StepSubtitle>
      <div className="row g-2">
        {cfg.scopes.map(scope => {
          const checked = formData.scopes.includes(scope.id);
          return (
            <div className="col-12 col-sm-6" key={scope.id}>
              <button
                onClick={() => toggleScope(scope.id)}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  gap:             '12px',
                  width:           '100%',
                  textAlign:       'left',
                  padding:         '11px 15px',
                  border:          checked ? `2px solid ${GOLD}` : `1px solid ${BORDER_SUB}`,
                  backgroundColor: checked ? 'rgba(197,168,128,0.12)' : 'transparent',
                  color:           checked ? GOLD : TEXT_MID,
                  transition:      'all 0.3s',
                  cursor:          'pointer',
                  outline:         'none',
                  boxShadow:       checked ? `0 0 16px rgba(197,168,128,0.2)` : 'none',
                }}
              >
                {/* Custom checkbox */}
                <div style={{
                  width:           '17px',
                  height:          '17px',
                  border:          `2px solid ${checked ? GOLD : 'rgba(255,255,255,0.28)'}`,
                  backgroundColor: checked ? GOLD : 'transparent',
                  boxShadow:       checked ? `0 0 10px rgba(197,168,128,0.55)` : 'none',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  flexShrink:      0,
                  transition:      'all 0.3s',
                }}>
                  {checked && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BG_DARK} strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 'clamp(0.8rem,1.15vw,0.88rem)', fontWeight: checked ? 700 : 300, letterSpacing: '0.08em', transition: 'font-weight 0.3s' }}>
                  {scope.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* ── D. STYLE INTENT ──────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER_SUB}`, marginTop: '1.75rem', paddingTop: '1.25rem' }}>
        <StepSubtitle style={{ marginTop: 0 }}>視覺意境 STYLE</StepSubtitle>
      </div>
      <div className="row g-3">
        {cfg.styles.map(style => {
          const active = formData.style === style.id;
          return (
            <div className="col-6 col-md-3" key={style.id}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                style={{
                  position:        'relative',
                  height:          'clamp(80px,14vw,118px)',
                  overflow:        'hidden',
                  cursor:          'pointer',
                  border:          active ? `2px solid ${GOLD}` : `1px solid ${BORDER_SUB}`,
                  boxShadow:       active ? `0 0 22px rgba(197,168,128,0.35)` : 'none',
                  transition:      'all 0.45s',
                }}
              >
                <img
                  src={style.img}
                  alt={style.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s, filter 0.5s', transform: active ? 'scale(1.1)' : 'scale(1)', filter: active ? 'brightness(1.05)' : 'brightness(0.5)' }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '10px 12px', background: active ? 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)' : 'rgba(5,5,5,0.55)', transition: 'all 0.5s' }}>
                  <span style={{ fontSize: 'clamp(0.78rem,1.3vw,0.9rem)', fontWeight: 900, letterSpacing: '-0.01em', color: active ? GOLD : '#fff', textShadow: active ? `0 0 20px ${GOLD_GLOW}` : 'none', transition: 'all 0.4s' }}>
                    {style.label}
                  </span>
                </div>
                {active && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <h2 style={{ fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', fontWeight: 900, color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: `1px solid ${BORDER_SUB}`, paddingBottom: '1rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        03 &nbsp;聯繫資訊 · 上傳 &nbsp;<span style={{ fontWeight: 200, fontSize: '0.7em', letterSpacing: '0.2em', color: TEXT_DIM }}>CONTACT</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <GoldInput label="姓名 / NAME" value={formData.name}  onChange={v => setFormData(p => ({ ...p, name: v }))}  placeholder="請輸入姓名" required />
        <GoldInput label="電話 / PHONE" type="tel" value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} placeholder="請輸入電話" required />
        <GoldInput label="信箱 / EMAIL" type="email" value={formData.email} onChange={v => setFormData(p => ({ ...p, email: v }))} placeholder="請輸入信箱（選填）" />
        <GoldInput label="基地地址 / ADDRESS" value={formData.address} onChange={v => setFormData(p => ({ ...p, address: v }))} placeholder="請輸入基地地址（選填）" />

        {/* Preferred Time */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, textShadow: `0 0 10px ${GOLD_DIM}` }}>希望聯絡時間 / CONTACT TIME</label>
          <select
            value={formData.preferredTime}
            onChange={e => setFormData(p => ({ ...p, preferredTime: e.target.value }))}
            style={{ width: '100%', backgroundColor: '#0D0D0E', border: `1px solid ${BORDER_SUB}`, padding: '13px 16px', color: formData.preferredTime ? '#fff' : TEXT_DIM, outline: 'none', fontSize: 'clamp(0.85rem,1.2vw,1rem)', letterSpacing: '0.08em', transition: 'border-color 0.3s', cursor: 'pointer', boxSizing: 'border-box' }}
            onFocus={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = `0 0 16px ${GOLD_DIM}`; }}
            onBlur={e => { e.currentTarget.style.borderColor = BORDER_SUB; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <option value="" disabled style={{ backgroundColor: '#0D0D0E', color: TEXT_DIM }}>請選擇方便聯絡的時間</option>
            {['隨時皆可','平日上午 (09:00 - 12:00)','平日下午 (12:00 - 18:00)','平日晚上 (18:00 - 21:00)','假日上午 (09:00 - 12:00)','假日中午與下午 (12:00 - 18:00)','假日晚上 (18:00 - 21:00)'].map(t => (
              <option key={t} value={t} style={{ backgroundColor: '#0D0D0E' }}>{t}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, textShadow: `0 0 10px ${GOLD_DIM}` }}>裝修需求描述 / DESCRIPTION</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            placeholder="請簡述您的裝修需求，例如：偏好建材、隔間變動、特殊收納需求或家庭成員組成等…"
            style={{ width: '100%', backgroundColor: 'transparent', border: `1px solid ${BORDER_SUB}`, padding: '13px 16px', color: '#fff', fontWeight: 300, letterSpacing: '0.08em', outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s', fontSize: 'clamp(0.85rem,1.2vw,1rem)', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.75 }}
            onFocus={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = `0 0 16px ${GOLD_DIM}`; }}
            onBlur={e => { e.currentTarget.style.borderColor = BORDER_SUB; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Drag & Drop Upload */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: GOLD, textShadow: `0 0 10px ${GOLD_DIM}` }}>平面圖 / 現況照片上傳</label>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*,.pdf" onChange={handleFileSelect} />
          <motion.div
            whileHover={{ scale: 1.012 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleFileDrop}
            style={{
              width:           '100%',
              height:          '130px',
              border:          `2px dashed ${isDragOver ? GOLD : uploadedFile ? GOLD_BORDER : BORDER_SUB}`,
              backgroundColor: isDragOver ? GOLD_DIM : uploadedFile ? 'rgba(197,168,128,0.04)' : BG_CARD,
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'center',
              justifyContent:  'center',
              cursor:          'pointer',
              transition:      'all 0.4s',
            }}
          >
            {uploadedFile ? (
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontWeight: 900, color: GOLD, fontSize: '0.85rem', letterSpacing: '0.1em', textShadow: `0 0 15px rgba(197,168,128,0.5)` }}>✓ 已上傳</span>
                <span style={{ display: 'block', color: TEXT_MID, fontSize: '0.78rem', letterSpacing: '0.08em', marginTop: '4px' }}>{uploadedFile}</span>
                <span style={{ display: 'block', color: TEXT_DIM, fontSize: '10px', marginTop: '6px', letterSpacing: '0.1em' }}>點擊重新選擇</span>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '1.6rem', color: TEXT_DIM, marginBottom: '8px' }}>⬆</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.12em', color: TEXT_DIM }}>拖拽檔案至此，或點擊上傳</span>
                <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '4px', letterSpacing: '0.1em' }}>支援 JPG、PNG、PDF</span>
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
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 1rem' }}
  >
    {/* Animated ring */}
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ width: '76px', height: '76px', borderRadius: '50%', border: `2px solid ${GOLD}`, boxShadow: `0 0 40px rgba(197,168,128,0.5), inset 0 0 20px rgba(197,168,128,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}
    >
      南源已收到您的服務預約
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      style={{ fontSize: 'clamp(0.85rem,1.3vw,1rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', lineHeight: 2, maxWidth: '380px', marginBottom: '2.5rem' }}
    >
      職人團隊正在檢閱您的需求，<br />專員將於 24 小時內與您聯繫。
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      onClick={onReset}
      style={{ fontSize: 'clamp(0.85rem,1.3vw,1rem)', letterSpacing: '0.12em', padding: '0.85em 2.5em', border: `1px solid ${GOLD}`, color: BG_DARK, backgroundColor: GOLD, cursor: 'pointer', fontWeight: 700, transition: 'box-shadow 0.3s' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 28px rgba(197,168,128,0.6)`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
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
      style={{ fontSize: 'clamp(2.2rem,5.5vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.05em', color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}`, lineHeight: 1.05, marginBottom: '0.5rem' }}
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
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '6px 14px', border: `1px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD_GLOW}` }} />
          <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase' }}>{serviceLabel}</span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Step trail */}
    <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
      {/* Rail background */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '5px', width: '1px', backgroundColor: BORDER_SUB }} />
      {/* Rail progress */}
      <motion.div
        style={{ position: 'absolute', top: 0, left: '5px', width: '1px', backgroundColor: GOLD, boxShadow: `0 0 12px rgba(197,168,128,0.7)`, originY: 0 }}
        initial={{ height: '0%' }}
        animate={{ height: `${(Math.min(step, 3) / 3) * 100}%` }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 5 }}>
        {STEP_DEFS.map(item => {
          const done    = step > item.s;
          const current = step === item.s;
          return (
            <div key={item.s} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginLeft: '-22px' }}>
              {/* Dot */}
              <div style={{
                width:           '12px',
                height:          '12px',
                borderRadius:    '50%',
                marginTop:       '5px',
                flexShrink:      0,
                border:          '2px solid',
                borderColor:     step >= item.s ? GOLD : 'rgba(255,255,255,0.18)',
                backgroundColor: done ? GOLD : current ? 'transparent' : BG_DARK,
                boxShadow:       step >= item.s ? `0 0 12px rgba(197,168,128,0.75)` : 'none',
                transition:      'all 0.5s',
              }} />
              <div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 900, letterSpacing: '-0.01em', color: step >= item.s ? GOLD : 'rgba(255,255,255,0.25)', textShadow: step >= item.s ? `0 0 18px rgba(197,168,128,0.55)` : 'none', transition: 'color 0.5s', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginTop: '3px', marginBottom: 0 }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Decorative company note at bottom of sidebar (desktop only) */}
    <div className="d-none d-lg-block" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: `1px solid ${BORDER_SUB}` }}>
      <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', lineHeight: 1.9 }}>
        南源木材有限公司<br />
        <span style={{ letterSpacing: '0.08em' }}>NANYUAN TIMBER DESIGN</span>
      </p>
      <p style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.18)', lineHeight: 1.7, marginTop: '0.5rem' }}>
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

  /* Scroll to top of form panel on step change */
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

  /* Validation per step */
  const canProceed = (): boolean => {
    if (step === 1) return !!formData.serviceType;
    if (step === 2) return !!formData.budget && !!formData.style;
    if (step === 3) return !!formData.name && !!formData.phone;
    return true;
  };

  /* Service label for the badge */
  const activeServiceLabel = SERVICES.find(s => s.id === formData.serviceType)?.label ?? '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: BG_DARK, minHeight: '100vh' }}
    >
      <div className="container px-3 px-md-4" style={{ paddingTop: 'clamp(80px,10vh,120px)', paddingBottom: '80px' }}>
        <div className="row g-4 g-lg-5 align-items-start">

          {/* ════ LEFT: STEP TRAIL ════ */}
          <div className="col-12 col-lg-4">
            <div style={{ position: 'sticky', top: '100px' }}>
              <StepTrail step={step} serviceLabel={activeServiceLabel} />
            </div>
          </div>

          {/* ════ RIGHT: STEP CONTENT ════ */}
          <div
            ref={formPanelRef}
            className="col-12 col-lg-8"
            style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', scrollbarWidth: 'none' }}
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
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '2rem',
                  paddingTop: '1.25rem',
                  borderTop: `1px solid ${BORDER_SUB}`
                }}
              >
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="border-0 bg-transparent"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontWeight: 300,
                      letterSpacing: '0.1em',
                      fontSize: '0.85rem',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    ⬅ 返回上一步
                  </button>
                ) : <div />}
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="apple-btn"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                    opacity: canProceed() ? 1 : 0.15,
                    cursor: canProceed() ? 'pointer' : 'not-allowed'
                  }}
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
