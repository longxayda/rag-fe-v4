// Filter Component
import { useTranslation } from 'react-i18next';

export function HeritageFilter({ activeFilter, onFilterChange, viewMode, onViewModeChange }) {
  const { t } = useTranslation();
  const filters = [
    { id: 'all', labelKey: 'filter.all', icon: '🌏' },
    { id: 'heritage', labelKey: 'filter.heritage', icon: '🏛️' },
    { id: 'people', labelKey: 'filter.people', icon: '👤' },
    { id: 'festival', labelKey: 'filter.festival', icon: '🎭' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.id
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <span className="mr-2">{filter.icon}</span>
              {t(filter.labelKey)}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title={t('filter.gridView')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title={t('filter.listView')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}