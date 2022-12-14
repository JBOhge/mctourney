import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Match } from '../models/match.model';
import { Tournament } from '../models/tournament.model';

const api = 'http://localhost:3000/api/v1';
const emptyTournament = {
  _id: '',
  isComplete: false,
  isStarted: false,
  name: '',
  size: 0,
  players: [],
  matches: [],
  winner: { _id: '', username: '' },
  owner: { _id: '', username: '' },
};

@Injectable({
  providedIn: 'root',
})
export class TournamentDataService {
  public tournamentSubject = new BehaviorSubject<Tournament>(emptyTournament);

  constructor(private http: HttpClient) {}

  getTournaments() {
    return this.http.get<{ tournaments: Tournament[] }>(`${api}/tournaments`);
  }

  getTournament(id: string) {
    return this.http
      .get<{ tournament: Tournament }>(`${api}/tournaments/${id}`, {
        headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }),
      })
      .pipe(
        tap((body) => {
          this.tournamentSubject.next(body.tournament);
        })
      );
  }

  getMyTournaments() {
    return this.http.get<{ tournaments: Tournament[] }>(
      `${api}/tournaments/mytournaments`
    );
  }

  createTournament(
    size: number,
    name: string,
    matchPointsToWin: string,
    finalMatchPointsToWin: string,
    isPublic: boolean
  ) {
    return this.http.post<{ tournament: Tournament }>(
      `${api}/tournaments`,
      {
        size,
        name,
        matchPointsToWin,
        finalMatchPointsToWin,
        isPublic,
      },
      { withCredentials: true }
    );
  }

  updateTournamentSize(size: number, tournamentId: string) {
    return this.http
      .patch<{ tournament: Tournament }>(
        `${api}/tournaments/${tournamentId}/update`,
        {
          size: size,
        }
      )
      .pipe(
        tap((body) => {
          this.tournamentSubject.next(body.tournament);
        })
      );
  }

  addPlayer(username: string, playerId: string, tournamentId: string) {
    return this.http
      .post<{ tournament: Tournament }>(
        `${api}/tournaments/${tournamentId}/players`,
        {
          username: username,
          playerId: playerId,
        }
      )
      .pipe(
        tap((body) => {
          this.tournamentSubject.next(body.tournament);
        })
      );
  }
  removePlayer(id: string, tournamentId: string) {
    return this.http
      .delete<{ tournament: Tournament }>(
        `${api}/tournaments/${tournamentId}/players/${id}`
      )
      .pipe(
        tap((body) => {
          this.tournamentSubject.next(body.tournament);
        })
      );
  }

  generateTournament(tournamentId: string) {
    return this.http
      .patch<{ tournament: Tournament }>(
        `${api}/tournaments/${tournamentId}/generate`,
        {}
      )
      .pipe(
        tap((body) => {
          this.tournamentSubject.next(body.tournament);
        })
      );
  }

  startTournament(tournamentId: string) {
    return this.http
      .patch<{ tournament: Tournament }>(
        `${api}/tournaments/${tournamentId}/start`,
        {}
      )
      .pipe(
        tap({
          next: () => {
            let newTournament = this.tournamentSubject.value;
            newTournament.isStarted = true;
            this.tournamentSubject.next(newTournament);
          },
        })
      );
  }

  incrementMatchScore(matchId: string, playerId: string) {
    return this.http
      .put<{
        match: Match;
        nextMatch?: Match;
        tournament?: Tournament;
      }>(
        `${api}/matches/${this.tournamentSubject.value._id}/${matchId}/increment`,
        { playerId: playerId }
      )
      .pipe(
        tap((body) => {
          if (body.tournament) {
            this.tournamentSubject.next(body.tournament);
          } else if (body.nextMatch) {
            this.processMatchUpdate(body.nextMatch);
          }
          this.processMatchUpdate(body.match);
        })
      );
  }

  decrementMatchScore(matchId: string, playerId: string) {
    return this.http
      .put<{ match: Match }>(
        `${api}/matches/${this.tournamentSubject.value._id}/${matchId}/decrement`,
        {
          playerId: playerId,
        }
      )
      .pipe(
        tap((body) => {
          this.processMatchUpdate(body.match);
        })
      );
  }

  undoMatchWinner(matchId: string, playerId: string) {
    return this.http
      .put<{ match: Match; previousMatch: Match }>(
        `${api}/matches/${this.tournamentSubject.value._id}/${matchId}/undo`,
        {
          playerId: playerId,
        }
      )
      .pipe(
        tap((body) => {
          this.processMatchUpdate(body.match);
          this.processMatchUpdate(body.previousMatch);
        })
      );
  }

  private processMatchUpdate(newMatch: Match) {
    let newTournament = this.tournamentSubject.value;
    newTournament.matches = newTournament.matches.map((match) => {
      return match._id == newMatch._id ? newMatch : match;
    });
    this.tournamentSubject.next(newTournament);
  }

  deleteTournament(tournamentId: string) {
    return this.http.delete(`${api}/tournaments/${tournamentId}`).pipe(
      tap({
        next: () => {
          this.tournamentSubject.next(emptyTournament);
        },
      })
    );
  }
}
