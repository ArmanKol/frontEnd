import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data_service/data.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registreren',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.css']
})
export class RegistreerComponent implements OnInit {
  constructor(private aanvraag: DataService, public Auth: AngularFireAuth,){}

  showSuccessMessage: boolean;
  showNotSuccessMessage: boolean;
  formControls = this.aanvraag.form.controls;
  users: Object;
  Email: string;
  Wachtwoord: string;

  onSubmit(){
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
