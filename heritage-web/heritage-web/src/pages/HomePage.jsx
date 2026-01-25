import React from 'react';
import { HeroSection, FeaturedHeritage, StatisticsSection, QuickAccessCards } from '../components/home';

/**
 * HomePage Component
 * 
 * Main landing page of the heritage website
 * Features: Hero banner, featured heritage items, statistics, and quick access cards
 */
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Heritage Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <FeaturedHeritage />
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-800">
        <StatisticsSection />
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <QuickAccessCards />
      </section>
    </div>
  );
};

export default HomePage;

