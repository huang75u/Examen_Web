import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { AuthService } from '../../core/services/auth.service';
import { HeroCardComponent } from '../../shared/components/hero-card/hero-card.component';
import { HeroFormComponent } from '../../shared/components/hero-form/hero-form.component';
import { Hero } from '../../shared/models/hero.model';

@Component({
  selector: 'app-labels',
  standalone: true,
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
  imports: [HeroCardComponent, HeroFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsComponent {
  private readonly heroService = inject(HeroService);
  private readonly authService = inject(AuthService);

  showForm = signal(false);
  editingHero = signal<Hero | undefined>(undefined);
  selectedLabel = signal<string | null>(null);

  allLabels = computed(() => this.heroService.getAllLabels());

  herosByLabel = computed(() => {
    const result: Record<string, Hero[]> = {};
    this.allLabels().forEach((label) => {
      result[label] = this.heroService.heroes().filter((hero) => hero.labels.includes(label));
    });
    return result;
  });

  heroesWithoutLabels = computed(() => this.heroService.heroes().filter((hero) => hero.labels.length === 0));

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

  handleSelectLabel(label: string | null): void {
    this.selectedLabel.set(label);
  }
}

