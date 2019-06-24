import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']  
})
export class WelcomeComponent {

 constructor()
 {
   
 }

  public login() {
    //this.oauthService.initImplicitFlow();
  }

  public logoff() {
    //this.oauthService.logOut();
  }
  
  
}
