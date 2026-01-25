// Example Usage for SocialShare and FavoriteButton Components
// File: examples/ui-components-usage.jsx

import React from 'react';
import { SocialShare, FavoriteButton } from '../components/ui';

// ============================================
// Example 1: Heritage Detail Page
// ============================================
export function HeritageDetailExample({ heritage }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with favorite and share */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {heritage.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {heritage.location}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Favorite Button - Large with label */}
          <FavoriteButton 
            heritageId={heritage.id}
            size="lg"
            showLabel={true}
          />
          
          {/* Social Share - Compact mode */}
          <SocialShare 
            url={window.location.href}
            title={heritage.name}
            description={heritage.description}
            compact={true}
          />
        </div>
      </div>
      
      {/* Rest of content */}
      <img 
        src={heritage.image} 
        alt={heritage.name}
        className="w-full rounded-2xl mb-6"
      />
      <p className="text-gray-700 dark:text-gray-300">
        {heritage.description}
      </p>
      
      {/* Full social share at bottom */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Chia sẻ bài viết này</h3>
        <SocialShare 
          url={window.location.href}
          title={heritage.name}
          compact={false}
        />
      </div>
    </div>
  );
}

// ============================================
// Example 2: Heritage Card in Grid
// ============================================
export function HeritageCardExample({ heritage }) {
  return (
    <div className="relative glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
      {/* Favorite Button - Top right corner */}
      <FavoriteButton 
        heritageId={heritage.id}
        size="sm"
        className="absolute top-3 right-3 z-10"
      />
      
      <img 
        src={heritage.image} 
        alt={heritage.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{heritage.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {heritage.shortDescription}
        </p>
        
        {/* Share button at bottom */}
        <div className="flex justify-between items-center">
          <a href={`/heritage/${heritage.id}`} className="text-heritage-red-600 hover:underline">
            Xem chi tiết
          </a>
          <SocialShare 
            url={`${window.location.origin}/heritage/${heritage.id}`}
            title={heritage.name}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Example 3: Mobile-Optimized Layout
// ============================================
export function MobileHeritageExample({ heritage }) {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="glass-card overflow-hidden">
        <div className="relative">
          <img 
            src={heritage.image} 
            alt={heritage.name}
            className="w-full h-64 object-cover"
          />
          
          {/* Floating action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <FavoriteButton 
              heritageId={heritage.id}
              size="md"
            />
            <SocialShare 
              url={window.location.href}
              title={heritage.name}
              compact={true}
            />
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-3">{heritage.name}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {heritage.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Example 4: List View with Inline Actions
// ============================================
export function HeritageListItemExample({ heritage }) {
  return (
    <div className="glass-card p-4 flex gap-4 items-start hover:shadow-lg transition-shadow">
      <img 
        src={heritage.image} 
        alt={heritage.name}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-1 truncate">{heritage.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
          {heritage.description}
        </p>
        
        <div className="flex items-center gap-2">
          <FavoriteButton 
            heritageId={heritage.id}
            size="sm"
            showLabel={true}
          />
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <SocialShare 
          url={`${window.location.origin}/heritage/${heritage.id}`}
          title={heritage.name}
          compact={true}
        />
      </div>
    </div>
  );
}

// ============================================
// Example 5: Integration with Context
// ============================================
export function FavoritesPageExample() {
  const { favorites, removeFavorite } = useFavorites();
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Danh sách yêu thích</h1>
      
      {favorites.length === 0 ? (
        <EmptyState 
          type="favorites"
          title="Chưa có mục yêu thích"
          description="Hãy thêm các di sản bạn quan tâm vào danh sách yêu thích"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(heritage => (
            <div key={heritage.id} className="glass-card p-4">
              {/* Content */}
              <img src={heritage.image} alt={heritage.name} className="w-full h-48 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold mb-2">{heritage.name}</h3>
              
              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <FavoriteButton 
                  heritageId={heritage.id}
                  size="md"
                  showLabel={true}
                />
                <SocialShare 
                  url={`${window.location.origin}/heritage/${heritage.id}`}
                  title={heritage.name}
                  compact={true}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

