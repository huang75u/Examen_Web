import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroCard } from '../components/HeroCard';
import { HeroForm } from '../components/HeroForm';
import { Hero } from '../types';

export const FavoritesPage: React.FC = () => {
  const { heroes, currentUser, deleteHero } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | undefined>();

  const favoriteHeroes = heroes.filter((hero) =>
    currentUser?.favorites.includes(hero.id)
  );

  const handleEdit = (hero: Hero) => {
    setEditingHero(hero);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce héros ?')) {
      deleteHero(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingHero(undefined);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mes héros favoris</h1>
      </div>

      {favoriteHeroes.length === 0 ? (
        <div className="empty-state">
          <p>Vous n'avez pas encore de héros favoris</p>
          <p className="hint">
            Cliquez sur l'étoile d'un héros pour l'ajouter à vos favoris
          </p>
        </div>
      ) : (
        <div className="heroes-grid">
          {favoriteHeroes.map((hero) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && <HeroForm hero={editingHero} onClose={handleCloseForm} />}
    </div>
  );
};

