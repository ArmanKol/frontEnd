import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from '../lokaalservice.service';
import { Aanvraag } from '../aanvraag';
import { AangevraagdComponent } from '../aangevraagd/aangevraagd.component';
import { AuthenticationService } from '../authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as moment from 'moment'


declare var gapi: any;
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
  calendarItems: any[];

  constructor(private lokaalaanvraag: LokaalserviceService,
    private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private router: Router,
    )
  {
    this.initClient();
  }

  async onSubmit(){
    moment.locale('nl');
    const events = await gapi.client.calendar.events.list({
      calendarId: 'hu.nl_moi2lsgoco29i3cpodfuhbpl64@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });
    this.calendarItems = events.result.items;
    for(let item of this.calendarItems){
      if(moment(item.start.dateTime).format('YYYY-MM-DD') === (<HTMLInputElement>document.getElementById("datum")).value){
        if(!(moment(item.start.dateTime).format('LT') === (<HTMLInputElement>document.getElementById("begintijd")).value) ||
        (<HTMLInputElement>document.getElementById("begintijd")).value <= moment(item.start.dateTime).subtract(0.5, 'hours').format('LT') ||
         (<HTMLInputElement>document.getElementById("eindtijd")).value <= moment(item.start.dateTime).format('LT')){
           if((<HTMLInputElement>document.getElementById("begintijd")).value >= moment(item.end.dateTime).format('LT') ||
                (<HTMLInputElement>document.getElementById("eindtijd")).value <= moment(item.start.dateTime).format('LT') ){
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
    }
  }

  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyCunfk0MfhF-NG74tFty8rFLdMwE3_HjJk',
        clientId: '787618951029-90q95kchei08btpdk8r564io5jvbu7nb.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
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
