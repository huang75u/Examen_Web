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
      console.log('User changed:', user?.username);
      if (user) {
        // 延迟加载以确保服务已完全初始化
        setTimeout(() => {
          this.heroService.reloadUserHeroes();
        }, 0);
      } else {
        // 用户退出时清空英雄列表
        this.heroService.heroes.set([]);
      }
    });
  }
}

