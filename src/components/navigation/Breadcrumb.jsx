import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();

  // Mapping route names to translation keys
  const getRouteTranslation = (routeName) => {
    const routeKeyMap = {
      '': 'nav.home',
      'heritage': 'nav.heritage',
      'map': 'nav.map',
      'timeline': 'nav.timeline',
      'about': 'nav.about',
      'chat': 'nav.chat',
      'quiz': 'nav.quiz',
      'tts': 'nav.tts',
      'contribute': 'nav.contribute',
      'favorites': 'nav.favorites',
      'admin': 'nav.admin',
    };

    return routeKeyMap[routeName] ? t(routeKeyMap[routeName]) : routeName;
  };

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
        const displayName = getRouteTranslation(name);

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
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

