import React from 'react';

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-4 space-y-4">
      <div className="skeleton h-48 rounded-xl"></div>
      <div className="space-y-2">
        <div className="skeleton h-6 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-1/2 rounded"></div>
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full"></div>
        <div className="skeleton h-6 w-20 rounded-full"></div>
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="glass rounded-2xl p-4 flex gap-4">
      <div className="skeleton h-24 w-24 rounded-xl flex-shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="skeleton h-6 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-1/2 rounded"></div>
        <div className="skeleton h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="space-y-6 p-6">
      <div className="skeleton h-64 rounded-2xl"></div>
      <div className="space-y-3">
        <div className="skeleton h-8 w-2/3 rounded"></div>
        <div className="skeleton h-4 w-1/3 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-3/4 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="h-[70vh] skeleton rounded-none"></div>
  );
}

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const components = {
    card: SkeletonCard,
    list: SkeletonList,
    detail: SkeletonDetail,
    hero: SkeletonHero,
  };
  
  const Component = components[type] || SkeletonCard;
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}

