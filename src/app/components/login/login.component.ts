import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { Router } from '@angular/router';

//declare var gapi: any;
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

  customLogin(){
    console.log(this.Email);
    console.log(this.Wachtwoord);
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
