import { Injectable, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import  gql from 'graphql-tag'
import { Observable } from 'apollo-link';

const GetPronosticById = gql`
  query GetPronosticById($id: Int!) {
    pronosticById(id : $id ) {
      id,
      firstTeamGoals
      secondTeamGoals,
      registeredDate,
      lastModifiedDate,
      winByPenalties,
      isClosed,
      closingDate,
      player {
        id
      }    
      match {
        id,
        matchDate,
        eventFirstTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
        eventSecondTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
      }
    }
  }
`;

const GetPlayersWithoutPronostics = gql`
  query GetPlayersWithoutPronostics($matchDate:String) {
    playersWithoutPronostics(matchDate : $matchDate)
    {
      id,
      username,
      email    
    }
  }
`;

const GetPronosticByMatch = gql`
  query GetPronosticByMatch($matchId: Int!) {
    pronosticByMatch(matchId : $matchId ) {
      id,
      firstTeamGoals
      secondTeamGoals,
      registeredDate,
      lastModifiedDate,
      winByPenalties,
      isClosed,
      player{username}
      match {
        id,
        matchDate,
        eventFirstTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
        eventSecondTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
      }
    }
  }
`;

const GetNextUnclosedMatch = gql`
  query {
    nextUnclosedMatch {
      id
      matchDate
      eventFirstTeam {
        team {
          name
          flagPictureUrl
        }
      }
      eventSecondTeam {
        team {
          name
          flagPictureUrl
        }
      }
      resultFirstTeam
      resultSecondTeam
    }
  }
`;

const GetwinnersByMatch = gql`
  query GetwinnersByMatch($matchId: Int!) {
    winnersByMatch(matchId : $matchId ) {
      amount
      winnerExpression
      pronostic {
        player {
          username
          email
        }
        match {
          matchDate
          resultFirstTeam
          resultSecondTeam,
          wonByPenalties,
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
  }
`;

const GetPronosticsOfPlayerByDate = gql`
  query GetPronosticsOfPlayerByDate($playerId:Int!, $matchDate: String) {
    pronosticsOfPlayerByDate(forecaster:{playerId:$playerId, matchDate:$matchDate }) {
      id,
      firstTeamGoals
      secondTeamGoals,
      registeredDate,
      lastModifiedDate,
      winByPenalties,
      isClosed,
      closingDate,       
      match {
        id,
        fifaId,
        isClosedAndCalculated,
        matchDate,
        eventFirstTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
        eventSecondTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
      }
    }
  }
`;

const GetPronosticsOfPlayer = gql`
  query GetPronosticsOfPlayer($id: Int!) {
    pronosticsOfPlayer(id : $id) {
      id,
      firstTeamGoals
      secondTeamGoals,
      registeredDate,
      lastModifiedDate,
      winByPenalties,
      isClosed,
      closingDate,    
      match {
        id,
        isClosedAndCalculated,
        matchDate,
        eventFirstTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
        eventSecondTeam {
          team {
            name
            flagPictureUrl,
            teamPictureUrl
          }
        }
      }
    }
  }
`
const SavePronostic = gql`
mutation SavePronostic($id: Int!, $firstTeamGoals: Int!, $secondTeamGoals: Int!, $winByPenalties: Boolean!) {
  savePronostic(pronostic: { id: $id, firstTeamGoals: $firstTeamGoals, secondTeamGoals:$secondTeamGoals, winByPenalties:$winByPenalties }) {
    id
  }
}
`
const SaveEnablePronostic = gql`
mutation SaveEnablePronostic($playerId: Int!, $matchDate: String) {
  enablePronostic(forecaster: {playerId: $playerId, matchDate: $matchDate}) {
    id
  }
}
`
const SaveCalculateWinners = gql`
mutation SaveCalculateWinners($matchId: Int!, $resultFirstTeam: Int!, $resultSecondTeam: Int!, $wonByPenalties:Boolean!) {
  calculateWinners(match: {id: $matchId, resultFirstTeam: $resultFirstTeam, resultSecondTeam: $resultSecondTeam, wonByPenalties: $wonByPenalties}) {
    id   
   }
}
`

@Injectable()
export class PronosticService {
  
   onPronosticEnabled : EventEmitter<any>  = new EventEmitter<any>();
   oncalculateWinners : EventEmitter<any>  = new EventEmitter<any>();

  constructor(private apollo:Apollo) {}
  getPronosticsOfPlayer(playerId):any{
    return this.apollo.watchQuery({
      query: GetPronosticsOfPlayer,
      variables: {id: playerId},
      fetchPolicy : 'no-cache'
    });
  }

  getPronosticById(id):any {
    return this.apollo.watchQuery({ 
     query: GetPronosticById,
     variables: {id: id},
     fetchPolicy : 'no-cache'
    });
  }

  getPlayersWithoutPronostics(matchDate):any {
    return this.apollo.watchQuery({ 
     query: GetPlayersWithoutPronostics,
     variables: {matchDate: matchDate},
     fetchPolicy : 'no-cache'
    });
  }

  getPronosticsOfPlayerByDate(playerId, matchDate):any{   
    return this.apollo.watchQuery({
      query: GetPronosticsOfPlayerByDate,
      variables: {playerId:playerId, matchDate:matchDate},
      fetchPolicy : 'no-cache'
    });
  }

  getwinnersByMatch(matchId):any{  
    return this.apollo.watchQuery({
      query: GetwinnersByMatch,
      variables: {matchId:matchId},
      fetchPolicy : 'no-cache'
    });
  }
  savePronostic(id, firstTeamGoals, secondTeamGoals, winByPenalties):any {
    return this.apollo.mutate({
      mutation: SavePronostic,
      variables: {
        id: id,
        firstTeamGoals: firstTeamGoals,
        secondTeamGoals: secondTeamGoals,
        winByPenalties: winByPenalties  ,
        fetchPolicy : 'no-cache'      
      }
    }).subscribe();
  }

  getNextUnclosedMatch():any{
    return this.apollo.watchQuery({
      query: GetNextUnclosedMatch,
      fetchPolicy : 'no-cache'
    });
  }
  

  saveEnablePronostic(playerId, matchDate) : any {
     this.apollo.mutate({
      mutation: SaveEnablePronostic,
      variables: {
        playerId: playerId,
        matchDate: matchDate,
        fetchPolicy : 'no-cache'      
      }
    }).subscribe(data=> this.onPronosticEnabled.emit(data));
  }

  saveCalculateWinners(matchId, resultFirstTeam, resultSecondTeam, wonByPenalties) : any {
    this.apollo.mutate({
     mutation: SaveCalculateWinners,
     variables: {
      matchId: matchId,
      resultFirstTeam: resultFirstTeam,
      resultSecondTeam: resultSecondTeam,
      wonByPenalties: wonByPenalties,
       fetchPolicy : 'no-cache'      
     }
   }).subscribe(data=> this.oncalculateWinners.emit(data));;
 }

  getPronosticByMatch(matchId):any{
    
    return this.apollo.watchQuery({
      query: GetPronosticByMatch,
      variables: {matchId:matchId},
      fetchPolicy : 'no-cache'
    });
  }

}
