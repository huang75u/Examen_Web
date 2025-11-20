import { inject, Injectable, signal } from '@angular/core';
import { Hero } from '../../shared/models/hero.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { defaultHeroes } from '../../data/default-heroes';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly storageService = inject(StorageService);
  private readonly authService = inject(AuthService);

  heroes = signal<Hero[]>([]);

  constructor() {
    
  }

  private getStorageKey(): string {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      console.warn('No user logged in, cannot determine storage key');
      return 'marvel_heroes_temp';
    }
    return `marvel_heroes_${userId}`;
  }

  private loadFromStorage(): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      console.warn('Cannot load heroes: no user logged in');
      this.heroes.set([]);
      return;
    }

    const storageKey = this.getStorageKey();
    console.log('Loading heroes for user:', userId, 'with key:', storageKey);
    const storedHeroes = this.storageService.getItem<Hero[]>(storageKey);
    
    if (storedHeroes && storedHeroes.length > 0) {
      console.log('Found existing heroes:', storedHeroes.length);
      this.heroes.set(storedHeroes);
    } else {
      console.log('No existing heroes, creating default set');
      const userDefaultHeroes = JSON.parse(JSON.stringify(defaultHeroes));
      this.heroes.set(userDefaultHeroes);
      this.storageService.setItem(storageKey, userDefaultHeroes);
    }
  }

  private saveToStorage(): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      console.warn('Cannot save heroes: no user logged in');
      return;
    }

    const storageKey = this.getStorageKey();
    console.log('Saving heroes for user:', userId, 'with key:', storageKey);
    this.storageService.setItem(storageKey, this.heroes());
  }

  reloadUserHeroes(): void {
    console.log('Reloading user heroes...');
    this.loadFromStorage();
  }

  addHero(hero: Omit<Hero, 'id'>): void {
    const newHero: Hero = {
      ...hero,
      id: Date.now().toString(),
    };
    this.heroes.update((heroes) => [...heroes, newHero]);
    this.saveToStorage();
  }

  updateHero(id: string, updatedHero: Omit<Hero, 'id'>): void {
    this.heroes.update((heroes) => heroes.map((h) => (h.id === id ? { ...updatedHero, id } : h)));
    this.saveToStorage();
  }

  deleteHero(id: string): void {
    this.heroes.update((heroes) => heroes.filter((h) => h.id !== id));
    this.saveToStorage();
  }

  getHeroById(id: string): Hero | undefined {
    return this.heroes().find((h) => h.id === id);
  }

  getAllLabels(): string[] {
    const labelsSet = new Set<string>();
    this.heroes().forEach((hero) => {
      hero.labels.forEach((label) => labelsSet.add(label));
    });
    return Array.from(labelsSet).sort();
  }

  addLabelToHero(heroId: string, label: string): void {
    this.heroes.update((heroes) =>
      heroes.map((h) => (h.id === heroId && !h.labels.includes(label) ? { ...h, labels: [...h.labels, label] } : h))
    );
    this.saveToStorage();
  }

  removeLabelFromHero(heroId: string, label: string): void {
    this.heroes.update((heroes) =>
      heroes.map((h) => (h.id === heroId ? { ...h, labels: h.labels.filter((l) => l !== label) } : h))
    );
    this.saveToStorage();
  }
}

