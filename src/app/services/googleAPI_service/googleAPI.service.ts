import { Injectable } from '@angular/core';

declare var gapi: any;
@Injectable({
  providedIn: 'root'
})


export class GoogleAPI {
  calendarItems: any[];

  constructor() {
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

  async getCalendarItems(){
    const events = await gapi.client.calendar.events.list({
      calendarId: 'hu.nl_moi2lsgoco29i3cpodfuhbpl64@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });
      this.calendarItems = events.result.items;
  }

}
