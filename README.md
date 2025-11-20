# Marvel Heroes Manager 🦸‍♂️

Application de gestion des héros Marvel avec React, TypeScript, et Vite.

## Fonctionnalités

### ✅ Gestion des Héros
- **Liste complète** : Affichage de tous les héros sous forme de cartes
- **Ajouter** : Créer un nouveau héros avec toutes ses informations
- **Modifier** : Éditer les informations d'un héros existant
- **Supprimer** : Retirer un héros de la base de données

### 🔍 Recherche
- **Recherche par Némésis** : Trouver rapidement un héros par le nom de son ennemi juré

### ⭐ Favoris
- **Système de favoris** : Ajouter/retirer des héros de vos favoris
- **Icône dynamique** : L'étoile change d'apparence selon le statut favori
- **Page dédiée** : Voir tous vos héros favoris en un seul endroit

### 🏷️ Labels
- **Gestion des labels** : Ajouter/supprimer des labels pour chaque héros
- **Vue groupée** : Afficher les héros regroupés par leurs labels
- **Filtrage** : Filtrer les héros par label spécifique

### 🔐 Authentification
- **Connexion/Inscription** : Système d'authentification complet
- **Données personnelles** : Les favoris sont stockés par utilisateur
- **Persistance** : Toutes les données sont sauvegardées localement (localStorage)

### ✔️ Validations
- **Nom** : Obligatoire
- **Team** : Optionnel
- **Némésis** : Obligatoire
- **Date de première apparition** : Obligatoire et doit être une date valide
- **Image** : Optionnel (URL)

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir votre navigateur à l'adresse affichée (généralement http://localhost:5173)

## Build pour la production

```bash
npm run build
```

## Technologies utilisées

- **React 18** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Vite** : Build tool rapide
- **React Router** : Navigation
- **CSS3** : Styles modernes avec gradients et animations

## Structure du projet

```
src/
├── components/        # Composants réutilisables
│   ├── HeroCard.tsx
│   ├── HeroForm.tsx
│   ├── Login.tsx
│   └── Navigation.tsx
├── pages/            # Pages de l'application
│   ├── HeroesPage.tsx
│   ├── FavoritesPage.tsx
│   ├── LabelsPage.tsx
│   └── SearchPage.tsx
├── context/          # Gestion d'état globale
│   └── AppContext.tsx
├── data/             # Données par défaut
│   └── defaultHeroes.ts
├── types.ts          # Types TypeScript
├── App.tsx           # Composant principal
├── main.tsx          # Point d'entrée
└── styles.css        # Styles globaux
```

## Héros par défaut

L'application est préchargée avec 6 héros Marvel célèbres :
- Spider-Man
- Iron Man
- Captain America
- Black Widow
- Thor
- Hulk

## Auteur

Projet créé pour la gestion des héros Marvel
