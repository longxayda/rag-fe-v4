import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BentoGrid } from '../components/heritage';
import { EmptyState } from '../components/ui';

/**
 * FavoritesPage Component
 * 
 * Displays user's favorite heritage items
 * Features: Favorites list, grid view, remove favorites
 */
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('heritage_favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (heritageId) => {
    const updatedFavorites = favorites.filter(item => item.id !== heritageId);
    setFavorites(updatedFavorites);
    localStorage.setItem('heritage_favorites', JSON.stringify(updatedFavorites));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Di Sản Yêu Thích
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {favorites.length > 0
              ? `Bạn có ${favorites.length} di sản yêu thích`
              : 'Chưa có di sản yêu thích nào'}
          </p>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BentoGrid
              items={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              showRemoveButton={true}
            />
          </motion.div>
        ) : (
          <EmptyState
            icon="❤️"
            title="Chưa có di sản yêu thích"
            description="Bắt đầu khám phá và thêm các di sản văn hóa vào danh sách yêu thích của bạn"
            actionText="Khám phá di sản"
            actionLink="/heritage"
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

