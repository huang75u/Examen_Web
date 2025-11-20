# Marvel Heroes Manager

Une application de gestion des héros Marvel construite avec Angular 18.

## Fonctionnalités

- 🦸 **Gestion des héros** : Ajouter, modifier et supprimer des informations sur les héros
- ⭐ **Favoris** : Marquer et gérer vos héros préférés
- 🏷️ **Classification par labels** : Organiser et filtrer les héros par labels
- 🔍 **Recherche** : Rechercher des héros par nom de némésis
- 👤 **Authentification** : Système d'inscription et de connexion
- 💾 **Stockage local** : Persistance des données dans localStorage
- 📱 **Responsive Design** : Interface adaptative (4 cartes par ligne sur desktop, 2 sur mobile)

## Stack Technique

- **Angular 18** - Utilisation de standalone components et signals
- **TypeScript 5.4** - Typage fort
- **SCSS** - Préprocesseur de styles
- **RxJS** - Programmation réactive
- **Angular Router** - Gestion du routage

## Structure du Projet

```
src/
├── app/
│   ├── core/
│   │   └── services/          # Services principaux (auth, hero, storage)
│   ├── feature/
│   │   ├── heroes/            # Page liste des héros
│   │   ├── favorites/         # Page favoris
│   │   ├── labels/            # Page classification par labels
│   │   ├── search/            # Page recherche
│   │   └── login/             # Page connexion
│   ├── shared/
│   │   ├── components/        # Composants partagés (hero-card, hero-form, navigation)
│   │   └── models/            # Modèles de données
│   ├── data/                  # Données par défaut
│   ├── app.component.*        # Composant racine
│   ├── app.routes.ts          # Configuration des routes
│   └── app.config.ts          # Configuration de l'application
├── assets/                    # Ressources statiques
├── styles.scss               # Styles globaux
└── main.ts                   # Point d'entrée de l'application
```

## Guide de Développement

### Installation des dépendances

```bash
npm install
```

### Démarrer le serveur de développement

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200/`

### Construire la version de production

```bash
npm run build
```

Les fichiers de production seront générés dans le répertoire `dist/`

## Standards de Codage

Ce projet suit les standards suivants :

- ✅ Utilisation de **standalone components**
- ✅ Utilisation de **signals** pour la gestion d'état
- ✅ Stratégie de détection de changement **OnPush**
- ✅ Fonction **inject()** pour l'injection de dépendances
- ✅ **input()** et **output()** pour la communication entre composants
- ✅ Nouvelle syntaxe Angular 17+ (@if, @for, @switch)
- ✅ Types de retour explicites pour toutes les fonctions
- ✅ Utilisation de guillemets simples
- ✅ Respect du guide de style Angular

## Fonctionnalités Détaillées

### Gestion Multi-Utilisateurs
- Chaque utilisateur possède sa propre collection de héros
- Données isolées par utilisateur dans le localStorage
- Favoris spécifiques à chaque utilisateur

### Interface Utilisateur
- Design moderne et épuré
- Animations fluides (hover, clic sur favoris)
- Icône cœur pour les favoris (🤍 → ❤️)
- Layout responsive adaptatif

### Persistance des Données
- Stockage dans `localStorage`
- Format : `marvel_heroes_{userId}` pour l'isolation des données
- Chargement automatique des héros par défaut pour les nouveaux utilisateurs

## Licence

MIT
