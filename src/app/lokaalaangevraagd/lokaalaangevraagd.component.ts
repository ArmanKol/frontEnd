import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from '../lokaalservice.service';
import {NgxQRCodeModule} from 'ngx-qrcode2';

@Component({
  selector: 'app-lokaalaangevraagd',
  templateUrl: './lokaalaangevraagd.component.html',
  styleUrls: ['./lokaalaangevraagd.component.css']
})
export class LokaalaangevraagdComponent implements OnInit {

  showLokaalMessage: boolean;
  showQrcodeMessage: boolean;
  lokaalaanvragenlijst = [];
  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  showDeletedMessage: boolean;
  arrByID = [];
  jsonString: string;
  source: any;
  value: any;

  constructor(private lokaalaanvraag: LokaalserviceService) { }

  filterByID(obj) {
    if (obj.payload.val().status == "progress") {
      return true;
    } else {
      return false;
    }
  }


  onUpdate($key){
    if (confirm('wil je dit lokaal verzoek echt goedkeuren ?')) {
      this.downloadImage($key);
      this.lokaalaanvraag.updateLokaalAanvraag($key, this.source);
      this.showLokaalMessage = true;
      setTimeout(() => this.showLokaalMessage = false, 3000);
    }
  }

  downloadImage($key){
    for(let aanvraag of this.lokaalaanvragenlijst){
      if($key === aanvraag.key){
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
      this.lokaalaanvraag.deleteLokaalAanvraag($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  ngOnInit() {
    this.lokaalaanvraag.getLokaalAanvragen().subscribe( list =>{
      this.arrByID = list.filter(this.filterByID)
      this.lokaalaanvragenlijst = this.arrByID.map(item =>{
          return {
            key: item.key,
            ...item.payload.val()
          }
      })
    });
  }

  elementType : 'img';
}
