import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD      = '#C5A880';
const GOLD_GLOW = 'rgba(197,168,128,0.7)';

/* ═══════════════════════════════════════════════════════════════
   NAV LINKS
   每條連結只定義一次，mobile 與 desktop 共用同一份資料。
═══════════════════════════════════════════════════════════════ */
interface NavLink {
  name: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { name: '首頁',     path: '/'        },
  { name: '關於南源', path: '/about'   },
  { name: '服務項目', path: '/services'},
  { name: '作品案例', path: '/projects'},
  { name: '施工流程', path: '/process' },
  { name: '品質控管', path: '/quality' },
  { name: '裝修知識', path: '/blog'    },
  { name: '預約諮詢', path: '/contact' },
];

/* ═══════════════════════════════════════════════════════════════
   NAVBAR COMPONENT
═══════════════════════════════════════════════════════════════ */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  /* ── Auto-close mobile menu on route change ── */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* ── Detect scroll to add stronger backdrop ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ════════════════════════════════════════════════════
          TOP BAR  — position:fixed, z-index:9999
          Frosted obsidian glass bar, always on top.
      ════════════════════════════════════════════════════ */}
      <nav
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          9999,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         'clamp(12px,1.8vh,18px) clamp(16px,4vw,48px)',
          backgroundColor: scrolled
            ? 'rgba(5,5,5,0.95)'
            : 'rgba(5,5,5,0.82)',
          backdropFilter:  'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom:    '1px solid rgba(255,255,255,0.05)',
          transition:      'background-color 0.4s ease',
        }}
      >

        {/* ── Brand ── */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}
        >
          <span style={{
            fontSize:      'clamp(1.05rem,2.2vw,1.45rem)',
            fontWeight:    900,
            letterSpacing: '-0.03em',
            color:         '#fff',
            lineHeight:    1,
          }}>
            南源木材
          </span>
          <span style={{
            fontSize:      '8.5px',
            fontWeight:    300,
            letterSpacing: '0.28em',
            color:         GOLD,
            textTransform: 'uppercase',
            marginTop:     '4px',
            display:       'block',
          }}>
            NANYUAN TIMBER DESIGN
          </span>
        </Link>

        {/* ── Desktop Inline Links  (≥ 992px) ── */}
        <div
          style={{
            display:    'none',
            alignItems: 'center',
            gap:        'clamp(18px,2.5vw,32px)',
          }}
          className="d-none d-lg-flex"
        >
          {NAV_LINKS.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize:      '12.5px',
                  fontWeight:    active ? 900 : 300,
                  letterSpacing: '0.1em',
                  color:         active ? GOLD : 'rgba(255,255,255,0.55)',
                  textShadow:    active ? `0 0 20px ${GOLD_GLOW}` : 'none',
                  textDecoration: 'none',
                  position:      'relative',
                  paddingBottom: '2px',
                  transition:    'color 0.35s cubic-bezier(0.16,1,0.3,1), text-shadow 0.35s',
                  whiteSpace:    'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color      = GOLD;
                    (e.currentTarget as HTMLElement).style.textShadow = `0 0 16px ${GOLD_GLOW}`;
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color      = 'rgba(255,255,255,0.55)';
                    (e.currentTarget as HTMLElement).style.textShadow = 'none';
                  }
                }}
              >
                {link.name}

                {/* Active underline wire */}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position:        'absolute',
                      bottom:          '-4px',
                      left:            0,
                      right:           0,
                      height:          '1px',
                      background:      `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                      boxShadow:       `0 0 8px rgba(197,168,128,0.8)`,
                      borderRadius:    '2px',
                      display:         'block',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── CTA Button (desktop) ── */}
        <div className="d-none d-lg-flex">
          <Link
            to="/contact"
            style={{
              fontSize:        '11.5px',
              fontWeight:      900,
              letterSpacing:   '0.14em',
              padding:         '9px 22px',
              border:          `1px solid ${GOLD}`,
              color:           '#050505',
              backgroundColor: GOLD,
              textDecoration:  'none',
              whiteSpace:      'nowrap',
              transition:      'box-shadow 0.3s',
              textTransform:   'uppercase',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 22px rgba(197,168,128,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            立即預約
          </Link>
        </div>

        {/* ── Hamburger  (< 992px) ── */}
        <button
          className="d-lg-none"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          style={{
            background:  'none',
            border:      'none',
            padding:     '4px',
            cursor:      'pointer',
            color:       isOpen ? GOLD : '#fff',
            transition:  'color 0.3s',
            lineHeight:  0,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90,  opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'block', lineHeight: 0 }}
              >
                <X size={26} strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate:  90, opacity: 0 }}
                animate={{ rotate:  0,  opacity: 1 }}
                exit={{   rotate: -90,  opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'block', lineHeight: 0 }}
              >
                <Menu size={26} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

      </nav>
      {/* END TOP BAR */}


      {/* ════════════════════════════════════════════════════
          MOBILE FULLSCREEN OVERLAY  (< 992px)
          position:fixed, inset:0, z-index:9998
          Sits just below the top bar (9999).
          AnimatePresence handles smooth fade-in / fade-out.
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          9998,
              backgroundColor: 'rgba(5,5,5,0.98)',
              backdropFilter:  'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'flex-start',
              justifyContent:  'center',
              padding:         'clamp(80px,12vh,120px) clamp(24px,8vw,60px) clamp(40px,8vh,80px)',
            }}
          >

            {/* Link list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.4rem,3.5vh,2rem)', width: '100%' }}>
              {NAV_LINKS.map((link, index) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -32, y: 0 }}
                    animate={{ opacity: 1, x: 0,   y: 0 }}
                    exit={{   opacity: 0, x: -16,  y: 0 }}
                    transition={{
                      delay:    index * 0.055 + 0.08,
                      duration: 0.5,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      style={{
                        fontSize:      'clamp(1.55rem,5.5vw,2rem)',
                        fontWeight:    900,
                        letterSpacing: '-0.025em',
                        color:         active ? GOLD : '#fff',
                        textShadow:    active ? `0 0 32px ${GOLD_GLOW}` : 'none',
                        textDecoration: 'none',
                        display:       'inline-block',
                        transform:     active ? 'translateX(18px)' : 'translateX(0)',
                        transition:    'color 0.4s cubic-bezier(0.16,1,0.3,1), text-shadow 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color      = GOLD;
                          (e.currentTarget as HTMLElement).style.textShadow = `0 0 32px ${GOLD_GLOW}`;
                          (e.currentTarget as HTMLElement).style.transform  = 'translateX(18px)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color      = '#fff';
                          (e.currentTarget as HTMLElement).style.textShadow = 'none';
                          (e.currentTarget as HTMLElement).style.transform  = 'translateX(0)';
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{   opacity: 0         }}
              transition={{ delay: NAV_LINKS.length * 0.055 + 0.15, duration: 0.5 }}
              style={{ marginTop: 'clamp(2rem,5vh,3rem)' }}
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{
                  display:         'inline-block',
                  fontSize:        'clamp(0.8rem,3vw,0.95rem)',
                  fontWeight:      900,
                  letterSpacing:   '0.16em',
                  padding:         '0.85em 2.4em',
                  border:          `1px solid ${GOLD}`,
                  color:           '#050505',
                  backgroundColor: GOLD,
                  textDecoration:  'none',
                  textTransform:   'uppercase',
                  transition:      'box-shadow 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(197,168,128,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                立即預約諮詢 ➔
              </Link>
            </motion.div>

            {/* Footer credit */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                position:      'absolute',
                bottom:        'clamp(1.5rem,4vh,2.5rem)',
                left:          'clamp(24px,8vw,60px)',
                fontSize:      '9.5px',
                fontWeight:    300,
                letterSpacing: '0.28em',
                color:         'rgba(255,255,255,0.14)',
                textTransform: 'uppercase',
                margin:        0,
              }}
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