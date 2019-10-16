import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState: any = null;
  Email: string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(auth => this.authState = auth);
   }

  isLoggedIn(): boolean{
    return this.authState !== null;
  }

  isAdmin(): boolean{
    try{
      if(!(this.Email === null)){
        this.Email = this.firebaseAuth.auth.currentUser.email;
        if( this.Email === "admin@admin.com"){
          return true;
      }else{
        return false;
        }
      }
    }catch(e){
      if(e instanceof TypeError){
        return false;
      }
    }
  }
}
