import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Home, BookOpen, Map, MessageSquare, Gamepad2, 
  Globe, Moon, Sun, Menu, X, ChevronUp 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function FloatingNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langRef = useRef(null);

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/heritage', icon: BookOpen, label: t('nav.heritage') },
    { path: '/map', icon: Map, label: t('nav.map') },
    { path: '/chat', icon: MessageSquare, label: t('nav.chat') },
    { path: '/quiz', icon: Gamepad2, label: t('nav.quiz') },
  ];

  // Find active index based on current path
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => 
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const itemWidth = 100 / navItems.length;

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <>
      {/* Desktop Floating Nav */}
      <nav className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-full px-3 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pr-3 border-r border-gray-200/50 dark:border-gray-700/50 shrink-0">
            <img src="/logo-camau.svg" alt="GDĐP Tỉnh Cà Mau" className="w-8 h-8" />
            <div className="leading-tight hidden lg:block">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 font-serif tracking-tight whitespace-nowrap">
                GDĐP Tỉnh Cà Mau
              </p>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-0.5">
            {navItems.map(({ path, icon: Icon, label }, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-heritage-gold-100 dark:bg-heritage-gold-900/30 text-heritage-red-700 dark:text-heritage-gold-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-heritage-red-600 dark:hover:text-heritage-gold-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} fill={isActive ? 'currentColor' : 'none'} />
                  <span className="text-xs font-medium whitespace-nowrap">{label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200/50 dark:bg-gray-700/50 mx-1" />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{currentLang?.flag}</span>
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 min-w-[140px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setIsLangOpen(false); }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                        currentLanguage === lang.code ? 'text-heritage-red-600 dark:text-heritage-gold-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Nav */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-3">
        <div
          className="flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Animated indicator pill */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 bg-gradient-to-br from-heritage-gold-400 to-heritage-gold-500 dark:from-heritage-gold-500 dark:to-heritage-gold-600 rounded-full shadow-lg"
            animate={{
              left: `calc(${activeIndex * itemWidth}% + 4px)`,
              width: `calc(${itemWidth}% - 8px)`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />

          {/* Navigation items */}
          <div className="flex items-center justify-around relative z-10 w-full py-2">
            {navItems.map(({ path, icon: Icon, label }, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center justify-center flex-1 px-1 py-1.5 relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive
                          ? 'text-heritage-red-700 dark:text-heritage-red-800 stroke-[2.5]'
                          : 'text-gray-500 dark:text-gray-400 stroke-[2]'
                      }`}
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                  </motion.div>
                  <motion.span
                    className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-heritage-red-700 dark:text-heritage-red-800'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    animate={{ fontWeight: isActive ? 600 : 500 }}
                  >
                    {label}
                  </motion.span>
                </motion.button>
              );
            })}

            {/* Menu button for settings */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col items-center justify-center px-2 py-1.5"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
              <span className="text-[10px] mt-0.5 font-medium text-gray-500 dark:text-gray-400">
                {t('nav.more') || 'More'}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:hidden z-50"
            >
              <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-t-3xl shadow-2xl p-5 space-y-5 max-h-[50vh] overflow-y-auto">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.darkMode') || 'Dark Mode'}</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-heritage-gold-500' : 'bg-gray-300'}`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5"
                      animate={{ left: isDarkMode ? '26px' : '2px' }}
                    />
                  </button>
                </div>

                {/* Language Selection */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('settings.language') || 'Language'}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { changeLanguage(lang.code); setIsMobileMenuOpen(false); }}
                        className={`py-2.5 text-xs font-semibold rounded-xl transition-colors flex flex-col items-center gap-1 ${
                          currentLanguage === lang.code
                            ? 'bg-heritage-red-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-heritage-gold-100 dark:hover:bg-heritage-gold-900/30'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

