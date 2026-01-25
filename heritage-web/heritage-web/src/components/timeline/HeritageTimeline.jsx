import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';

const rankingColors = {
  'Quốc gia đặc biệt': 'bg-heritage-red-600',
  'Quốc gia': 'bg-heritage-gold-500',
  'Cấp tỉnh': 'bg-green-500',
};

function TimelineItem({ heritage, index, isLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row-reverse' : ''} mb-8 md:mb-0`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : ''}`}>
        <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 group">
          {/* Year Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 ${rankingColors[heritage.ranking] || 'bg-gray-500'} text-white`}>
            <Calendar className="w-4 h-4" />
            {heritage.year || 'N/A'}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-heritage-red-600 dark:group-hover:text-heritage-gold-400 transition-colors">
            {heritage.name}
          </h3>
          
          {/* Location */}
          <div className={`flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
            <MapPin className="w-4 h-4" />
            <span>{heritage.commune}, {heritage.district}</span>
          </div>
          
          {/* Ranking */}
          <div className={`flex items-center gap-2 text-sm mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
            <Award className="w-4 h-4 text-heritage-gold-500" />
            <span className="text-gray-600 dark:text-gray-400">{heritage.ranking}</span>
          </div>
          
          {/* Link */}
          <Link
            to={`/heritage/${heritage.id}`}
            className={`inline-flex items-center gap-2 text-heritage-red-600 dark:text-heritage-gold-400 text-sm font-medium hover:gap-3 transition-all ${isLeft ? 'md:flex-row-reverse' : ''}`}
          >
            <span>Xem chi tiết</span>
            <ArrowRight className={`w-4 h-4 ${isLeft ? 'md:rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
      
      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <div className={`timeline-dot ${rankingColors[heritage.ranking] || 'bg-gray-500'}`}></div>
      </div>
      
      {/* Spacer */}
      <div className="hidden md:block w-5/12"></div>
    </motion.div>
  );
}

export default function HeritageTimeline({ heritages = [] }) {
  // Sort by year if available
  const sortedHeritages = [...heritages].sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });

  return (
    <div className="relative py-8">
      {/* Timeline Line */}
      <div className="hidden md:block timeline-line"></div>
      
      {/* Timeline Items */}
      <div className="space-y-8 md:space-y-16">
        {sortedHeritages.map((heritage, index) => (
          <TimelineItem
            key={heritage.id}
            heritage={heritage}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

