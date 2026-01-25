import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * QuickAccessCards Component
 * 
 * Quick access cards for common actions
 * Features: Grid of cards linking to different sections, icons, descriptions
 */
const QuickAccessCards = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: 'Khám Phá Bản Đồ',
      description: 'Xem vị trí các di sản trên bản đồ tương tác',
      icon: '🗺️',
      color: 'from-blue-500 to-cyan-500',
      path: '/map'
    },
    {
      id: 2,
      title: 'Danh Sách Di Sản',
      description: 'Duyệt qua toàn bộ kho tàng di sản văn hóa',
      icon: '📚',
      color: 'from-purple-500 to-pink-500',
      path: '/heritage'
    },
    {
      id: 3,
      title: 'Lễ Hội & Sự Kiện',
      description: 'Tìm hiểu về các lễ hội truyền thống',
      icon: '🎉',
      color: 'from-amber-500 to-orange-500',
      path: '/festivals'
    },
    {
      id: 4,
      title: 'Trắc Nghiệm Kiến Thức',
      description: 'Kiểm tra hiểu biết của bạn về di sản',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500',
      path: '/quiz'
    },
    {
      id: 5,
      title: 'Yêu Thích Của Bạn',
      description: 'Quản lý danh sách di sản yêu thích',
      icon: '❤️',
      color: 'from-red-500 to-pink-500',
      path: '/favorites'
    },
    {
      id: 6,
      title: 'Đóng Góp Nội Dung',
      description: 'Chia sẻ kiến thức về di sản văn hóa',
      icon: '✍️',
      color: 'from-indigo-500 to-purple-500',
      path: '/contribute'
    }
  ];

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
          Truy Cập Nhanh
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Khám phá các tính năng của nền tảng
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => navigate(card.path)}
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {card.description}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                  <span className="mr-2">Truy cập</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;

