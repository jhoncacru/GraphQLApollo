import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html'
})
export class NotFoundComponent {

  username: string;

  constructor(private authService: AuthService) {
    var user = authService.getUser();
    if (user && user.username) {
      this.username = authService.getUser().username;
    }
  }

  signout() {
    this.authService.signOut(null);

  }



}
