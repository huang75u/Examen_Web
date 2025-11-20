import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroCard } from '../components/HeroCard';
import { HeroForm } from '../components/HeroForm';
import { Hero } from '../types';

export const LabelsPage: React.FC = () => {
  const { heroes, getAllLabels, deleteHero } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const allLabels = getAllLabels();

  // Group heroes by label
  const herosByLabel: Record<string, Hero[]> = {};
  allLabels.forEach((label) => {
    herosByLabel[label] = heroes.filter((hero) => hero.labels.includes(label));
  });

  // Heroes without labels
  const heroesWithoutLabels = heroes.filter((hero) => hero.labels.length === 0);

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
        <h1>Héros par labels</h1>
      </div>

      <div className="labels-filter">
        <button
          className={`label-filter-btn ${selectedLabel === null ? 'active' : ''}`}
          onClick={() => setSelectedLabel(null)}
        >
          Tous
        </button>
        {allLabels.map((label) => (
          <button
            key={label}
            className={`label-filter-btn ${selectedLabel === label ? 'active' : ''}`}
            onClick={() => setSelectedLabel(label)}
          >
            {label} ({herosByLabel[label].length})
          </button>
        ))}
      </div>

      {selectedLabel === null ? (
        <>
          {allLabels.map((label) => (
            <div key={label} className="label-group">
              <h2 className="label-group-title">{label}</h2>
              <div className="heroes-grid">
                {herosByLabel[label].map((hero) => (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}

          {heroesWithoutLabels.length > 0 && (
            <div className="label-group">
              <h2 className="label-group-title">Sans label</h2>
              <div className="heroes-grid">
                {heroesWithoutLabels.map((hero) => (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {allLabels.length === 0 && heroesWithoutLabels.length === 0 && (
            <div className="empty-state">
              <p>Aucun héros avec des labels</p>
            </div>
          )}
        </>
      ) : (
        <div className="label-group">
          <div className="heroes-grid">
            {herosByLabel[selectedLabel].map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {showForm && <HeroForm hero={editingHero} onClose={handleCloseForm} />}
    </div>
  );
};

