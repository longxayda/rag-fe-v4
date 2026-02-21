import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoriteButton({ 
  heritageId, 
  size = 'md',
  showLabel = false,
  className = '' 
}) {
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(heritageId);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const buttonSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(heritageId);
      }}
      className={`
        ${buttonSizes[size]} rounded-full transition-all duration-300
        ${isActive 
          ? 'bg-heritage-red-600 text-white shadow-lg' 
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 hover:bg-heritage-red-50 dark:hover:bg-heritage-red-900/20 hover:text-heritage-red-600'
        }
        ${className}
      `}
      aria-label={isActive ? t('common.removeFavorite') : t('common.addFavorite')}
    >
      <motion.div
        initial={false}
        animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`${sizes[size]} ${isActive ? 'fill-current' : ''}`} 
        />
      </motion.div>
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isActive ? t('common.favoriteActive') : t('common.favoriteInactive')}
        </span>
      )}
    </motion.button>
  );
}

