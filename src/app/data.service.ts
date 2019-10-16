import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Aanvraag } from './aanvraag';
import { AanvraagComponent } from './aanvraag/aanvraag.component';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private firebase: AngularFireDatabase) {
    this.aanvragenlijst =firebase.list('/customers')
  }
  aanvragenlijst: AngularFireList<any>;
  qrCodeLijst: AngularFireList<any>;

  i = 0;


  form = new FormGroup({
      $key: new FormControl(null),
      status: new FormControl('progress'),
      naam : new FormControl('', Validators.required),
      email : new FormControl('', Validators.email && Validators.required),
      achternaam : new FormControl('', Validators.required),
      wachtwoord : new FormControl('', Validators.required),
      studentnummer : new FormControl('', Validators.required),
      opleiding : new FormControl('', Validators.required)
  })



  insertAanvraag(aanvraag: Aanvraag){
    this.aanvragenlijst.push({naam: aanvraag.naam, email: aanvraag.email,      opleiding: aanvraag.opleiding,

     achternaam: aanvraag.achternaam,
    studentnummer:  aanvraag.studentnummer,    wachtwoord: aanvraag.wachtwoord,

     status: aanvraag.status});
  }

  getAanvragen(){
    this.aanvragenlijst = this.firebase.list('customers')
    return this.aanvragenlijst.snapshotChanges();
  }

  getQrcode(){
    this.qrCodeLijst =  this.firebase.list('lokaalreserveren');
    return this.qrCodeLijst.snapshotChanges();
  }

  updateAanvraag($key: string) {
    this.aanvragenlijst.update($key,
      {
        status: "goedgekeurd"
      });
  }

  deleteAanvraag($key: string) {
    this.aanvragenlijst.remove($key);
    console.log($key)
  }

}
