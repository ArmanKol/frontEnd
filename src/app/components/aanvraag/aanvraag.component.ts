import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data_service/data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { Router } from '@angular/router';
import { lokaal } from 'src/app/models/lokaal.modal';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-aanvraag',
  templateUrl: './aanvraag.component.html',
  styleUrls: ['./aanvraag.component.css']
})
export class AanvraagComponent implements OnInit {

  lokaalaanvragen: lokaal[];
  arrByID = [];
  showDeletedMessage: boolean;
  showLokaalMessage: boolean;
  Email: string;
  Wachtwoord: string;

  constructor(private aanvraag: DataService, private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,private router: Router, private msb: MatSnackBar) { }

  filterByID(obj) {
    if (obj.payload.val().status == "progress") {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.isAdmin();
    this.lokaalAanvragen()
  }

  lokaalAanvragen(){
    this.aanvraag.getAdvertenties().subscribe(lokaalaavraag=>{
      this.lokaalaanvragen = lokaalaavraag
    })
  }

  logout(){
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isAdmin(){
    this.Email = this.firebaseAuth.auth.currentUser.email;
    if( this.Email === "admin@admin.com"){
      console.log(this.Email);
    }else{
      this.router.navigate(['lokaalaanvraag']);
    }
  }

  onSubmit(id, wachtwoord, email){
    if (confirm('wil je dit lokaal verzoek echt goedkeuren ?')) {
      console.log(id, email);
      this.aanvraag.updateAanvraag(id);
      this.msb.open("account geaccepteerd");
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, wachtwoord);
    }
  }

  onDelete(id) {
    if (confirm('wil je dit lokaal verzoek afwijzen ?')) {
      this.aanvraag.deleteAanvraag(id);
      this.msb.open("account afgewezen");
    }
  }

}
