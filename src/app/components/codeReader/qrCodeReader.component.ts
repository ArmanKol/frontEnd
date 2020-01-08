import {Component} from '@angular/core';
import {LokaalserviceService} from 'src/app/services/lokaal_service/lokaalservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { lokaal } from 'src/app/models/lokaal.modal';

@Component({
  selector: 'qr-codereader',
  templateUrl: './qrCodeReader.component.html',
  styleUrls: ['./qrCodeReader.component.css']
})
export class QrCodeReader {
  resultJson: any;
  Email: string;
  lokaalaanvragen: lokaal[];

  constructor(public firebaseService: LokaalserviceService, private firebaseAuth: AngularFireAuth, private router: Router){
  }

  ngOnInit() {
  this.isAdmin();
}

isAdmin(){
  this.Email = this.firebaseAuth.auth.currentUser.email;
  if( this.Email === "admin@admin.com"){
    console.log(this.Email);
  }else{
    this.router.navigate(['codeReader']);
  }
}

  handleQrCodeResult(resultString: string) {
    console.log(resultString);
        this.resultJson = JSON.parse(resultString);
        this.firebaseService.getLokaalAanvragen().subscribe( list =>{
          this.lokaalaanvragen = list;
          this.qrcode();
        });
      }

  qrcode(){
    for(let item of this.lokaalaanvragen){
      if(item.datum == this.resultJson.datum){
        if(this.resultJson.eindtijd == item.eindtijd  && item.begintijd <= this.resultJson.begintijd && this.resultJson.status != "progress"){
          document.getElementById("qrReader").style.backgroundColor = "green";
          setTimeout(() => document.getElementById("qrReader").style.backgroundColor = "white", 3000);
          break;
        }else{
          document.getElementById("qrReader").style.backgroundColor = "red";
          setTimeout(() => document.getElementById("qrReader").style.backgroundColor = "white", 3000);
          break;
        }
      }
    }
  }
}
