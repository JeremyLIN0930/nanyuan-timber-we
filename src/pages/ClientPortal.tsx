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
      icon: <BookOpen size={28} style={{ color: '#C5A880' }} />,
      title: '雲端施工日誌',
      desc: '每日記載現場施工天氣、工種人數、當日進度與監造檢核備忘錄。'
    },
    {
      icon: <Image size={28} style={{ color: '#C5A880' }} />,
      title: '工程進度照片',
      desc: '依工程階段（拆除、水電、泥作、木作、油漆）分類歸檔之現場高畫質照片。'
    },
    {
      icon: <Activity size={28} style={{ color: '#C5A880' }} />,
      title: '施工階段狀態',
      desc: '即時串接工程進度甘特圖，動態標示目前施作階段與預計驗收時程。'
    },
    {
      icon: <FileText size={28} style={{ color: '#C5A880' }} />,
      title: '線上結案報告',
      desc: '完工後自動生成之驗收成果檔案，內含竣工圖面、油漆色號與設備保固書。'
    },
    {
      icon: <Download size={28} style={{ color: '#C5A880' }} />,
      title: '文件下載',
      desc: '線上存取合約書、預算明細表、建材產地履歷及分期款項電子收據。'
    },
    {
      icon: <ShieldCheck size={28} style={{ color: '#C5A880' }} />,
      title: '售後紀錄查詢',
      desc: '保固期內房屋回訪紀錄、主動報修進度追蹤及維修歷史明細查詢。'
    }
  ];

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#050505', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div className="container px-3 px-md-4">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div 
              key="login"
              className="mx-auto" 
              style={{ maxWidth: '450px' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="text-center mb-5">
                <h1 className="fw-bold mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.6)' }}>客戶專區</h1>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                  南源雲端數位監造系統 / PREVIEW MODE
                </p>
              </div>

              <div className="p-4 p-md-5 rounded-1" style={{ backgroundColor: '#0D0D0E', border: '1px solid rgba(197, 168, 128, 0.15)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="d-block mb-2" style={{ fontSize: '11px', color: '#C5A880', letterSpacing: '0.15em' }}>客戶帳號 / ID</label>
                    <div className="position-relative">
                      <User size={16} className="position-absolute translate-middle-y" style={{ left: '16px', top: '50%', color: 'rgba(255,255,255,0.3)' }} />
                      <input 
                        type="text" 
                        className="w-100" 
                        style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px 12px 42px', color: '#fff', outline: 'none', transition: 'all 0.3s', fontSize: '14px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="請輸入您的帳號"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="d-block mb-2" style={{ fontSize: '11px', color: '#C5A880', letterSpacing: '0.15em' }}>安全密碼 / PASSWORD</label>
                    <div className="position-relative">
                      <Lock size={16} className="position-absolute translate-middle-y" style={{ left: '16px', top: '50%', color: 'rgba(255,255,255,0.3)' }} />
                      <input 
                        type="password" 
                        className="w-100" 
                        style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px 12px 42px', color: '#fff', outline: 'none', transition: 'all 0.3s', fontSize: '14px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="請輸入密碼"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-100 py-3 mb-4 font-bold border border-metal-brown text-metal-brown" style={{ backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s', fontSize: '14px', letterSpacing: '0.1em' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    登入系統 ➔
                  </button>
                </form>

                <div className="p-3 d-flex gap-2 align-items-start" style={{ backgroundColor: 'rgba(197, 168, 128, 0.05)', border: '1px solid rgba(197, 168, 128, 0.1)' }}>
                  <Info size={16} style={{ color: '#C5A880', flexShrink: 0, marginTop: '2px' }} />
                  <p className="mb-0" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
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
                  <h1 className="fw-bold mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.6)' }}>雲端監造平台</h1>
                  <p className="mb-0" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                    案名：天母森光住宅新建工程 ｜ 業主專區
                  </p>
                </div>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="d-inline-flex align-items-center gap-2 border-0 bg-transparent"
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C5A880'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  <ArrowLeft size={16} /> 登出系統
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-1 mb-5 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3" style={{ backgroundColor: 'rgba(197, 168, 128, 0.05)', border: '1px solid rgba(197, 168, 128, 0.15)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(197,168,128,0.1)' }}>
                    <Activity size={24} style={{ color: '#C5A880' }} />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>系統升級預覽中</h3>
                    <p className="mb-0 text-muted" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>南源正全力打造一站式工程數位看板，以下功能現正進行最終模組調試。</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-pill" style={{ fontSize: '11px', color: '#050505', backgroundColor: '#C5A880', fontWeight: 500 }}>功能建置中</span>
              </div>

              {/* Grid of 6 Cards */}
              <div className="row g-4">
                {portalFeatures.map((feat, i) => (
                  <div className="col-12 col-md-6 col-lg-4" key={i}>
                    <div 
                      className="p-4 p-lg-5 h-100 rounded-1 position-relative overflow-hidden" 
                      style={{ 
                        backgroundColor: '#0D0D0E', 
                        border: '1px solid rgba(197, 168, 128, 0.15)', 
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      {/* Top Row */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(197, 168, 128, 0.05)' }}>
                          {feat.icon}
                        </div>
                        <span className="px-2 py-0.5 animate-pulse" style={{ fontSize: '9px', color: '#C5A880', border: '1px solid rgba(197,168,128,0.3)', backgroundColor: 'rgba(197,168,128,0.05)' }}>
                          功能建置中
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mb-2" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{feat.title}</h3>
                      <p className="mb-0" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{feat.desc}</p>
                      
                      {/* Under Construction overlay style hint */}
                      <div className="position-absolute bottom-0 end-0 p-3" style={{ opacity: 0.15 }}>
                        <Lock size={48} style={{ color: '#fff' }} />
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
