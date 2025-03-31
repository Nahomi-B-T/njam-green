import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoginPage {
  email: string = ''; 
  password: string = '';
  errorMessage: string = '';

  mostrarPassword: boolean = false;

togglePasswordVisibility() {
  this.mostrarPassword = !this.mostrarPassword;
}


  constructor(private authService: AuthService, private router: Router) {}
  
  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = "Por favor, ingresa un correo y una contraseña.";
      return;
    }
    try {
      const user = await this.authService.loginWithEmail(this.email, this.password);
      if (user) {
        this.router.navigate(['/main']);
      } else {
        this.errorMessage = "Correo o contraseña incorrectos.";
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }    
  }

  async loginWithGoogle() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      this.router.navigate(['/main']);
    } else {
      console.error("Error en Google Sign-In");
    }
  }
}
