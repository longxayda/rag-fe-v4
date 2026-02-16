import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { COMMUNES } from '../../data/communes';

// Helper function to get ranking options with i18n
const getRankingOptions = (t) => [
  { value: '', label: t('heritage.allRankings') },
  { value: 'Quốc gia đặc biệt', label: t('heritage.nationalSpecial') },
  { value: 'Quốc gia', label: t('heritage.national') },
  { value: 'Cấp tỉnh', label: t('heritage.provincial') },
];

// Helper function to get type options with i18n
const getTypeOptions = (t) => [
  { value: '', label: t('heritage.allTypes') },
  { value: 'heritage', label: t('heritage.heritageType') },
  { value: 'historical-site', label: t('heritage.historicalSiteType') },
  { value: 'cuisine', label: t('heritage.cuisineType') },
  { value: 'music', label: t('heritage.musicType') },
  { value: 'fine-arts', label: t('heritage.fineArtsType') },
  { value: 'literature', label: t('heritage.literatureType') },
  { value: 'geography', label: t('heritage.geographyType') },
];

// Helper function to get sort options with i18n
const getSortOptions = (t) => [
  { value: 'name-asc', label: t('heritage.sortNameAsc') },
  { value: 'name-desc', label: t('heritage.sortNameDesc') },
  { value: 'ranking', label: t('heritage.sortRanking') },
];

export default function FilterPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  communes = [],
}) {
  const { t } = useTranslation();

  // Get translated options
  const rankingOptions = getRankingOptions(t);
  const typeOptions = getTypeOptions(t);
  const sortOptions = getSortOptions(t);

  // Use all 64 communes from communes.js instead of only communes with data
  const allCommunes = COMMUNES;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto lg:relative lg:shadow-none lg:z-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t('common.filter')}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onReset}
                    className="p-2 text-gray-500 hover:text-heritage-red-600 transition-colors"
                    title={t('heritage.resetFilters')}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('heritage.typeFilter')}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => onFilterChange('type', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-red-500"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ranking Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('heritage.rankingFilter')}
                </label>
                <div className="space-y-2">
                  {rankingOptions.map(option => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="ranking"
                        value={option.value}
                        checked={filters.ranking === option.value}
                        onChange={(e) => onFilterChange('ranking', e.target.value)}
                        className="w-4 h-4 text-heritage-red-600 focus:ring-heritage-red-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Commune Filter - Show all 64 communes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('heritage.communeFilter')}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    ({t('heritage.communeCount')})
                  </span>
                </label>
                <select
                  value={filters.commune}
                  onChange={(e) => onFilterChange('commune', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-red-500"
                >
                  <option value="">{t('heritage.allCommunes')}</option>
                  {allCommunes.map(commune => (
                    <option key={commune} value={commune}>
                      {commune}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('heritage.sortBy')}
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => onFilterChange('sort', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-red-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Button (Mobile) */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-heritage-red-600 text-white rounded-xl font-medium hover:bg-heritage-red-700 transition-colors lg:hidden"
              >
                {t('heritage.applyFilters')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
