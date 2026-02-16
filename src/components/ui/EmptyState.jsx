import React from 'react';
import { Search, MapPin, Heart, MessageSquare, FileQuestion } from 'lucide-react';

const illustrations = {
  search: Search,
  location: MapPin,
  favorites: Heart,
  chat: MessageSquare,
  default: FileQuestion,
};

export default function EmptyState({ 
  type = 'default',
  title = 'Không có dữ liệu',
  description = 'Chưa có nội dung để hiển thị',
  action = null 
}) {
  const Icon = illustrations[type] || illustrations.default;
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-heritage-red-100 to-heritage-gold-100 dark:from-heritage-red-900/30 dark:to-heritage-gold-900/30 flex items-center justify-center mb-6 animate-float">
        <Icon className="w-12 h-12 text-heritage-red-600 dark:text-heritage-gold-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-heritage-red-600 to-heritage-red-700 text-white rounded-xl hover:from-heritage-red-700 hover:to-heritage-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

