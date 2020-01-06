import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data_service/data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { aanvraag } from 'src/app/models/aanvraag.modal';

@Component({
  selector: 'app-registreren',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.css']
})
export class RegistreerComponent implements OnInit {

  form: FormGroup;
  aanvraag: aanvraag;

  constructor(private ds: DataService, public Auth: AngularFireAuth, private fb: FormBuilder, private msb: MatSnackBar){

  }

  ngOnInit() {
    this.form = this.fb.group({
      naam: ['',[
        Validators.required
      ]],
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      achternaam: ['',[
        Validators.required,
      ]],
      studentnummer: ['',[
        Validators.required,
      ]],
      opleiding: ['', [
        Validators.required,
      ]],
      wachtwoord: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      status: ['0', [
      ]]
    })

    this.form.valueChanges.subscribe((item) => {
      this.aanvraag = item;
    })
  }
  
  get naam(){
    return this.form.get('naam');
  }
  get email(){
    return this.form.get('email');
  }
  get achternaam(){
    return this.form.get('achternaam');
  }
  get studentnummer(){
    return this.form.get('studentnummer');
  }
  get opleiding(){
    return this.form.get('opleiding');
  }
  get wachtwoord(){
    return this.form.get('wachtwoord');
  }

  registerAanvraag(){
    this.ds.addAanvraag(this.aanvraag);
    this.msb.open("Aanvraag gelukt");
  }
}
