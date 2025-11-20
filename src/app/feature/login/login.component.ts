import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  isRegister = signal(false);
  username = signal('');
  password = signal('');
  error = signal('');

  handleSubmit(): void {
    this.error.set('');

    if (!this.username() || !this.password()) {
      this.error.set('Veuillez remplir tous les champs');
      return;
    }

    if (this.isRegister()) {
      const success = this.authService.register(this.username(), this.password());
      if (!success) {
        this.error.set('Ce nom d\'utilisateur existe déjà');
      }
    } else {
      const success = this.authService.login(this.username(), this.password());
      if (!success) {
        this.error.set('Identifiants incorrects');
      }
    }
  }

  handleToggleMode(): void {
    this.isRegister.update((v) => !v);
    this.error.set('');
  }
}

