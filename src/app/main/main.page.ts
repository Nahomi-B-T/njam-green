import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class MainPage implements OnInit {
  usuario: string = 'Usuario';

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser?.displayName) {
      this.usuario = currentUser.displayName;
      localStorage.setItem('nombreUsuario', currentUser.displayName); // Por si se quiere conservar
    } else {
      const nombreGuardado = localStorage.getItem('nombreUsuario');
      if (nombreGuardado) {
        this.usuario = nombreGuardado;
      }
    }

    this.menuCtrl.enable(true);
  }
  
  cerrarSesion() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
  
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  openManual() {
    window.open('URL_DEL_MANUAL', '_blank');
  }

  openWebsite() {
    window.open('URL_DE_LA_PAGINA_WEB', '_blank');
  }

  iniciarProceso() {
    console.log(`Proceso de clasificación iniciado por ${this.usuario}...`);
    // Aquí podrías llamar a tu backend o microcontrolador para iniciar sensores
  }
}
