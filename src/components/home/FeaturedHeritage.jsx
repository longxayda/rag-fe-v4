import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heritages from '../../data/heritages.json';

// Get top featured heritages (national special and national level)
const getFeaturedHeritages = () => {
  return heritages
    .filter(h => h.ranking === 'Quốc gia đặc biệt' || h.ranking === 'Quốc gia')
    .slice(0, 5);
};

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

function FeaturedCard({ heritage, index, isFeatured = false }) {
  const { t } = useTranslation();
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-2xl ${
        isFeatured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link to={`/heritage/${heritage.id}`}>
        {/* Background Image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${rankingColors[heritage.ranking] || 'from-gray-600 to-gray-800'}`}>
          {heritage.image && (
            <img
              src={heritage.image}
              alt={heritage.name}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
            />
          )}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className={`relative z-10 p-6 h-full flex flex-col justify-end ${
          isFeatured ? 'min-h-[400px] md:min-h-[500px]' : 'min-h-[250px]'
        }`}>
          {/* Ranking Badge */}
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${
            rankingBadgeColors[heritage.ranking] || 'bg-gray-600 text-white'
          }`}>
            <Award className="w-3 h-3" />
            {heritage.ranking}
          </div>
          
          {/* Title */}
          <h3 className={`font-bold text-white mb-2 group-hover:text-heritage-gold-400 transition-colors ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}>
            {heritage.name}
          </h3>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-white/70 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{heritage.commune}, {heritage.district}</span>
          </div>
          
          {/* Description (only for featured) */}
          {isFeatured && heritage.information && (
            <p className="text-white/60 text-sm mb-4 line-clamp-2">
              {heritage.information.substring(0, 150)}...
            </p>
          )}
          
          {/* View more */}
          <div className="flex items-center gap-2 text-heritage-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{t('home.featured.viewDetails')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedHeritage() {
  const { t } = useTranslation();
  const featured = getFeaturedHeritages();
  
  if (featured.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-red-100 dark:bg-heritage-red-900/30 text-heritage-red-700 dark:text-heritage-red-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            {t('home.featured.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.featured.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.featured.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((heritage, index) => (
            <FeaturedCard
              key={heritage.id}
              heritage={heritage}
              index={index}
              isFeatured={index === 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/heritage"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-heritage-red-600 to-heritage-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {t('home.featured.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

