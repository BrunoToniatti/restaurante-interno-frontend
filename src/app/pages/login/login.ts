import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(private router: Router) {}

  onSubmit() {
    // Aqui você faria a autenticação real
    // Por enquanto, apenas redireciona
    this.router.navigate(['/app']);
  }
}
