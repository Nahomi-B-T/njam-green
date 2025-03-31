import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//paso 2
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ ¡Este es el importante!

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  //paso 3
  standalone: true,
  //paso 4
  imports: [IonicModule, CommonModule, HttpClientModule]
})
export class HistorialPage {
  historial = [
    { id: 1, material: 'Plástico', tipo: 'IN', fecha: '14/02' },
    { id: 2, material: 'Metal', tipo: 'IN', fecha: '14/02' },
    { id: 3, material: 'Cartón', tipo: 'IN', fecha: '14/02' },
    { id: 4, material: 'Vidrio', tipo: 'IN', fecha: '15/02' },
    { id: 5, material: 'Desechos alimenticios', tipo: 'OR', fecha: '15/02' },
    { id: 6, material: 'Desechos alimenticios', tipo: 'OR', fecha: '15/02' },
    { id: 7, material: 'Vidrio', tipo: 'IN', fecha: '15/02' },
    { id: 8, material: 'Desechos alimenticios', tipo: 'OR', fecha: '20/02' },
    { id: 9, material: 'Desechos alimenticios', tipo: 'OR', fecha: '20/02' },
    { id: 10, material: 'Cartón', tipo: 'IN', fecha: '20/02' }
  ];
}
