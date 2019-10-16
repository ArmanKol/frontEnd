import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistreerComponent } from './components/registreer/registreer.component';
import { AanvraagComponent } from './components/aanvraag/aanvraag.component';
import { LokaalaanvraagComponent } from './components/lokaalaanvraag/lokaalaanvraag.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/auth_guard_service/authguard.service';
import { QrCode } from './components/Code/qrCode.component';
import { QrCodeReader } from './components/codeReader/qrCodeReader.component';
import { GoogleAgenda } from './components/googleAgenda/google-agenda.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registreer', component: RegistreerComponent },
  { path: 'aanvraag', component: AanvraagComponent, canActivate: [AuthguardService] },
  { path: 'lokaalaanvraag', component: LokaalaanvraagComponent, canActivate: [AuthguardService] },
  { path: 'code', component: QrCode, canActivate: [AuthguardService] },
  { path: 'codeReader', component: QrCodeReader, canActivate: [AuthguardService] },
  { path: 'googleAgenda', component: GoogleAgenda, canActivate: [AuthguardService] },
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
