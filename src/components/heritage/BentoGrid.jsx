import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, ArrowRight } from 'lucide-react';
import { FavoriteButton } from '../ui';

const rankingColors = {
  'Quốc gia đặc biệt': 'from-heritage-red-600 to-heritage-red-800',
  'Quốc gia': 'from-heritage-gold-500 to-heritage-gold-700',
  'Cấp tỉnh': 'from-green-500 to-green-700',
};

const rankingBadgeColors = {
  'Quốc gia đặc biệt': 'bg-heritage-red-600 text-white',
  'Quốc gia': 'bg-heritage-gold-500 text-heritage-red-900',
  'Cấp tỉnh': 'bg-green-600 text-white',
};

function BentoCard({ heritage, index, variant = 'normal', onClick }) {
  const isFeatured = variant === 'featured';
  const isWide = variant === 'wide';
  const isTall = variant === 'tall';

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.05, duration: 0.4 }
    }
  };

  const gridClasses = isFeatured
    ? 'md:col-span-2 md:row-span-2'
    : isWide
      ? 'md:col-span-2'
      : isTall
        ? 'md:row-span-2'
        : '';

  const heightClasses = isFeatured
    ? 'min-h-[400px] md:min-h-[450px]'
    : isTall
      ? 'min-h-[350px]'
      : 'min-h-[280px]';

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(heritage);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`group relative overflow-hidden rounded-2xl ${gridClasses}`}
    >
      <div onClick={handleClick} className="block h-full cursor-pointer">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${rankingColors[heritage.rankingType] || 'from-gray-600 to-gray-800'}`}>
          {heritage.image && (
            <img
              src={heritage.image}
              alt={heritage.name}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
              loading="lazy"
            />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton heritageId={heritage.id} size="md" />
        </div>

        {/* Content */}
        <div className={`relative z-10 p-5 md:p-6 h-full flex flex-col justify-end ${heightClasses}`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 w-fit ${rankingBadgeColors[heritage.rankingType] || 'bg-gray-600 text-white'}`}>
            <Award className="w-3.5 h-3.5" />
            {heritage.rankingType || 'Di sản'}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white mb-2 group-hover:text-heritage-gold-400 transition-colors line-clamp-2 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {heritage.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{heritage.address || heritage.commune}</span>
          </div>

          {/* Description (featured only) */}
          {isFeatured && heritage.information && (
            <p className="text-white/60 text-sm mb-4 line-clamp-2">
              {heritage.information.substring(0, 120)}...
            </p>
          )}

          {/* View More */}
          <div className="flex items-center gap-2 text-heritage-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Xem chi tiết</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid({ heritages = [], items = [], showFeatured = true, onClick }) {
  const displayItems = items.length > 0 ? items : heritages;
  if (displayItems.length === 0) return null;

  // Assign variants based on position and ranking
  const getVariant = (heritage, index) => {
    if (index === 0 && showFeatured) return 'featured';
    if (heritage.rankingType === 'Quốc gia đặc biệt' && index < 5) return 'wide';
    if (heritage.rankingType === 'Quốc gia' && index % 7 === 3) return 'tall';
    return 'normal';
  };

  return (
    <div className="bento-grid">
      {displayItems.map((heritage, index) => (
        <BentoCard
          key={heritage.id}
          heritage={heritage}
          index={index}
          variant={getVariant(heritage, index)}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

