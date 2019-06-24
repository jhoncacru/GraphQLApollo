import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalSessionService } from '../../services/localSessionService';
import { UserModel } from '../../models/userModel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LiveMatchService, MatchLive } from '../../services/livematch.service';
import { AuthService, ConfigService } from 'src/app/services/auth.service';

const now = new Date();

@Component({
  selector: 'app-pronostic',
  templateUrl: './pronostic.component.html',
  styleUrls: ['./pronostic.component.css'],
  providers: [PronosticService]
})
export class PronosticComponent implements OnInit {
  matchItems: any = [];
  model: NgbDateStruct;
  date: { year: number, month: number };
  sessionUser: UserModel;
  username: string;
  constructor(public svc: PronosticService, public router: Router, public sessionService: LocalSessionService, private lms: LiveMatchService) { }

  ngOnInit() {

    let sessionId = localStorage.getItem(ConfigService.USER_TICK);
    if(!sessionId){
      this.router.navigate(["notfound"]);
      return;
    } 


    this.sessionUser = this.sessionService.GetSessionUser();
    this.username = this.sessionUser.username;

    this.model = { month: new Date().getMonth() + 1, day: new Date().getDate(), year: new Date().getFullYear() }
    this.search();

    // this.svc.getPronosticsOfPlayer(this.sessionService.GetSessionUserId()).valueChanges.subscribe(x => { 
    // this.matchItems = x.data.pronosticsOfPlayer;
    // });
  }

  addResult(id) {
    this.router.navigate(['/pronosticForm', id]);
  }
  search() {
    if (this.model == undefined)
      return;

    var dates = this.model.month + "/" + this.model.day + "/" + this.model.year;
    this.svc.getPronosticsOfPlayerByDate(this.sessionService.GetSessionUserId(), dates).valueChanges.subscribe(x => {
      this.matchItems = x.data.pronosticsOfPlayerByDate;
    });    
  }
  viewAll(matchId) {
    this.router.navigate(['/pronosticAll', matchId]);
  }
  viewWinner(matchId) {
    this.router.navigate(['/winner', matchId]);
  }

 

  

}
