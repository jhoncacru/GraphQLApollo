import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css'],
  providers: [PronosticService]
})
export class WinnerComponent implements OnInit {

  winnerList:any = [];
  matchDate:Date = new Date();
  firstTeam:string;
  firstTeamImg:string;
  secondTeam:string;
  secondTeamImg:string;
  resultFirstTeam:number;
  resultSecondTeam:number;
  isWinners:boolean=false;

  constructor(public svc:PronosticService, public router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['matchId'] !== "undefined") { 
        this.svc.getwinnersByMatch(params['matchId']).valueChanges.subscribe(x => { 
          this.winnerList = x.data.winnersByMatch;
          //console.log("winners", this.winnerList);
          if(this.winnerList.length > 0) {
            this.isWinners = true;            
            this.matchDate = this.winnerList[0].pronostic.match.matchDate;
            this.firstTeam = this.winnerList[0].pronostic.match.eventFirstTeam.team.name;
            this.firstTeamImg = this.winnerList[0].pronostic.match.eventFirstTeam.team.teamPictureUrl;
            this.secondTeam = this.winnerList[0].pronostic.match.eventSecondTeam.team.name;
            this.secondTeamImg = this.winnerList[0].pronostic.match.eventSecondTeam.team.teamPictureUrl;
            this.resultFirstTeam = this.winnerList[0].pronostic.match.resultFirstTeam;
            this.resultSecondTeam = this.winnerList[0].pronostic.match.resultSecondTeam;
          }else{
            this.isWinners= false;
          }
        });        
      };
    });
  }
  back(){
    this.router.navigate(['/pronostic']);
  }
}
