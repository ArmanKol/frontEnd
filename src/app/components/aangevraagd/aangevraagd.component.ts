import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data_service/data.service';

@Component({
  selector: 'app-aangevraagd',
  templateUrl: './aangevraagd.component.html',
  styleUrls: ['./aangevraagd.component.css']
})
export class AangevraagdComponent implements OnInit {

  constructor(private aanvraag: DataService) { }

  aanvragenlijst = [];
  selectedAanvraag: any;
  i= 0;

  getSelectedGegevens(event: any){
    //this.aanvraag.getAanvragen().subscribe( list =>{
      //this.aanvragenlijst = list.map(item =>{
        //  if(item.key == event){
          //  console.log("gelukt")
            //console.log(this.aanvragenlijst[this.i].key)
           // this.selectedAanvraag  == item.payload.val();
         // }
         // else{
           // this.i+= 1;
         // }
       // }
     // )
    //});
  }

  ngOnInit() {
    
  }

}
