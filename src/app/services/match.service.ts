import  gql from 'graphql-tag'
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';


const GetMatchesByDate = gql`
query GetMatchesByDate($matchDate:String) {
    matchesByDate(date: $matchDate) {
        id,
        matchDate,
        betAmountBase,
        pronosticsCount,
        resultFirstTeam,
  	    resultSecondTeam,
        pronostics{player {username}}
        eventFirstTeam {
            id
            team {
              id,
              name,
              teamPictureUrl
            }
          }
          eventSecondTeam {
            id
            team {
              id
              name,
              teamPictureUrl
            }
          }
      }
    
}
`;



const GetAllUnclosedMatch = gql`
query GetallUnclosedMatch {
  allUnclosedMatch {
    date
    matches {
      id
      matchDate
      pronosticsCount
      resultFirstTeam
      resultSecondTeam
      eventFirstTeam {
        team {
          name
          teamPictureUrl
        }
      }
      eventSecondTeam {
        team {
          name
          teamPictureUrl
        }
      }
    }
  }    
}
`;


@Injectable()
export class MatchService {
  
  constructor(private apollo:Apollo) {}
  
  getMatchesByDate(matchDate):any {
    return this.apollo.watchQuery({ 
     query: GetMatchesByDate,
     variables: {matchDate: matchDate},
     fetchPolicy : 'no-cache'
    });
  }

  getAllUnclosedMatches():any {
    return this.apollo.watchQuery({ 
     query: GetAllUnclosedMatch,     
     fetchPolicy : 'no-cache'
    });
  }

  


}