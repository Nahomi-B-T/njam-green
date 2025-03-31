import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ ¡Este es el importante!

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule]

})
export class HomePage implements OnInit {
  router: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']); // Redirige a login después de 2 segundos
    }, 2000);
  }
  }

