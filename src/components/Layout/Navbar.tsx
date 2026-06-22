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
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top nyn-navbar ${scrolled ? 'nyn-navbar--scrolled' : ''}`}>
      <div className="container-fluid px-3 px-md-5">

        {/* Brand */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="navbar-brand nyn-navbar-brand"
        >
          <span className="nyn-navbar-brand-zh">南源木材</span>
          <span className="nyn-navbar-brand-en">NANYUAN TIMBER DESIGN</span>
        </Link>

        {/* Hamburger Toggler Button */}
        <button
          className="navbar-toggler nyn-navbar-toggle"
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          aria-controls="nanyuanNavbarCollapse"
          aria-expanded={isOpen}
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

        {/* Collapsible Menu links */}
        <div className={`collapse navbar-collapse nyn-navbar-collapse ${isOpen ? 'show' : ''}`} id="nanyuanNavbarCollapse">
          <div className="navbar-nav ms-auto align-items-lg-center nyn-navbar-links">
            {NAV_LINKS.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link nyn-navbar-link ${active ? 'nyn-navbar-link--active' : ''}`}
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

          {/* Desktop CTA Button */}
          <div className="d-none d-lg-block nyn-navbar-cta-wrapper">
            <Link to="/contact" className="btn nyn-navbar-cta">
              立即預約
            </Link>
          </div>

          {/* Mobile CTA inside collapsed menu */}
          <div className="d-lg-none w-100 nyn-mobile-cta-wrapper">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn nyn-mobile-cta"
            >
              立即預約諮詢 ➔
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;