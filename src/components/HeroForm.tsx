import React, { useState, useEffect } from 'react';
import { Hero, HeroFormData, ValidationErrors } from '../types';
import { useApp } from '../context/AppContext';

interface HeroFormProps {
  hero?: Hero;
  onClose: () => void;
}

export const HeroForm: React.FC<HeroFormProps> = ({ hero, onClose }) => {
  const { addHero, updateHero } = useApp();
  const [formData, setFormData] = useState<HeroFormData>({
    name: '',
    team: '',
    nemesis: '',
    firstAppearance: '',
    image: '',
    labels: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (hero) {
      setFormData({
        name: hero.name,
        team: hero.team || '',
        nemesis: hero.nemesis,
        firstAppearance: hero.firstAppearance,
        image: hero.image || '',
        labels: hero.labels,
      });
    }
  }, [hero]);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    }

    if (!formData.nemesis.trim()) {
      newErrors.nemesis = 'Le némésis est obligatoire';
    }

    if (!formData.firstAppearance) {
      newErrors.firstAppearance = 'La date de première apparition est obligatoire';
    } else {
      const date = new Date(formData.firstAppearance);
      if (isNaN(date.getTime())) {
        newErrors.firstAppearance = 'La date doit être valide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const heroData = {
      name: formData.name.trim(),
      team: formData.team.trim() || undefined,
      nemesis: formData.nemesis.trim(),
      firstAppearance: formData.firstAppearance,
      image: formData.image.trim() || undefined,
      labels: formData.labels,
    };

    if (hero) {
      updateHero(hero.id, heroData);
    } else {
      addHero(heroData);
    }

    onClose();
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel.trim())) {
      setFormData({
        ...formData,
        labels: [...formData.labels, newLabel.trim()],
      });
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((l) => l !== label),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{hero ? 'Modifier le héros' : 'Ajouter un héros'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="team">Équipe</label>
            <input
              type="text"
              id="team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              placeholder="Ex: Avengers, X-Men..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="nemesis">Némésis *</label>
            <input
              type="text"
              id="nemesis"
              value={formData.nemesis}
              onChange={(e) => setFormData({ ...formData, nemesis: e.target.value })}
              className={errors.nemesis ? 'error' : ''}
            />
            {errors.nemesis && <span className="error-text">{errors.nemesis}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="firstAppearance">Date de première apparition *</label>
            <input
              type="date"
              id="firstAppearance"
              value={formData.firstAppearance}
              onChange={(e) => setFormData({ ...formData, firstAppearance: e.target.value })}
              className={errors.firstAppearance ? 'error' : ''}
            />
            {errors.firstAppearance && <span className="error-text">{errors.firstAppearance}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de l'image</label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label>Labels</label>
            <div className="label-input-group">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLabel())}
                placeholder="Ajouter un label"
              />
              <button type="button" onClick={handleAddLabel} className="btn-add-label">
                Ajouter
              </button>
            </div>
            {formData.labels.length > 0 && (
              <div className="labels-list">
                {formData.labels.map((label) => (
                  <span key={label} className="label-tag">
                    {label}
                    <button
                      type="button"
                      onClick={() => handleRemoveLabel(label)}
                      className="remove-label"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {hero ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

