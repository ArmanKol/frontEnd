import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {DataService} from 'src/app/services/data_service/data.service';
import {LokaalserviceService} from 'src/app/services/lokaal_service/lokaalservice.service';
import { lokaal } from 'src/app/models/lokaal.modal';
import * as moment from 'moment'

@Component({
  selector: 'qr-code',
  templateUrl: './qrCode.component.html',
})
export class QrCode implements OnInit{
  items: lokaal[];
  value: any;
  displayItems = [];
  userEmail: any;



 constructor(public firebaseService: DataService, private lokaalaanvraag: LokaalserviceService,
             private firebaseAuth: AngularFireAuth) { this.userEmail = this.firebaseAuth.auth.currentUser.email; }


 ngOnInit() {
   this.getLokaalAanvragen();
 }

 getLokaalAanvragen(){
    this.lokaalaanvraag.getLokaalAanvragen().subscribe(lokaalaanvragen=>{
     this.items = lokaalaanvragen
   });
 }

   append(){
      for(let item of this.items){
        if((item.gebruiker === this.firebaseAuth.auth.currentUser.email && item.source != null && item.status != "progress") && (moment().format('YYYY-MM-DD') <= item.datum)){
          this.displayItems.push(item);
        }
      }
    }

  elementType : 'img';

}
