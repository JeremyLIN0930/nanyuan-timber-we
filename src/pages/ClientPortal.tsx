import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Info, BookOpen, Image, Activity, FileText, Download, ShieldCheck, ArrowLeft } from 'lucide-react';
import './ClientPortal.css';

const ClientPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('demo@nanyuan.com.tw');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const portalFeatures = [
    {
      icon: <BookOpen size={28} className="portal-feature-icon" />,
      title: '雲端施工日誌',
      desc: '每日記載現場施工天氣、工種人數、當日進度與監造檢核備忘錄。'
    },
    {
      icon: <Image size={28} className="portal-feature-icon" />,
      title: '工程進度照片',
      desc: '依工程階段（拆除、水電、泥作、木作、油漆）分類歸檔之現場高畫質照片。'
    },
    {
      icon: <Activity size={28} className="portal-feature-icon" />,
      title: '施工階段狀態',
      desc: '即時串接工程進度甘特圖，動態標示目前施作階段與預計驗收時程。'
    },
    {
      icon: <FileText size={28} className="portal-feature-icon" />,
      title: '線上結案報告',
      desc: '完工後自動生成之驗收成果檔案，內含竣工圖面、油漆色號與設備保固書。'
    },
    {
      icon: <Download size={28} className="portal-feature-icon" />,
      title: '文件下載',
      desc: '線上存取合約書、預算明細表、建材產地履歷及分期款項電子收據。'
    },
    {
      icon: <ShieldCheck size={28} className="portal-feature-icon" />,
      title: '售後紀錄查詢',
      desc: '保固期內房屋回訪紀錄、主動報修進度追蹤及維修歷史明細查詢。'
    }
  ];

  return (
    <motion.div 
      className="page-container portal-page"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="container px-3 px-md-4">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div 
              key="login"
              className="mx-auto portal-login-panel"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="text-center mb-5">
                <h1 className="fw-bold mb-2 portal-heading">客戶專區</h1>
                <p className="portal-heading-sub">
                  南源雲端數位監造系統 / PREVIEW MODE
                </p>
              </div>

              <div className="p-4 p-md-5 rounded-1 portal-card">
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="d-block mb-2 portal-label">客戶帳號 / ID</label>
                    <div className="position-relative">
                      <User size={16} className="position-absolute translate-middle-y portal-input-icon" />
                      <input 
                        type="text" 
                        className="w-100 portal-input" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="請輸入您的帳號"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="d-block mb-2 portal-label">安全密碼 / PASSWORD</label>
                    <div className="position-relative">
                      <Lock size={16} className="position-absolute translate-middle-y portal-input-icon" />
                      <input 
                        type="password" 
                        className="w-100 portal-input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="請輸入密碼"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-100 py-3 mb-4 font-bold border border-metal-brown text-metal-brown portal-login-btn">
                    登入系統 ➔
                  </button>
                </form>

                <div className="p-3 d-flex gap-2 align-items-start portal-info-box">
                  <Info size={16} className="portal-info-icon" />
                  <p className="mb-0 portal-info-text">
                    專用帳密已預填，點擊「登入」即可直接進入雲端監造平台預覽畫面。
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Dashboard Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                <div>
                  <h1 className="fw-bold mb-2 portal-dash-heading">雲端監造平台</h1>
                  <p className="mb-0 portal-dash-sub">
                    案名：天母森光住宅新建工程 ｜ 業主專區
                  </p>
                </div>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="d-inline-flex align-items-center gap-2 border-0 bg-transparent portal-logout-btn"
                >
                  <ArrowLeft size={16} /> 登出系統
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-1 mb-5 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 portal-status-banner">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center portal-status-icon-circle">
                    <Activity size={24} className="portal-status-icon" />
                  </div>
                  <div>
                    <h3 className="mb-1 portal-status-title">系統升級預覽中</h3>
                    <p className="mb-0 text-muted portal-status-desc">南源正全力打造一站式工程數位看板，以下功能現正進行最終模組調試。</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-pill portal-status-badge">功能建置中</span>
              </div>

              {/* Grid of 6 Cards */}
              <div className="row g-4">
                {portalFeatures.map((feat, i) => (
                  <div className="col-12 col-md-6 col-lg-4" key={i}>
                    <div className="p-4 p-lg-5 h-100 rounded-1 position-relative overflow-hidden portal-feature-card">
                      {/* Top Row */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center justify-content-center rounded-circle portal-feature-icon-circle">
                          {feat.icon}
                        </div>
                        <span className="px-2 py-0.5 animate-pulse portal-feature-badge">
                          功能建置中
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mb-2 portal-feature-title">{feat.title}</h3>
                      <p className="mb-0 portal-feature-desc">{feat.desc}</p>
                      
                      {/* Under Construction overlay style hint */}
                      <div className="position-absolute bottom-0 end-0 p-3 portal-lock-overlay">
                        <Lock size={48} className="portal-lock-icon" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ClientPortal;
