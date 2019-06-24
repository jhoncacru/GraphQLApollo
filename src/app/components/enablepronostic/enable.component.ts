import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalSessionService } from '../../services/localSessionService';
import { UserModel } from '../../models/userModel';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/services/auth.service';
import { MatchService } from 'src/app/services/match.service';

const now = new Date();

@Component({
  selector: 'app-enable',
  templateUrl: './enable.component.html',
  styleUrls: ['./enable.component.css'],
  providers: [PronosticService, MatchService]
})
export class EnableComponent implements OnInit {
  playerItems:any = [];  
  matches : any = [];

  model: NgbDateStruct;
  date: {year: number, month: number};
  sessionUser : UserModel;
  username:string;
  match:any;


  showCalculateRegion : boolean = false;



  constructor(public svc: PronosticService, public router:Router, public sessionService : LocalSessionService, public matchService : MatchService) { }

  ngOnInit() {
    this.sessionUser = this.sessionService.GetSessionUser();
    this.username = this.sessionUser.username; 
    this.model = {month: new Date().getMonth()+1, day: new Date().getDate(), year: new Date().getFullYear()} 
    this.search();

    let sessionId = localStorage.getItem(ConfigService.USER_TICK);

    if(!sessionId || Number(sessionId) > 3){
      this.router.navigate(["notfound"]);
      return;
    } 

    this.svc.onPronosticEnabled.subscribe(p=> {this.search()});
    this.svc.oncalculateWinners.subscribe(p=> {
      let element: HTMLElement = document.getElementsByName('tabpronostic')[0] as HTMLElement;
       element.click();
    });
    this.svc.getNextUnclosedMatch().valueChanges.subscribe(x => {
      this.match = x.data.nextUnclosedMatch;
    });
  }
  
  search() {
    if(this.model == undefined)
      return;

    var dates = this.model.month+"/"+this.model.day+"/"+this.model.year;
    this.svc.getPlayersWithoutPronostics(dates).valueChanges.subscribe(x => 
    {
      this.playerItems = x.data.playersWithoutPronostics;
      this.getMatchByDate();
    });
  }

  getMatchByDate()
  {
    var date = this.model.month+"/"+this.model.day+"/"+this.model.year;
    this.matchService.getMatchesByDate(date).valueChanges.subscribe(x => 
    {
      this.matches = x.data.matchesByDate;      
    });
  }

  enablePronostic(playerId) {
    let dates = this.model.month+"/"+this.model.day+"/"+this.model.year;
    this.svc.saveEnablePronostic(playerId, dates);
  }
  calculate(matchId, firstTeam, secondTeam) {
    let firstPenal = <HTMLInputElement>document.getElementById('cbxPenalFirst');
    let secondPenal = <HTMLInputElement>document.getElementById('cbxPenalSecond');

    if(firstPenal.checked || secondPenal.checked)
      this.svc.saveCalculateWinners(matchId, firstTeam, secondTeam, true);
    else
      this.svc.saveCalculateWinners(matchId, firstTeam, secondTeam, false);
    
  }
  changePenal(e) {
    let txtFirst = <HTMLInputElement>document.getElementById('txtFirstTeamGoals');
    let txtSecond = <HTMLInputElement>document.getElementById('txtSecondTeamGoals');
    let firstPenal = <HTMLInputElement>document.getElementById('cbxPenalFirst');
    let secondPenal = <HTMLInputElement>document.getElementById('cbxPenalSecond');
    
    if(e.target.checked) {
      if(e.target.id == "cbxPenalSecond"){        
        firstPenal.checked = false;
      }else{        
        secondPenal.checked = false;
      }
    }
    if(!firstPenal.checked && !secondPenal.checked){
      txtFirst.disabled = false;
      txtSecond.disabled = false;
    }
    if(firstPenal.checked ) {
      txtFirst.value = "1";
      txtSecond.value = "0";
      txtFirst.disabled = true;
      txtSecond.disabled = true;
    }
    if(secondPenal.checked) {
      txtSecond.value = "1";
      txtFirst.value =  "0";
      txtFirst.disabled = true;
      txtSecond.disabled = true;
    }     
  }

  showCalculatingRegion(boolValue : boolean)
  {
    this.showCalculateRegion = boolValue;
  }

}
