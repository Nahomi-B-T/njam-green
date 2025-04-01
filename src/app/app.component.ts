import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  nombreUsuario: string = 'Usuario';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const nombre = localStorage.getItem('nombreUsuario');
    if (nombre) {
      this.nombreUsuario = nombre;
    }
  }

  // 🔐 Cierra sesión y redirige
  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  
    const toast = await this.toastController.create({
      message: 'Sesión cerrada exitosamente',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
  
    toast.present();
  }
}
