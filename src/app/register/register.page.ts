import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterPage {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false;

togglePasswordVisibility() {
  this.mostrarPassword = !this.mostrarPassword;
}

toggleConfirmPasswordVisibility() {
  this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
}


  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden";
      return;
    }

    try {
      const user = await this.authService.registerWithEmail(this.email, this.password, this.name);
      if (user) {
        this.router.navigate(['/main']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || "Error desconocido en el registro";
    }
  }

  async registerWithGoogle() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      this.router.navigate(['/main']);
    } else {
      console.error("Error en Google Sign-In");
    }
  }
}
