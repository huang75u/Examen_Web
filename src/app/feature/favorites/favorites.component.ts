import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { AuthService } from '../../core/services/auth.service';
import { HeroCardComponent } from '../../shared/components/hero-card/hero-card.component';
import { HeroFormComponent } from '../../shared/components/hero-form/hero-form.component';
import { Hero } from '../../shared/models/hero.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [HeroCardComponent, HeroFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private readonly heroService = inject(HeroService);
  private readonly authService = inject(AuthService);

  showForm = signal(false);
  editingHero = signal<Hero | undefined>(undefined);

  favoriteHeroes = computed(() => {
    const favorites = this.authService.currentUser()?.favorites || [];
    return this.heroService.heroes().filter((hero) => favorites.includes(hero.id));
  });

  handleEdit(hero: Hero): void {
    this.editingHero.set(hero);
    this.showForm.set(true);
  }

  handleDelete(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce héros ?')) {
      this.heroService.deleteHero(id);
      this.authService.removeFavorite(id);
    }
  }

  handleCloseForm(): void {
    this.showForm.set(false);
    this.editingHero.set(undefined);
  }
}

