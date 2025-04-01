import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [HttpClientModule , IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterPage {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden";
      return;
    }

    try {
      const user = await this.authService.registerWithEmail(this.email, this.password, this.name);
      if (user) {
        // Guardar usuario en MongoDB
        await this.http.post('http://localhost:5000/api/usuarios', {
          email: this.email,
          nombre: this.name
        }).toPromise();

        localStorage.setItem('nombreUsuario', this.name);
        this.router.navigate(['/main']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || "Error desconocido en el registro";
    }
  }

  async registerWithGoogle() {
    const result: any = await this.authService.loginWithGoogle();
    if (result) {
      let name = result.user.displayName;

      if (result.needsName) {
        name = prompt("Ingresa tu nombre para completar el registro:");
        if (name) {
          await result.user.updateProfile({ displayName: name });
        } else {
          return;
        }
      }

      // Guardar en MongoDB
      await this.http.post('http://localhost:5000/api/usuarios', {
        email: result.user.email,
        nombre: name
      }).toPromise();

      localStorage.setItem('nombreUsuario', name);
      this.router.navigate(['/main']);
    } else {
      console.error("Error en Google Sign-In");
    }
  }
}
