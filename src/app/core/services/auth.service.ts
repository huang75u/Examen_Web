import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageService = inject(StorageService);
  private readonly STORAGE_KEYS = {
    USERS: 'marvel_users',
    CURRENT_USER: 'marvel_current_user',
  };

  currentUser = signal<User | null>(null);
  private users = signal<User[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedUsers = this.storageService.getItem<User[]>(this.STORAGE_KEYS.USERS);
    const storedCurrentUser = this.storageService.getItem<User>(this.STORAGE_KEYS.CURRENT_USER);

    if (storedUsers) {
      this.users.set(storedUsers);
    }

    if (storedCurrentUser) {
      this.currentUser.set(storedCurrentUser);
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users().find((u) => u.username === username && u.password === password);
    if (user) {
      this.currentUser.set(user);
      this.storageService.setItem(this.STORAGE_KEYS.CURRENT_USER, user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.storageService.removeItem(this.STORAGE_KEYS.CURRENT_USER);
  }

  register(username: string, password: string): boolean {
    if (this.users().find((u) => u.username === username)) {
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      favorites: [],
    };
    const updatedUsers = [...this.users(), newUser];
    this.users.set(updatedUsers);
    this.currentUser.set(newUser);
    this.storageService.setItem(this.STORAGE_KEYS.USERS, updatedUsers);
    this.storageService.setItem(this.STORAGE_KEYS.CURRENT_USER, newUser);
    return true;
  }

  toggleFavorite(heroId: string): void {
    const user = this.currentUser();
    if (!user) return;

    const isFav = user.favorites.includes(heroId);
    const updatedFavorites = isFav ? user.favorites.filter((id) => id !== heroId) : [...user.favorites, heroId];

    const updatedUser = { ...user, favorites: updatedFavorites };
    this.currentUser.set(updatedUser);

    const updatedUsers = this.users().map((u) => (u.id === user.id ? updatedUser : u));
    this.users.set(updatedUsers);

    this.storageService.setItem(this.STORAGE_KEYS.USERS, updatedUsers);
    this.storageService.setItem(this.STORAGE_KEYS.CURRENT_USER, updatedUser);
  }

  isFavorite(heroId: string): boolean {
    return this.currentUser()?.favorites.includes(heroId) || false;
  }

  removeFavorite(heroId: string): void {
    const user = this.currentUser();
    if (!user || !user.favorites.includes(heroId)) return;

    const updatedUser = {
      ...user,
      favorites: user.favorites.filter((fId) => fId !== heroId),
    };
    this.currentUser.set(updatedUser);

    const updatedUsers = this.users().map((u) => (u.id === user.id ? updatedUser : u));
    this.users.set(updatedUsers);

    this.storageService.setItem(this.STORAGE_KEYS.USERS, updatedUsers);
    this.storageService.setItem(this.STORAGE_KEYS.CURRENT_USER, updatedUser);
  }
}

