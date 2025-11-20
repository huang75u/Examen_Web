import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Marvel Heroes
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Tous les héros
          </Link>
          <Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}>
            Favoris
          </Link>
          <Link to="/labels" className={isActive('/labels') ? 'active' : ''}>
            Par labels
          </Link>
          <Link to="/search" className={isActive('/search') ? 'active' : ''}>
            Recherche
          </Link>
        </div>
        
        <div className="nav-user">
          <span className="username">{currentUser?.username}</span>
          <button onClick={logout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

