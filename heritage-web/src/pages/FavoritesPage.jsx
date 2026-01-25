import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, MapPin, Award, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import heritages from '../data/heritages.json';
import EmptyState from '../components/ui/EmptyState';

const rankingColors = {
  'Quốc gia đặc biệt': 'bg-heritage-red-600 text-white',
  'Quốc gia': 'bg-heritage-gold-500 text-heritage-red-900',
  'Cấp tỉnh': 'bg-green-600 text-white',
};

function FavoriteCard({ heritage, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-heritage-red-600 to-heritage-gold-500">
        {heritage.image && (
          <img
            src={heritage.image}
            alt={heritage.name}
            className="w-full h-full object-cover opacity-80"
          />
        )}
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(heritage.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        {/* Ranking Badge */}
        <div className={`absolute bottom-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${rankingColors[heritage.ranking] || 'bg-gray-600 text-white'}`}>
          <Award className="w-3 h-3" />
          {heritage.ranking}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-heritage-red-600 dark:group-hover:text-heritage-gold-400 transition-colors">
          {heritage.name}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{heritage.commune}, {heritage.district}</span>
        </div>
        
        <Link
          to={`/heritage/${heritage.id}`}
          className="inline-flex items-center gap-2 text-heritage-red-600 dark:text-heritage-gold-400 text-sm font-medium hover:gap-3 transition-all"
        >
          Xem chi tiết
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  
  const favoriteHeritages = heritages.filter(h => favorites.includes(h.id));

  return (
    <div className="min-h-screen bg-heritage-cream-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Heart className="w-8 h-8 text-heritage-red-600 fill-heritage-red-600" />
                Di Sản Yêu Thích
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Bạn có {favoriteHeritages.length} di sản đã lưu
              </p>
            </div>
            
            {favoriteHeritages.length > 0 && (
              <button
                onClick={clearFavorites}
                className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteHeritages.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favoriteHeritages.map(heritage => (
              <FavoriteCard
                key={heritage.id}
                heritage={heritage}
                onRemove={removeFavorite}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            type="favorites"
            title="Chưa có di sản yêu thích"
            description="Hãy khám phá và lưu những di sản bạn quan tâm"
            action={{
              label: 'Khám phá di sản',
              onClick: () => window.location.href = '/heritage'
            }}
          />
        )}
      </div>
    </div>
  );
}

