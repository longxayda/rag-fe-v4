import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'heritage-favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      // Failed to load favorites from localStorage
      return [];
    }
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Failed to save favorites to localStorage
    }
  }, [favorites]);

  const isFavorite = (heritageId) => {
    return favorites.includes(heritageId);
  };

  const toggleFavorite = (heritageId) => {
    setFavorites(prev => {
      if (prev.includes(heritageId)) {
        return prev.filter(id => id !== heritageId);
      } else {
        return [...prev, heritageId];
      }
    });
  };

  const addFavorite = (heritageId) => {
    setFavorites(prev => {
      if (!prev.includes(heritageId)) {
        return [...prev, heritageId];
      }
      return prev;
    });
  };

  const removeFavorite = (heritageId) => {
    setFavorites(prev => prev.filter(id => id !== heritageId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export default FavoritesContext;

