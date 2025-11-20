import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeroService } from './core/services/hero.service';
import { LoginComponent } from './feature/login/login.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, LoginComponent, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly heroService = inject(HeroService);

  currentUser = this.authService.currentUser;

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      console.log('Utilisateur modifié:', user?.username);
      if (user) {
        setTimeout(() => {
          this.heroService.reloadUserHeroes();
        }, 0);
      } else {
        this.heroService.heroes.set([]);
      }
    });
  }
}

