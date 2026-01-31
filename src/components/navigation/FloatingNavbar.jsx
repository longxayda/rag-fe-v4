import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

import { 
  Home, BookOpen, Map, MessageSquare, Gamepad2, 
  Globe, Moon, Sun, Menu, X
} from 'lucide-react';

export default function FloatingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const langRef = useRef(null);
  

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Trang chủ' },
    { path: '/heritage', icon: BookOpen, label: 'Di sản' },
    { path: '/map', icon: Map, label: 'Bản đồ' },
    { path: '/chat', icon: MessageSquare, label: 'Trò chuyện' },
    { path: '/quiz', icon: Gamepad2, label: 'Đố vui' },
  ];

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => 
      item.path === '/' 
        ? location.pathname === '/' 
        : location.pathname.startsWith(item.path)
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

  const itemWidth = 100 / navItems.length;
  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  const handleNavClick = (index) => {
    setActiveIndex(index);
    navigate(navItems[index].path); // Actually navigate!
  };


  const changeLanguage = (code) => {
    setCurrentLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(100%);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .nav-enter {
          animation: slideUp 0.3s ease-out forwards;
        }

        .nav-exit {
          animation: slideDown 0.3s ease-out forwards;
        }

        .overlay-enter {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .overlay-exit {
          animation: fadeOut 0.2s ease-out forwards;
        }
      `}</style>

      {/* Desktop Floating Nav */}
      <nav className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-full px-3 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <button onClick={() => handleNavClick(0)} className="flex items-center gap-2 pr-3 border-r border-gray-200/50 dark:border-gray-700/50 shrink-0">
            <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
              CM
            </div>
            <div className="leading-tight hidden lg:block">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 font-serif tracking-tight whitespace-nowrap">
                GDĐP Tỉnh Cà Mau
              </p>
            </div>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-0.5">
            {navItems.map(({ icon: Icon, label }, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(index)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-red-700 dark:text-yellow-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ transform: isActive ? 'scale(0.95)' : 'scale(1)' }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} fill={isActive ? 'currentColor' : 'none'} />
                  <span className="text-xs font-medium whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200/50 dark:bg-gray-700/50 mx-1" />

          {/* Theme Toggle */}
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button> */}

          {/* Language Dropdown */}
          {/* <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{currentLang?.flag}</span>
            </button>
            
            {isLangOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                      currentLanguage === lang.code ? 'text-red-600 dark:text-yellow-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </nav>

      {/* Mobile Floating Nav - IMPROVED */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="px-3 pb-3">
          <div className="flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Animated indicator pill */}
            <div
              className="absolute top-2 bottom-2 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl shadow-md transition-all duration-300 ease-out"
              style={{
                left: `calc(${activeIndex * itemWidth}% + 6px)`,
                width: `calc(${itemWidth}% - 12px)`,
              }}
            />

            {/* Navigation items */}
            <div className="flex items-center justify-around relative z-10 w-full py-2.5 px-1">
              {navItems.map(({ icon: Icon, label }, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleNavClick(index)}
                    className="flex flex-col items-center justify-center flex-1 px-1 py-2 relative min-h-[56px] active:scale-95 transition-transform"
                  >
                    <div
                      style={{
                        transform: isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
                        transition: 'all 0.25s ease-out'
                      }}
                    >
                      <Icon
                        className={`w-6 h-6 transition-colors duration-200 ${
                          isActive
                            ? 'text-white stroke-[2.5]'
                            : 'text-gray-500 dark:text-gray-400 stroke-[2]'
                        }`}
                        fill={isActive ? 'currentColor' : 'none'}
                      />
                    </div>
                    <span
                      className={`text-[10px] mt-1 font-medium transition-all duration-200 leading-tight ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-gray-500 dark:text-gray-400 opacity-85'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}

              {/* Menu button for settings */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col items-center justify-center px-2 py-2 min-h-[56px] active:scale-95 transition-transform"
              >
                <div
                  style={{
                    transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s'
                  }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium text-gray-500 dark:text-gray-400 leading-tight">
                  Thêm
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - IMPROVED */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40 overlay-enter"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 nav-enter">
            <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-t-3xl shadow-2xl">
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>

              <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Cài đặt
                  </h3>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Theme Toggle */}
                {/* <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Chế độ tối
                    </span>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-14 h-7 rounded-full transition-colors relative ${
                      isDarkMode ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 bg-white rounded-full shadow-md absolute top-0.5 flex items-center justify-center transition-all duration-300"
                      style={{ left: isDarkMode ? '30px' : '2px' }}
                    >
                      {isDarkMode ? (
                        <Moon className="w-3 h-3 text-red-600" />
                      ) : (
                        <Sun className="w-3 h-3 text-gray-600" />
                      )}
                    </div>
                  </button>
                </div> */}

                {/* Language Selection */}
                {/* <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngôn ngữ
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { changeLanguage(lang.code); setIsMobileMenuOpen(false); }}
                        className={`py-3.5 text-xs font-semibold rounded-2xl transition-all flex flex-col items-center gap-1.5 active:scale-95 ${
                          currentLanguage === lang.code
                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-bold">{lang.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Bottom spacing */}
                <div className="h-4"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}