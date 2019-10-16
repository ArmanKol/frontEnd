import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Lokaal } from './lokaal';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LokaalserviceService {

  constructor(private firebase: AngularFireDatabase) {}
  lokaalaanvragenlijst = this.firebase.list('lokaalreserveren');


  form = new FormGroup({
      $key: new FormControl(null),
      status : new FormControl('progress'),
      begintijd : new FormControl('', Validators.required),
      eindtijd : new FormControl('', Validators.required),
      datum : new FormControl('', Validators.required),
  })

  insertLokaalAanvraag(aanvraag: Lokaal, user){
      this.lokaalaanvragenlijst.push({datum: aanvraag.datum, begintijd: aanvraag.begintijd, eindtijd: aanvraag.eindtijd, status: aanvraag.status, gebruiker: user.email});
  }

  updateLokaalAanvraag($key: string, base64: string) {
    console.log($key);
    this.lokaalaanvragenlijst.update($key,
      {
        status: "goedgekeurd",
        base64: base64
      });
  }

  deleteLokaalAanvraag($key: string) {
    this.lokaalaanvragenlijst.remove($key);
    console.log($key)
  }

  getLokaalAanvragen(){
    return this.lokaalaanvragenlijst.snapshotChanges();
  }
}
