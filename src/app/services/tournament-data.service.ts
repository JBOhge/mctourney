import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Match } from '../models/match.model';
import { Tournament } from '../models/tournament.model';

const api = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class TournamentDataService {
  public tournamentSubject = new BehaviorSubject<Tournament>({
    _id: '',
    isComplete: false,
    isStarted: false,
    name: '',
    size: 0,
    players: [],
    matches: [],
    winner: { _id: '', username: '' },
  });

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

  createTournament(size: number, name: string) {
    return this.http.post<{ tournament: Tournament }>(`${api}/tournaments`, {
      size: size,
      name: name,
    });
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
      }>(`${api}/matches/${matchId}/increment`, { playerId: playerId })
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
      .put<{ match: Match }>(`${api}/matches/${matchId}/decrement`, {
        playerId: playerId,
      })
      .pipe(
        tap((body) => {
          this.processMatchUpdate(body.match);
        })
      );
  }

  undoMatchWinner(matchId: string, playerId: string) {
    return this.http
      .put<{ match: Match; previousMatch: Match }>(
        `${api}/matches/${matchId}/undo`,
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
}
