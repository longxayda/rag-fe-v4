import React from 'react';

export default function GlassCard({ 
  children, 
  className = '', 
  hover = false,
  glow = null,
  onClick = null 
}) {
  const baseClasses = 'glass rounded-2xl';
  const hoverClasses = hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer' : '';
  const glowClasses = glow === 'gold' ? 'glow-gold' : glow === 'red' ? 'glow-red' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

