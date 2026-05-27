import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '關於南源', path: '/about' },
    { name: '服務項目', path: '/services' },
    { name: '作品案例', path: '/projects' },
    { name: '裝修知識', path: '/knowledge' },
    { name: '預約諮詢', path: '/contact' },
  ];

  return (
    <>
      {/* ═══ TOP BAR ═══ */}
      <nav
        className="navbar navbar-expand-lg fixed-top py-3 px-3 px-md-4 px-lg-5"
        style={{
          zIndex: 9999,
          backgroundColor: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="container-fluid px-2 px-md-3">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex flex-column p-0 m-0" onClick={() => setIsOpen(false)}>
            <span
              className="fw-bold lh-1"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.03em', color: '#fff' }}
            >
              南源木材
            </span>
            <span
              className="d-none d-sm-block mt-1"
              style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.25em', color: '#C5A880', textTransform: 'uppercase' }}
            >
              NANYUAN TIMBER DESIGN
            </span>
          </Link>

          {/* ─── Desktop Inline Links (lg+) ─── */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="position-relative"
                style={{
                  fontSize: '13px',
                  fontWeight: location.pathname === link.path ? 900 : 300,
                  letterSpacing: '0.12em',
                  color: location.pathname === link.path ? '#C5A880' : 'rgba(255,255,255,0.6)',
                  textShadow: location.pathname === link.path ? '0 0 20px rgba(197,168,128,0.7)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = '#C5A880';
                  (e.target as HTMLElement).style.textShadow = '0 0 20px rgba(197,168,128,0.7)';
                }}
                onMouseLeave={e => {
                  if (location.pathname !== link.path) {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    (e.target as HTMLElement).style.textShadow = 'none';
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ─── Mobile Hamburger Button (<lg) ─── */}
          <button
            className="d-lg-none border-0 bg-transparent p-0"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            style={{ color: isOpen ? '#C5A880' : '#fff', transition: 'color 0.3s' }}
          >
            {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* ═══ MOBILE FULLSCREEN OVERLAY (<lg) ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="d-flex d-lg-none flex-column align-items-center justify-content-center"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(5, 5, 5, 0.99)',
              backdropFilter: 'blur(40px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="d-flex flex-column align-items-start px-4 px-sm-5" style={{ gap: '2rem' }}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  className="position-relative"
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.07 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: location.pathname === link.path ? '#C5A880' : '#fff',
                      textShadow: location.pathname === link.path ? '0 0 30px rgba(197,168,128,0.85)' : 'none',
                      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                      display: 'inline-block',
                      transform: location.pathname === link.path ? 'translateX(16px)' : 'none',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.color = '#C5A880';
                      (e.target as HTMLElement).style.textShadow = '0 0 30px rgba(197,168,128,0.85)';
                      (e.target as HTMLElement).style.transform = 'translateX(16px)';
                    }}
                    onMouseLeave={e => {
                      if (location.pathname !== link.path) {
                        (e.target as HTMLElement).style.color = '#fff';
                        (e.target as HTMLElement).style.textShadow = 'none';
                        (e.target as HTMLElement).style.transform = 'none';
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="position-absolute bottom-0 start-0 end-0 text-center pb-4"
              style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              © 2026 NANYUAN TIMBER DESIGN
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
