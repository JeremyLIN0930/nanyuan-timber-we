import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Ruler, FileEdit, Calculator, Layers, HardHat, CheckSquare, ShieldCheck } from 'lucide-react';
import './Process.css';

const PROCESS_STEPS = [
  { id: 1, title: '初步諮詢', desc: '線上或電話了解您的初步需求、預算範圍與偏好風格，為您提供最適切的規劃方向與建議。', icon: <MessageSquare size={32} /> },
  { id: 2, title: '現場丈量', desc: '專員至現場進行實地精準丈量，詳細記錄屋況結構、管線配置與環境採光等條件。', icon: <Ruler size={32} /> },
  { id: 3, title: '設計提案', desc: '依據丈量結果繪製平面配置圖，並提供初步風格意象方案，進行深入雙向溝通。', icon: <FileEdit size={32} /> },
  { id: 4, title: '預算評估', desc: '確認設計後，提供透明且逐項條列的詳細工程報價單，規格與工資完全公開。', icon: <Calculator size={32} /> },
  { id: 5, title: '材料選用', desc: '帶領業主親自至木材展間或工坊觸摸真實材料，挑選最匹配的原木、面料與進口五金。', icon: <Layers size={32} /> },
  { id: 6, title: '工程施工', desc: '自有職人團隊進場施作，嚴格遵循施工檢核標準，每日實拍照片於雲端回報進度。', icon: <HardHat size={32} /> },
  { id: 7, title: '完工驗收', desc: '包含多次工程期分段驗收（水電、木作、油漆）與交屋前最終驗收，確保細節皆符合南源標準。', icon: <CheckSquare size={32} /> },
  { id: 8, title: '售後保固', desc: '提供 1 年結構性工程保固服務，與定期主動售後關懷回訪，讓您長期居住更感安心。', icon: <ShieldCheck size={32} /> }
];

const Process: React.FC = () => {
  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <h1>施工流程</h1>
        <p>透明、嚴謹的八大步驟，確保工程如期如質</p>
      </div>

      <div className="container section-padding">
        <div className="text-center mb-4">
          <p className="process-intro">
            裝修是一趟充滿期待的旅程，但往往也伴隨著不安。在南源，我們透過標準化且高度透明的八大步驟，
            讓每一個階段的進展都清晰可見，徹底消除您的疑慮。
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={step.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-marker">
                {step.id}
              </div>
              <div className="timeline-content">
                <div className="timeline-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Process;
