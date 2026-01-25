import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { TagProvider } from './context/TagContext';
import { ContributionProvider } from './context/ContributionContext';
import { GamificationProvider } from './context/GamificationContext';
import { FavoritesProvider } from './context/FavoritesContext';
import AppRouter from './router';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <FavoritesProvider>
            <TagProvider>
              <ContributionProvider>
                <GamificationProvider>
                  <AppRouter />
                </GamificationProvider>
              </ContributionProvider>
            </TagProvider>
          </FavoritesProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

