import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroCard } from '../components/HeroCard';
import { HeroForm } from '../components/HeroForm';
import { Hero } from '../types';

export const HeroesPage: React.FC = () => {
  const { heroes, deleteHero } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | undefined>();

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

  const handleAddNew = () => {
    setEditingHero(undefined);
    setShowForm(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Tous les héros Marvel</h1>
        <button onClick={handleAddNew} className="btn-primary">
          Ajouter un héros
        </button>
      </div>

      {heroes.length === 0 ? (
        <div className="empty-state">
          <p>Aucun héros pour le moment</p>
          <button onClick={handleAddNew} className="btn-primary">
            Ajouter votre premier héros
          </button>
        </div>
      ) : (
        <div className="heroes-grid">
          {heroes.map((hero) => (
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

