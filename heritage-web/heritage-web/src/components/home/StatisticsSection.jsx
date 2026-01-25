import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * StatisticsSection Component
 * 
 * Displays key statistics about the heritage collection
 * Features: Animated counters, icons, responsive grid
 */
const StatisticsSection = () => {
  const [stats, setStats] = useState([
    { id: 1, number: 0, target: 523, label: 'Di Sản Văn Hóa', icon: '🏛️' },
    { id: 2, number: 0, target: 156, label: 'Di Tích Lịch Sử', icon: '🏰' },
    { id: 3, number: 0, target: 89, label: 'Lễ Hội Truyền Thống', icon: '🎭' },
    { id: 4, number: 0, target: 234, label: 'Nhân Vật Lịch Sử', icon: '👤' }
  ]);

  useEffect(() => {
    // Animate counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          number: stat.number < stat.target
            ? Math.min(stat.number + Math.ceil(stat.target / steps), stat.target)
            : stat.target
        }))
      );
    }, interval);

    return () => clearInterval(timer);
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
          Thống Kê Di Sản
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Kho tàng di sản văn hóa phong phú của Việt Nam
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700">
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number.toLocaleString()}
              </div>

              {/* Label */}
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Dữ liệu được cập nhật thường xuyên từ các nguồn chính thống
        </p>
      </motion.div>
    </div>
  );
};

export default StatisticsSection;

