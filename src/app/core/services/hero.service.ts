import { inject, Injectable, signal } from '@angular/core';
import { Hero } from '../../shared/models/hero.model';
import { StorageService } from './storage.service';
import { defaultHeroes } from '../../data/default-heroes';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly storageService = inject(StorageService);
  private readonly STORAGE_KEY = 'marvel_heroes';

  heroes = signal<Hero[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedHeroes = this.storageService.getItem<Hero[]>(this.STORAGE_KEY);
    if (storedHeroes) {
      this.heroes.set(storedHeroes);
    } else {
      this.heroes.set(defaultHeroes);
      this.storageService.setItem(this.STORAGE_KEY, defaultHeroes);
    }
  }

  private saveToStorage(): void {
    this.storageService.setItem(this.STORAGE_KEY, this.heroes());
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

