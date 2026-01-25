import React, { useState } from 'react';
import { InteractiveMap } from '../components/map';
import { FilterPanel } from '../components/heritage';

/**
 * MapPage Component
 * 
 * Interactive map view showing heritage sites
 * Features: Map display, location markers, filtering, and site selection
 */
const MapPage = () => {
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    searchQuery: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleMarkerClick = (heritage) => {
    setSelectedHeritage(heritage);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bản Đồ Di Sản
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Khám phá các di sản văn hóa trên bản đồ
        </p>
      </div>

      {/* Map Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filter Sidebar */}
        <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        {/* Map Display */}
        <main className="flex-1 relative">
          <InteractiveMap
            filters={filters}
            selectedHeritage={selectedHeritage}
            onMarkerClick={handleMarkerClick}
          />
        </main>
      </div>
    </div>
  );
};

export default MapPage;

