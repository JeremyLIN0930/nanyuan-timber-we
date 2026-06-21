import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CTA from '../CTA/CTA';
import './Footer.css';

/* ═══════════════════════════════════════════════════════════════
   Footer.tsx — 南源木材全站頁尾
   ─────────────────────────────────────────────────────────────
   結構：
   1. <CTA /> 共用預約引導組件（唯一渲染點，禁止各分頁重複）
      ⚠ 在 /contact（預約諮詢）頁面自動隱藏，
        因為使用者已在表單填寫流程中，不需重複引導。
   2. 品牌資訊 + 快速連結 + 聯絡方式
   3. 版權聲明
═══════════════════════════════════════════════════════════════ */

const Footer: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className="footer">

      {/* ══ 全站共用 CTA — 在預約諮詢頁面自動隱藏 ══ */}
      {!isContactPage && <CTA />}

      <div className="container px-3 px-md-4 footer__content">

        <div className="row g-4 g-md-5 mb-5">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <h3 className="fw-bold mb-2 footer__brand-title">南源木材</h3>
            <p className="mb-3 footer__brand-subtitle">NANYUAN TIMBER DESIGN</p>
            <p className="footer__brand-desc">
              源頭理解、細節品質、誠信透明<br/>
              設計、選材、施工一條龍整合服務
            </p>
          </div>

          {/* Links */}
          <div className="col-6 col-md-4">
            <h4 className="fw-bold mb-3 footer__section-title">快速連結</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {[{ label: '首頁', path: '/' }, { label: '關於南源', path: '/about' }, { label: '作品案例', path: '/projects' }, { label: '預約諮詢', path: '/contact' }].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-4">
            <h4 className="fw-bold mb-3 footer__section-title">聯絡我們</h4>
            <div className="d-flex flex-column gap-2 footer__contact-info">
              <p className="m-0">Email: contact@nanyuanwood.com.tw</p>
              <p className="m-0">Phone: (02) 2345-6789</p>
              <p className="m-0">Address: 台北市某某區某某路123號</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-4 footer__bottom">
          <p className="m-0 footer__copyright">
            &copy; {new Date().getFullYear()} NANYUAN TIMBER DESIGN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
