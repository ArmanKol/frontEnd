import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {DataService} from './data.service';
import { AanvraagComponent } from './aanvraag/aanvraag.component';
import { AangevraagdComponent } from './aangevraagd/aangevraagd.component';
import { LokaalaanvraagComponent } from './lokaalaanvraag/lokaalaanvraag.component'
import { LokaalserviceService } from './lokaalservice.service';
import { LokaalaangevraagdComponent } from './lokaalaangevraagd/lokaalaangevraagd.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { QrCode } from './components/Code/qrCode.component';
import { QrCodeReader } from './components/codeReader/qrCodeReader.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GoogleAgenda } from './components/googleAgenda/google-agenda.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    AanvraagComponent,
    AangevraagdComponent,
    LokaalaanvraagComponent,
    LokaalaangevraagdComponent,
    QrCode,
    QrCodeReader,
    GoogleAgenda,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,                 // <========== Add this line!
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
    ZXingScannerModule

  ],
  providers: [DataService, LokaalserviceService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
