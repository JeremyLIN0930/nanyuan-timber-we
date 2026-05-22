import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black tracking-tighter text-metal-brown glow-text mb-4">南源木材</h3>
            <p className="text-[10px] font-light tracking-[0.25em] uppercase text-white/30 mb-6">NANYUAN TIMBER DESIGN</p>
            <p className="text-sm font-light tracking-widest text-white/40 leading-relaxed">
              源頭理解、細節品質、誠信透明<br/>
              設計、選材、施工一條龍整合服務
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-black tracking-tighter text-white mb-6">快速連結</h4>
            <ul className="space-y-3">
              {[
                { label: '首頁', path: '/' },
                { label: '關於南源', path: '/about' },
                { label: '作品案例', path: '/projects' },
                { label: '預約諮詢', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-light tracking-widest text-white/40 hover:text-metal-brown transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black tracking-tighter text-white mb-6">聯絡我們</h4>
            <div className="space-y-3 text-sm font-light tracking-widest text-white/40">
              <p>Email: contact@nanyuanwood.com.tw</p>
              <p>Phone: (02) 2345-6789</p>
              <p>Address: 台北市某某區某某路123號</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-[11px] font-light tracking-[0.3em] text-white/15 uppercase">
            &copy; {new Date().getFullYear()} NANYUAN TIMBER DESIGN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
