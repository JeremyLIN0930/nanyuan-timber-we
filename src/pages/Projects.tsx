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
    highlight: '暖色金屬 × 原木吧台 × 訂製燈具 × 品牌視覺整合',
    img: '/images/high_end_cafe_1779301868615.png',
    beforeImg: '/images/old_house_before.png',
    afterImg: '/images/high_end_cafe_1779301868615.png',
    galleryImgs: ['/images/high_end_cafe_1779301868615.png', '/images/style_luxury_dark_1779301949701.png'],
    description: [
      '為一間精品咖啡品牌打造的旗艦店面。設計概念以「琥珀」為靈感——溫暖的金色光芒穿透深色空間，如同陽光灑落在一杯手沖咖啡上。',
      '8 米長的一體成型原木吧台是全場焦點，選用整塊台灣檜木原木板，經過 60 天的自然乾燥與 8 道手工打磨上油，保留最原始的木紋肌理。天花板懸掛的訂製黃銅燈具群，以不規則高低差排列，模擬咖啡液滴落的動態瞬間。',
      '從 LOGO 字體到菜單排版、從座椅面料到洗手間的香氛選擇，我們提供了完整的品牌視覺整合服務，確保每一個觸點都傳達一致的品牌溫度。',
    ],
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-left mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-metal-brown mb-4" style={{ textShadow: '0 0 40px rgba(197,168,128,0.85)' }}>作品案例</h1>
          <p className="text-sm font-light tracking-widest text-white/40 uppercase">
            Portfolio / Masterpieces — {PROJECTS.length} Selected Works
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.06}>
              <motion.div
                className="mb-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedId(project.id)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.img}
                  className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-light tracking-widest text-metal-brown uppercase block mb-1">{project.type}</span>
                  <h3 className="text-2xl font-black tracking-tighter text-white mb-1" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{project.title}</h3>
                  <p className="text-xs font-light tracking-widest text-white/40">{project.subtitle} | {project.size}</p>
                </div>
              </motion.div>
            </FadeIn>
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
            <div className="relative w-full h-[70vh] md:h-[85vh]">
              <img src={selectedProject.img} className="w-full h-full object-cover" alt={selectedProject.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 -mt-40 relative z-10 pb-32">

              {/* Title Block */}
              <div className="mb-20">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-xs font-light tracking-widest text-metal-brown uppercase px-3 py-1 border border-metal-brown/30" style={{ textShadow: '0 0 10px rgba(197,168,128,0.4)' }}>{selectedProject.type}</span>
                  <span className="text-xs font-light tracking-widest text-white/30">{selectedProject.size}</span>
                  <span className="text-xs font-light tracking-widest text-white/30">{selectedProject.year}</span>
                  <span className="text-xs font-light tracking-widest text-white/30">預算 {selectedProject.budget}</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4" style={{ textShadow: '0 0 30px rgba(255,255,255,0.4)' }}>{selectedProject.title}</h2>
                <p className="text-xl md:text-2xl font-light tracking-widest text-metal-brown/70">{selectedProject.subtitle}</p>
              </div>

              {/* Highlight */}
              <div className="border-l-[3px] border-metal-brown pl-8 mb-24" style={{ boxShadow: '-3px 0 15px rgba(197,168,128,0.3)' }}>
                <p className="text-xl md:text-2xl font-light tracking-widest text-white/80 leading-relaxed">
                  {selectedProject.highlight}
                </p>
              </div>

              {/* Description Paragraphs */}
              <div className="max-w-4xl space-y-10 mb-32">
                {selectedProject.description.map((para, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <p className="text-base md:text-lg font-light tracking-widest text-white/65 leading-[2.2]">
                      {para}
                    </p>
                  </FadeIn>
                ))}
              </div>

              {/* Before/After Slider */}
              <FadeIn className="mb-32">
                <h3 className="text-3xl font-black tracking-tighter text-metal-brown mb-8" style={{ textShadow: '0 0 25px rgba(197,168,128,0.7)' }}>空間重生：擦除對照</h3>
                <p className="text-sm font-light tracking-widest text-white/40 mb-8">左右拖曳滑桿，見證空間蛻變。</p>
                <BeforeAfterSlider beforeImg={selectedProject.beforeImg} afterImg={selectedProject.afterImg} />
              </FadeIn>

              {/* Gallery */}
              <FadeIn>
                <h3 className="text-3xl font-black tracking-tighter text-metal-brown mb-8" style={{ textShadow: '0 0 25px rgba(197,168,128,0.7)' }}>更多細節</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.galleryImgs.map((gImg, i) => (
                    <div key={i} className="relative overflow-hidden group">
                      <img src={gImg} className="w-full h-[40vh] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={`Detail ${i + 1}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent"></div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn className="mt-32 text-center">
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
