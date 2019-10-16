import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-aangevraagd',
  templateUrl: './aangevraagd.component.html',
  styleUrls: ['./aangevraagd.component.css']
})
export class AangevraagdComponent implements OnInit {

  constructor(private aanvraag: DataService) { }

  aanvragenlijst = [];
  selectedAanvraag;
  i= 0;

  getSelectedGegevens(event: any){
    this.aanvraag.getAanvragen().subscribe( list =>{
      this.aanvragenlijst = list.map(item =>{
          if(item.key == event){
            console.log("gelukt")
            console.log(this.aanvragenlijst[this.i].key)
            this.selectedAanvraag  == item.payload.val();
          } 
          else{
            this.i+= 1;
          }
        }
      )
    });
  }

  ngOnInit() {
    this.aanvraag.getAanvragen().subscribe( list =>{
      this.aanvragenlijst = list.map(item =>{
        return{
          key: item.key,
          ...item.payload.val()
        }
      })
      console.log(this.aanvragenlijst);
    });
  }

}
