import React from 'react';
import { motion } from 'framer-motion';
import { Trees, Droplets, Hammer, Paintbrush, Cpu, ClipboardCheck, Camera } from 'lucide-react';
import './Quality.css';

const QUALITY_ITEMS = [
  {
    icon: <Trees size={36} className="text-metal-brown" />,
    title: '材料選用標準',
    desc: '從源頭把關，只選用穩定耐用的高級板材。',
    details: [
      '木材含水率嚴格控制於 8% - 12% 之間，防止日後熱漲冷縮開裂或變形。',
      '全室板材與接著劑一律採用符合國家級 F1 / F2 低甲醛環保綠建材認證。',
      '實木與天然皮板皆具備進口檢疫與永續產地追溯報告。'
    ]
  },
  {
    icon: <Droplets size={36} className="text-metal-brown" />,
    title: '防水工程檢核',
    desc: '漏水是居住的夢魘，南源實施最嚴苛的防漏屏障。',
    details: [
      '標準施作「三層防水系統」：防塵底漆層 ＋ 不織布抗裂強化層 ＋ 高彈性水泥面漆層。',
      '浴室濕區防水層塗刷高度一律直達天花板，絕不留水氣滲透死角。',
      '防水層完工後，一律實施 48 至 72 小時蓄水測試，雙重確認零滲漏方可進行下步泥作。'
    ]
  },
  {
    icon: <Hammer size={36} className="text-metal-brown" />,
    title: '木作工程檢核',
    desc: '傳承職人木藝精隨，精準度與耐用度並存。',
    details: [
      '結構接合處收口精度嚴控於 ±1mm 誤差內，線條流暢咬合緊密。',
      '鉸鏈與滑軌等五金配件全面選用奧地利 Blum 等頂級大廠，均通過 50kg 承重檢測。',
      '櫃體封邊、修角平整滑順，確保人體接觸時手感溫潤、安全無虞。'
    ]
  },
  {
    icon: <Paintbrush size={36} className="text-metal-brown" />,
    title: '油漆工程檢核',
    desc: '細緻觸感來自繁複工序，無毒塗料安心入住。',
    details: [
      '堅持「批土三道 ＋ 機器配合手工細緻打磨」，確保牆面平整如絲。',
      '完工漆面厚度均勻，實施側光 45 度角光澤檢查，杜絕流掛與起泡。',
      '全案選用世界級環保無毒健康乳膠漆，氣味溫和，開窗通風即可即時入住。'
    ]
  },
  {
    icon: <Cpu size={36} className="text-metal-brown" />,
    title: '弱電管線規劃',
    desc: '為未來的智能家居生活預留充足的高速基礎。',
    details: [
      '全屋網絡布線一律升級採用 Cat6A 雙屏蔽高速網路線，完美支援 10G 寬頻傳輸。',
      '強弱電管線保持 30cm 以上安全間距，弱電管路加裝防干擾屏蔽波紋金屬管。',
      '所有水電出線盒、天花板維修口均施作防塵保護蓋，並標示明確專屬電路迴路。'
    ]
  },
  {
    icon: <ClipboardCheck size={36} className="text-metal-brown" />,
    title: '多次驗收機制',
    desc: '分段把關，絕不將問題帶到下一個施工階段。',
    details: [
      '實施四大階段驗收：水電封板前驗收、泥作防水蓄水驗收、木作粗裝完工驗收、最終交屋前逐項驗收。',
      '每一階段皆附有南源專屬品質檢核表（QC Checklist），經監造與業主雙方簽字才可繼續進行。'
    ]
  },
  {
    icon: <Camera size={36} className="text-metal-brown" />,
    title: '施工紀錄展示',
    desc: '讓您身歷其境，隨時掌握現場的第一手進度。',
    details: [
      '每日監造人員實拍現場照片，上傳至雲端共用相簿，並標註當日進度細節。',
      '詳實記載氣候溫度、進場工種、材料規格異動與工程日誌，紀錄永久保存供日後維護查詢。'
    ]
  }
];

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
        
        {/* Core Principles Section (7 cards grid) */}
        <div className="row g-4 mb-5">
          {QUALITY_ITEMS.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <motion.div
                className="p-4 p-lg-5 h-100 rounded-1"
                style={{
                  backgroundColor: '#0D0D0E',
                  border: '1px solid rgba(197, 168, 128, 0.1)',
                  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ y: -5, borderColor: '#C5A880', boxShadow: '0 10px 30px rgba(197, 168, 128, 0.15)' }}
              >
                <div className="mb-4 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', backgroundColor: 'rgba(197, 168, 128, 0.05)' }}>
                  {item.icon}
                </div>
                <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>{item.title}</h3>
                <p className="mb-4" style={{ fontSize: '13px', color: '#C5A880', fontWeight: 300 }}>{item.desc}</p>
                <ul className="ps-3 mb-0" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300, lineHeight: 1.8 }}>
                  {item.details.map((detail, idx) => (
                    <li className="mb-2" key={idx}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
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
