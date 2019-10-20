import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {DataService} from './services/data_service/data.service';
import { AanvraagComponent } from './components/aanvraag/aanvraag.component';
import { AangevraagdComponent } from './components/aangevraagd/aangevraagd.component';
import { LokaalaanvraagComponent } from './components/lokaalaanvraag/lokaalaanvraag.component'
import { LokaalserviceService } from './services/lokaal_service/lokaalservice.service';
import { LokaalaangevraagdComponent } from './components/lokaalaangevraagd/lokaalaangevraagd.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegistreerComponent } from './components/registreer/registreer.component';
import { QrCode } from './components/Code/qrCode.component';
import { QrCodeReader } from './components/codeReader/qrCodeReader.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GoogleAgenda } from './components/googleAgenda/google-agenda.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/auth_guard_service/authguard.service';
import { GoogleAPI } from './services/googleAPI_service/googleAPI.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegistreerComponent,
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
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
    ZXingScannerModule

  ],
  providers: [DataService, LokaalserviceService, AuthguardService, GoogleAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
