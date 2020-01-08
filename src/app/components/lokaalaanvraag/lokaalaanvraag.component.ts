import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from 'src/app/services/lokaal_service/lokaalservice.service';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAPI } from 'src/app/services/googleAPI_service/googleAPI.service';
import * as moment from 'moment'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { lokaal } from 'src/app/models/lokaal.modal';
@Component({
  selector: 'app-lokaalaanvraag',
  templateUrl: './lokaalaanvraag.component.html',
  styleUrls: ['./lokaalaanvraag.component.css']
})
export class LokaalaanvraagComponent implements OnInit {

  aanvragenlijst: lokaal[];
  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  showLokaalMessage: boolean;
  form: FormGroup;
  lokaal: lokaal;

  showDeletedMessage: boolean;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private router: Router,
    private googleapi: GoogleAPI,
    private fb: FormBuilder,
    private la: LokaalserviceService,
    private msb: MatSnackBar
    )
  {
  this.googleapi.initClient();
  }

  ngOnInit() {
    this.form = this.fb.group({
      begintijd: ['',[
        Validators.required
      ]],
      eindtijd: ['',[
        Validators.required,
      ]],
      datum: ['',[
        Validators.required,
      ]],
      status: ['0',[
        
      ]]
    })
    this.form.valueChanges.subscribe((item) => {
      this.lokaal = item;
    })
  }

  async aanvraag(){
    await this.googleapi.getCalendarItems();
    if(this.volledigeCheck() && this.form.valid){
      this.la.addLokaalAanvraag(this.lokaal);
      this.msb.open("lokaalaanvraag is gelukt!")
    }else{
      //alert("Op dit moment is het lokaal in gebruik van: "+moment(item.start.dateTime).format('LT')+" tot "+moment(item.end.dateTime).format('LT'));
    }
  }


  checkBegintijd_GroterDan_AgendaEindtijd(){
    for(let afspraak of this.getAfsprakenOpDag(this.form.get('datum').value)){
      if(this.form.get('begintijd').value >= moment(afspraak.end.dateTime).format('LT')){
        return true;
      }else{
        this.showNotSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        return false;
      }
    }
  }

  checkEindtijd_KleinerDan_AgendaBegintijd(){
    for(let afspraak of this.getAfsprakenOpDag(this.form.get('datum').value)){
      if(this.form.get('eindtijd').value <= moment(afspraak.start.dateTime).format('LT')){
        return true;
      }else{
        this.showNotSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        return false;
      }
    }
  }

  checkBegintijd_HalfuurEerderDan_AgendaTijd(){
    for(let afspraak of this.getAfsprakenOpDag(this.form.get('datum').value)){
      if(this.form.get('begindatum').value <= moment(afspraak.start.dateTime).subtract(0.5, 'hours').format('LT')){
        return true;
      }else{
        this.showNotSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        return false;
      }
    }
  }

  checkBegintijd_NietHetzelfde(){
    for(let afspraak of this.getAfsprakenOpDag(this.form.get('datum').value)){
      if(!(moment(afspraak.start.dateTime).format('LT') === this.form.get('begintijd').value)){
        return true;
      }else{
        this.showNotSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        return false;
      }
    }
  }

  checkTijd(){
    if(this.checkBegintijd_HalfuurEerderDan_AgendaTijd() && this.checkBegintijd_NietHetzelfde() && this.checkEindtijd_KleinerDan_AgendaBegintijd()
      && this.checkBegintijd_GroterDan_AgendaEindtijd()){
        return true;
    }else{
      return false;
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
    console.log(this.form.get('datum').value)
    if((this.getAfsprakenOpDag(this.form.get('datum').value) == null)){
      return true;
    }else if(this.checkTijd() && (this.getAfsprakenOpDag(this.form.get('datum').value) != null)){
      return true;
    }else{
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(){
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }



  get datum(){
    return this.form.get('datum');
  }
  get begintijd(){
    return this.form.get('begintijd');
  }
  get eindtijd(){
    return this.form.get('eindtijd');
  }

}
