import React from 'react';
import { Link } from 'react-router-dom';
import CTA from '../CTA/CTA';

/* ═══════════════════════════════════════════════════════════════
   Footer.tsx — 南源木材全站頁尾
   ─────────────────────────────────────────────────────────────
   結構：
   1. <CTA /> 共用預約引導組件（唯一渲染點，禁止各分頁重複）
   2. 品牌資訊 + 快速連結 + 聯絡方式
   3. 版權聲明
═══════════════════════════════════════════════════════════════ */

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '32px' }}>

      {/* ══ 唯一全站共用 CTA 組件 ══ */}
      <CTA />

      <div className="container px-3 px-md-4" style={{ paddingTop: '80px' }}>

        <div className="row g-4 g-md-5 mb-5">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <h3 className="fw-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', letterSpacing: '-0.03em', color: '#C5A880', textShadow: '0 0 30px rgba(197,168,128,0.85)' }}>南源木材</h3>
            <p className="mb-3" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>NANYUAN TIMBER DESIGN</p>
            <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              源頭理解、細節品質、誠信透明<br/>
              設計、選材、施工一條龍整合服務
            </p>
          </div>

          {/* Links */}
          <div className="col-6 col-md-4">
            <h4 className="fw-bold mb-3" style={{ fontSize: '0.85rem', letterSpacing: '-0.02em', color: '#fff' }}>快速連結</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {[{ label: '首頁', path: '/' }, { label: '關於南源', path: '/about' }, { label: '作品案例', path: '/projects' }, { label: '預約諮詢', path: '/contact' }].map(link => (
                <li key={link.path}>
                  <Link to={link.path} style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s', textDecoration: 'none' }} onMouseEnter={e => (e.target as HTMLElement).style.color = '#C5A880'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-4">
            <h4 className="fw-bold mb-3" style={{ fontSize: '0.85rem', letterSpacing: '-0.02em', color: '#fff' }}>聯絡我們</h4>
            <div className="d-flex flex-column gap-2" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
              <p className="m-0">Email: contact@nanyuanwood.com.tw</p>
              <p className="m-0">Phone: (02) 2345-6789</p>
              <p className="m-0">Address: 台北市某某區某某路123號</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="m-0" style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
            &copy; {new Date().getFullYear()} NANYUAN TIMBER DESIGN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
