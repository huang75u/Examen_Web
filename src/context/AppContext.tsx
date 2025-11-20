import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hero, User } from '../types';
import { defaultHeroes } from '../data/defaultHeroes';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  
  // Heroes
  heroes: Hero[];
  addHero: (hero: Omit<Hero, 'id'>) => void;
  updateHero: (id: string, hero: Omit<Hero, 'id'>) => void;
  deleteHero: (id: string) => void;
  
  // Favorites
  toggleFavorite: (heroId: string) => void;
  isFavorite: (heroId: string) => boolean;
  
  // Labels
  addLabelToHero: (heroId: string, label: string) => void;
  removeLabelFromHero: (heroId: string, label: string) => void;
  getAllLabels: () => string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'marvel_users',
  CURRENT_USER: 'marvel_current_user',
  HEROES: 'marvel_heroes',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    const storedHeroes = localStorage.getItem(STORAGE_KEYS.HEROES);

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }

    if (storedHeroes) {
      setHeroes(JSON.parse(storedHeroes));
    } else {
      // Initialize with default heroes
      setHeroes(defaultHeroes);
      localStorage.setItem(STORAGE_KEYS.HEROES, JSON.stringify(defaultHeroes));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Save heroes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HEROES, JSON.stringify(heroes));
  }, [heroes]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (username: string, password: string): boolean => {
    if (users.find((u) => u.username === username)) {
      return false; // Username already exists
    }
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      favorites: [],
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const addHero = (hero: Omit<Hero, 'id'>) => {
    const newHero: Hero = {
      ...hero,
      id: Date.now().toString(),
    };
    setHeroes([...heroes, newHero]);
  };

  const updateHero = (id: string, updatedHero: Omit<Hero, 'id'>) => {
    setHeroes(heroes.map((h) => (h.id === id ? { ...updatedHero, id } : h)));
  };

  const deleteHero = (id: string) => {
    setHeroes(heroes.filter((h) => h.id !== id));
    // Remove from favorites if present
    if (currentUser && currentUser.favorites.includes(id)) {
      const updatedUser = {
        ...currentUser,
        favorites: currentUser.favorites.filter((fId) => fId !== id),
      };
      setCurrentUser(updatedUser);
      setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    }
  };

  const toggleFavorite = (heroId: string) => {
    if (!currentUser) return;

    const isFav = currentUser.favorites.includes(heroId);
    const updatedFavorites = isFav
      ? currentUser.favorites.filter((id) => id !== heroId)
      : [...currentUser.favorites, heroId];

    const updatedUser = { ...currentUser, favorites: updatedFavorites };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const isFavorite = (heroId: string): boolean => {
    return currentUser?.favorites.includes(heroId) || false;
  };

  const addLabelToHero = (heroId: string, label: string) => {
    setHeroes(
      heroes.map((h) =>
        h.id === heroId && !h.labels.includes(label)
          ? { ...h, labels: [...h.labels, label] }
          : h
      )
    );
  };

  const removeLabelFromHero = (heroId: string, label: string) => {
    setHeroes(
      heroes.map((h) =>
        h.id === heroId
          ? { ...h, labels: h.labels.filter((l) => l !== label) }
          : h
      )
    );
  };

  const getAllLabels = (): string[] => {
    const labelsSet = new Set<string>();
    heroes.forEach((hero) => {
      hero.labels.forEach((label) => labelsSet.add(label));
    });
    return Array.from(labelsSet).sort();
  };

  const value: AppContextType = {
    currentUser,
    login,
    logout,
    register,
    heroes,
    addHero,
    updateHero,
    deleteHero,
    toggleFavorite,
    isFavorite,
    addLabelToHero,
    removeLabelFromHero,
    getAllLabels,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

