import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const routeNames = {
  '': 'Trang chủ',
  'heritage': 'Di sản',
  'map': 'Bản đồ',
  'timeline': 'Dòng thời gian',
  'about': 'Giới thiệu',
  'chat': 'Trò chuyện AI',
  'quiz': 'Đố vui',
  'tts': 'Đọc văn bản',
  'contribute': 'Đóng góp',
  'favorites': 'Yêu thích',
  'admin': 'Quản trị',
};

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link 
        to="/"
        className="flex items-center text-gray-500 hover:text-heritage-red-600 dark:text-gray-400 dark:hover:text-heritage-gold-400 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[name] || name;
        
        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-heritage-red-600 dark:text-heritage-gold-400 font-medium">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-500 hover:text-heritage-red-600 dark:text-gray-400 dark:hover:text-heritage-gold-400 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

