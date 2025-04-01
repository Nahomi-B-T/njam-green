import { Injectable } from '@angular/core';
import { signOut } from '@angular/fire/auth';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}
  
  async registerWithEmail(email: string, password: string, name: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      if (credential.user) {
        await updateProfile(credential.user, { displayName: name });
      }

      return credential.user;
    } catch (error) {
      console.error("Error en el registro:", error);
      return null;
    }

    
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential.user;
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      return null;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);

      if (!credential.user?.displayName) {
        return { user: credential.user, needsName: true };
      }

      return { user: credential.user, name: credential.user.displayName };
    } catch (error) {
      console.error("Error en Google Sign-In", error);
      return null;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('nombreUsuario');
      console.log('🟢 Sesión cerrada');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }

}
