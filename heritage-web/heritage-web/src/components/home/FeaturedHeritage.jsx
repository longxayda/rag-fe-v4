import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui';

/**
 * FeaturedHeritage Component
 * 
 * Displays featured heritage items on the homepage
 * Features: Carousel/grid of featured items, image previews, links to detail pages
 */
const FeaturedHeritage = () => {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock featured heritage items
    const mockItems = [
      {
        id: '1',
        name: 'Hoàng Thành Thăng Long',
        category: 'Di tích lịch sử',
        image: '/placeholder1.jpg',
        description: 'Trung tâm chính trị của Việt Nam trong suốt 13 thế kỷ'
      },
      {
        id: '2',
        name: 'Phố Cổ Hội An',
        category: 'Di sản văn hóa',
        image: '/placeholder2.jpg',
        description: 'Thành phố cổ với kiến trúc độc đáo và văn hóa đa dạng'
      },
      {
        id: '3',
        name: 'Vịnh Hạ Long',
        category: 'Di sản thiên nhiên',
        image: '/placeholder3.jpg',
        description: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi'
      }
    ];
    setFeaturedItems(mockItems);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Di Sản Nổi Bật
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Khám phá những di sản văn hóa tiêu biểu của Việt Nam
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <GlassCard className="h-full hover:scale-105 transition-transform cursor-pointer">
              <div
                onClick={() => navigate(`/heritage/${item.id}`)}
                className="space-y-4"
              >
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <button
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Xem chi tiết →
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <button
          onClick={() => navigate('/heritage')}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
        >
          Xem Tất Cả Di Sản
        </button>
      </motion.div>
    </div>
  );
};

export default FeaturedHeritage;

