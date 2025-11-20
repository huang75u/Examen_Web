import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Hero } from '../../models/hero.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  imports: [DatePipe, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  private readonly authService = inject(AuthService);

  hero = input.required<Hero>();
  heroEdit = output<Hero>();
  heroDelete = output<string>();

  get isFavorite(): boolean {
    return this.authService.isFavorite(this.hero().id);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  toggleFavorite(): void {
    this.authService.toggleFavorite(this.hero().id);
  }

  editHero(): void {
    this.heroEdit.emit(this.hero());
  }

  deleteHero(): void {
    this.heroDelete.emit(this.hero().id);
  }
}

