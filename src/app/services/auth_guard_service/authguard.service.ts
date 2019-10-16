import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
     private authenticationService: AuthenticationService,
     private router: Router,
     ) { }

  canActivate(): boolean{
    if(!this.authenticationService.isLoggedIn() ){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


}
