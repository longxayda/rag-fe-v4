import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HeroSection, FeaturedHeritage, StatisticsSection, QuickAccessCards } from '../components/home';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Heritage - Bento Grid */}
      <FeaturedHeritage />
      
      {/* Statistics Section */}
      <StatisticsSection />
      
      {/* Quick Access Cards */}
      <QuickAccessCards />
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-heritage-red-700 via-heritage-red-800 to-heritage-red-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-50"></div>
        
        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-heritage-gold-500/10 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('home.cta.title1')}
              <span className="block text-heritage-gold-400">{t('home.cta.title2')}</span>
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contribute"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-heritage-red-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {t('home.cta.contributeButton')}
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {t('home.cta.learnMore')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

