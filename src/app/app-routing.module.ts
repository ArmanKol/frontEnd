import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AanvraagComponent } from './aanvraag/aanvraag.component';
import { LokaalaanvraagComponent } from './lokaalaanvraag/lokaalaanvraag.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './authguard.service';
import { QrCode } from './components/Code/qrCode.component';
import { QrCodeReader } from './components/codeReader/qrCodeReader.component';
import { GoogleAgenda } from './components/googleAgenda/google-agenda.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'header', component: HeaderComponent },
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
