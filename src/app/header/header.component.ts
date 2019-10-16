import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private aanvraag: DataService, public Auth: AngularFireAuth,){}

  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  formControls = this.aanvraag.form.controls;
  users: Object;
  Email: string;
  Wachtwoord: string;

  onSubmit(){
    console.log(this.formControls);
    if(this.aanvraag.form.valid){
      if(this.aanvraag.form.get('$key').value == null){
        this.aanvraag.insertAanvraag(this.aanvraag.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }
    else{
      this.showNotSuccessMessage = true;
    }
  }

  ngOnInit() {
    this.aanvraag.getAanvragen;
  }

}
