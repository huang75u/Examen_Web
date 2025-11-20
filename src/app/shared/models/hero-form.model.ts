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

