import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Map, MessageSquare, Gamepad2 } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/heritage', icon: BookOpen, label: 'Di sản' },
  { path: '/map', icon: Map, label: 'Bản đồ' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/quiz', icon: Gamepad2, label: 'Quiz' },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center px-3 py-2 transition-colors ${
                isActive 
                  ? 'text-heritage-red-600 dark:text-heritage-gold-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

