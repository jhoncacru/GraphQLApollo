import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { LiveMatchService, MatchLive } from '../../services/livematch.service';


@Component({
  selector: 'app-liveresult',
  template: '<h3 style="padding : 0px;">{{result}}</h3><b>{{time}}</b>'  
})
export class LiveResultComponent implements AfterViewInit {

    @Input() fifaid : string;
    //@Output() messageEvent = new EventEmitter<string>();

    result : string;
    time : string;


 constructor(private lms: LiveMatchService)
 {
    
 }
 
ngAfterViewInit()
{
    this.getResult(this.fifaid);
}


 getResult(fifaId: string) {    

    this.lms.getLiveMatch().subscribe(p => {
      var data = <Array<MatchLive>>p;
      
      var match = data.filter(m => m.fifa_id == fifaId)[0];

        if(match != null)
          {
              this.result = match.home_team.goals + " - " + match.away_team.goals;      
              this.time = match.time;
          }
          else{ this.result = ""; }

    });
  }  
}
