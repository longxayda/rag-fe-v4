import { useState, useMemo, useEffect } from 'react';
import { Search, Grid, List, MapPin, Landmark, RotateCcw, Calendar, ChevronRight, ChevronsRight, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeritageDetailModal } from '../components/Detail';
import { MusicGallery } from './MusicGallery';
import { FineArtsGallery } from './FineArtGallery';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// --- Helper Functions ---
const getItemCommune = (item) => item.commune || '';

export const formatCategoryLabel = (value) => {
  switch (value) {
    case 'di_san': return 'Di sản';
    case 'di_tich': return 'Di tích';
    case 'cong_trinh_nghe_thuat': return 'Công trình nghệ thuật';
    default: return value;
  }
};

export const getCategoryBadgeStyle = (category) => {
  switch (category) {
    case 'di_san': return 'bg-blue-600 text-white';
    case 'di_tich': return 'bg-emerald-600 text-white';
    case 'cong_trinh_nghe_thuat': return 'bg-purple-600 text-white';
    default: return 'bg-gray-600 text-white';
  }
};

// --- Placeholder Components ---



// --- Component Chính ---
export default function HeritageListPage() {
  const [filters, setFilters] = useState({ ranking: '', type: '', commune: '', category: '' });
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // State quản lý Tab & Filter Panel
  const [activeTab, setActiveTab] = useState('Di sản');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // API state
  const [heritageData, setHeritageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 });

  const navTabs = ['Di sản', 'Âm Nhạc', 'Mỹ thuật'];

  const handleCloseModal = () => setSelectedItem(null);

  useEffect(() => {
    if (activeTab === 'Di sản') {
      const fetchHeritageData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`${API_BASE_URL}/heritages?page=${pagination.page}&limit=${pagination.limit}`);
          if (!response.ok) throw new Error('Failed to fetch heritage data');
          const result = await response.json();
          setHeritageData(result.data || []);
          setPagination(prev => ({ ...prev, total: result.pagination.total, totalPages: result.pagination.totalPages }));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHeritageData();
    }
  }, [pagination.page, pagination.limit, activeTab]);

  const filteredData = useMemo(() => {
    return heritageData.filter(item => {
      const matchesRanking = !filters.ranking || item.ranking_type === filters.ranking;
      const matchesCategory = !filters.category || item.category === filters.category;
      const itemCommune = getItemCommune(item);
      const matchesCommune = !filters.commune || itemCommune.toLowerCase().includes(filters.commune.toLowerCase());
      const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRanking && matchesCategory && matchesCommune && matchesSearch;
    });
  }, [heritageData, filters, searchQuery]);

  const availableCommunes = useMemo(() => Array.from(new Set(heritageData.map(getItemCommune).filter(Boolean))).sort(), [heritageData]);
  const availableRankings = useMemo(() => Array.from(new Set(heritageData.map(i => i.ranking_type).filter(Boolean))).sort(), [heritageData]);
  const availableCategories = useMemo(() => Array.from(new Set(heritageData.map(i => i.category).filter(Boolean))), [heritageData]);

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const clearFilters = () => { setFilters({ ranking: '', type: '', category: '', commune: '' }); setSearchQuery(''); };

  const PaginationControl = () => (
    <div className="flex items-center justify-center">
      {[1, 2, 3].map(num => (
        <button
          key={num}
          onClick={() => setPagination(prev => ({ ...prev, page: num }))}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${pagination.page === num
              ? 'bg-gray-200 text-gray-600 font-bold shadow-md'
              : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
            }`}
        >
          {num}
        </button>
      ))}
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors">
        <ChevronRight size={18} />
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors">
        <ChevronsRight size={18} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">

      {/* 1. Header Title Section */}
      <div className="max-w-[1400px] mx-auto px-4 pt-8">
        <h1 className="text-4xl font-extrabold text-black mb-6 tracking-tight">Di Sản Văn Hóa</h1>

        {/* Navigation & Toolbar Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-0 gap-4 mb-4">

          {/* Left: Navigation Tabs */}
          <div className="flex items-center gap-8 -mb-[1px]">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[15px] font-medium transition-all relative ${activeTab === tab
                    ? 'text-[#0077D4] font-bold border-b-[3px] border-[#0077D4]'
                    : 'text-gray-500 hover:text-[#0077D4] border-b-[3px] border-transparent'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right: Search & Filter Toggle (Chỉ hiện ở Tab Di sản) */}
          {activeTab === 'Di sản' && (
            <div className="flex items-center gap-3 pb-3">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:border-[#0077D4] focus:ring-1 focus:ring-[#0077D4] outline-none w-48 transition-all focus:w-64"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all border ${isFilterOpen
                    ? 'bg-[#0077D4] text-white border-[#0077D4]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {isFilterOpen ? <X size={16} /> : <Filter size={16} />}
                <span>Bộ lọc</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Collapsible Filter Panel (Full Width) */}
        <AnimatePresence>
          {isFilterOpen && activeTab === 'Di sản' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-b border-gray-100 bg-gray-50/50"
            >
              <div className="py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Địa điểm', value: filters.commune, key: 'commune', options: availableCommunes, display: (v) => v },
                  { label: 'Cấp độ', value: filters.ranking, key: 'ranking', options: availableRankings, display: (v) => v },
                  { label: 'Phân loại', value: filters.category, key: 'category', options: availableCategories, display: formatCategoryLabel }
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{field.label}</label>
                    <div className="relative">
                      <select
                        value={field.value}
                        onChange={(e) => handleFilterChange(field.key, e.target.value)}
                        className="w-full p-2.5 pl-3 pr-8 text-sm border border-gray-200 rounded-lg bg-white focus:border-[#0077D4] focus:ring-1 focus:ring-[#0077D4] outline-none appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                      >
                        <option value="">Tất cả</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{field.display(opt)}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full py-2.5 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Đặt lại bộ lọc
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Sub-Header: Pagination & View Mode */}
        {activeTab === 'Di sản' && (
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">
                Hiển thị <span className="text-black font-bold">{filteredData.length}</span> kết quả
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="scale-90 origin-right">
                <PaginationControl />
              </div>
              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-[#0077D4]' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={18} /></button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-[#0077D4]' : 'text-gray-400 hover:text-gray-600'}`}><List size={18} /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <main>
          {/* === RENDER LOGIC: DI SẢN === */}
          {activeTab === 'Di sản' && (
            <>
              {loading ? (
                <div className="text-center py-20"><p>Đang tải dữ liệu...</p></div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1'}`}
                  >
                    {filteredData.map(item => (
                      <motion.div
                        layout
                        key={item.id}
                        className="group bg-white rounded-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src={item.image_url || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-[#1EC6B6]/90 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold shadow-sm">
                            {item.ranking_type}
                          </div>
                          {item.category && (
                            <div className={`absolute top-3 right-3 px-3 py-1 rounded text-xs font-bold shadow-sm backdrop-blur-sm ${getCategoryBadgeStyle(item.category)}`}>
                              {formatCategoryLabel(item.category)}
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2 leading-tight group-hover:text-[#0077D4] transition-colors line-clamp-2 min-h-[40px]">
                            {item.name}
                          </h3>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2 text-gray-500 text-xs">
                              <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{item.commune}, {item.district}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span>Năm công nhận: {item.year_ranked || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="w-full flex justify-center pt-8 border-t border-gray-100 mt-8">
                <PaginationControl />
              </div>
            </>
          )}

          {/* === RENDER LOGIC: ÂM NHẠC === */}
          {activeTab === 'Âm Nhạc' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <MusicGallery />
            </motion.div>
          )}

          {/* === RENDER LOGIC: MỸ THUẬT === */}
          {activeTab === 'Mỹ thuật' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <FineArtsGallery />
            </motion.div>
          )}
        </main>
      </div>

      {selectedItem && (
        <HeritageDetailModal
          itemId={selectedItem.id}
          initialItem={selectedItem}
          onClose={handleCloseModal}
          language="vi"
        />
      )}
    </div>
  );
}