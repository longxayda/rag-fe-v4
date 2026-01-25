import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Gamepad2, Map, Clock, Volume2, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={feature.path}
        className={`block p-6 rounded-2xl ${feature.bgColor} border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1`}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-heritage-red-600 dark:group-hover:text-heritage-gold-400 transition-colors">
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {feature.description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function QuickAccessCards() {
  const { t } = useTranslation();

  const features = [
    {
      icon: MessageSquare,
      title: t('home.features.aiChat'),
      description: t('home.features.aiChatDesc'),
      path: '/chat',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Gamepad2,
      title: t('home.features.quiz'),
      description: t('home.features.quizDesc'),
      path: '/quiz',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Map,
      title: t('home.features.map'),
      description: t('home.features.mapDesc'),
      path: '/map',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Clock,
      title: t('home.features.timeline'),
      description: t('home.features.timelineDesc'),
      path: '/timeline',
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: Volume2,
      title: t('home.features.tts'),
      description: t('home.features.ttsDesc'),
      path: '/tts',
      color: 'from-pink-500 to-pink-700',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    },
    {
      icon: Heart,
      title: t('home.features.favorites'),
      description: t('home.features.favoritesDesc'),
      path: '/favorites',
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.features.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

