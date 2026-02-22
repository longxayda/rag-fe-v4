import React, { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Landmark, MapPin, Calendar, Users, BookOpen, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heritages from '../../data/heritages.json';

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <span ref={ref} className="counter">{count}</span>;
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Value */}
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          <AnimatedCounter value={stat.value} />
          <span className="text-heritage-gold-500">+</span>
        </div>
        
        {/* Label */}
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatisticsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Landmark,
      value: heritages.length,
      label: t('home.stats.heritage'),
      color: 'from-heritage-red-500 to-heritage-red-700',
    },
    {
      icon: MapPin,
      value: [...new Set(heritages.map(h => h.commune))].length,
      label: t('home.stats.locations'),
      color: 'from-heritage-gold-500 to-heritage-gold-700',
    },
    {
      icon: Calendar,
      value: 6,
      label: t('home.stats.festivals'),
      color: 'from-green-500 to-green-700',
    },
    {
      icon: Users,
      value: 12,
      label: t('home.stats.people'),
      color: 'from-blue-500 to-blue-700',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-heritage-cream-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.stats.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.stats.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

