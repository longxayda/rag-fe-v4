import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../ui';

/**
 * BentoGrid Component
 * 
 * Masonry-style grid layout for heritage items
 * Features: Responsive grid, varied card sizes, smooth animations
 */
const BentoGrid = ({ items, onRemoveFavorite, showRemoveButton = false }) => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  // Function to determine card size class
  const getCardSizeClass = (index) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Large
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-2 md:row-span-1', // Wide
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-1', // Small
    ];
    return patterns[index % patterns.length];
  };

  const handleCardClick = (itemId) => {
    navigate(`/heritage/${itemId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`${getCardSizeClass(index)} group relative overflow-hidden rounded-2xl cursor-pointer`}
          onClick={() => handleCardClick(item.id)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={item.image || item.images?.[0] || '/placeholder.jpg'}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30">
                {item.category || 'Di sản'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {item.name}
            </h3>

            {/* Description (visible on larger cards) */}
            {getCardSizeClass(index).includes('span-2') && (
              <p className="text-white/90 text-sm line-clamp-2 mb-3">
                {item.description || item.significance || 'Khám phá di sản văn hóa Việt Nam'}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between text-white/80 text-xs">
              <span>{item.location?.address || 'Việt Nam'}</span>
              {item.yearBuilt && <span>📅 {item.yearBuilt}</span>}
            </div>
          </div>

          {/* Favorite/Remove Button */}
          <div
            className="absolute top-4 right-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {showRemoveButton ? (
              <button
                onClick={() => onRemoveFavorite(item.id)}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-lg"
                title="Xóa khỏi yêu thích"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <FavoriteButton
                isFavorite={false}
                onToggle={() => {}}
                size="small"
              />
            )}
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;

