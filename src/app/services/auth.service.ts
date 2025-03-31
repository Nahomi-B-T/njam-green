import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000/api/usuarios'; // backend MongoDB

  constructor(private auth: Auth, private http: HttpClient) {}

  //método logout
  logout() {
    localStorage.removeItem('nombreUsuario'); // Limpia el nombre guardado
    return this.auth.signOut(); // Cierra sesión de Firebase
  }


  // 🔹 Guardar usuario con nombre en MongoDB
  async guardarUsuarioConNombre(email: string, nombre: string) {
    try {
      await this.http.post(this.API_URL, { email, nombre }).toPromise();
    } catch (error) {
      console.error("Error al guardar usuario con nombre:", error);
    }
  }

  // 🔹 Registro con correo
  async registerWithEmail(email: string, password: string, nombre: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        await this.guardarUsuarioConNombre(email, nombre);
        localStorage.setItem('nombreUsuario', nombre); // 💾 Guardamos nombre
      }

      return user;
    } catch (error: any) {
      console.error("Error en Firebase:", error);
      throw new Error(this.getErrorMessage(error.code)); 
    }
  }

  // 🔹 Login con correo
  async loginWithEmail(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = credential.user;
      
      // 🔍 Buscar el nombre en tu base de datos
      const encodedEmail = encodeURIComponent(email);
      const response: any = await this.http.get(`${this.API_URL}/${encodedEmail}`).toPromise();

      if (response && response.nombre) {
        localStorage.setItem('nombreUsuario', response.nombre); // 💾 Guardamos nombre
      } else {
        localStorage.setItem('nombreUsuario', 'Usuario');
      }

      return user;
    } catch (error: any) {
      console.error("Error en inicio de sesión:", error);
      throw new Error(this.getErrorMessage(error.code)); // 👈 esto es clave
    }
    
  }

  // 🔹 Login con Google
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);

      if (credential.user) {
        const nombre = credential.user.displayName || 'Usuario';
        const email = credential.user.email || '';

        // 🔄 Guardamos o actualizamos en MongoDB
        await this.guardarUsuarioConNombre(email, nombre);
        localStorage.setItem('nombreUsuario', nombre); // 💾
      }

      return credential.user;
    } catch (error) {
      console.error("Error en Google Sign-In", error);
      return null;
    }
  }

  // 🔧 Manejo de errores bonitos
  getErrorMessage(code: string): string {
    const errors: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado.',
      'auth/invalid-email': 'Correo no válido.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/network-request-failed': 'Error de conexión, verifica tu internet.',
    };
    return errors[code] || 'Error desconocido. Intenta de nuevo.';
  }
}
