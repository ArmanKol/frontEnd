import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from 'src/app/services/lokaal_service/lokaalservice.service';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAPI } from 'src/app/services/googleAPI_service/googleAPI.service';
import * as moment from 'moment'

@Component({
  selector: 'app-lokaalaanvraag',
  templateUrl: './lokaalaanvraag.component.html',
  styleUrls: ['./lokaalaanvraag.component.css']
})
export class LokaalaanvraagComponent implements OnInit {

  lokaalaanvragenlijst = [];
  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  showLokaalMessage: boolean;
  showDeletedMessage: boolean;
  afsprakenDagItems: any[];

  constructor(private lokaalaanvraag: LokaalserviceService,
    private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private router: Router,
    private googleapi: GoogleAPI
    )
  {
  this.googleapi.initClient();
  }

  async onSubmit(){
    await this.googleapi.getCalendarItems();
    this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value);
    /*for(let item of this.calendarItems){
      AFGEHANDELD if(moment(item.start.dateTime).format('YYYY-MM-DD') === (<HTMLInputElement>document.getElementById("datum")).value){
      AFGEHANDELD  if(!(moment(item.start.dateTime).format('LT') === (<HTMLInputElement>document.getElementById("begintijd")).value) ||
      AFGEHANDELD  (<HTMLInputElement>document.getElementById("begintijd")).value <= moment(item.start.dateTime).subtract(0.5, 'hours').format('LT') ||
      AFGEHANDELD   (<HTMLInputElement>document.getElementById("eindtijd")).value <= moment(item.start.dateTime).format('LT')){
      AFGEHANDELD     if((<HTMLInputElement>document.getElementById("begintijd")).value >= moment(item.end.dateTime).format('LT') ||
      AFGEHANDELD          (<HTMLInputElement>document.getElementById("eindtijd")).value <= moment(item.start.dateTime).format('LT') ){
             if(this.lokaalaanvraag.form.valid){
               if(this.lokaalaanvraag.form.get('$key').value == null){
                 this.lokaalaanvraag.insertLokaalAanvraag(this.lokaalaanvraag.form.value, this.firebaseAuth.auth.currentUser);
                 this.showSuccessMessage = true;
                 setTimeout(() => this.showSuccessMessage = false, 3000);
                 break;
               }
             }
             else{
               this.showNotSuccessMessage = true;
               setTimeout(() => this.showSuccessMessage = false, 3000);
             }
           }else{
             this.showNotSuccessMessage = true;
             alert("Op dit moment is het lokaal in gebruik van: "+moment(item.start.dateTime).format('LT')+" tot "+moment(item.end.dateTime).format('LT'));
             setTimeout(() => this.showSuccessMessage = false, 3000);
           }
        }else{
          this.showNotSuccessMessage = true;
          alert("Op dit moment is het lokaal in gebruik van: "+moment(item.start.dateTime).format('LT')+" tot "+moment(item.end.dateTime).format('LT'));
          setTimeout(() => this.showSuccessMessage = false, 3000);
        }
      }else{
        if(this.lokaalaanvraag.form.valid){
          if(this.lokaalaanvraag.form.get('$key').value == null){
            this.lokaalaanvraag.insertLokaalAanvraag(this.lokaalaanvraag.form.value, this.firebaseAuth.auth.currentUser);
            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 3000);
            break;
          }
        }
      }
    }*/
  }


  checkBegintijd_GroterDan_AfspraakEindtijd(){
    for(let afspraak of this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value)){
      if((<HTMLInputElement>document.getElementById("begintijd")).value >= moment(afspraak.end.dateTime).format('LT')){
        return true;
      }else{
        return false;
      }
    }
  }

  checkEindtijd_KleinerDan_AfspraakBegintijd(){
    for(let afspraak of this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value)){
      if((<HTMLInputElement>document.getElementById("eindtijd")).value <= moment(afspraak.start.dateTime).format('LT')){
        return true;
      }else{
        return false;
      }
    }
  }

  checkBegintijd_HalfuurEerderDan_AfspraakTijd(){
    for(let afspraak of this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value)){
      if((<HTMLInputElement>document.getElementById("begintijd")).value <= moment(afspraak.start.dateTime).subtract(0.5, 'hours').format('LT')){
        return true;
      }else{
        return false;
      }
    }
  }

  checkBegintijd_NietHetzelfde(){
    for(let afspraak of this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value)){
      if(!(moment(afspraak.start.dateTime).format('LT') === (<HTMLInputElement>document.getElementById("begintijd")).value)){
        return true;
      }else{
        return false;
      }
    }
  }

  checkTijd(){
    if(true){

    }
  }

  getAfsprakenOpDag(datum: string){
    moment.lang('nl');
    var items = new Array();
    for(let item of this.googleapi.calendarItems){
      if(moment(item.start.dateTime).format('YYYY-MM-DD') === datum){
        items.push(item);
      }else{
        return null;
      }
    }
    return items;
  }

  volledigeCheck(){
    
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  logout(){
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
