import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/services/auth_guard_service/authguard.service';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(public authGuard: AuthguardService, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.authentication.isAdmin();
  }
}
