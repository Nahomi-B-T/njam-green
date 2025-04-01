import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-manual',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './control-manual.page.html',
  styleUrls: ['./control-manual.page.scss']
})
export class ControlManualPage {
  // Dirección del backend que se conecta al ESP32
  private apiUrl = 'http://192.168.1.19/api/control'; // Cambia esta URL por la correcta de tu ESP32

  constructor(
    private http: HttpClient,
    private toastController: ToastController // Para mostrar mensajes visuales
  ) {}

  abrirCompuerta(tipo: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(`${this.apiUrl}/abrir`, {}, { headers }).subscribe({
      next: () => this.showToast(`✅ Compuerta ${tipo} abierta correctamente`),
      error: () => this.showToast(`❌ Error al abrir compuerta ${tipo}`, 'danger')
    });
  }

  cerrarCompuerta(tipo: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(`${this.apiUrl}/cerrar`, {}, { headers }).subscribe({
      next: () => this.showToast(`🔒 Compuerta ${tipo} cerrada correctamente`),
      error: () => this.showToast(`❌ Error al cerrar compuerta ${tipo}`, 'danger')
    });
  }

  iniciarCalibracion(tipo: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(`${this.apiUrl}/calibrar`, {}, { headers }).subscribe({
      next: () => this.showToast(`🔧 Calibración iniciada en compuerta ${tipo}`),
      error: () => this.showToast(`❌ Fallo en calibración de ${tipo}`, 'danger')
    });
  }

  clasificarDesecho(tipo: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(`${this.apiUrl}/clasificar`, { tipo }, { headers }).subscribe({
      next: () => this.showToast(`🔍 Clasificación completada en ${tipo}`),
      error: () => this.showToast(`❌ Fallo en clasificación de ${tipo}`, 'danger')
    });
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}