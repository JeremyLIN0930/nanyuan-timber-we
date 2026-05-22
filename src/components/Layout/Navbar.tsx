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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '關於南源', path: '/about' },
    { name: '服務項目', path: '/services' },
    { name: '作品案例', path: '/projects' },
    { name: '預約諮詢', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar - always visible */}
      <nav className="fixed top-0 left-0 w-full z-[9999] py-5 px-6 md:px-12 flex justify-between items-center bg-obsidian/80 backdrop-blur-xl border-b border-white/5">
        <Link to="/" className="flex flex-col" onClick={() => setIsOpen(false)}>
          <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-white">
            南源木材
          </span>
          <span className="text-[9px] md:text-[10px] font-light tracking-[0.25em] mt-1 uppercase text-metal-brown">
            NANYUAN TIMBER DESIGN
          </span>
        </Link>
        
        <button 
          className="text-white hover:text-metal-brown transition-colors duration-300"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 9998, backgroundColor: 'rgba(5, 5, 5, 0.99)', backdropFilter: 'blur(40px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-start space-y-8 px-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  className="group"
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.07 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`inline-block text-2xl md:text-3xl font-black tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-metal-brown ${
                      location.pathname === link.path
                        ? 'text-metal-brown translate-x-4'
                        : 'text-white'
                    }`}
                    style={{
                      textShadow: location.pathname === link.path
                        ? '0 0 30px rgba(197, 168, 128, 0.85)'
                        : 'none',
                    }}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.textShadow = '0 0 30px rgba(197, 168, 128, 0.85)';
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== link.path) {
                        (e.target as HTMLElement).style.textShadow = 'none';
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="absolute bottom-10 text-xs font-light tracking-[0.3em] text-white/20 uppercase"
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
