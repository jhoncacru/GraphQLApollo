import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pronostic-all',
  templateUrl: './pronostic-all.component.html',
  styleUrls: ['./pronostic-all.component.css'],
  providers: [PronosticService]
})
export class PronosticAllComponent implements OnInit {

  pronosticList:any=[];
  matchDate:string;
  firstTeam:string;
  firstTeamImg:string;
  secondTeam:string;
  secondTeamImg:string;

  constructor(public svc:PronosticService, public router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['matchId'] !== "undefined") { 
        this.svc.getPronosticByMatch(params['matchId']).valueChanges.subscribe(x => { 
          this.matchDate = x.data.pronosticByMatch[0].match.matchDate;
          this.firstTeam = x.data.pronosticByMatch[0].match.eventFirstTeam.team.name;
          this.firstTeamImg = x.data.pronosticByMatch[0].match.eventFirstTeam.team.teamPictureUrl;
          this.secondTeam = x.data.pronosticByMatch[0].match.eventSecondTeam.team.name;
          this.secondTeamImg = x.data.pronosticByMatch[0].match.eventSecondTeam.team.teamPictureUrl;
          
          this.pronosticList = x.data.pronosticByMatch;
          
        });
      };
    });
  }
  back() {
    this.router.navigate(['/pronostic']);
  }

}
