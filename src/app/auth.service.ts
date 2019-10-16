import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(auth => this.authState = auth);
   }

  isLoggedIn(): boolean{
    return this.authState !== null;
  }
}
