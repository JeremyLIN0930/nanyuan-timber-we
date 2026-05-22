import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Ruler, FileEdit, Calculator, HardHat, CheckSquare, Wrench } from 'lucide-react';
import './Process.css';

const PROCESS_STEPS = [
  { id: 1, title: '線上諮詢', desc: '透過表單或電話了解您的初步需求、預算範圍與偏好風格。', icon: <MessageSquare size={32} /> },
  { id: 2, title: '現場丈量', desc: '專員至現場進行實地丈量，確認屋況、管線配置與環境條件。', icon: <Ruler size={32} /> },
  { id: 3, title: '初步提案', desc: '提供平面配置圖與初步風格概念，進行雙向溝通與調整。', icon: <FileEdit size={32} /> },
  { id: 4, title: '詳細報價', desc: '確認設計後，提供透明、條列式的工程報價單，無隱藏費用。', icon: <Calculator size={32} /> },
  { id: 5, title: '工程施作', desc: '自有工班進場，嚴格按照進度表施工，並定期回報工程進度。', icon: <HardHat size={32} /> },
  { id: 6, title: '完工驗收', desc: '與業主共同進行逐項驗收，確認所有細節符合標準。', icon: <CheckSquare size={32} /> },
  { id: 7, title: '售後服務', desc: '提供完善的保固服務與使用建議，讓您長期居住無後顧之憂。', icon: <Wrench size={32} /> }
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
        <p>透明、嚴謹的七大步驟，確保工程如期如質</p>
      </div>

      <div className="container section-padding">
        <div className="text-center mb-4">
          <p className="process-intro">
            裝修是一趟充滿期待的旅程，但往往也伴隨著不安。在南源，我們透過標準化且高度透明的流程，
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
