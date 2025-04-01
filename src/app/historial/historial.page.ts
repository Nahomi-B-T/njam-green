import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule]
})
export class HistorialPage implements OnInit {
  historial: any[] = [];
  usuarioEmail = ''; // Aquí irá el email del usuario logueado

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // ⚠️ Simula que ya tienes el email guardado después del login
    this.usuarioEmail = localStorage.getItem('usuarioEmail') || 'ejemplo@email.com';

    // Llama a tu backend para obtener el historial del usuario
    this.http.get<any[]>('http://localhost:5000/api/historial').subscribe(data => {
      this.historial = data;
    });
    
  }
}