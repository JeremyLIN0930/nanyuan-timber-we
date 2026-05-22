import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Info } from 'lucide-react';
import './ClientPortal.css';

const ClientPortal: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('工程進度與報價單查詢系統建置中，敬請期待。');
  };

  return (
    <motion.div 
      className="portal-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="portal-overlay">
        <motion.div 
          className="login-box"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="login-header">
            <h2>客戶專屬專區</h2>
            <p>登入以查看您的工程進度、圖面與報價單</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>客戶帳號 (專案編號或 Email)</label>
              <div className="input-with-icon">
                <User size={20} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="輸入您的帳號" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>密碼</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="輸入您的密碼" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" /> 記住我
              </label>
              <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>忘記密碼？</a>
            </div>

            <button type="submit" className="btn btn-primary login-btn">登入系統</button>
          </form>

          <div className="portal-notice">
            <Info size={16} />
            <p>系統目前正在升級建置中。若需查詢進度，請先透過專屬 LINE 群組與您的專案經理聯繫，謝謝您的包容與配合。</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientPortal;
