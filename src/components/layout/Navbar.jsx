import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, Mail, Mountain,
  MapPin, Clock, Search, ArrowRight, Compass
} from 'lucide-react';
import { navLinks, contactInfo } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { useScrollY } from '../../hooks/useScrollY';
import Button from '../ui/Button';

/* ── Badge chip inside dropdown ─────────────────────── */
const DropdownBadge = ({ label }) => {
  const colorMap = {
    Popular: 'bg-primary-100 text-primary-700',
    Hard: 'bg-red-100 text-red-600',
    Easy: 'bg-green-100 text-green-700',
    Scenic: 'bg-accent/20 text-amber-700',
  };
  return (
    <span className={cn('ml-auto text-2xs px-2 py-0.5 rounded-full font-semibold', colorMap[label])}>
      {label}
    </span>
  );
};

/* ── Mega Dropdown (Desktop) ─────────────────────────── */
const MegaDropdown = ({ items, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] glass-light rounded-3xl shadow-glass-lg border border-white/60 p-4 z-50"
      >
        {/* Arrow */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-white/60 rounded-sm" />
        
        <p className="text-2xs font-bold text-dark-400 uppercase tracking-widest px-2 mb-3">
          All Himalayan Treks
        </p>
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-dark-700 
                         hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150 group"
            >
              <Compass className="w-3.5 h-3.5 text-dark-300 group-hover:text-primary-500 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && <DropdownBadge label={item.badge} />}
            </Link>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-dark-100">
          <Link
            to="/treks"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl
                       bg-primary-600 text-white text-sm font-semibold
                       hover:bg-primary-700 transition-colors duration-200"
          >
            View All Treks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── Mobile Drawer ─────────────────────────────────────── */
const MobileDrawer = ({ isOpen, onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { onClose(); }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-dark-900/60 backdrop-blur-sm z-70"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-80 bg-white z-80 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-dark-100">
              <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-dark-900 leading-none">SummitSeek</p>
                  <p className="text-2xs text-dark-400 mt-0.5">Adventures</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-dark-100 flex items-center justify-center
                           text-dark-500 hover:bg-dark-200 hover:text-dark-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === link.label ? null : link.label)
                        }
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                                   text-dark-700 font-semibold hover:bg-primary-50 hover:text-primary-700
                                   transition-colors duration-150"
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: expandedItem === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {expandedItem === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden ml-4 border-l-2 border-primary-100 pl-3 mb-1"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm
                                           text-dark-600 hover:text-primary-700 hover:bg-primary-50
                                           transition-colors duration-150"
                              >
                                <Compass className="w-3.5 h-3.5 flex-shrink-0 text-dark-300" />
                                <span>{item.label}</span>
                                {item.badge && (
                                  <DropdownBadge label={item.badge} />
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center px-4 py-3 rounded-xl font-semibold transition-colors duration-150',
                          isActive
                            ? 'bg-primary-600 text-white'
                            : 'text-dark-700 hover:bg-primary-50 hover:text-primary-700'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact info at bottom */}
            <div className="p-4 border-t border-dark-100 space-y-2.5 bg-surface">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-dark-400 font-medium">Call Us Free</p>
                  <p className="text-sm font-bold text-dark-800">{contactInfo.phone}</p>
                </div>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                           bg-primary-600 text-white font-semibold text-sm
                           hover:bg-primary-700 transition-colors"
                onClick={onClose}
              >
                Plan Your Trek <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ── Main Navbar ─────────────────────────────────────────── */
export default function Navbar() {
  const scrollY = useScrollY();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();

  const isScrolled = scrollY > 60;
  const isHeroPage = location.pathname === '/';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navBg = isScrolled || !isHeroPage
    ? 'bg-white/95 shadow-md border-b border-white/50'
    : 'bg-transparent';

  const linkColor = isScrolled || !isHeroPage
    ? 'text-dark-700 hover:text-primary-600'
    : 'text-white/90 hover:text-white';

  const logoColor = isScrolled || !isHeroPage ? 'text-dark-900' : 'text-white';
  const subColor = isScrolled || !isHeroPage ? 'text-dark-400' : 'text-white/60';

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isHeroPage ? 'backdrop-blur-md' : 'backdrop-blur-0'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={cn('transition-all duration-300', navBg)}>
          <div className="section-container">
            <div className="flex items-center justify-between h-18">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 
                             flex items-center justify-center shadow-md"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Mountain className="w-5.5 h-5.5 text-white" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <p className={cn('text-lg font-bold leading-none tracking-tight transition-colors duration-300', logoColor)}>
                    SummitSeek
                  </p>
                  <p className={cn('text-2xs font-medium transition-colors duration-300', subColor)}>
                    Adventures
                  </p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                {navLinks.map((link) => (
                  <div key={link.path} className="relative">
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === link.label ? null : link.label)
                          }
                          className={cn(
                            'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold',
                            'transition-all duration-200 hover:bg-white/10',
                            activeDropdown === link.label
                              ? isScrolled || !isHeroPage
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-white bg-white/15'
                              : linkColor
                          )}
                          aria-expanded={activeDropdown === link.label}
                          aria-haspopup="true"
                        >
                          {link.label}
                          <motion.span
                            animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.span>
                        </button>
                        <MegaDropdown
                          items={link.dropdown}
                          isOpen={activeDropdown === link.label}
                        />
                      </>
                    ) : (
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) =>
                          cn(
                            'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                            isActive
                              ? isScrolled || !isHeroPage
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-white bg-white/15'
                              : cn(linkColor, 'hover:bg-white/10')
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {/* Search toggle */}
                <div className="relative hidden md:block" ref={searchRef}>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                      isScrolled || !isHeroPage
                        ? 'text-dark-600 hover:bg-dark-100'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )}
                    aria-label="Search"
                  >
                    <Search className="w-4.5 h-4.5" />
                  </motion.button>

                  <AnimatePresence>
                    {searchOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-72 glass-light rounded-2xl shadow-glass p-3 border border-white/60"
                      >
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search treks..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-50 border border-dark-200
                                       text-sm text-dark-800 placeholder:text-dark-400
                                       focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                             bg-primary-600 text-white hover:bg-primary-700 shadow-md
                             transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Book a Trek
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Mobile menu button */}
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setDrawerOpen(true)}
                  className={cn(
                    'lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                    isScrolled || !isHeroPage
                      ? 'text-dark-700 bg-dark-100 hover:bg-dark-200'
                      : 'text-white bg-white/10 hover:bg-white/20'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
