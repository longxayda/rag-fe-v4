import React from 'react';
import { motion } from 'framer-motion';

/**
 * FavoriteButton Component
 * 
 * Toggle favorite status for items
 * Features: Animated heart icon, toggle state, customizable size
 */
const FavoriteButton = ({ isFavorite, onToggle, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  return (
    <motion.button
      onClick={onToggle}
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-full transition-all ${
        isFavorite
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800'
      } shadow-lg backdrop-blur-sm`}
      whileTap={{ scale: 0.9 }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.svg
        className={`${iconSizes[size]} ${
          isFavorite ? 'text-white' : 'text-gray-600 dark:text-gray-400'
        }`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: isFavorite ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>

      {/* Ripple effect on click */}
      {isFavorite && (
        <motion.span
          className="absolute inset-0 rounded-full bg-red-400"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

export default FavoriteButton;

