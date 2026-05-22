import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Droplets, Target, ShieldCheck, X } from 'lucide-react';

const advantageDetails: Record<string, string> = {
  '源頭理解': '我們擁有深厚的木材與建材背景。有別於一般設計公司，我們從材料的「源頭」出發，深入了解每種材質的物理特性與適用場景。',
  '細節品質': '我們堅持標準化的施工流程，並嚴格控管每一個施作環節。特別針對居家安全與耐久性至關重要的「防水工程」與「木作工程」，我們實施多次數嚴格檢查。',
  '誠信透明': '我們提供完全透明的報價單與施工流程，各項費用條理分明。承諾絕不惡意追加預算，並定期主動回報工程進度，大幅降低裝修風險。'
};

const CoreAdvantages: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [activeMaterial, setActiveMaterial] = useState<number | null>(null);

  const materials = [
    { id: 1, name: '北美黑胡桃木', desc: '耐腐朽、穩定度極高，適合高級訂製家具。', color: 'bg-[#3b2b20]', size: 'w-48 h-48', pos: 'col-span-2 row-span-2' },
    { id: 2, name: '日本檜木', desc: '散發自然香氣，具備防蟲抗菌特性。', color: 'bg-[#d2b48c]', size: 'w-32 h-24', pos: 'col-span-1 row-span-1' },
    { id: 3, name: '歐洲白橡木', desc: '紋理鮮明，質地堅硬，適合海島型木地板。', color: 'bg-[#c19a6b]', size: 'w-24 h-48', pos: 'col-span-1 row-span-2' },
    { id: 4, name: '緬甸柚木', desc: '富含油脂，極度抗潮抗變形，最頂級戶外材。', color: 'bg-[#8c5a2b]', size: 'w-48 h-24', pos: 'col-span-2 row-span-1' },
  ];

  return (
    <section className="py-32 bg-off-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Text & Parallax Cards */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-blue mb-12">職人堅持的核心優勢</h2>
          
          <div className="relative space-y-12">
            <motion.div style={{ y: y1 }} className="bg-white p-8 rounded-sm shadow-xl border-l-4 border-wood-brown relative z-20">
              <Droplets className="text-wood-brown mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">源頭理解</h3>
              <p className="text-text-muted">{advantageDetails['源頭理解']}</p>
            </motion.div>

            <motion.div style={{ y: y2 }} className="bg-white p-8 rounded-sm shadow-2xl border-l-4 border-dark-blue ml-8 relative z-30">
              <Target className="text-dark-blue mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">細節品質</h3>
              <p className="text-text-muted">{advantageDetails['細節品質']}</p>
            </motion.div>

            <motion.div style={{ y: y3 }} className="bg-earth-light p-8 rounded-sm shadow-lg border-l-4 border-text-main relative z-10">
              <ShieldCheck className="text-text-main mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">誠信透明</h3>
              <p className="text-text-muted">{advantageDetails['誠信透明']}</p>
            </motion.div>
          </div>
        </div>

        {/* Right: Geometric Interactive Wall */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          <div className="absolute inset-0 bg-wood-brown/5 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4 rotate-6 transform hover:rotate-0 transition-transform duration-700">
            {materials.map((mat) => (
              <motion.div
                key={mat.id}
                className={`${mat.color} ${mat.pos} relative cursor-pointer overflow-hidden group shadow-lg`}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                onClick={() => setActiveMaterial(mat.id)}
              >
                {/* Simulated texture with noise overlay */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest text-sm px-2 text-center">
                    {mat.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Popup Modal for Material */}
          <AnimatePresence>
            {activeMaterial !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center z-50 p-6"
              >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" onClick={() => setActiveMaterial(null)}></div>
                <div className="bg-white p-8 shadow-2xl relative z-10 max-w-sm w-full border border-wood-brown/20">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-wood-brown" onClick={() => setActiveMaterial(null)}>
                    <X size={24} />
                  </button>
                  <h4 className="text-2xl font-bold text-wood-brown mb-2">
                    {materials.find(m => m.id === activeMaterial)?.name}
                  </h4>
                  <p className="text-text-muted leading-relaxed">
                    {materials.find(m => m.id === activeMaterial)?.desc}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 uppercase tracking-widest">
                    實作合理性與耐用度指標 99%
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default CoreAdvantages;
