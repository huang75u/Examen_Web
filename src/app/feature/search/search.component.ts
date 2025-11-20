import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../core/services/hero.service';
import { AuthService } from '../../core/services/auth.service';
import { HeroCardComponent } from '../../shared/components/hero-card/hero-card.component';
import { HeroFormComponent } from '../../shared/components/hero-form/hero-form.component';
import { Hero } from '../../shared/models/hero.model';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [FormsModule, HeroCardComponent, HeroFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly heroService = inject(HeroService);
  private readonly authService = inject(AuthService);

  searchTerm = signal('');
  showForm = signal(false);
  editingHero = signal<Hero | undefined>(undefined);

  filteredHeroes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.heroService.heroes().filter((hero) => hero.nemesis.toLowerCase().includes(term));
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

  handleClearSearch(): void {
    this.searchTerm.set('');
  }
}

