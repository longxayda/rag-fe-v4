import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FavoriteButton, SocialShare, GlassCard } from '../components/ui';
import { Breadcrumb } from '../components/navigation';

/**
 * HeritageDetailPage Component
 * 
 * Detailed view of a heritage item
 * Features: Full information, images, map location, favorite/share actions
 */
const HeritageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heritage, setHeritage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load heritage data
    const loadHeritage = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/heritage/${id}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockData = {
          id: id,
          name: 'Di Sản Văn Hóa',
          category: 'Di tích lịch sử',
          description: 'Mô tả chi tiết về di sản văn hóa...',
          images: ['/placeholder.jpg'],
          location: {
            address: 'Hà Nội, Việt Nam',
            coordinates: { lat: 21.0285, lng: 105.8542 }
          },
          yearBuilt: '1900',
          significance: 'Ý nghĩa lịch sử và văn hóa...',
          status: 'Được bảo tồn tốt'
        };

        setHeritage(mockData);

        // Check if it's in favorites
        const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');
        setIsFavorite(favorites.some(item => item.id === id));
      } catch (error) {
        console.error('Error loading heritage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeritage();
  }, [id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');
    
    if (isFavorite) {
      const updated = favorites.filter(item => item.id !== id);
      localStorage.setItem('heritage_favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(heritage);
      localStorage.setItem('heritage_favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!heritage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Không tìm thấy di sản
          </h2>
          <button
            onClick={() => navigate('/heritage')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Di sản', path: '/heritage' },
    { label: heritage.name, path: `/heritage/${id}` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mt-6 mb-8"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={heritage.images[0]}
              alt={heritage.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {heritage.name}
              </h1>
              <p className="text-lg text-white/90">{heritage.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteToggle}
          />
          <SocialShare
            url={window.location.href}
            title={heritage.name}
            description={heritage.description}
          />
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Giới Thiệu
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {heritage.description}
              </p>
            </GlassCard>

            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ý Nghĩa
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {heritage.significance}
              </p>
            </GlassCard>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <GlassCard>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Thông Tin
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Địa điểm
                  </dt>
                  <dd className="text-gray-900 dark:text-white">
                    {heritage.location.address}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Năm xây dựng
                  </dt>
                  <dd className="text-gray-900 dark:text-white">
                    {heritage.yearBuilt}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tình trạng
                  </dt>
                  <dd className="text-gray-900 dark:text-white">
                    {heritage.status}
                  </dd>
                </div>
              </dl>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeritageDetailPage;

