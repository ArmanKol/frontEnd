import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string;
  Wachtwoord: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  // Functie die de inloggegevens aan de google api geeft, bij correcte gegevens wordt de gebruiker door gestuurd naar de pagina lokaalaanvraag.
  login(){
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/calendar')).then
    ((succes) => {this.router.navigateByUrl('/lokaalaanvraag')});
  }

  logout(){
    this.firebaseAuth.auth.signOut();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }


  // controlleerd of de inlog gegevens overeen komen met die van het admin account.
  customLogin(){
    if(this.Email === "admin@admin.com"){
      this.firebaseAuth.auth.signInWithEmailAndPassword(
        this.Email,
        this.Wachtwoord
      ).then((success) => {this.router.navigateByUrl('/aanvraag')});
    }else {
      this.firebaseAuth.auth.signInWithEmailAndPassword(
        this.Email,
        this.Wachtwoord
      ).then((success) => {this.router.navigateByUrl('/lokaalaanvraag')});
      }
  }
  
  ngOnInit() {
  }

}
