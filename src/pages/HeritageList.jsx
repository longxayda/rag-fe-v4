import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Grid, List, MapPin, Landmark, X, Filter, Sparkles, LayoutGrid, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heritageApi from '../services/api';
import { PEOPLE_DATA } from '../data/people';
import { FESTIVAL_DATA } from '../data/festivals';

import { HeritageCard } from '../components/HeritageCard';
import { HeritageListItem } from '../components/HeritageItem';
import { HeritageDetailModal } from '../components/Detail';
import { BentoGrid, FilterPanel } from '../components/heritage';

// Helper function to normalize API response to match old data structure
function normalizeApiHeritage(item) {
  return {
    id: item.id,
    name: item.name?.trim() ?? '',
    address: item.address ?? '',
    commune: item.commune ?? '',
    district: item.district ?? '',
    province: item.province ?? '',
    yearRanked: item.year_ranked ?? null,
    rankingType: item.ranking_type ?? 'Unknown',
    yearBuilt: item.year_built ?? null,
    information: item.information ?? '',
    notes: item.notes ?? '',
    audioFile: item.audio_url ?? null,
    image: item.image_url ?? null
  };
}

const extractCommuneFromAddress = (address) => {
  if (!address) return '';
  const match = address.match(/(xã|phường)\s+([^,]+)/i);
  if (match) {
    const type = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    const name = match[2].trim();
    return `${type} ${name}`;
  }
  return '';
};

const getItemCommune = (item) => {
  if (item.commune) return item.commune;
  return extractCommuneFromAddress(item.address);
};

export default function HeritageListPage() {
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState({
    ranking: '',
    type: '',
    commune: '',
    sort: 'name-asc',
  });
  const [viewMode, setViewMode] = useState('bento');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // API state
  const [heritageData, setHeritageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100, // Load more items at once
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch heritage data from API
  useEffect(() => {
    const fetchHeritageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const lang = i18n.language || 'vi';
        const response = await heritageApi.getAll(lang, pagination.page, pagination.limit);
        // Normalize API data to match old structure
        const normalizedData = response.data.map(normalizeApiHeritage);
        setHeritageData(normalizedData);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages
        }));
      } catch (err) {
        console.error('Failed to fetch heritage data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeritageData();
  }, [i18n.language, pagination.page, pagination.limit]);

  const allData = useMemo(() => [
    ...heritageData.map(item => ({ ...item, dataType: 'heritage' })),
    ...PEOPLE_DATA.map(item => ({ ...item, dataType: 'people' })),
    ...FESTIVAL_DATA.map(item => ({ ...item, dataType: 'festival' }))
  ], [heritageData]);

  // Helper function to categorize heritage items based on their notes field
  const categorizeHeritageType = (notes) => {
    if (!notes) return 'heritage';

    const notesLower = notes.toLowerCase();

    if (notesLower.includes('di tích')) return 'historical-site';
    if (notesLower.includes('ẩm thực') || notesLower.includes('cuisine')) return 'cuisine';
    if (notesLower.includes('âm nhạc') || notesLower.includes('music')) return 'music';
    if (notesLower.includes('mỹ thuật') || notesLower.includes('fine arts')) return 'fine-arts';
    if (notesLower.includes('văn học') || notesLower.includes('literature')) return 'literature';
    if (notesLower.includes('địa lý') || notesLower.includes('geography')) return 'geography';

    return 'heritage';
  };

  const filteredData = useMemo(() => {
    return allData.filter(item => {
      // Filter by ranking type
      const matchesRanking = !filters.ranking || item.rankingType === filters.ranking;

      // Filter by type category
      let matchesType = true;
      if (filters.type) {
        if (item.dataType === 'heritage') {
          const itemCategory = categorizeHeritageType(item.notes);
          matchesType = itemCategory === filters.type || filters.type === 'heritage';
        } else {
          matchesType = false;
        }
      }

      // Filter by commune
      const itemCommune = getItemCommune(item);
      const matchesCommune = !filters.commune ||
        itemCommune.toLowerCase() === filters.commune.toLowerCase() ||
        itemCommune.toLowerCase().includes(filters.commune.toLowerCase());

      // Filter by search query
      const matchesSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesRanking && matchesType && matchesCommune && matchesSearch;
    });
  }, [allData, filters, searchQuery]);

  const availableCommunes = useMemo(() => {
    const communesWithData = new Set(
      allData
        .map(item => getItemCommune(item))
        .filter(Boolean)
    );
    return Array.from(communesWithData).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [allData]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      ranking: '',
      type: '',
      commune: '',
      sort: 'name-asc',
    });
    setSearchQuery('');
  };

  const hasActiveFilters = filters.ranking || filters.commune || filters.type || searchQuery;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-heritage-red-700 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('heritage.loading') || 'Đang tải dữ liệu di sản...'}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 glass rounded-2xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {t('heritage.error') || 'Lỗi tải dữ liệu'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-heritage-red-700 text-white rounded-lg font-medium hover:bg-heritage-red-800 transition-colors"
          >
            {t('heritage.retry') || 'Thử lại'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-transition">
      <div className="flex">
        {/* Filter Panel - Desktop Sidebar */}
        {!isMobile && (
          <div className="w-80 flex-shrink-0 p-4">
            <FilterPanel
              isOpen={true}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={clearFilters}
              communes={availableCommunes}
            />
          </div>
        )}

        {/* Filter Panel - Mobile Drawer */}
        {isMobile && (
          <FilterPanel
            isOpen={filterPanelOpen}
            onClose={() => setFilterPanelOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={clearFilters}
            communes={availableCommunes}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="relative glass rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden shadow-lg border border-heritage-gold-200/30 dark:border-gray-700">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-heritage-red-800/10 via-heritage-gold-500/10 to-heritage-red-800/10 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50" />

              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-lotus-pattern" />
              </div>

              {/* Gold accent lines */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-gold-400 via-heritage-gold-300 to-heritage-gold-400" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-gold-400 via-heritage-gold-300 to-heritage-gold-400" />

              <div className="relative z-10">
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-heritage-gold-500 flex items-center justify-center shadow-gold">
                        <Landmark className="w-7 h-7 sm:w-8 sm:h-8 text-heritage-red-800" />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-2 border-heritage-gold-400/50" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-heritage-red-800 dark:text-heritage-red-400 drop-shadow-sm">
                        {t('heritage.title')}
                      </h1>
                      <p className="text-heritage-earth-600 dark:text-gray-400 text-sm mt-1">
                        {t('heritage.subtitle')}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Filter Button */}
                  {isMobile && (
                    <button
                      onClick={() => setFilterPanelOpen(true)}
                      className="p-3 rounded-xl bg-heritage-red-700 text-white shadow-md hover:bg-heritage-red-800 transition-colors flex items-center gap-2"
                    >
                      <Filter className="w-5 h-5" />
                      {hasActiveFilters && (
                        <span className="w-2 h-2 bg-heritage-gold-400 rounded-full animate-pulse" />
                      )}
                    </button>
                  )}
                </div>

                {/* Search Bar and Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('heritage.searchPlaceholder')}
                      className="w-full px-5 py-3.5 pl-12 rounded-xl text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-heritage-gold-400 shadow-md placeholder-gray-400 dark:placeholder-gray-500 border border-heritage-gold-200 dark:border-gray-600"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-heritage-earth-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-heritage-earth-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-heritage-earth-500 dark:text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex gap-2 glass rounded-xl p-1 border border-heritage-gold-200/30 dark:border-gray-700">
                    <button
                      onClick={() => setViewMode('bento')}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === 'bento'
                          ? 'bg-heritage-red-700 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                      title="Bento Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span className="hidden sm:inline">Bento</span>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === 'grid'
                          ? 'bg-heritage-red-700 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === 'list'
                          ? 'bg-heritage-red-700 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                      <span className="hidden sm:inline">List</span>
                    </button>
                  </div>
                </div>

                {/* Active Filters Display */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 pt-4 border-t border-heritage-gold-200/30 dark:border-gray-700"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        {t('heritage.activeFilters')}:
                      </span>
                      {filters.ranking && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="px-3 py-1.5 bg-heritage-gold-100 dark:bg-heritage-gold-900/50 text-heritage-gold-800 dark:text-heritage-gold-200 rounded-full text-sm font-medium flex items-center gap-1.5 border border-heritage-gold-200 dark:border-heritage-gold-700"
                        >
                          🏛️ {filters.ranking}
                          <button onClick={() => handleFilterChange('ranking', '')} className="hover:bg-heritage-gold-200 dark:hover:bg-heritage-gold-800 rounded-full p-0.5 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.span>
                      )}
                      {filters.commune && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="px-3 py-1.5 bg-heritage-red-100 dark:bg-heritage-red-900/50 text-heritage-red-800 dark:text-heritage-red-200 rounded-full text-sm font-medium flex items-center gap-1.5 border border-heritage-red-200 dark:border-heritage-red-700"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {filters.commune}
                          <button onClick={() => handleFilterChange('commune', '')} className="hover:bg-heritage-red-200 dark:hover:bg-heritage-red-800 rounded-full p-0.5 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.span>
                      )}
                      {searchQuery && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium flex items-center gap-1.5 border border-gray-200 dark:border-gray-600"
                        >
                          🔍 "{searchQuery}"
                          <button onClick={() => setSearchQuery('')} className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative sparkle */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <Sparkles className="w-5 h-5 text-heritage-gold-400 animate-pulse" />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="glass rounded-xl shadow-sm border border-heritage-gold-200/30 dark:border-gray-700 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center px-3 sm:px-4 py-2 bg-heritage-red-50 dark:bg-heritage-red-900/30 rounded-lg border border-heritage-red-100 dark:border-heritage-red-800">
                    <div className="text-xl sm:text-2xl font-bold text-heritage-red-700 dark:text-heritage-red-400">{filteredData.length}</div>
                    <div className="text-xs text-heritage-red-600 dark:text-heritage-red-300 font-medium">{t('heritage.results')}</div>
                  </div>
                  <div className="text-center px-3 sm:px-4 py-2 bg-heritage-gold-50 dark:bg-heritage-gold-900/30 rounded-lg border border-heritage-gold-100 dark:border-heritage-gold-800">
                    <div className="text-xl sm:text-2xl font-bold text-heritage-gold-700 dark:text-heritage-gold-400">{availableCommunes.length}</div>
                    <div className="text-xs text-heritage-gold-600 dark:text-heritage-gold-300 font-medium">{t('heritage.communes')}</div>
                  </div>
                  <div className="hidden sm:block text-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">{pagination.total}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{t('heritage.totalHeritage')}</div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Landmark className="w-4 h-4 text-heritage-gold-500" />
                  <span>{viewMode === 'bento' ? 'Bento Grid' : viewMode === 'grid' ? 'Grid View' : 'List View'}</span>
                </div>
              </div>
            </div>

            {/* Heritage Grid/List/Bento */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'bento' ? (
                  <BentoGrid items={filteredData} onClick={handleItemClick} />
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map(item => (
                      <HeritageCard
                        key={`${item.dataType}-${item.id}`}
                        item={item}
                        onClick={handleItemClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredData.map(item => (
                      <HeritageListItem
                        key={`${item.dataType}-${item.id}`}
                        item={item}
                        onClick={handleItemClick}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {selectedItem && (
              <HeritageDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            )}

            {/* Empty State */}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 glass rounded-2xl shadow-sm border border-heritage-gold-200/30 dark:border-gray-700"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-heritage-red-100 to-heritage-gold-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    <Search className="w-10 h-10 text-heritage-red-600 dark:text-heritage-red-400" />
                  </div>
                  <div className="absolute -inset-2 rounded-full border-2 border-heritage-gold-300 dark:border-heritage-gold-600 opacity-50" />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {t('heritage.noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {filters.commune
                    ? t('heritage.noDataFor', { commune: filters.commune })
                    : t('heritage.tryDifferent')}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-heritage-red-700 text-white rounded-lg font-medium hover:bg-heritage-red-800 transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {t('heritage.resetFilters')}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}