import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import { HeroesPage } from './pages/HeroesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LabelsPage } from './pages/LabelsPage';
import { SearchPage } from './pages/SearchPage';

const App: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HeroesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/labels" element={<LabelsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

