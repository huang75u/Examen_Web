import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { AuthService } from '../../core/services/auth.service';
import { HeroCardComponent } from '../../shared/components/hero-card/hero-card.component';
import { HeroFormComponent } from '../../shared/components/hero-form/hero-form.component';
import { Hero } from '../../shared/models/hero.model';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  imports: [HeroCardComponent, HeroFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {
  private readonly heroService = inject(HeroService);
  private readonly authService = inject(AuthService);

  heroes = this.heroService.heroes;
  showForm = signal(false);
  editingHero = signal<Hero | undefined>(undefined);

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

  handleAddNew(): void {
    this.editingHero.set(undefined);
    this.showForm.set(true);
  }
}

