import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.model';
import { HeroFormData, ValidationErrors } from '../../models/hero-form.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormComponent {
  private readonly heroService = inject(HeroService);

  hero = input<Hero | undefined>();
  closeForm = output<void>();

  formData = signal<HeroFormData>({
    name: '',
    team: '',
    nemesis: '',
    firstAppearance: '',
    image: '',
    labels: [],
  });

  errors = signal<ValidationErrors>({});
  newLabel = signal('');

  constructor() {
    effect(() => {
      const currentHero = this.hero();
      if (currentHero) {
        this.formData.set({
          name: currentHero.name,
          team: currentHero.team || '',
          nemesis: currentHero.nemesis,
          firstAppearance: currentHero.firstAppearance,
          image: currentHero.image || '',
          labels: currentHero.labels,
        });
      }
    });
  }

  validate(): boolean {
    const newErrors: ValidationErrors = {};
    const data = this.formData();

    if (!data.name.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    }

    if (!data.nemesis.trim()) {
      newErrors.nemesis = 'Le némésis est obligatoire';
    }

    if (!data.firstAppearance) {
      newErrors.firstAppearance = 'La date de première apparition est obligatoire';
    } else {
      const date = new Date(data.firstAppearance);
      if (isNaN(date.getTime())) {
        newErrors.firstAppearance = 'La date doit être valide';
      }
    }

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const data = this.formData();
    const heroData = {
      name: data.name.trim(),
      team: data.team.trim() || undefined,
      nemesis: data.nemesis.trim(),
      firstAppearance: data.firstAppearance,
      image: data.image.trim() || undefined,
      labels: data.labels,
    };

    const currentHero = this.hero();
    if (currentHero) {
      this.heroService.updateHero(currentHero.id, heroData);
    } else {
      this.heroService.addHero(heroData);
    }

    this.closeForm.emit();
  }

  handleAddLabel(): void {
    const label = this.newLabel().trim();
    const currentLabels = this.formData().labels;

    if (label && !currentLabels.includes(label)) {
      this.formData.update((data) => ({
        ...data,
        labels: [...data.labels, label],
      }));
      this.newLabel.set('');
    }
  }

  handleRemoveLabel(label: string): void {
    this.formData.update((data) => ({
      ...data,
      labels: data.labels.filter((l) => l !== label),
    }));
  }

  handleClose(): void {
    this.closeForm.emit();
  }

  handleOverlayClick(): void {
    this.closeForm.emit();
  }

  handleContentClick(event: Event): void {
    event.stopPropagation();
  }

  updateField(field: keyof HeroFormData, value: string): void {
    this.formData.update((data) => ({
      ...data,
      [field]: value,
    }));
  }
}

