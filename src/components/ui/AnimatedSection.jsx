import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({ 
  children, 
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [threshold]);

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  const delayStyle = { animationDelay: `${delay}ms` };

  return (
    <div 
      ref={ref}
      className={`${animationClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
}

