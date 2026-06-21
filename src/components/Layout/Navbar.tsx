import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

/* ═══════════════════════════════════════════════════════════════
   NAV LINKS — 施工流程已合併至服務項目
═══════════════════════════════════════════════════════════════ */
interface NavLink {
  name: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { name: '首頁',     path: '/'          },
  { name: '關於南源', path: '/about'     },
  { name: '服務項目', path: '/services'  },
  { name: '作品案例', path: '/projects'  },
  { name: '品質控管', path: '/quality'   },
  { name: '裝修知識', path: '/knowledge' },
  { name: '預約諮詢', path: '/contact'   },
];

/* ═══════════════════════════════════════════════════════════════
   NAVBAR COMPONENT
   ─────────────────────────────────────────────────────────────
   Zero inline styles. All visual properties in Navbar.css.
═══════════════════════════════════════════════════════════════ */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ═══ TOP BAR ═══ */}
      <nav className={`nyn-navbar ${scrolled ? 'nyn-navbar--scrolled' : ''}`}>

        {/* Brand */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="nyn-navbar-brand"
        >
          <span className="nyn-navbar-brand-zh">南源木材</span>
          <span className="nyn-navbar-brand-en">NANYUAN TIMBER DESIGN</span>
        </Link>

        {/* Desktop Inline Links (≥992px) */}
        <div className="nyn-navbar-links">
          {NAV_LINKS.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nyn-navbar-link ${active ? 'nyn-navbar-link--active' : ''}`}
              >
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nyn-navbar-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button (desktop) */}
        <div className="nyn-navbar-cta-wrapper">
          <Link to="/contact" className="nyn-navbar-cta">
            立即預約
          </Link>
        </div>

        {/* Hamburger (<992px) */}
        <button
          className="nyn-navbar-toggle"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90,  opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="nyn-navbar-toggle-icon"
              >
                <X size={28} strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate:  90, opacity: 0 }}
                animate={{ rotate:  0,  opacity: 1 }}
                exit={{   rotate: -90,  opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="nyn-navbar-toggle-icon"
              >
                <Menu size={28} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ═══ MOBILE FULLSCREEN OVERLAY ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            className="nyn-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nyn-mobile-links">
              {NAV_LINKS.map((link, index) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{   opacity: 0, x: -16 }}
                    transition={{
                      delay:    index * 0.055 + 0.08,
                      duration: 0.5,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`nyn-mobile-link ${active ? 'nyn-mobile-link--active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.055 + 0.15, duration: 0.5 }}
              className="nyn-mobile-cta-wrapper"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="nyn-mobile-cta"
              >
                立即預約諮詢 ➔
              </Link>
            </motion.div>

            {/* Footer credit */}
            <motion.p
              className="nyn-mobile-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              © 2026 NANYUAN TIMBER DESIGN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;