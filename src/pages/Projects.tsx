import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ─── Reusable Scroll Reveal ─── */
const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Before/After Slider ─── */
const BeforeAfterSlider: React.FC<{ beforeImg: string; afterImg: string }> = ({ beforeImg, afterImg }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[65vh] cursor-ew-resize overflow-hidden select-none border border-white/10"
      onMouseMove={e => { if (e.buttons === 1) handleMove(e.clientX); }}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onMouseDown={e => handleMove(e.clientX)}
    >
      {/* After */}
      <div className="absolute inset-0" style={{ backgroundImage: `url('${afterImg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute bottom-6 right-6 text-white text-[10px] tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur px-4 py-2">完工後 AFTER</div>
      </div>
      {/* Before */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${beforeImg}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(80%) contrast(110%) brightness(55%)',
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`
        }}
      >
        <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-[0.2em] font-light bg-obsidian/60 backdrop-blur px-4 py-2">施工前 BEFORE</div>
      </div>
      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-[2px] z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)', backgroundColor: '#C5A880', boxShadow: '0 0 25px rgba(197,168,128,0.8)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-metal-brown bg-obsidian/80 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.5)]">
          <span className="text-metal-brown text-xs font-light">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════ PROJECT DATA ═══════════════════════════ */

const PROJECTS = [
  {
    id: '1',
    title: '天母森光',
    subtitle: '老屋重生',
    type: '老屋翻修 / OLD HOUSE RENEWAL',
    size: '45坪',
    year: '2025',
    budget: '280萬',
    designFocus: '壁癌漏水根治、全室水電重拉與現代溫潤光影設計',
    materials: '北美黑胡桃木實木地板、高級無毒環保塗料、進口三層防水系統',
    highlight: '壁癌漏水根治 × 北美胡桃木實木地板 × 全室水電管線重拉',
    img: '/images/luxury_tianmu_home_1779301841564.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/old_house_after.png',
    galleryImgs: ['/images/renovation_detail.png', '/images/luxury_tianmu_home_1779301841564.png'],
    description: [
      '這是一間屋齡超過 30 年的天母老公寓，原始屋況嚴峻——主臥壁癌面積達牆面 40%、浴室長年漏水滲透至樓下、全室鋁窗嚴重變形導致風雨直灌。',
      '我們從「安全工程」做起：全室水電管線重拉（含弱電資訊線路升級至 Cat6A）、浴室防水層全面剔除重做三層防水（底層瀝青＋中層不織布＋面層彈性水泥），確保 48 小時試水零滲漏。',
      '地板選用北美黑胡桃木實木地板（含水率嚴控 8-12%），以「人字拼」工法鋪設，每一片木料皆經過南源自有工坊的紋理配對與預處理，確保色澤一致、質感頂級。',
      '最終，這個曾經佈滿壁癌與漏水痕跡的老屋，蛻變為充滿溫潤木質調與現代燈光設計的頂級住所——這就是南源「從源頭解決問題」的一條龍落地精神。',
    ],
  },
  {
    id: '2',
    title: '機能極大化',
    subtitle: '小資宅美學',
    type: '小資宅美學 / SMART LIVING',
    size: '22坪',
    year: '2025',
    budget: '58萬',
    designFocus: '預算精準控制、隱藏式收納、多功能架高木質地坪',
    materials: '高級樺木合板、雙面塗裝板、低甲醛全室系統櫃、LED 線性燈',
    highlight: '預算控制 60 萬內 × 隱藏式收納 × 多功能木質地坪',
    img: '/images/budget_smart_home.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/budget_smart_home.png',
    galleryImgs: ['/images/budget_smart_home.png', '/images/style_minimal_wood_1779301932325.png'],
    description: [
      '業主是一對新婚夫妻，22 坪的空間需要同時滿足臥室、書房、客廳與大量收納的需求，且總預算嚴格控制在 60 萬以內。',
      '我們以「多功能木質架高地坪」為核心設計——客廳區域架高 40 公分，地坪下方全面規劃為抽屜式收納（可收納冬季棉被、行李箱），地坪上方搭配可掀式桌板，白天是工作區、晚上攤平即為客臥。',
      '電視牆採用薄型隱藏式收納櫃（深度僅 25 公分），將原本零散的雜物全數隱藏。全室以淺色樺木合板搭配白色系統櫃，視覺上放大空間感，搭配嵌入式 LED 間接照明，營造出遠超 60 萬預算的質感。',
      '這個案例完美證明：小預算不等於妥協品質，透過南源的精準選材與機能設計，22 坪也能擁有 100% 的視覺落地感。',
    ],
  },
  {
    id: '3',
    title: '侘寂茶韻',
    subtitle: '日式靜謐',
    type: '日式空間 / WABI-SABI',
    size: '40坪',
    year: '2024',
    budget: '350萬',
    designFocus: '手刷珪藻土漆藝、無縫微水泥質感、無主燈暖光設計',
    materials: '義大利進口無縫微水泥、手刷珪藻土、碳化防潮橡木地板',
    highlight: '無縫微水泥 × 原木的極致對話 × 手刷漆藝牆面',
    img: '/images/japanese_wabi_sabi_1779301881798.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/japanese_wabi_sabi_1779301881798.png',
    galleryImgs: ['/images/japanese_wabi_sabi_1779301881798.png', '/images/style_wabi_sabi_1779301962644.png'],
    description: [
      '業主追求日式侘寂（Wabi-Sabi）的寧靜氛圍——不完美中的完美。我們以「無縫微水泥」與「手刷珪藻土」為主要牆面材質，搭配經過碳化處理的橡木地板，營造出深沉內斂的空間質感。',
      '客廳主牆以 3 層手工塗抹的微水泥打造，每一道刮痕都是工匠手作的獨一無二紋理。搭配嵌入式壁龕（Tokonoma）與間接燈光，展示業主收藏的陶藝作品。',
      '全室無主燈設計，以 2700K 暖色溫 LED 線性燈與壁燈為主，營造出如同京都町屋般的溫潤光影層次。',
    ],
  },
  {
    id: '4',
    title: '曜石辦公',
    subtitle: '企業氣度',
    type: '企業總部 / COMMERCIAL',
    size: '200坪',
    year: '2024',
    budget: '800萬',
    designFocus: '大面積落地玻璃切割、獨立聲學天花板天幕與智能照明',
    materials: '黑曜大理石材、不鏽鋼拉絲防指紋板、進口電控霧化玻璃',
    highlight: '用建築線條與玻璃切割出現代專業 × 聲學天花板 × 智能照明',
    img: '/images/modern_office_1779301899552.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/modern_office_1779301899552.png',
    galleryImgs: ['/images/modern_office_1779301899552.png', '/images/style_industrial_1779301976370.png'],
    description: [
      '為一間金融科技公司打造的 200 坪總部辦公室。設計語彙以「曜石黑 × 拉絲不鏽鋼 × 大面積落地玻璃」為三大核心元素。',
      '開放式工作區搭配聲學天花板（NRC 0.85 以上），有效降低噪音。主管辦公室採用電控霧化玻璃隔間，一鍵切換透明與隱私模式。全區導入 DALI 智能照明系統，可依據日照自動調節色溫與亮度。',
      '會議室「黑曜石」以全黑石材牆面搭配暗金色金屬線條，配備 4K 投影與 Harman Kardon 嵌入式環繞音響，展現品牌的頂級專業形象。',
    ],
  },
  {
    id: '5',
    title: '沐光水域',
    subtitle: '衛浴藝術',
    type: '衛浴翻新 / BATHROOM',
    size: '10坪',
    year: '2025',
    budget: '120萬',
    designFocus: '精品飯店質感、大理石對花貼附、浴櫃防潮懸浮設計',
    materials: '義大利進口 Nero Marquina 黑色大理石、北美白橡木、德國 Hansgrohe 恆溫花灑',
    highlight: '暗黑石材 × 木質浴櫃 × 無框淋浴屏 × 智能馬桶',
    img: '/images/luxury_bathroom_1779301913582.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/luxury_bathroom_1779301913582.png',
    galleryImgs: ['/images/luxury_bathroom_1779301913582.png', '/images/renovation_detail.png'],
    description: [
      '僅 10 坪的衛浴空間，我們將它打造成如同精品飯店般的沐浴體驗。主牆面選用義大利 Nero Marquina 黑色大理石大板（1200×2400mm），以 bookmatching 對花工法呈現鏡面對稱的自然紋理。',
      '浴櫃以北美白橡木搭配黃銅拉手，底部懸浮設計配合 LED 地腳燈，營造出輕盈漂浮感。淋浴區採用無框超白玻璃屏風，搭配德國 Hansgrohe 恆溫花灑系統。',
      '這個案例證明，即使是小空間，也值得被認真對待——每一片石材、每一個五金件，都經過南源團隊的嚴格篩選。',
    ],
  },
  {
    id: '6',
    title: '琥珀香醇',
    subtitle: '商業魅力',
    type: '商業空間 / CAFE',
    size: '60坪',
    year: '2024',
    budget: '450萬',
    designFocus: '台灣檜木吧台手工打磨、溫暖金色琥珀光影、品牌視覺整合',
    materials: '台灣檜木原木大板、訂製黃銅管金屬件、頂級調光暖色 LED 燈具',
    highlight: '暖色金屬 × 原木吧台 × 訂製燈具 × 品牌視覺整合',
    img: '/images/high_end_cafe_1779301868615.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/high_end_cafe_1779301868615.png',
    galleryImgs: ['/images/high_end_cafe_1779301868615.png', '/images/style_luxury_dark_1779301949701.png'],
    description: [
      '為一間精品咖啡品牌打造的旗艦店面。設計概念以「琥珀」為靈感——溫暖的金色光芒穿透深色空間，如同陽光灑落在一杯手沖咖啡上。',
      '8 米長的一體成型原木吧台是全場焦點，選用整塊台灣檜木原木板，經過 60 定自然乾燥與 8 道手工打磨上油，保留最原始的木紋肌理。天花板懸掛的訂製黃銅燈具群，以不規則高低差排列，模擬咖啡液滴落的動態瞬間。',
      '從 LOGO 字體到菜單排版、從座椅面料到洗手間的空間氛圍，我們提供了完整的品牌視覺整合服務，確保每一個觸點都傳達一致的品牌溫度。',
    ],
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container px-3 px-md-4">

        {/* Header */}
        <div className="text-start mb-5">
          <h1 className="fw-bold mb-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.05em', color: '#C5A880', textShadow: '0 0 40px rgba(197,168,128,0.85)', lineHeight: 1.1 }}>作品案例</h1>
          <p style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            Portfolio / Masterpieces — {PROJECTS.length} Selected Works
          </p>
        </div>

        {/* Masonry Grid */}
        {/* Bootstrap Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="row g-4">
          {PROJECTS.map((project, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={project.id}>
              <FadeIn delay={i * 0.06}>
                <motion.div
                  className="rounded-1 overflow-hidden h-100 d-flex flex-column"
                  style={{
                    backgroundColor: '#0D0D0E',
                    border: '1px solid rgba(197, 168, 128, 0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedId(project.id)}
                  whileHover={{ y: -6, borderColor: '#C5A880' }}
                >
                  {/* Image container with Relative badge */}
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={project.img}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', opacity: 0.8, transition: 'all 0.7s' }}
                      alt={project.title}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {/* Before/After Tag */}
                    <div className="position-absolute top-3 start-3">
                      <span className="px-2 py-1" style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.05em', color: '#fff', backgroundColor: 'rgba(197, 168, 128, 0.85)', backdropFilter: 'blur(4px)' }}>
                        BEFORE / AFTER
                      </span>
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      {/* Name & Type & Pings */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="mb-0" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
                          {project.title}
                        </h3>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px' }}>
                          {project.size}
                        </span>
                      </div>
                      
                      <div className="mb-3" style={{ fontSize: '11px', color: '#C5A880', fontWeight: 400, letterSpacing: '0.05em' }}>
                        {project.type.split(' / ')[0]}
                      </div>

                      {/* Design Focus & Materials */}
                      <div className="mb-4" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                        <div className="d-flex mb-1 align-items-start">
                          <span className="text-white/40 me-2" style={{ minWidth: '60px' }}>設計重點：</span>
                          <span className="text-white/80">{project.designFocus}</span>
                        </div>
                        <div className="d-flex align-items-start">
                          <span className="text-white/40 me-2" style={{ minWidth: '60px' }}>使用材料：</span>
                          <span className="text-white/80">{project.materials}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="pt-3 border-top border-white/5 d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '12px', color: '#C5A880', fontWeight: 400, letterSpacing: '0.1em' }}>
                        查看完整案例 ➔
                      </span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ FULLSCREEN OVERLAY ═══════════════ */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9995,
              backgroundColor: '#050505',
              overflowY: 'auto',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedId(null)}
              className="fixed top-6 right-8 z-[9996] text-white/70 hover:text-metal-brown transition-all duration-300 text-sm font-black tracking-widest group"
              style={{ textShadow: '0 0 20px rgba(197,168,128,0.6)' }}
            >
              <span className="group-hover:translate-x-[-4px] inline-block transition-transform">關閉</span> ✕
            </button>

            {/* Hero Image */}
            <div className="position-relative w-100" style={{ height: 'clamp(300px, 70vh, 85vh)' }}>
              <img src={selectedProject.img} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={selectedProject.title} />
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.2) 50%, transparent 100%)' }}></div>
            </div>

            {/* Content */}
            <div className="container px-3 px-md-4 position-relative" style={{ marginTop: '-120px', zIndex: 10, paddingBottom: '80px' }}>

              {/* Title Block */}
              <div className="mb-20">
                <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3 mb-4">
                  <span className="px-3 py-1" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: '#C5A880', textTransform: 'uppercase', border: '1px solid rgba(197,168,128,0.3)', textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>{selectedProject.type}</span>
                  <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>{selectedProject.size}</span>
                  <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>{selectedProject.year}</span>
                  <span style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>預算 {selectedProject.budget}</span>
                </div>
                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '-0.05em', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.4)', lineHeight: 1.1 }}>{selectedProject.title}</h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(197,168,128,0.7)' }}>{selectedProject.subtitle}</p>
              </div>

              {/* Highlight */}
              <div className="ps-4 mb-5" style={{ borderLeft: '3px solid #C5A880', boxShadow: '-3px 0 15px rgba(197,168,128,0.3)' }}>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                  {selectedProject.highlight}
                </p>
              </div>

              {/* Description Paragraphs */}
              <div className="mb-5" style={{ maxWidth: '800px' }}>
                {selectedProject.description.map((para, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <p className="mb-4" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', lineHeight: 2.2 }}>
                      {para}
                    </p>
                  </FadeIn>
                ))}
              </div>

              {/* Before/After Slider */}
              <FadeIn className="mb-5">
                <h3 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em', color: '#C5A880', textShadow: '0 0 25px rgba(197,168,128,0.7)' }}>空間重生：擦除對照</h3>
                <p className="mb-4" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>左右拖曳滑桿，見證空間蛻變。</p>
                <BeforeAfterSlider beforeImg={selectedProject.beforeImg} afterImg={selectedProject.afterImg} />
              </FadeIn>

              {/* Gallery */}
              <FadeIn>
                <h3 className="fw-bold mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em', color: '#C5A880', textShadow: '0 0 25px rgba(197,168,128,0.7)' }}>更多細節</h3>
                <div className="row g-3">
                  {selectedProject.galleryImgs.map((gImg, i) => (
                    <div className="col-12 col-md-6" key={i}>
                      <div className="position-relative overflow-hidden">
                        <img src={gImg} className="w-100" style={{ height: 'clamp(200px, 40vh, 400px)', objectFit: 'cover', opacity: 0.8, transition: 'all 0.7s' }} alt={`Detail ${i + 1}`}
                          onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '1'; (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                          onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.8'; (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 100%)' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn className="mt-5 pt-4 text-center">
                <p className="text-sm font-light tracking-widest text-white/30 mb-6">喜歡這個作品？讓南源為您打造專屬空間</p>
                <button
                  onClick={() => { setSelectedId(null); window.location.href = '/contact'; }}
                  className="apple-btn text-base"
                >
                  立即預約諮詢 ➔
                </button>
              </FadeIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
