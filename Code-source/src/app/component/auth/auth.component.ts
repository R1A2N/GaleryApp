import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
    <h2>Login</h2>
    <form (submit)="login()">
      <label for="username">Username:</label>
      <input type="text" id="username" [(ngModel)]="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" [(ngModel)]="password" required>

      <button type="submit">Login</button>
    </form>
  `,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    // Simulez une vérification côté frontend
    if (this.username === 'rania' && this.password === 'rania') {
      // Redirigez vers la page d'accueil après une connexion réussie
      this.router.navigate(['']);
    } else {
      // Gérez l'échec de la connexion, par exemple, affichez un message d'erreur
      console.error('Échec de la connexion');
    }
  }
}
