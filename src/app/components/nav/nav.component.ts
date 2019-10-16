import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/services/auth_guard_service/authguard.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(public AuthGuard: AuthguardService, private firebaseAuth: AngularFireAuth) { }

  Email: string;

  ngOnInit() {
    this.isAdmin();
  }

  isAdmin(): boolean{
    if(!(this.Email === null)){
      this.Email = this.firebaseAuth.auth.currentUser.email;
      if( this.Email === "admin@admin.com"){
        return true;
    }else{
      return false;
      }
    }
  }
}
