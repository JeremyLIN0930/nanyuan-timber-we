import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '80px', paddingBottom: '32px' }}>
      <div className="container px-3 px-md-4">
        {/* Global CTA Block */}
        <div className="text-center pb-5 mb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: '#C5A880', textShadow: '0 0 35px rgba(197,168,128,0.4)', letterSpacing: '-0.02em' }}>
            準備好開始您的空間改造了嗎？
          </h2>
          <p className="mx-auto mb-4" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.8 }}>
            結合木材背景與工藝，南源從設計、選材到施工，提供一條龍的高級室內裝修落地服務。
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link
              to="/contact"
              className="px-4 py-2.5 transition-all font-bold"
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                backgroundColor: '#C5A880',
                color: '#050505',
                border: '1px solid #C5A880',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(197, 168, 128, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              立即預約諮詢 ➔
            </Link>
            <Link
              to="/projects"
              className="px-4 py-2.5 transition-all font-light"
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                backgroundColor: 'transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              查看作品案例
            </Link>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 transition-all font-light d-inline-flex align-items-center gap-2"
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                border: '1px solid #06C755',
                color: '#06C755',
                backgroundColor: 'transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 199, 85, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              加入 LINE 詢問
            </a>
          </div>
        </div>

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
