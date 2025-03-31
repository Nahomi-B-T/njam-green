import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // <- Añade esto
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})

  
export class MainPage implements OnInit {
  usuario: string = 'Usuario';

  constructor(private router: Router, private authService: AuthService, private menuCtrl: MenuController) {}


  ngOnInit() {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if (nombreGuardado) {
      this.usuario = nombreGuardado;
    }
    this.menuCtrl.enable(true); // <- ¡FUERZA el menú!
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  //logout
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Redirige al login
    });
  }


  openManual() {
    window.open('URL_DEL_MANUAL', '_blank');
  }

  openWebsite() {
    window.open('URL_DE_LA_PAGINA_WEB', '_blank');
  }

  iniciarProceso() {
    console.log(`Proceso de clasificación iniciado por ${this.usuario}...`);
  }
}
