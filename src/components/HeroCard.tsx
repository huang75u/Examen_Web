import React from 'react';
import { Hero } from '../types';
import { useApp } from '../context/AppContext';

interface HeroCardProps {
  hero: Hero;
  onEdit: (hero: Hero) => void;
  onDelete: (id: string) => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ hero, onEdit, onDelete }) => {
  const { toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(hero.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="hero-card">
      <div className="hero-card-image">
        {hero.image ? (
          <img src={hero.image} alt={hero.name} />
        ) : (
          <div className="no-image">Pas d'image</div>
        )}
        <button
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(hero.id)}
          title={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {favorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="hero-card-content">
        <h3>{hero.name}</h3>
        
        {hero.team && (
          <p className="hero-team">
            <span className="label">Équipe:</span> {hero.team}
          </p>
        )}
        
        <p className="hero-nemesis">
          <span className="label">Némésis:</span> {hero.nemesis}
        </p>
        
        <p className="hero-date">
          <span className="label">Première apparition:</span> {formatDate(hero.firstAppearance)}
        </p>
        
        {hero.labels.length > 0 && (
          <div className="hero-labels">
            {hero.labels.map((label) => (
              <span key={label} className="label-tag">
                {label}
              </span>
            ))}
          </div>
        )}
        
        <div className="hero-card-actions">
          <button className="btn-edit" onClick={() => onEdit(hero)}>
            Modifier
          </button>
          <button className="btn-delete" onClick={() => onDelete(hero.id)}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

