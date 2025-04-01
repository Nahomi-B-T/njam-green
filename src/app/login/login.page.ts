import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class LoginPage {
  email: string = ''; 
  password: string = '';
  errorMessage: string = '';
  mostrarPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = "Por favor, ingresa un correo y una contraseña.";
      return;
    }

    try {
      const user = await this.authService.loginWithEmail(this.email, this.password);
      if (user) {
        // Guardar/Actualizar en MongoDB
        await this.http.post('http://localhost:5000/api/usuarios', {
          email: this.email,
          nombre: user.displayName || 'Usuario'
        }).toPromise();

        localStorage.setItem('nombreUsuario', user.displayName || 'Usuario');
        this.router.navigate(['/main']);
      } else {
        this.errorMessage = "Correo o contraseña incorrectos.";
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async loginWithGoogle() {
    const result: any = await this.authService.loginWithGoogle();
    if (result) {
      let name = result.user.displayName;

      if (result.needsName) {
        name = prompt("Ingresa tu nombre:");
        if (name) {
          await result.user.updateProfile({ displayName: name });
        } else {
          return;
        }
      }

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