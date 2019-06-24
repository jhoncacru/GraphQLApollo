import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


export class MatchLive {
    fifa_id: string;
    status: string;
    time: string;
    home_team: TeamMatch;
    away_team: TeamMatch;
}

export class TeamMatch {
    country: string;
    code: string;
    goals: string;
}


@Injectable()
export class LiveMatchService {

    constructor(private http: HttpClient) {

    }

    // getLiveInfoPromise(fifaId: string): Promise<Array<MatchLive>> {
    //     return new Promise((success, failure) => {
    //         this.getLiveMatch(fifaId).subscribe(result => {



    //                 success(<Array<MatchLive>>JSON.parse(JSON.stringify(result)));
    //             })
    //     });
    // }

    getLiveMatch() {
        var url = "http://worldcup.sfg.io/matches";
        return this.http.get(url);
    }

}