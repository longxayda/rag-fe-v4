import { useState, useMemo, useEffect } from 'react';
import { Search, Grid, List, MapPin, Landmark, X, RotateCcw, Calendar, Award, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getItemCommune = (item) => {
  return item.commune || '';
};

export default function HeritageListPage() {
  const [filters, setFilters] = useState({
    ranking: '',
    type: '',
    commune: '',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // API state
  const [heritageData, setHeritageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
    total: 0,
    totalPages: 0
  });

  // Fetch heritage data from API
  useEffect(() => {
    const fetchHeritageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${API_BASE_URL}/heritages?page=${pagination.page}&limit=${pagination.limit}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch heritage data');
        }
        
        const result = await response.json();
        setHeritageData(result.data || []);
        setPagination(prev => ({
          ...prev,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages
        }));
      } catch (err) {
        console.error('Failed to fetch heritage data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeritageData();
  }, [pagination.page, pagination.limit]);

  const filteredData = useMemo(() => {
    return heritageData.filter(item => {
      const matchesRanking = !filters.ranking || item.ranking_type === filters.ranking;
      const itemCommune = getItemCommune(item);
      const matchesCommune = !filters.commune || itemCommune.toLowerCase().includes(filters.commune.toLowerCase());
      const matchesSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.information && item.information.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesRanking && matchesCommune && matchesSearch;
    });
  }, [heritageData, filters, searchQuery]);

  const availableCommunes = useMemo(() => {
    const communesWithData = new Set(
      heritageData.map(item => getItemCommune(item)).filter(Boolean)
    );
    return Array.from(communesWithData).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [heritageData]);

  const availableRankings = useMemo(() => {
    const rankings = new Set(
      heritageData.map(item => item.ranking_type).filter(Boolean)
    );
    return Array.from(rankings).sort();
  }, [heritageData]);

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
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#FF4A52] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải dữ liệu di sản...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Lỗi Tải Dữ Liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#FF4A52] text-white rounded-lg font-medium hover:bg-[#e63e46] transition-colors"
          >
            Thử Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Di Sản Văn Hóa</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hover:text-[#FF4A52] transition-colors cursor-pointer">Trang Chủ</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Di Sản Văn Hóa</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter Panel */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Bộ Lọc Kết Quả</h3>
              
              <div className="space-y-6">
                {/* Search Input */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm từ khóa"
                      className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FF4A52] focus:border-[#FF4A52] outline-none transition-all"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Commune Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa Điểm</label>
                  <select 
                    value={filters.commune}
                    onChange={(e) => handleFilterChange('commune', e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#FF4A52] focus:border-[#FF4A52] transition-all"
                  >
                    <option value="">Chọn xã/phường</option>
                    {availableCommunes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Ranking Type Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cấp Di Sản</label>
                  <select 
                    value={filters.ranking}
                    onChange={(e) => handleFilterChange('ranking', e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#FF4A52] focus:border-[#FF4A52] transition-all"
                  >
                    <option value="">Tất cả cấp</option>
                    {availableRankings.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Reset Button */}
                <button
                  onClick={clearFilters}
                  className="w-full py-4 bg-[#FF4A52] hover:bg-[#e63e46] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Đặt Lại Bộ Lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Main Results Area */}
          <main className="flex-1">
            {/* Sort & View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-gray-600 font-medium">
                Hiển thị <span className="text-[#FF4A52] font-bold">{filteredData.length}</span> kết quả
              </p>
              
              <div className="flex items-center gap-4 bg-white p-1.5 rounded-lg border border-gray-200">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-red-50 text-[#FF4A52]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-red-50 text-[#FF4A52]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredData.map(item => (
                  <motion.div
                    layout
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Image Container with Badge */}
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <Landmark className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-[#1EC6B6] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md">
                        {item.ranking_type}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FF4A52] transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 text-[#FF4A52]" />
                        <span className="line-clamp-1">{item.commune}, {item.district}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {/* <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-sm">★</span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400 ml-1">(20 đánh giá)</span>
                        </div> */}
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year_ranked || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200"
              >
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-500 mb-6">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#FF4A52] text-white rounded-lg font-medium hover:bg-[#e63e46] transition-colors"
                >
                  Xóa Tất Cả Bộ Lọc
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-80 bg-gray-200">
                {selectedItem.image_url ? (
                  <img 
                    src={selectedItem.image_url} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Landmark className="w-24 h-24 text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-[#1EC6B6] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md inline-flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {selectedItem.ranking_type}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedItem.name}</h2>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#FF4A52]" />
                    <span>{selectedItem.address}</span>
                  </div>
                  {selectedItem.year_ranked && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-[#FF4A52]" />
                      <span>Xếp hạng năm {selectedItem.year_ranked}</span>
                    </div>
                  )}
                  {selectedItem.year_built && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Landmark className="w-5 h-5 text-[#FF4A52]" />
                      <span>Xây dựng năm {selectedItem.year_built}</span>
                    </div>
                  )}
                </div>

                {selectedItem.information && (
                  <div className="prose max-w-none mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Thông Tin</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedItem.information}
                    </p>
                  </div>
                )}

                {selectedItem.audio_url && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Hướng Dẫn Âm Thanh</h3>
                    <audio controls className="w-full">
                      <source src={selectedItem.audio_url} type="audio/wav" />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Chi Tiết Địa Điểm</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedItem.commune && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Xã/Phường</p>
                        <p className="font-medium text-gray-900">{selectedItem.commune}</p>
                      </div>
                    )}
                    {selectedItem.district && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Quận/Huyện</p>
                        <p className="font-medium text-gray-900">{selectedItem.district}</p>
                      </div>
                    )}
                    {selectedItem.province && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tỉnh/Thành phố</p>
                        <p className="font-medium text-gray-900">{selectedItem.province}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Cấp Di Sản</p>
                      <p className="font-medium text-gray-900">{selectedItem.ranking_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}