import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

/* ═══════════════════════════════════════════════════════════════
   CTA.tsx — 全站共用「準備好開始您的空間改造了嗎？」預約引導組件
   ─────────────────────────────────────────────────────────────
   此組件僅由 Footer.tsx 引入渲染一次，
   所有分頁（Home, About, Services, Quality, Knowledge…）
   不得再手動寫入或 import 任何重複的 CTA 區塊。
═══════════════════════════════════════════════════════════════ */

const CTA: React.FC = () => {
  return (
    <section className="global-cta" aria-label="預約服務引導區">
      <div className="container px-3 px-md-4">
        <div className="global-cta-inner">

          {/* ── Eyebrow ornament ── */}
          <div className="global-cta-eyebrow">
            <div className="global-cta-eyebrow-line" />
            <span className="global-cta-eyebrow-text">START YOUR JOURNEY</span>
            <div className="global-cta-eyebrow-line" />
          </div>

          {/* ── Main heading ── */}
          <h2 className="global-cta-title">
            準備好開始您的空間改造了嗎？
          </h2>

          {/* ── Subtitle ── */}
          <p className="global-cta-desc">
            結合木材背景與工藝，南源從設計、選材到施工，提供一條龍的高級室內裝修落地服務。
          </p>

          {/* ── Three CTA buttons ── */}
          <nav className="global-cta-buttons" aria-label="預約服務快速連結">

            {/* Primary — gold fill */}
            <Link
              to="/contact"
              className="global-cta-btn global-cta-btn--primary"
            >
              立即預約諮詢 ➜
            </Link>

            {/* Secondary — outline */}
            <Link
              to="/projects"
              className="global-cta-btn global-cta-btn--secondary"
            >
              查看作品案例
            </Link>

            {/* LINE — green accent on hover */}
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="global-cta-btn global-cta-btn--line"
            >
              加入 LINE 詢問
            </a>

          </nav>

        </div>
      </div>
    </section>
  );
};

export default CTA;
