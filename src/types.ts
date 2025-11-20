export interface Hero {
  id: string;
  name: string;
  team?: string;
  nemesis: string;
  firstAppearance: string; // ISO date string
  image?: string;
  labels: string[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  favorites: string[]; // Hero IDs
}

export interface HeroFormData {
  name: string;
  team: string;
  nemesis: string;
  firstAppearance: string;
  image: string;
  labels: string[];
}

export interface ValidationErrors {
  name?: string;
  nemesis?: string;
  firstAppearance?: string;
}

