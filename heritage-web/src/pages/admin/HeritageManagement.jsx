import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Landmark,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  MapPin,
  Calendar,
  Award,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  FileText,
  Eye
} from 'lucide-react';

// Import components
import MarkdownEditor from '../../components/admin/MarkdownEditor';
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard';

// Import initial data
import initialHeritagesData from '../../data/heritages.json';

const STORAGE_KEY = 'heritage_admin_heritages';

const rankingTypes = [
  { value: 'Quốc gia đặc biệt', label: 'Quốc gia đặc biệt' },
  { value: 'Quốc gia', label: 'Quốc gia' },
  { value: 'Cấp tỉnh', label: 'Cấp tỉnh' },
  { value: 'Không', label: 'Không xếp hạng' },
];

export default function HeritageManagement() {
  const { t } = useTranslation();
  const [heritages, setHeritages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'analytics'
  const itemsPerPage = 10;

  // Load heritages from localStorage or use initial data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHeritages(JSON.parse(stored));
      } catch (e) {
        setHeritages(initialHeritagesData || []);
      }
    } else {
      setHeritages(initialHeritagesData || []);
    }
  }, []);

  // Save to localStorage whenever heritages change
  const saveHeritages = (newHeritages) => {
    setHeritages(newHeritages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHeritages));
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter heritages based on search
  const filteredHeritages = heritages.filter(heritage => {
    const searchLower = searchQuery.toLowerCase();
    return (
      heritage.name?.toLowerCase().includes(searchLower) ||
      heritage.address?.toLowerCase().includes(searchLower) ||
      heritage.rankingType?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredHeritages.length / itemsPerPage);
  const paginatedHeritages = filteredHeritages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle create new
  const handleCreate = () => {
    setFormData({
      id: Date.now(),
      name: '',
      address: '',
      commune: '',
      yearRanked: '',
      rankingType: 'Cấp tỉnh',
      yearBuilt: '',
      information: '',
      notes: '',
      audioFile: '',
      youtubeUrl: '',
      image: ''
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  // Handle edit
  const handleEdit = (heritage) => {
    setFormData({ ...heritage });
    setSelectedHeritage(heritage);
    setIsEditing(true);
    setIsCreating(false);
  };

  // Handle view
  const handleView = (heritage) => {
    setSelectedHeritage(heritage);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Handle save
  const handleSave = () => {
    if (!formData.name || !formData.address) {
      showNotification('Vui lòng điền đầy đủ tên và địa chỉ!', 'error');
      return;
    }

    if (isCreating) {
      // Add new heritage
      const newHeritages = [...heritages, formData];
      saveHeritages(newHeritages);
      showNotification('Đã thêm di sản mới thành công!', 'success');
    } else {
      // Update existing heritage
      const newHeritages = heritages.map(h =>
        h.id === formData.id ? formData : h
      );
      saveHeritages(newHeritages);
      showNotification('Đã cập nhật di sản thành công!', 'success');
    }

    setIsCreating(false);
    setIsEditing(false);
    setSelectedHeritage(null);
  };

  // Handle delete
  const handleDelete = (heritage) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${heritage.name}"?`)) {
      const newHeritages = heritages.filter(h => h.id !== heritage.id);
      saveHeritages(newHeritages);
      showNotification('Đã xóa di sản thành công!', 'success');
      setSelectedHeritage(null);
      setIsEditing(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedHeritage(null);
    setFormData({});
  };

  // Export data
  const handleExport = () => {
    const dataStr = JSON.stringify(heritages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `heritages_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showNotification('Đã xuất dữ liệu thành công!', 'success');
  };

  // Import data
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          saveHeritages(imported);
          showNotification('Đã nhập dữ liệu thành công!', 'success');
        } else {
          showNotification('File không đúng định dạng!', 'error');
        }
      } catch (error) {
        showNotification('Lỗi khi đọc file!', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Reset to initial data
  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục dữ liệu gốc? Mọi thay đổi sẽ bị mất!')) {
      saveHeritages(initialHeritagesData || []);
      showNotification('Đã khôi phục dữ liệu gốc!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Landmark className="w-8 h-8 text-blue-600" />
                Quản Lý Di Sản Văn Hóa
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tổng số: {heritages.length} di sản
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                Danh Sách
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Phân Tích
              </button>
            </div>
          </div>

          {/* Actions */}
          {activeTab === 'list' && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm Mới
              </button>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Xuất JSON
              </button>

              <label className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Nhập JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Khôi Phục Gốc
              </button>
            </div>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Content */}
        {activeTab === 'analytics' ? (
          <AnalyticsDashboard heritages={heritages} />
        ) : (
          <>
            {/* Search and Filter */}
            {!isCreating && !isEditing && !selectedHeritage && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, địa chỉ, loại xếp hạng..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* List View */}
            {!isCreating && !isEditing && !selectedHeritage && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tên Di Sản
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Địa Chỉ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Xếp Hạng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedHeritages.map((heritage) => (
                        <tr
                          key={heritage.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {heritage.id}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              {heritage.name}
                              {heritage.audioFile && (
                                <span className="text-purple-500" title="Có audio">🔊</span>
                              )}
                              {heritage.youtubeUrl && (
                                <span className="text-red-500" title="Có video">🎬</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {heritage.address?.substring(0, 50)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                heritage.rankingType?.includes('đặc biệt')
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : heritage.rankingType?.includes('Quốc gia')
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : heritage.rankingType?.includes('tỉnh')
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}
                            >
                              {heritage.rankingType || 'Chưa xếp hạng'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleView(heritage)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                title="Xem"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(heritage)}
                                className="text-green-600 hover:text-green-800 dark:text-green-400"
                                title="Sửa"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(heritage)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{' '}
                      {Math.min(currentPage * itemsPerPage, filteredHeritages.length)} trong số{' '}
                      {filteredHeritages.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View Detail */}
            {selectedHeritage && !isEditing && !isCreating && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedHeritage.name}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(selectedHeritage)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Chỉnh Sửa
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Đóng
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Địa chỉ
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedHeritage.address}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Năm xây dựng
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedHeritage.yearBuilt || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Năm xếp hạng
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedHeritage.yearRanked || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Loại xếp hạng
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedHeritage.rankingType}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Thông tin chi tiết
                    </label>
                    <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {selectedHeritage.information || 'Chưa có thông tin'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Create/Edit Form */}
            {(isCreating || isEditing) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isCreating ? 'Thêm Di Sản Mới' : 'Chỉnh Sửa Di Sản'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tên Di Sản *
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nhập tên di sản..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Địa Chỉ *
                      </label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nhập địa chỉ..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Xã/Phường
                      </label>
                      <input
                        type="text"
                        value={formData.commune || ''}
                        onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Xã/Phường..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Loại Xếp Hạng
                      </label>
                      <select
                        value={formData.rankingType || ''}
                        onChange={(e) => setFormData({ ...formData, rankingType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        {rankingTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Năm Xây Dựng
                      </label>
                      <input
                        type="number"
                        value={formData.yearBuilt || ''}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) || null })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="YYYY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Năm Xếp Hạng
                      </label>
                      <input
                        type="number"
                        value={formData.yearRanked || ''}
                        onChange={(e) => setFormData({ ...formData, yearRanked: parseInt(e.target.value) || null })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>

                  {/* Media */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        File Audio
                      </label>
                      <input
                        type="text"
                        value={formData.audioFile || ''}
                        onChange={(e) => setFormData({ ...formData, audioFile: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="audio.wav"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        YouTube URL
                      </label>
                      <input
                        type="text"
                        value={formData.youtubeUrl || ''}
                        onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://youtube.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hình Ảnh URL
                      </label>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isCreating ? 'Thêm Mới' : 'Lưu Thay Đổi'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}