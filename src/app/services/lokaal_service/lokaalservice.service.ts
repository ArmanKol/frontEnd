import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { AngularFireDatabase} from 'angularfire2/database';
import { Lokaal } from 'src/app/models/lokaal/lokaal';
import { lokaal } from 'src/app/models/lokaal.modal';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LokaalserviceService {

  private lokaalaanvragenCollection: AngularFirestoreCollection<lokaal>;
  private aanvragen: Observable<lokaal[]>;

  userId: string;
    
  constructor(private db: AngularFirestore) {
    this.lokaalaanvragenCollection = db.collection<lokaal>('lokaalaanvragen');
  }

  async addLokaalAanvraag(lokaal: lokaal) {
    try {
      return this.lokaalaanvragenCollection.add(lokaal);
    }
    catch (error) {
      console.log(error);
    }
  }

  getLokaalAanvragen() {
    this.aanvragen = this.lokaalaanvragenCollection.snapshotChanges().pipe(
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

  updateLokaalAanvraag(id: string) {
    try {
      return this.lokaalaanvragenCollection.doc(id).update({status:"goedgekeurd"});
    }
    catch (error) {
      console.log(error);
    }
  }

  deleteLokaalAanvraag(id: string) {
    try {
      return this.lokaalaanvragenCollection.doc(id).delete();
    }
    catch (error) {
      console.log(error);
    }
  }
}
