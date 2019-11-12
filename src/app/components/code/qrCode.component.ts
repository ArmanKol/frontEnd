import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {DataService} from 'src/app/services/data_service/data.service';
import * as moment from 'moment'

@Component({
  selector: 'qr-code',
  templateUrl: './qrCode.component.html',
})
export class QrCode implements OnInit{
  items = [];
  value: any;
  displayItems = [];



 constructor(public firebaseService: DataService,
             private firebaseAuth: AngularFireAuth) {  }


 ngOnInit() {
   this.firebaseService.getQrcode().subscribe( list =>{
     this.items = list.map(item =>{
       return{
         key: item.key,
         ...item.payload.val()
       }

     });
     this.append();
   });
 }

  append(){
    for(let item of this.items){
      if((item.gebruiker === this.firebaseAuth.auth.currentUser.email && item.base64 != null && item.status != "progress") && (moment().format('YYYY-MM-DD') <= item.datum)){
        this.displayItems.push(item);
      }
    }
  }

  elementType : 'img';

}
