import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroCard } from '../components/HeroCard';
import { HeroForm } from '../components/HeroForm';
import { Hero } from '../types';

export const SearchPage: React.FC = () => {
  const { heroes, deleteHero } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | undefined>();

  const filteredHeroes = heroes.filter((hero) =>
    hero.nemesis.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Rechercher par Némésis</h1>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Entrez le nom d'un némésis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm('')}
            title="Effacer"
          >
            ×
          </button>
        )}
      </div>

      {searchTerm === '' ? (
        <div className="empty-state">
          <p>Entrez un nom de némésis pour commencer la recherche</p>
        </div>
      ) : filteredHeroes.length === 0 ? (
        <div className="empty-state">
          <p>Aucun héros trouvé avec le némésis "{searchTerm}"</p>
        </div>
      ) : (
        <>
          <p className="results-count">
            {filteredHeroes.length} résultat{filteredHeroes.length > 1 ? 's' : ''} trouvé
            {filteredHeroes.length > 1 ? 's' : ''}
          </p>
          <div className="heroes-grid">
            {filteredHeroes.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}

      {showForm && <HeroForm hero={editingHero} onClose={handleCloseForm} />}
    </div>
  );
};

