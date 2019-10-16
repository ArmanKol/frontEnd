import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aanvraag',
  templateUrl: './aanvraag.component.html',
  styleUrls: ['./aanvraag.component.css']
})
export class AanvraagComponent implements OnInit {

  aanvragenlijst = [];
  arrByID = [];
  showDeletedMessage: boolean;
  showLokaalMessage: boolean;
  Email: string;
  Wachtwoord: string;

  constructor(private aanvraag: DataService, private firebaseAuth: AngularFireAuth,private authenticationService: AuthenticationService,private router: Router) { }

  filterByID(obj) {
    if (obj.payload.val().status == "progress") {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    console.log(this.firebaseAuth.auth.currentUser.email);
    this.isAdmin();
    this.aanvraag.getAanvragen().subscribe( list =>{
      this.arrByID = list.filter(this.filterByID)
      this.aanvragenlijst = this.arrByID.map(item =>{
        return{
          key: item.key,
          ...item.payload.val()
        }
      })
    });
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

  onSubmit($key, wachtwoord, email){
    if (confirm('wil je dit lokaal verzoek echt goedkeuren ?')) {
      console.log(wachtwoord, email);
      this.aanvraag.updateAanvraag($key);
      this.showLokaalMessage = true;
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, wachtwoord);
      setTimeout(() => this.showLokaalMessage = false, 3000);
    }
  }

  onDelete($key) {
    if (confirm('wil je dit lokaal verzoek afwijzen ?')) {
      this.aanvraag.deleteAanvraag($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }
}
