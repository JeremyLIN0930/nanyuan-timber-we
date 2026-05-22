import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════ DATA ═══════════════════════════ */

const SPACE_TYPES = [
  { id: 'oldhouse', label: '老屋翻修', en: 'OLD HOUSE RENEWAL', img: '/images/old_house_after.png' },
  { id: 'budget', label: '小資宅美學', en: 'SMART LIVING', img: '/images/budget_smart_home.png' },
  { id: 'commercial', label: '商業空間', en: 'COMMERCIAL', img: '/images/high_end_cafe_1779301868615.png' },
  { id: 'luxury', label: '頂級住宅', en: 'LUXURY RESIDENTIAL', img: '/images/luxury_tianmu_home_1779301841564.png' },
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

/* ═══════════════════════════ TRANSITION CONFIG ═══════════════════════════ */

const slideTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    spaceType: '',
    budget: '',
    isBespoke: false,
    style: '',
    ping: 25,
    scopes: [] as string[],
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const toggleScope = (id: string) => {
    setFormData(prev => ({
      ...prev,
      scopes: prev.scopes.includes(id)
        ? prev.scopes.filter(s => s !== id)
        : [...prev.scopes, id]
    }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ spaceType: '', budget: '', isBespoke: false, style: '', ping: 25, scopes: [], name: '', phone: '', email: '', address: '' });
    setUploadedFile(null);
  };

  /* ─── Validation ─── */
  const canProceed = () => {
    if (step === 1) return !!formData.spaceType;
    if (step === 2) return !!formData.budget && !!formData.style;
    if (step === 3) return !!formData.name && !!formData.phone;
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-obsidian min-h-screen pt-40 pb-32"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-16">

        {/* ═══════════════ LEFT: STEP TRAIL ═══════════════ */}
        <div className="lg:col-span-4 flex flex-col justify-start relative">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-metal-brown mb-16" style={{ textShadow: '0 0 40px rgba(197,168,128,0.85)' }}>預約展間</h1>

          <div className="relative pl-6">
            {/* Background line */}
            <div className="absolute top-2 bottom-0 left-[3px] w-[1px] bg-white/10 z-0"></div>
            {/* Animated progress line */}
            <motion.div
              className="absolute top-2 left-[3px] w-[1px] z-10"
              style={{ backgroundColor: '#C5A880', boxShadow: '0 0 15px rgba(197,168,128,0.8)' }}
              initial={{ height: '0%' }}
              animate={{ height: `${(Math.min(step, 3) / 3) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            ></motion.div>

            <div className="space-y-14 relative z-20">
              {[
                { s: 1, title: '空間類型', desc: '選擇您的空間需求' },
                { s: 2, title: '預算 · 坪數 · 風格', desc: '精細定義工程範圍' },
                { s: 3, title: '聯繫 · 上傳', desc: '聯絡方式與平面圖' },
              ].map(item => (
                <div key={item.s} className="flex gap-5 items-start relative -ml-[27px]">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 transition-all duration-500 border-[2px] shrink-0 ${
                      step >= item.s
                        ? 'border-metal-brown shadow-[0_0_12px_rgba(197,168,128,0.8)]'
                        : 'bg-obsidian border-white/20'
                    }`}
                    style={step >= item.s ? { backgroundColor: '#C5A880' } : {}}
                  ></div>
                  <div>
                    <h3
                      className={`text-base font-black tracking-tighter transition-colors duration-500 ${
                        step >= item.s ? 'text-metal-brown' : 'text-white/30'
                      }`}
                      style={step >= item.s ? { textShadow: '0 0 20px rgba(197,168,128,0.6)' } : {}}
                    >{item.title}</h3>
                    <p className="text-[11px] font-light tracking-widest text-white/30 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ RIGHT: STEP CONTENT ═══════════════ */}
        <div className="lg:col-span-8 relative min-h-[65vh] flex flex-col">
          <AnimatePresence mode="wait">

            {/* ──────────────── STEP 1: SPACE TYPE ──────────────── */}
            {step === 1 && (
              <motion.div key="step1" className="flex-1" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
                <h2 className="text-2xl font-black tracking-tighter text-white mb-10 border-b border-white/10 pb-4" style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}>01. 空間選配 SPACE</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SPACE_TYPES.map(type => {
                    const isActive = formData.spaceType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setFormData({ ...formData, spaceType: type.id })}
                        className={`relative cursor-pointer group overflow-hidden transition-all duration-500 ${
                          isActive
                            ? 'border-[2px] border-metal-brown shadow-[0_0_25px_rgba(197,168,128,0.35)]'
                            : 'border border-white/10 hover:border-metal-brown/40 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[3/4] relative">
                          <img src={type.img} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`} alt={type.label} />
                          <div className={`absolute inset-0 transition-all duration-500 ${isActive ? 'bg-metal-brown/10' : 'bg-obsidian/60 group-hover:bg-obsidian/30'}`}></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className={`text-base font-black tracking-tighter block mb-1 ${isActive ? 'text-metal-brown' : 'text-white'}`} style={isActive ? { textShadow: '0 0 20px rgba(197,168,128,0.7)' } : {}}>{type.label}</span>
                            <span className="text-white/40 text-[9px] font-light tracking-[0.2em] block">{type.en}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ──────────────── STEP 2: BUDGET + PING + SCOPE + STYLE ──────────────── */}
            {step === 2 && (
              <motion.div key="step2" className="flex-1" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>

                {/* ── Budget List ── */}
                <h2 className="text-2xl font-black tracking-tighter text-white mb-6 border-b border-white/10 pb-4" style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}>02. 預算區間 BUDGET</h2>
                <div className="flex flex-col gap-2 mb-8">
                  {BUDGETS.map(b => {
                    const isActive = formData.budget === b.label && !formData.isBespoke;
                    return (
                      <button
                        key={b.label}
                        onClick={() => setFormData({ ...formData, budget: b.label, isBespoke: false })}
                        className={`w-full px-5 py-4 text-left transition-all duration-300 flex justify-between items-center ${
                          isActive
                            ? 'border-[2px] border-metal-brown bg-[rgba(197,168,128,0.2)] text-metal-brown font-black shadow-[0_0_20px_rgba(197,168,128,0.25)]'
                            : 'border border-white/10 text-white/50 font-light hover:border-metal-brown/40 hover:text-white/80 hover:bg-white/[0.02]'
                        }`}
                        style={isActive ? { textShadow: '0 0 15px rgba(197,168,128,0.5)' } : {}}
                      >
                        <span className="text-sm tracking-widest">{b.label}</span>
                        <span className={`text-[10px] tracking-[0.15em] uppercase ${isActive ? 'text-metal-brown/80' : 'text-white/25'}`}>{b.en}</span>
                      </button>
                    );
                  })}

                  {/* Bespoke */}
                  <button
                    onClick={() => setFormData({ ...formData, budget: '與設計師詳談', isBespoke: true })}
                    className={`w-full px-5 py-5 text-left transition-all duration-500 mt-2 ${
                      formData.isBespoke
                        ? 'border-[2px] border-metal-brown bg-[rgba(197,168,128,0.2)] shadow-[0_0_30px_rgba(197,168,128,0.3)]'
                        : 'border border-metal-brown/40 hover:border-metal-brown hover:bg-metal-brown/5'
                    }`}
                    style={formData.isBespoke ? { textShadow: '0 0 15px rgba(197,168,128,0.5)' } : {}}
                  >
                    <span className={`text-base font-black tracking-tighter block mb-1 ${formData.isBespoke ? 'text-metal-brown' : 'text-metal-brown/70'}`}>與設計師詳談 / BESPOKE DESIGN</span>
                    <span className="text-[11px] font-light tracking-widest text-white/35">無預算上限的頂級私人工藝空間</span>
                  </button>
                </div>

                {/* Bespoke Hint */}
                <AnimatePresence>
                  {formData.isBespoke && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm font-light tracking-widest text-metal-brown/80 mb-8 border-l-2 border-metal-brown pl-4 leading-relaxed"
                      style={{ textShadow: '0 0 10px rgba(197,168,128,0.3)' }}
                    >
                      我們將安排資深職人與設計總監，為您量身訂製完全不受限的頂級私人工藝空間。
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* ── Ping / Square Footage ── */}
                <h3 className="text-lg font-black tracking-tighter text-white mb-4" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>空間坪數</h3>
                <div className="mb-8">
                  <div className="flex items-center gap-6 mb-3">
                    <input
                      type="range"
                      min="5"
                      max="200"
                      value={formData.ping}
                      onChange={e => setFormData({ ...formData, ping: parseInt(e.target.value) })}
                      className="flex-1 h-[2px] appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #C5A880 ${((formData.ping - 5) / 195) * 100}%, rgba(255,255,255,0.1) ${((formData.ping - 5) / 195) * 100}%)`,
                        accentColor: '#C5A880',
                      }}
                    />
                    <div className="min-w-[80px] text-right">
                      <span className="text-3xl font-black tracking-tighter text-metal-brown" style={{ textShadow: '0 0 20px rgba(197,168,128,0.6)' }}>{formData.ping}</span>
                      <span className="text-xs font-light tracking-widest text-white/40 ml-1">坪</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-light tracking-widest text-white/20">
                    <span>5 坪</span>
                    <span>200 坪</span>
                  </div>
                </div>

                {/* ── Renovation Scope Checkboxes ── */}
                <h3 className="text-lg font-black tracking-tighter text-white mb-4" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>希望裝修範圍</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                  {RENO_SCOPES.map(scope => {
                    const isChecked = formData.scopes.includes(scope.id);
                    return (
                      <button
                        key={scope.id}
                        onClick={() => toggleScope(scope.id)}
                        className={`flex items-center gap-4 px-5 py-4 transition-all duration-300 text-left ${
                          isChecked
                            ? 'border-[2px] border-metal-brown bg-[rgba(197,168,128,0.15)] text-metal-brown'
                            : 'border border-white/10 text-white/50 hover:border-metal-brown/30 hover:text-white/70'
                        }`}
                      >
                        {/* Custom Checkbox */}
                        <div className={`w-5 h-5 border-[2px] shrink-0 flex items-center justify-center transition-all duration-300 ${
                          isChecked
                            ? 'border-metal-brown bg-metal-brown shadow-[0_0_10px_rgba(197,168,128,0.5)]'
                            : 'border-white/30 bg-transparent'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm tracking-widest ${isChecked ? 'font-black' : 'font-light'}`}>{scope.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* ── Style Intent ── */}
                <h3 className="text-lg font-black tracking-tighter text-white mb-4 border-t border-white/10 pt-8" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>視覺意境 STYLE</h3>
                <div className="grid grid-cols-2 gap-4">
                  {STYLE_INTENTS.map(style => {
                    const isActive = formData.style === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setFormData({ ...formData, style: style.id })}
                        className={`relative cursor-pointer group overflow-hidden h-28 transition-all duration-500 ${
                          isActive
                            ? 'border-[2px] border-metal-brown shadow-[0_0_20px_rgba(197,168,128,0.3)]'
                            : 'border border-white/10 hover:border-metal-brown/40 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={style.img} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} alt={style.label} />
                        <div className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${isActive ? 'bg-obsidian/30' : 'bg-obsidian/70 group-hover:bg-obsidian/40'}`}>
                          <span className={`text-lg font-black tracking-tighter ${isActive ? 'text-metal-brown' : 'text-white'}`} style={isActive ? { textShadow: '0 0 20px rgba(197,168,128,0.7)' } : {}}>{style.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ──────────────── STEP 3: CONTACT INFO + UPLOAD ──────────────── */}
            {step === 3 && (
              <motion.div key="step3" className="flex-1" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={slideTransition}>
                <h2 className="text-2xl font-black tracking-tighter text-white mb-10 border-b border-white/10 pb-4" style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}>03. 聯繫資訊 CONTACT</h2>
                <div className="space-y-7">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-light tracking-widest text-metal-brown mb-2" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>姓名 / NAME *</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-white/15 px-5 py-4 text-white font-black tracking-widest focus:border-metal-brown focus:shadow-[0_0_15px_rgba(197,168,128,0.2)] outline-none transition-all duration-300 placeholder-white/15"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="請輸入姓名"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-light tracking-widest text-metal-brown mb-2" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>電話 / PHONE *</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border border-white/15 px-5 py-4 text-white font-black tracking-widest focus:border-metal-brown focus:shadow-[0_0_15px_rgba(197,168,128,0.2)] outline-none transition-all duration-300 placeholder-white/15"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="請輸入電話"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-light tracking-widest text-metal-brown mb-2" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>信箱 / EMAIL</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border border-white/15 px-5 py-4 text-white font-light tracking-widest focus:border-metal-brown focus:shadow-[0_0_15px_rgba(197,168,128,0.2)] outline-none transition-all duration-300 placeholder-white/15"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="請輸入信箱（選填）"
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <label className="block text-xs font-light tracking-widest text-metal-brown mb-2" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>基地地址 / ADDRESS</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-white/15 px-5 py-4 text-white font-light tracking-widest focus:border-metal-brown focus:shadow-[0_0_15px_rgba(197,168,128,0.2)] outline-none transition-all duration-300 placeholder-white/15"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="請輸入基地地址（選填）"
                    />
                  </div>

                  {/* Drag & Drop Zone */}
                  <div>
                    <label className="block text-xs font-light tracking-widest text-metal-brown mb-3" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>平面圖 / 現況照片上傳</label>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*,.pdf" onChange={handleFileSelect} />
                    <motion.div
                      whileHover={{ scale: 1.015, boxShadow: '0 0 30px rgba(197,168,128,0.2)' }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleFileDrop}
                      className={`w-full h-40 border-[2px] border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group relative overflow-hidden ${
                        isDragOver
                          ? 'border-metal-brown bg-metal-brown/10 scale-[1.02]'
                          : uploadedFile
                            ? 'border-metal-brown/60 bg-metal-brown/5'
                            : 'border-white/15 bg-white/[0.02] hover:border-metal-brown/40 hover:bg-metal-brown/5'
                      }`}
                    >
                      {uploadedFile ? (
                        <div className="text-center z-10">
                          <span className="text-metal-brown text-sm font-black tracking-widest block mb-1" style={{ textShadow: '0 0 15px rgba(197,168,128,0.5)' }}>✓ 已上傳</span>
                          <span className="text-white/50 text-xs font-light tracking-widest">{uploadedFile}</span>
                        </div>
                      ) : (
                        <div className="text-center z-10">
                          <span className="text-2xl text-white/20 group-hover:text-metal-brown/60 transition-colors block mb-3">⬆</span>
                          <span className="text-xs font-light tracking-widest text-white/30 group-hover:text-metal-brown transition-colors">
                            拖拽檔案至此，或點擊上傳平面圖 / 現況照片
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-metal-brown/0 via-metal-brown/5 to-metal-brown/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ──────────────── STEP 4: SUCCESS ──────────────── */}
            {step === 4 && (
              <motion.div key="step4" className="flex-1 flex flex-col items-center justify-center text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                <div className="w-20 h-20 rounded-full border-[2px] border-metal-brown flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(197,168,128,0.4)]">
                  <svg className="w-8 h-8 text-metal-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-metal-brown mb-8" style={{ textShadow: '0 0 40px rgba(197,168,128,0.8)' }}>南源已收到您的新家藍圖</h2>
                <p className="text-base font-light tracking-widest text-white/70 mb-16 leading-loose max-w-lg">
                  職人團隊正在檢閱您的需求，<br/>專員將於 24 小時內與您聯繫。
                </p>
                <button onClick={resetForm} className="apple-btn text-base">
                  返回展間 ➔
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════════ NAVIGATION ═══════════════ */}
          {step < 4 && (
            <div className="flex justify-between items-center mt-14 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button onClick={handlePrev} className="text-white/40 hover:text-white font-light tracking-widest text-sm transition-all duration-300 hover:translate-x-[-4px]">
                  ⬅ 返回上一步
                </button>
              ) : <div></div>}

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="font-black tracking-widest text-base transition-all duration-300 apple-btn disabled:opacity-15 disabled:cursor-not-allowed hover:translate-x-1"
              >
                {step === 3 ? '送出預約 ➔' : '下一步 ➔'}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
