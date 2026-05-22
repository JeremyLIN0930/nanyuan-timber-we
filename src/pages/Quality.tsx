import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Search, Award } from 'lucide-react';
import './Quality.css';

const Quality: React.FC = () => {
  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <h1>品質控管</h1>
        <p>魔鬼藏在細節裡，我們對品質的堅持不容妥協</p>
      </div>

      <div className="container section-padding">
        
        {/* Core Principles */}
        <div className="quality-grid mb-4">
          <div className="quality-card">
            <Search className="q-icon" size={40} />
            <h3>嚴選材料</h3>
            <p>憑藉木材產業背景，我們深知各種建材的物理特性。拒絕使用來路不明的劣質板材，全數採用符合綠建材標章、低甲醛的優良材料。</p>
          </div>
          <div className="quality-card">
            <ShieldCheck className="q-icon" size={40} />
            <h3>自有工班</h3>
            <p>不外包給品質不穩定的臨時工。我們的工班團隊皆具備多年經驗，默契十足，能確保每一道工序皆符合南源的高標準規範。</p>
          </div>
          <div className="quality-card">
            <CheckCircle2 className="q-icon" size={40} />
            <h3>嚴格檢核</h3>
            <p>施工期間設立多個查核點（如水電配置、防水測試、泥作平整度等），階段性檢驗合格後才進行下一環節，絕不便宜行事。</p>
          </div>
          <div className="quality-card">
            <Award className="q-icon" size={40} />
            <h3>安心保固</h3>
            <p>完工不是結束，而是服務的開始。我們提供基礎工程 3 年、木作與系統櫃 1 年的保固承諾，讓您的居住品質擁有長遠保障。</p>
          </div>
        </div>

        {/* Quality Standards Comparison */}
        <div className="standards-section bg-light">
          <div className="standards-header text-center">
            <h2>南源的堅持 vs 一般標準</h2>
            <p>為什麼選擇我們？因為我們在看不見的地方更用心。</p>
          </div>
          
          <div className="comparison-table">
            <div className="comp-row comp-header">
              <div className="comp-col item">檢驗項目</div>
              <div className="comp-col general">一般工程行標準</div>
              <div className="comp-col nanyuan">南源品質承諾</div>
            </div>
            
            <div className="comp-row">
              <div className="comp-col item">防水工程</div>
              <div className="comp-col general">塗刷 1-2 層，簡單試水 1 天</div>
              <div className="comp-col nanyuan">標準塗刷 3 層以上，蓄水測試滿 72 小時</div>
            </div>
            <div className="comp-row">
              <div className="comp-col item">水電管線</div>
              <div className="comp-col general">沿用舊管線或無標示配線</div>
              <div className="comp-col nanyuan">老屋一律重拉大廠線材，紅藍線分明、標示清晰</div>
            </div>
            <div className="comp-row">
              <div className="comp-col item">木作板材</div>
              <div className="comp-col general">F3 級距或無認證板材</div>
              <div className="comp-col nanyuan">全面採用 F1/F2 低甲醛環保綠建材</div>
            </div>
            <div className="comp-row">
              <div className="comp-col item">工程報價</div>
              <div className="comp-col general">口頭報價或籠統的「一式」收費</div>
              <div className="comp-col nanyuan">條列式明細，明確標示品牌、數量與單價</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Quality;
