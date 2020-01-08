import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Aanvraag } from 'src/app/models/aanvraag/aanvraag';
import { aanvraag } from 'src/app/models/aanvraag.modal';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private advertentieCollection: AngularFirestoreCollection<aanvraag>;
  private aanvragen: Observable<aanvraag[]>;

  userId: string;
    
  constructor(private db: AngularFirestore) {
    this.advertentieCollection = db.collection<aanvraag>('aanvragen');
  }
  qrCodeLijst: AngularFireList<any>;

  i = 0;

  async addAanvraag(aanvraag: aanvraag) {
    try {
      return this.advertentieCollection.add(aanvraag);
    }
    catch (error) {
      console.log(error);
    }
  }

  getAdvertenties() {
    this.aanvragen = this.advertentieCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
            return { id, ...data }; 
        });
      })
    );
    return this.aanvragen;
  }

  //getQrcode(){
    //this.qrCodeLijst =  this.firebase.list('lokaalreserveren');
    //return this.qrCodeLijst.snapshotChanges();
  //}

  updateAanvraag(id: string) {
    try {
      return this.advertentieCollection.doc(id).update({status: "goedgekeurd"});
    }
    catch (error) {
      console.log(error);
    }
  }

  deleteAanvraag(id: string) {
    try {
      return this.advertentieCollection.doc(id).delete();
    }
    catch (error) {
      console.log(error);
    }
  }

}
