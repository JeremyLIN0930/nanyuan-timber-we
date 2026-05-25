import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════ DATA ═══════════════════════════ */

const SERVICES = [
  {
    id: 'full_remodel',
    label: '全屋改造統包',
    en: 'FULL HOUSE REMODEL',
    img: '/images/style_luxury_dark_1779301949701.png',
    desc: '從格局重塑、木作美學到軟裝鋪陳，提供一條龍的高端精緻統包服務。'
  },
  {
    id: 'utility_eng',
    label: '水電基礎工程',
    en: 'UTILITY ENGINEERING',
    img: '/images/renovation_detail.png',
    desc: '針對老屋與新成屋，進行全室管線重拉、強弱電規劃、防潮防水基礎加固工程。'
  },
  {
    id: 'paint_craft',
    label: '工藝油漆工程',
    en: 'ARTISTIC PAINTING',
    img: '/images/style_wabi_sabi_1779301962644.png',
    desc: '精選環保無毒頂級漆料，由資深職人手工操刀，刻劃具備細膩紋理與光澤的牆面藝術。'
  },
  {
    id: 'partial_remodel',
    label: '局部空間改造',
    en: 'PARTIAL RENOVATION',
    img: '/images/minimal_wood_kitchen_1779301855424.png',
    desc: '針對衛浴、廚房、臥室等局部空間進行機能重組與視覺美化，打造精緻的生活角落。'
  }
];

const BUDGETS = [
  { label: '10萬 — 50萬', en: '小資局部更新', tier: 'ENTRY' },
  { label: '50萬 — 150萬', en: '標準空間規劃', tier: 'STANDARD' },
  { label: '150萬 — 400萬', en: '老屋 / 全屋翻修', tier: 'PREMIUM' },
  { label: '400萬以上', en: '頂級私人訂製', tier: 'LUXURY' },
];

const RENO_SCOPES = [
  { id: 'paint', label: '油漆美化' },
  { id: 'plumbing', label: '水電管線基礎工程' },
  { id: 'fullplan', label: '整體空間規劃' },
  { id: 'partial', label: '局部空間（辦公室 / 廁所 / 廚房）' },
];

const STYLE_INTENTS = [
  { id: 'minimal', label: '極簡無印', img: '/images/style_minimal_wood_1779301932325.png' },
  { id: 'dark', label: '奢華暗灰', img: '/images/style_luxury_dark_1779301949701.png' },
  { id: 'wabi', label: '日式侘寂', img: '/images/style_wabi_sabi_1779301962644.png' },
  { id: 'industrial', label: '精品工業', img: '/images/style_industrial_1779301976370.png' },
];

const slideTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '', budget: '', isBespoke: false, style: '',
    ping: 25, scopes: [] as string[], name: '', phone: '', email: '', address: '',
    description: '', preferredTime: ''
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  const toggleScope = (id: string) => {
    setFormData(prev => ({ ...prev, scopes: prev.scopes.includes(id) ? prev.scopes.filter(s => s !== id) : [...prev.scopes, id] }));
  };
  const handleFileDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files.length > 0) setUploadedFile(e.dataTransfer.files[0].name); };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setUploadedFile(e.target.files[0].name); };
  const resetForm = () => { setStep(1); setFormData({ serviceType: '', budget: '', isBespoke: false, style: '', ping: 25, scopes: [], name: '', phone: '', email: '', address: '', description: '', preferredTime: '' }); setUploadedFile(null); };
  const canProceed = () => { if (step === 1) return !!formData.serviceType; if (step === 2) return !!formData.budget && !!formData.style; if (step === 3) return !!formData.name && !!formData.phone; return true; };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <div className="container px-3 px-md-4" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="row g-4 g-lg-5">

          {/* ═══ LEFT: STEP TRAIL ═══ */}
          <div className="col-12 col-lg-4">
            <h1 className="fw-bold mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>預約服務</h1>
            <div className="position-relative ps-4">
              <div className="position-absolute top-0 bottom-0" style={{ left: '3px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <motion.div className="position-absolute top-0" style={{ left: '3px', width: '1px', backgroundColor: '#C5A880', boxShadow: '0 0 15px rgba(197,168,128,0.8)' }} initial={{ height: '0%' }} animate={{ height: `${(Math.min(step, 3) / 3) * 100}%` }} transition={{ duration: 0.8, ease: 'easeInOut' }}></motion.div>
              <div className="d-flex flex-column gap-4 position-relative" style={{ zIndex: 20 }}>
                {[{ s: 1, title: '服務項目', desc: '選擇您的服務類別' }, { s: 2, title: '需求·預算·風格', desc: '精細定義服務範疇' }, { s: 3, title: '聯繫·上傳', desc: '聯絡資訊與平面圖' }].map(item => (
                  <div key={item.s} className="d-flex align-items-start gap-3" style={{ marginLeft: '-22px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', marginTop: '5px', border: '2px solid', flexShrink: 0, borderColor: step >= item.s ? '#C5A880' : 'rgba(255,255,255,0.2)', backgroundColor: step >= item.s ? '#C5A880' : '#050505', boxShadow: step >= item.s ? '0 0 12px rgba(197,168,128,0.8)' : 'none', transition: 'all 0.5s' }}></div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', color: step >= item.s ? '#C5A880' : 'rgba(255,255,255,0.3)', textShadow: step >= item.s ? '0 0 20px rgba(197,168,128,0.6)' : 'none', transition: 'color 0.5s' }}>{item.title}</h3>
                      <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT: STEP CONTENT ═══ */}
          <div className="col-12 col-lg-8">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: SERVICE TYPE ── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
                  <h2 className="fw-bold mb-4 pb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>01. 服務選配 SERVICE</h2>
                  <div className="row g-4">
                    {SERVICES.map(service => {
                      const active = formData.serviceType === service.id;
                      return (
                        <div className="col-12 col-md-6" key={service.id}>
                          <div
                            onClick={() => setFormData({ ...formData, serviceType: service.id })}
                            style={{
                              cursor: 'pointer',
                              overflow: 'hidden',
                              transition: 'all 0.5s',
                              border: active ? '2px solid #C5A880' : '1px solid rgba(255,255,255,0.1)',
                              boxShadow: active ? '0 0 25px rgba(197,168,128,0.3)' : 'none',
                              backgroundColor: 'rgba(255,255,255,0.02)',
                              opacity: active ? 1 : 0.6,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                            onMouseEnter={e => { if (!active) e.currentTarget.style.opacity = '1'; }}
                            onMouseLeave={e => { if (!active) e.currentTarget.style.opacity = '0.6'; }}
                          >
                            <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                              <img
                                src={service.img}
                                className="w-100 h-100"
                                style={{
                                  objectFit: 'cover',
                                  transition: 'transform 0.7s',
                                  transform: active ? 'scale(1.05)' : 'scale(1)'
                                }}
                                alt={service.label}
                              />
                              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: active ? 'rgba(197,168,128,0.05)' : 'rgba(5,5,5,0.4)', transition: 'all 0.5s' }}></div>
                            </div>
                            <div className="p-3 p-md-4 d-flex flex-column flex-grow-1">
                              <div className="mb-2">
                                <span className="d-block fw-bold" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', letterSpacing: '-0.02em', color: active ? '#C5A880' : '#fff', textShadow: active ? '0 0 20px rgba(197,168,128,0.7)' : 'none' }}>{service.label}</span>
                                <span className="d-block" style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '2px' }}>{service.en}</span>
                              </div>
                              <p className="mb-0 mt-2" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)', fontWeight: 300, lineHeight: 1.6, color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}>
                                {service.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: BUDGET + PING + SCOPE + STYLE ── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
                  <h2 className="fw-bold mb-4 pb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>02. 預算區間 BUDGET</h2>

                  {/* Budget List */}
                  <div className="d-flex flex-column gap-2 mb-4">
                    {BUDGETS.map(b => {
                      const active = formData.budget === b.label && !formData.isBespoke;
                      return (
                        <button key={b.label} onClick={() => setFormData({ ...formData, budget: b.label, isBespoke: false })} className="d-flex justify-content-between align-items-center w-100 text-start border-0" style={{ padding: '14px 18px', transition: 'all 0.3s', border: active ? '2px solid #C5A880' : '1px solid rgba(255,255,255,0.1)', backgroundColor: active ? 'rgba(197,168,128,0.2)' : 'transparent', color: active ? '#C5A880' : 'rgba(255,255,255,0.5)', fontWeight: active ? 900 : 300, textShadow: active ? '0 0 15px rgba(197,168,128,0.5)' : 'none', boxShadow: active ? '0 0 20px rgba(197,168,128,0.25)' : 'none' }}>
                          <span style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', letterSpacing: '0.1em' }}>{b.label}</span>
                          <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: active ? 0.8 : 0.4 }}>{b.en}</span>
                        </button>
                      );
                    })}

                    {/* Bespoke */}
                    <button onClick={() => setFormData({ ...formData, budget: '與設計師詳談', isBespoke: true })} className="w-100 text-start border-0 mt-2" style={{ padding: '16px 18px', transition: 'all 0.5s', border: formData.isBespoke ? '2px solid #C5A880' : '1px solid rgba(197,168,128,0.4)', backgroundColor: formData.isBespoke ? 'rgba(197,168,128,0.2)' : 'transparent', boxShadow: formData.isBespoke ? '0 0 30px rgba(197,168,128,0.3)' : 'none' }}>
                      <span className="d-block fw-bold" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', letterSpacing: '-0.02em', color: formData.isBespoke ? '#C5A880' : 'rgba(197,168,128,0.7)' }}>與設計師詳談 / BESPOKE DESIGN</span>
                      <span className="d-block" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>無預算上限的頂級私人工藝空間</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {formData.isBespoke && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 ps-3" style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(197,168,128,0.8)', borderLeft: '2px solid #C5A880', lineHeight: 1.8 }}>
                        我們將安排資深職人與設計總監，為您量身訂製完全不受限的頂級私人工藝空間。
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Ping Slider */}
                  <h3 className="fw-bold mb-3 mt-4" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>空間坪數</h3>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <input type="range" min="5" max="200" value={formData.ping} onChange={e => setFormData({ ...formData, ping: parseInt(e.target.value) })} className="flex-grow-1" style={{ height: '2px', accentColor: '#C5A880', background: `linear-gradient(to right, #C5A880 ${((formData.ping - 5) / 195) * 100}%, rgba(255,255,255,0.1) ${((formData.ping - 5) / 195) * 100}%)` }} />
                    <div className="text-end" style={{ minWidth: '70px' }}>
                      <span className="fw-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#C5A880', textShadow: '0 0 20px rgba(197,168,128,0.6)' }}>{formData.ping}</span>
                      <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>坪</span>
                    </div>
                  </div>

                  {/* Renovation Scope */}
                  <h3 className="fw-bold mb-3 mt-4" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>希望裝修範圍</h3>
                  <div className="row g-2 mb-4">
                    {RENO_SCOPES.map(scope => {
                      const checked = formData.scopes.includes(scope.id);
                      return (
                        <div className="col-12 col-md-6" key={scope.id}>
                          <button onClick={() => toggleScope(scope.id)} className="d-flex align-items-center gap-3 w-100 text-start border-0" style={{ padding: '12px 16px', transition: 'all 0.3s', border: checked ? '2px solid #C5A880' : '1px solid rgba(255,255,255,0.1)', backgroundColor: checked ? 'rgba(197,168,128,0.15)' : 'transparent', color: checked ? '#C5A880' : 'rgba(255,255,255,0.5)' }}>
                            <div style={{ width: '18px', height: '18px', border: '2px solid', borderColor: checked ? '#C5A880' : 'rgba(255,255,255,0.3)', backgroundColor: checked ? '#C5A880' : 'transparent', boxShadow: checked ? '0 0 10px rgba(197,168,128,0.5)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                              {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', fontWeight: checked ? 900 : 300, letterSpacing: '0.1em' }}>{scope.label}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Style Intent */}
                  <h3 className="fw-bold mb-3 mt-3 pt-3" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>視覺意境 STYLE</h3>
                  <div className="row g-3">
                    {STYLE_INTENTS.map(style => {
                      const active = formData.style === style.id;
                      return (
                        <div className="col-6" key={style.id}>
                          <div onClick={() => setFormData({ ...formData, style: style.id })} className="position-relative overflow-hidden" style={{ height: 'clamp(80px, 15vw, 120px)', cursor: 'pointer', transition: 'all 0.5s', border: active ? '2px solid #C5A880' : '1px solid rgba(255,255,255,0.1)', boxShadow: active ? '0 0 20px rgba(197,168,128,0.3)' : 'none', opacity: active ? 1 : 0.5 }} onMouseEnter={e => { if (!active) e.currentTarget.style.opacity = '1'; }} onMouseLeave={e => { if (!active) e.currentTarget.style.opacity = '0.5'; }}>
                            <img src={style.img} className="w-100 h-100 position-absolute top-0 start-0" style={{ objectFit: 'cover', transition: 'transform 0.7s', transform: active ? 'scale(1.1)' : 'scale(1)' }} alt={style.label} />
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: active ? 'rgba(5,5,5,0.3)' : 'rgba(5,5,5,0.7)', transition: 'all 0.5s' }}>
                              <span className="fw-bold" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)', letterSpacing: '-0.02em', color: active ? '#C5A880' : '#fff', textShadow: active ? '0 0 20px rgba(197,168,128,0.7)' : 'none' }}>{style.label}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: CONTACT + UPLOAD ── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
                  <h2 className="fw-bold mb-4 pb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>03. 聯繫資訊 CONTACT</h2>
                  <div className="d-flex flex-column gap-4">
                    {[{ label: '姓名 / NAME *', type: 'text', key: 'name' as const, ph: '請輸入姓名' }, { label: '電話 / PHONE *', type: 'tel', key: 'phone' as const, ph: '請輸入電話' }, { label: '信箱 / EMAIL', type: 'email', key: 'email' as const, ph: '請輸入信箱（選填）' }, { label: '基地地址 / ADDRESS', type: 'text', key: 'address' as const, ph: '請輸入基地地址（選填）' }].map(field => (
                      <div key={field.key}>
                        <label className="d-block mb-2" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>{field.label}</label>
                        <input type={field.type} className="w-100" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', color: '#fff', fontWeight: field.key === 'name' || field.key === 'phone' ? 900 : 300, letterSpacing: '0.1em', outline: 'none', transition: 'all 0.3s', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }} value={formData[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} placeholder={field.ph} onFocus={e => { e.target.style.borderColor = '#C5A880'; e.target.style.boxShadow = '0 0 15px rgba(197,168,128,0.2)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }} />
                      </div>
                    ))}
                    {/* Hope Contact Time Select */}
                    <div>
                      <label className="d-block mb-2" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>希望聯絡時間 / CONTACT TIME</label>
                      <select
                        className="form-select w-100"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.15)',
                          padding: '12px 16px',
                          color: '#fff',
                          outline: 'none',
                          transition: 'all 0.3s',
                          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)'
                        }}
                        value={formData.preferredTime}
                        onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      >
                        <option value="" disabled style={{ backgroundColor: '#0D0D0E', color: 'rgba(255,255,255,0.4)' }}>請選擇方便聯絡的時間</option>
                        <option value="隨時皆可" style={{ backgroundColor: '#0D0D0E' }}>隨時皆可</option>
                        <option value="平日上午 (09:00 - 12:00)" style={{ backgroundColor: '#0D0D0E' }}>平日上午 (09:00 - 12:00)</option>
                        <option value="平日下午 (12:00 - 18:00)" style={{ backgroundColor: '#0D0D0E' }}>平日下午 (12:00 - 18:00)</option>
                        <option value="平日晚上 (18:00 - 21:00)" style={{ backgroundColor: '#0D0D0E' }}>平日晚上 (18:00 - 21:00)</option>
                        <option value="假日上午 (09:00 - 12:00)" style={{ backgroundColor: '#0D0D0E' }}>假日上午 (09:00 - 12:00)</option>
                        <option value="假日中午與下午 (12:00 - 18:00)" style={{ backgroundColor: '#0D0D0E' }}>假日中午與下午 (12:00 - 18:00)</option>
                        <option value="假日晚上 (18:00 - 21:00)" style={{ backgroundColor: '#0D0D0E' }}>假日晚上 (18:00 - 21:00)</option>
                      </select>
                    </div>
                    {/* Description Textarea */}
                    <div>
                      <label className="d-block mb-2" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>裝修需求描述 / DESCRIPTION</label>
                      <textarea
                        rows={4}
                        className="form-control w-100"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.15)',
                          padding: '12px 16px',
                          color: '#fff',
                          fontWeight: 300,
                          letterSpacing: '0.1em',
                          outline: 'none',
                          transition: 'all 0.3s',
                          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                          resize: 'vertical'
                        }}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        placeholder="請簡述您的裝修需求，例如：偏好建材、隔間變動、特殊收納需求、特殊五金偏好或家庭成員組成等..."
                      />
                    </div>
                    {/* Drag & Drop */}
                    <div>
                      <label className="d-block mb-2" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>平面圖 / 現況照片上傳</label>
                      <input type="file" ref={fileInputRef} className="d-none" accept="image/*,.pdf" onChange={handleFileSelect} />
                      <motion.div whileHover={{ scale: 1.015 }} onClick={() => fileInputRef.current?.click()} onDragOver={e => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={handleFileDrop} className="d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', height: '140px', border: `2px dashed ${isDragOver ? '#C5A880' : uploadedFile ? 'rgba(197,168,128,0.6)' : 'rgba(255,255,255,0.15)'}`, backgroundColor: isDragOver ? 'rgba(197,168,128,0.1)' : uploadedFile ? 'rgba(197,168,128,0.05)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.5s' }}>
                        {uploadedFile ? (
                          <div className="text-center">
                            <span className="d-block fw-bold" style={{ color: '#C5A880', fontSize: '0.85rem', letterSpacing: '0.1em', textShadow: '0 0 15px rgba(197,168,128,0.5)' }}>✓ 已上傳</span>
                            <span className="d-block" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{uploadedFile}</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <span className="d-block mb-2" style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>⬆</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>拖拽檔案至此，或點擊上傳</span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 4: SUCCESS ── */}
              {step === 4 && (
                <motion.div key="s4" className="d-flex flex-column align-items-center justify-content-center text-center py-5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '72px', height: '72px', border: '2px solid #C5A880', boxShadow: '0 0 40px rgba(197,168,128,0.4)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="fw-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.8)', letterSpacing: '-0.03em' }}>南源已收到您的服務預約</h2>
                  <p className="mb-5" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', lineHeight: 2, maxWidth: '400px' }}>
                    職人團隊正在檢閱您的需求，<br/>專員將於 24 小時內與您聯繫。
                  </p>
                  <button onClick={resetForm} className="apple-btn" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>返回服務預約 ➔</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {step < 4 && (
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {step > 1 ? (
                  <button onClick={handlePrev} className="border-0 bg-transparent" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300, letterSpacing: '0.1em', fontSize: '0.85rem', transition: 'all 0.3s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}>
                    ⬅ 返回上一步
                  </button>
                ) : <div></div>}
                <button onClick={handleNext} disabled={!canProceed()} className="apple-btn" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', opacity: canProceed() ? 1 : 0.15, cursor: canProceed() ? 'pointer' : 'not-allowed' }}>
                  {step === 3 ? '送出預約 ➔' : '下一步 ➔'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
