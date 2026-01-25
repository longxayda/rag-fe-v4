import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter, Search } from 'lucide-react';
import { HeritageTimeline } from '../components/timeline';
import heritages from '../data/heritages.json';

const rankingOptions = [
  { value: '', label: 'Tất cả' },
  { value: 'Quốc gia đặc biệt', label: 'Quốc gia đặc biệt' },
  { value: 'Quốc gia', label: 'Quốc gia' },
  { value: 'Cấp tỉnh', label: 'Cấp tỉnh' },
];

export default function TimelinePage() {
  const [selectedRanking, setSelectedRanking] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHeritages = useMemo(() => {
    return heritages.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRanking = !selectedRanking || h.ranking === selectedRanking;
      return matchesSearch && matchesRanking;
    });
  }, [searchTerm, selectedRanking]);

  return (
    <div className="min-h-screen bg-heritage-cream-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-red-100 dark:bg-heritage-red-900/30 text-heritage-red-700 dark:text-heritage-red-400 text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Lịch sử Di sản
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dòng Thời Gian <span className="gradient-text">Di Sản</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Khám phá hành trình lịch sử của các di sản văn hóa qua các thời kỳ
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm di sản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-red-500"
              />
            </div>

            {/* Ranking Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {rankingOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedRanking(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedRanking === option.value
                      ? 'bg-heritage-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredHeritages.length > 0 ? (
          <HeritageTimeline heritages={filteredHeritages} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              Không tìm thấy di sản nào phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

