import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from 'src/app/services/lokaal_service/lokaalservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { lokaal } from 'src/app/models/lokaal.modal';

@Component({
  selector: 'app-lokaalaangevraagd',
  templateUrl: './lokaalaangevraagd.component.html',
  styleUrls: ['./lokaalaangevraagd.component.css']
})
export class LokaalaangevraagdComponent implements OnInit {

  showLokaalMessage: boolean;
  showQrcodeMessage: boolean;
  lokaalaanvragenlijst: lokaal[];
  arrByID = [];
  jsonString: string;
  source: any;
  value: any;

  constructor(private lokaalaanvraag: LokaalserviceService, private msb: MatSnackBar) { }

  filterByID(obj) {
    if (obj.payload.val().status == "progress") {
      return true;
    } else {
      return false;
    }
  }


  onUpdate($key){
    if (confirm('wil je dit lokaal verzoek echt goedkeuren?')) {
      this.downloadImage($key);
      this.lokaalaanvraag.updateLokaalAanvraag($key);
      this.msb.open("lokaalverzoek goedgekeurd")
    }
  }

  downloadImage($key){
    for(let aanvraag of this.lokaalaanvragenlijst){
      if($key === aanvraag.id){
        this.jsonString = JSON.stringify({"gebruiker": aanvraag.gebruiker,"begintijd": aanvraag.begintijd, "eindtijd": aanvraag.eindtijd,"datum": aanvraag.datum});
        this.value = this.jsonString;
        break;
      }
    }
    try{
      this.source = document.getElementsByTagName('img')[0].currentSrc;
      this.showQrcodeMessage = true;
      setTimeout(() => this.showQrcodeMessage = false, 3000);
    }catch(e){
      console.log(e);
      this.showQrcodeMessage = false;
    }
  }

  onDelete($key) {
    if (confirm('wil je dit lokaal verzoek afwijzen ?')) {
      console.log($key)
      this.lokaalaanvraag.deleteLokaalAanvraag($key);
      this.msb.open("lokaalverzoek afgekeurd")
    }
  }

  ngOnInit() {
    this.getLokaalAanvragen()
  }

  getLokaalAanvragen(){
    this.lokaalaanvraag.getLokaalAanvragen().subscribe(lokaalaanvragen=>{
      this.lokaalaanvragenlijst = lokaalaanvragen
    });
  }

  elementType : 'img';
}
