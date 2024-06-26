import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from 'src/app/services/lokaal_service/lokaalservice.service';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAPI } from 'src/app/services/googleAPI_service/googleAPI.service';
import * as moment from 'moment'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { lokaal } from 'src/app/models/lokaal.modal';
@Component({
  selector: 'app-lokaalaanvraag',
  templateUrl: './lokaalaanvraag.component.html',
  styleUrls: ['./lokaalaanvraag.component.css']
})
export class LokaalaanvraagComponent implements OnInit {

  lokaalaanvragenCollection = [];
  aanvragenlijst: lokaal[];
  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  showLokaalMessage: boolean;
  form: FormGroup;
  lokaal: lokaal;
  user: Observable<firebase.User>;
  email: string;
  userid: string;

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
    this.optionsBeginTijdOpbouwen()
    this.form = this.fb.group({
      email: [this.email,[
      ]],
      begintijd: ['',[
        Validators.required
      ]],
      duur: ['',[
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
      this.user = this.firebaseAuth.authState;
      this.user.subscribe((user) => {
      this.email = user.email;
      })
      this.lokaal.email = this.email;
    })
  }

  async aanvraag(){
    await this.googleapi.getCalendarItems();
    if(this.form.valid && this.volledigeCheck()){
      this.la.addLokaalAanvraag(this.lokaal);
      this.msb.open("lokaalaanvraag is gelukt!");
    }else{
      this.showNotSuccessMessage = true;
      setTimeout(() => this.showNotSuccessMessage = false, 3000);
    }
  }

  /*
  * Opgegeven afspraak na of voor de afspraak dat in Google Agenda staat.
  */
  checkAfspraakOverlaptAfspraakGoogleAgenda(){
    //Pakt de begintijd die is gekozen op de html pagina en zet die vervolgens om naar een Date object.
    var beginTijdOpgegeven = (<HTMLInputElement>document.getElementById("beginTijd")).value;
    var beginTijdOpgegeven_dateObject = new Date(this.getDateVandaag(true)+beginTijdOpgegeven);

    //Pakt de duur die is gekozen op de html pagina.
    var duurOpgegeven = (<HTMLInputElement>document.getElementById("duur")).value;

    //Maakt met behulp van de begintijd en duur een date object aan met de eindtijd.
    var eindTijdOpgegeven = this.getEindTijd(beginTijdOpgegeven, duurOpgegeven);

    var datumOpgegeven = (<HTMLInputElement>document.getElementById("datum")).value;

    var result = false;

    //Iteration door de lokaalaanvragen die al in de google agenda staan.
    for(let afspraak of this.getAfsprakenOpDag(datumOpgegeven)){
      var afspraak_begintijd = new Date(afspraak.start.dateTime);
      var afspraak_eindTijd = new Date(afspraak.end.dateTime);

      /*Checkt of de afspraak niet overlapt met de afspraak dat in Google Agenda bestaat.
      * Als dat wel het geval is dan toon foutmelding en return false.
      * Anders return true
      */
      if((afspraak_begintijd.toTimeString() < eindTijdOpgegeven.toTimeString() && afspraak_eindTijd.toTimeString() > beginTijdOpgegeven_dateObject.toTimeString()) ||
         (eindTijdOpgegeven.toTimeString() > afspraak_begintijd.toTimeString() && afspraak_eindTijd.toTimeString() > beginTijdOpgegeven_dateObject.toTimeString())){
        alert('De opgegeven tijd en duur ligt midden in een bestaande afspraak. Probeer je begin tijd op een latere tijdstip.');
        return false;
      }else if(eindTijdOpgegeven.toTimeString() <= afspraak_begintijd.toTimeString() || afspraak_eindTijd.toTimeString() <= beginTijdOpgegeven_dateObject.toTimeString()){
        result = true;
      }
    }
    return result;
  }

  /*
  * Checkt of de opgegeven afspraak niet met een bestaande afspraak in de database overlapt.
  */
  checkAfspraakOverlaptAfspraakDatabase(){
    //Pakt de begintijd die is gekozen op de html pagina en zet die vervolgens om naar een Date object.
    var beginTijdOpgegeven = (<HTMLInputElement>document.getElementById("beginTijd")).value;
    var beginTijdOpgegeven_dateObject = new Date(this.getDateVandaag(true)+beginTijdOpgegeven);

    //Pakt de duur die is gekozen op de html pagina.
    var duurOpgegeven = (<HTMLInputElement>document.getElementById("duur")).value;

    //Maakt met behulp van de begintijd en duur een date object aan met de eindtijd.
    var eindTijdOpgegeven = this.getEindTijd(beginTijdOpgegeven, duurOpgegeven);

    var result = false;
    //Iteration door de lokaalaanvragen die al in de database staan.
    for(let afspraak of this.lokaalaanvragenCollection){
      console.log(afspraak.length);
      var afspraak_begintijd = new Date(this.getDateVandaag(true)+afspraak.begintijd);
      var afspraak_eindTijd = new Date(this.getDateVandaag(true)+afspraak.eindtijd);

      /*Checkt of de afspraak niet overlapt met de afspraak dat al in de database staat.
      * Als dat wel het geval is dan toon foutmelding en return false.
      * Anders return true
      */
      if((afspraak_begintijd.toTimeString() < eindTijdOpgegeven.toTimeString() && afspraak_eindTijd.toTimeString() > beginTijdOpgegeven_dateObject.toTimeString()) ||
         (eindTijdOpgegeven.toTimeString() > afspraak_begintijd.toTimeString() && afspraak_eindTijd.toTimeString() > beginTijdOpgegeven_dateObject.toTimeString())){
        alert('De opgegeven tijd en duur ligt midden in een bestaande afspraak. Probeer je begin tijd op een latere tijdstip.');
        return false;
      }else if(eindTijdOpgegeven.toTimeString() <= afspraak_begintijd.toTimeString() || afspraak_eindTijd.toTimeString() <= beginTijdOpgegeven_dateObject.toTimeString()){
        result = true;
      }
    }
    return result;
  }


  optionsBeginTijdOpbouwen(){
    var dateVandaag = new Date();
    var selectobject = (<HTMLInputElement>document.getElementById("beginTijd"));
    var array = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
                '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',
                '18:00','18:30','19:00','19:30','20:00','20:30','21:00'];

    for(let afspraak of this.lokaalaanvragenCollection){
       if(moment(afspraak.datum).format('L') === moment(dateVandaag).format('L')){
         array = array.filter(item => item !== afspraak.begintijd);
       }
    }
    for(let value of array){
      var option = document.createElement("option");
      option.setAttribute("value", value);
      option.text = value;
      selectobject.appendChild(option);
    }
  }


  /*
  * Krijgt de begintijd en duur binnen en zorgt ervoor dat er een Date object gemaakt wordt met de eindtijd. Returned Date object met de eindtijd.
  */
  getEindTijd(beginTijd: string, duur: string){
    var begin_tijd:string = beginTijd;
    var duur_tijd:string = duur;

    var stringSplit_beginTijd = begin_tijd.split(":");
    var stringSplit_duurTijd = duur_tijd.split(":");

    var date = new Date(null, null, null, Number(stringSplit_beginTijd[0]), Number(stringSplit_beginTijd[1]), 0);
    var date2 = new Date(null, null, null, Number(stringSplit_duurTijd[0]), Number(stringSplit_duurTijd[1]), 0);

    var urenPlus = date.getHours() + date2.getHours();
    var minutenPlus = date.getMinutes() + date2.getMinutes();

    if(minutenPlus == 60){
      minutenPlus = Number('00');
      urenPlus += 1;
    }
    return new Date(this.getDateVandaag(true)+(urenPlus + ":" + minutenPlus));
  }

  /*
  * Haal de datum van vandaag op en zet het om naar YYYY-MM-DD en return de String.
  */
  getDateVandaag(metSpatie:boolean){
    var vandaagDate = new Date();

    var dag = vandaagDate.getDate();
    var maand = vandaagDate.getMonth()+1;
    var jaar = vandaagDate.getFullYear();

    if(metSpatie){
      var returnString = jaar+'/'+maand+'/'+dag+' ';
    }else{
      var returnString = jaar+'/'+maand+'/'+dag;
    }

    return returnString;
  }

  /*
  * Geeft alle afspraken terug die in Google Agenda staan.
  */
  getAfsprakenOpDag(datum: string){
    moment.locale('nl');
    var items = new Array();

    for(let item of this.googleapi.calendarItems){
      if(moment(item.start.dateTime).format('YYYY-MM-DD') == datum){
        items.push(item);
      }else{
        //return null;
      }
    }
    return items;
  }

  /*
  *
  */
  volledigeCheck(){
    //Haal alle afspraken op in de Google Agenda met de gekozen datum op de pagina.
    var googleLijstAfspraken = this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value);
    if(googleLijstAfspraken.length > 0 && this.checkAfspraakOverlaptAfspraakGoogleAgenda()){
      return true;
    }else if(googleLijstAfspraken.length == 0 && this.checkAfspraakOverlaptAfspraakDatabase() || this.lokaalaanvragenCollection.length == 0){
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
  get duur(){
    return this.form.get('duur');
  }
  get begintijd(){
    return this.form.get('begintijd');
  }

}
