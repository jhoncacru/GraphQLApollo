import { Component, OnInit } from '@angular/core';
import { PronosticService } from './../../services/pronostic.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalSessionService } from '../../services/localSessionService';
import { UserModel } from '../../models/userModel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LiveMatchService, MatchLive } from '../../services/livematch.service';
import { AuthService, ConfigService } from 'src/app/services/auth.service';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'unclosed-match',
  templateUrl: './unclosed-match.component.html',
  styleUrls: ['./unclosed-match.component.css'],
  providers: [MatchService]
})
export class UnclosedMatchComponent implements OnInit {
  matchesGroup: any = [];  
  constructor(public matchService: MatchService, public router: Router, public sessionService: LocalSessionService, private lms: LiveMatchService) { }

  ngOnInit() {
    this.GetAllUnlosedMatches();
  }

    
  GetAllUnlosedMatches()
  {    
    this.matchService.getAllUnclosedMatches().valueChanges.subscribe(x => 
    {
      this.matchesGroup = x.data.allUnclosedMatch;      
    });

  }


}