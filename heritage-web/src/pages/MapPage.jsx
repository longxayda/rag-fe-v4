import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Map, Filter, X, Search, Award } from 'lucide-react';
import { InteractiveMap } from '../components/map';
import heritages from '../data/heritages.json';

const rankingOptions = [
  { value: '', label: 'Tất cả cấp độ' },
  { value: 'Quốc gia đặc biệt', label: 'Quốc gia đặc biệt' },
  { value: 'Quốc gia', label: 'Quốc gia' },
  { value: 'Cấp tỉnh', label: 'Cấp tỉnh' },
];

export default function MapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHeritage, setSelectedHeritage] = useState(null);

  const filteredHeritages = useMemo(() => {
    return heritages.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.commune?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRanking = !selectedRanking || h.rankingType === selectedRanking || h.ranking === selectedRanking;
      return matchesSearch && matchesRanking;
    });
  }, [searchTerm, selectedRanking]);

  return (
    <div className="min-h-screen bg-heritage-cream-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Map className="w-8 h-8 text-heritage-red-600" />
                Bản Đồ Di Sản
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Khám phá {filteredHeritages.length} di sản văn hóa trên bản đồ
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm di sản..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-red-500 w-64"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-xl border ${showFilters ? 'bg-heritage-red-600 text-white border-heritage-red-600' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'} transition-colors`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-wrap gap-2">
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
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-200px)] p-4">
        <InteractiveMap
          heritages={filteredHeritages}
          onMarkerClick={setSelectedHeritage}
          selectedHeritage={selectedHeritage}
        />
      </div>

      {/* Legend */}
      <div className="fixed bottom-20 md:bottom-8 left-4 glass p-4 rounded-xl shadow-lg z-10">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Chú thích</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-heritage-red-600"></div>
            <span className="text-gray-600 dark:text-gray-400">Quốc gia đặc biệt</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-heritage-gold-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Quốc gia</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Cấp tỉnh</span>
          </div>
        </div>
      </div>
    </div>
  );
}

