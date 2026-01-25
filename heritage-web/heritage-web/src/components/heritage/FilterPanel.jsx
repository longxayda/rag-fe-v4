import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FilterPanel Component
 * 
 * Filter controls for heritage items
 * Features: Category filter, search, region filter, sort options
 */
const FilterPanel = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'Di tích lịch sử', label: 'Di tích lịch sử' },
    { value: 'Di sản văn hóa', label: 'Di sản văn hóa' },
    { value: 'Di sản thiên nhiên', label: 'Di sản thiên nhiên' },
    { value: 'Lễ hội', label: 'Lễ hội' },
    { value: 'Nhân vật', label: 'Nhân vật' }
  ];

  const regions = [
    { value: 'all', label: 'Tất cả khu vực' },
    { value: 'Miền Bắc', label: 'Miền Bắc' },
    { value: 'Miền Trung', label: 'Miền Trung' },
    { value: 'Miền Nam', label: 'Miền Nam' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Tên A-Z' },
    { value: 'date', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến' }
  ];

  const handleSearchChange = (e) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ category });
  };

  const handleRegionChange = (e) => {
    onFilterChange({ region: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({
      category: 'all',
      region: 'all',
      searchQuery: '',
      sort: 'name'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Bộ Lọc
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-gray-600 dark:text-gray-400"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Nhập tên di sản..."
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Danh mục
            </label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    filters.category === cat.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Khu vực
            </label>
            <select
              value={filters.region || 'all'}
              onChange={handleRegionChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sắp xếp
            </label>
            <select
              value={filters.sort || 'name'}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterPanel;

