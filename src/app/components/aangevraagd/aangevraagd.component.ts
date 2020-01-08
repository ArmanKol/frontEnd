import { Component, OnInit } from '@angular/core';
import { LokaalserviceService } from 'src/app/services/lokaal_service/lokaalservice.service';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAPI } from 'src/app/services/googleAPI_service/googleAPI.service';
import * as moment from 'moment'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { lokaal } from 'src/app/models/lokaal.modal';

@Component({
  selector: 'app-aangevraagd',
  templateUrl: './aangevraagd.component.html',
  styleUrls: ['./aangevraagd.component.css']
})
export class AangevraagdComponent implements OnInit {

  form: FormGroup;
  lokaal: lokaal;
  user: Observable<firebase.User>;
  email: string;
  userid: string;

  constructor(private firebaseAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder) { }

  aanvragenlijst = [];
  selectedAanvraag: any;
  i= 0;

  ngOnInit() {
    this.user = this.firebaseAuth.authState;
    console.log(this.form.get("begintijd"))
    this.user.subscribe((user) => {
    this.userid = user.uid
    this.email= user.email
    this.form = this.fb.group({
      id: [this.userid,[Validators.required
      ]],
      email: [this.email,[Validators.required
      ]],
      begintijd: ['',[
        Validators.required
      ]],
      duur: ['',[
        Validators.required,
      ]],
      datum: ['',[
        Validators.required,
      ]],
      status: ['0',[
        
      ]]
    })
    this.form.valueChanges.subscribe((item) => {
      this.lokaal = item;
      console.log(this.lokaal)
    })
  })
  }

  get datum(){
    return this.form.get('datum');
  }
  get begintijd(){
    return this.form.get('begintijd');
  }
  get duur(){
    return this.form.get('duur');
  }


}
