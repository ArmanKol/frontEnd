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
  arrByID = [];
  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  showLokaalMessage: boolean;
  showDeletedMessage: boolean;

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

    if(this.volledigeCheck() && this.lokaalaanvraag.form.valid && this.lokaalaanvraag.form.get('$key').value == null){
      this.lokaalaanvraag.insertLokaalAanvraag(this.lokaalaanvraag.form.value, this.firebaseAuth.auth.currentUser);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }else{
      this.showNotSuccessMessage = true;
      setTimeout(() => this.showNotSuccessMessage = false, 3000);
    }
  }

  /*check_eindTijd_kleiner_dan_beginTijd_agenda_punt(){
    var beginTijdOpgegeven = (<HTMLInputElement>document.getElementById("beginTijd")).value;
    var duurOpgegeven = (<HTMLInputElement>document.getElementById("duur")).value;
    var datumOpgegeven = (<HTMLInputElement>document.getElementById("datum")).value;
    var eindTijd = this.getEindTijd(beginTijdOpgegeven, duurOpgegeven);

    for(let afspraak of this.getAfsprakenOpDag(datumOpgegeven)){
      if(eindTijd >= new Date('1970/01/01 '+moment(afspraak.start.dateTime).format('LT'))){
        alert('De opgegeven tijd en duur overlapt een bestaande afspraak. Probeer de duur te verkorten of neem een begintijd dat eerder begint.1');
        return false;
      }else{
        return true;
      }
    }
  }*/

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

    for(let afspraak of this.getAfsprakenOpDag(datumOpgegeven)){
      var afspraak_begintijd = new Date(afspraak.start.dateTime);
      var afspraak_eindTijd = new Date(afspraak.end.dateTime);

      /*Checkt of de afspraak niet overlapt met de afspraak dat in Google Agenda bestaat.
      * Als dat wel het geval is dan toon foutmelding en return false.
      * Anders return true
      */
      if((afspraak_begintijd < eindTijdOpgegeven && afspraak_eindTijd > beginTijdOpgegeven_dateObject) ||
         (eindTijdOpgegeven > afspraak_begintijd && afspraak_eindTijd > beginTijdOpgegeven_dateObject)){
        alert('De opgegeven tijd en duur ligt midden in een bestaande afspraak. Probeer je begin tijd op een latere tijdstip.');
        return false;
      }else if(eindTijdOpgegeven <= afspraak_begintijd || afspraak_eindTijd <= beginTijdOpgegeven_dateObject){
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

    for(let afspraak of this.lokaalaanvragenlijst){
      var afspraak_begintijd = new Date(this.getDateVandaag(true)+afspraak.begintijd);
      var afspraak_eindTijd = new Date(this.getDateVandaag(true)+afspraak.eindtijd);

      /*Checkt of de afspraak niet overlapt met de afspraak dat al in de database staat.
      * Als dat wel het geval is dan toon foutmelding en return false.
      * Anders return true
      */
      if((afspraak_begintijd < eindTijdOpgegeven && afspraak_eindTijd > beginTijdOpgegeven_dateObject) ||
         (eindTijdOpgegeven > afspraak_begintijd && afspraak_eindTijd > beginTijdOpgegeven_dateObject)){
        alert('De opgegeven tijd en duur ligt midden in een bestaande afspraak. Probeer je begin tijd op een latere tijdstip.');
        return false;
      }else if(eindTijdOpgegeven <= afspraak_begintijd || afspraak_eindTijd <= beginTijdOpgegeven_dateObject){
        result = true;
      }
    }
    return result;
  }

  /*check_eindTijd_kleiner_dan_beginTijd_database_afspraak_tijd(){ //Opgegeven afspraak voor de afspraak dat al in de database staat.
    var beginTijdOpgegeven = (<HTMLInputElement>document.getElementById("beginTijd")).value;
    var beginTijdOpgegeven_date = new Date('1970/01/01 '+ (<HTMLInputElement>document.getElementById("beginTijd")).value);
    var duurOpgegeven = (<HTMLInputElement>document.getElementById("duur")).value;
    var eindTijd = this.getEindTijd(beginTijdOpgegeven, duurOpgegeven);

    var result = false;

    for(let afspraak of this.lokaalaanvragenlijst){
      var afspraak_begintijd = new Date('1970/01/01 '+afspraak.begintijd);
      var afspraak_eindtijd = new Date('1970/01/01 '+afspraak.eindtijd);
      console.log(afspraak);
      if(eindTijd > afspraak_begintijd && beginTijdOpgegeven_date < afspraak_eindtijd){
        alert('De opgegeven tijd en duur overlapt een bestaande afspraak. Probeer de duur te verkorten of neem een begintijd dat eerder begint.');
        return false;
      }else if(eindTijd <= afspraak_begintijd){
        result = true;
      }
    }
    return result;
  }*/

  optionsBeginTijdOpbouwen(){
    var dateVandaag = new Date();
    var selectobject = (<HTMLInputElement>document.getElementById("beginTijd"));
    var array = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
                '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',
                '18:00','18:30','19:00','19:30','20:00','20:30','21:00'];

    for(let afspraak of this.lokaalaanvragenlijst){
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


  volledigeCheck(){
    //Haal alle afspraken op in de Google Agenda met de gekozen datum op de pagina.
    var googleLijstAfspraken = this.getAfsprakenOpDag((<HTMLInputElement>document.getElementById("datum")).value);

    if(googleLijstAfspraken.length > 0 && this.checkAfspraakOverlaptAfspraakGoogleAgenda()){
      return true;
    }else if(googleLijstAfspraken.length == 0 && this.checkAfspraakOverlaptAfspraakDatabase()){
      return true;
    }else{
      return false;
    }

    // if(googleLijstAfspraken.length > 0){
    //   if(this.checkAfspraakOverlaptAfspraakGoogleAgenda() /*&& this.check_eindTijd_kleiner_dan_beginTijd_agenda_punt()*/){
    //     //this.getDateVandaag(true);
    //     return true;
    //   }else{
    //     return false;
    //   }
    // }else{
    //   if(this.checkAfspraakOverlaptAfspraakDatabase() /*&& this.check_eindTijd_kleiner_dan_beginTijd_database_afspraak_tijd()*/){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // }
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(){
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  filterByID(obj) {
    if (obj.payload.val().status == "progress") {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.lokaalaanvraag.getLokaalAanvragen().subscribe( list =>{
      this.arrByID = list.filter(this.filterByID)
      this.lokaalaanvragenlijst = this.arrByID.map(item =>{
          return {
            key: item.key,
            ...item.payload.val()
          }
      })
      this.optionsBeginTijdOpbouwen();
    });
  }

}
