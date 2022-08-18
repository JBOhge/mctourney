import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { Tournament } from '../models/tournament.model';

const scoreToWin = 3;
const api = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  public matches = new BehaviorSubject<Match[]>([]);
  public size = new BehaviorSubject<number>(0);
  public players = new BehaviorSubject<Player[]>([]);
  private playersCount = 0;

  constructor(private http: HttpClient) {}

  createFourPlayerTournament() {
    let newMatches: Match[] = [];
    let placeholderPlayer: Player = {
      _id: '',
      username: 'TBD',
      playerId: '',
    };
    let matchNum = 1;
    let placeholderMatch = new Match(
      { ...placeholderPlayer },
      { ...placeholderPlayer },
      1
    );
    placeholderMatch.nextMatch = 3 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push(
      new Match({ ...placeholderPlayer }, { ...placeholderPlayer }, matchNum)
    );

    this.size.next(4);
    this.matches.next(newMatches);
  }

  createEightPlayerTournament() {
    let newMatches: Match[] = [];
    let placeholderPlayer: Player = {
      _id: '',
      username: 'TBD',
      playerId: '',
    };
    let matchNum = 1;
    let placeholderMatch = new Match(
      { ...placeholderPlayer },
      { ...placeholderPlayer },
      1
    );
    placeholderMatch.nextMatch = 5 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 6 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 7 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = -1 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });

    this.size.next(8);
    this.matches.next(newMatches);
  }

  createSixteenPlayerTournament() {
    let newMatches: Match[] = [];
    let placeholderPlayer: Player = {
      _id: '',
      username: 'TBD',
      playerId: '',
    };

    let matchNum = 1;
    let placeholderMatch = new Match(
      { ...placeholderPlayer },
      { ...placeholderPlayer },
      1
    );
    //round 1 (Matches 1-8)
    placeholderMatch.nextMatch = 9 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 10 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 11 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 12 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });

    //round 2 (Matches 9-12)
    placeholderMatch.nextMatch = 13 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    placeholderMatch.nextMatch = 14 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });

    //round 3 (Matches 13-14)
    placeholderMatch.nextMatch = 15 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum++ });

    //round 5 (Match 15)
    placeholderMatch.nextMatch = -1 + '';
    newMatches.push({ ...placeholderMatch, matchNumber: matchNum });

    this.size.next(16);
    this.matches.next(newMatches);
  }

  addPlayer(player: Player) {
    let newPlayers = this.players.value;
    if (this.playersCount < this.size.value) {
      newPlayers.push(player);
      this.playersCount++;
      this.players.next(newPlayers);
    }
  }

  removePlayer(playerName: string) {
    let newPlayers = this.players.value.filter((player) => {
      return player.username != playerName;
    });

    this.players.next(newPlayers);
    this.playersCount = newPlayers.length;
  }

  startTournament() {
    if (this.playersCount < this.size.value) {
      return;
    }
    let playersList = this.shuffle([...this.players.value]);
    let newMatches = this.matches.value;

    for (let i = 0; i < this.size.value; i += 1) {
      let matchIndex = ~~(i / 2);
      if (i % 2 === 0) {
        newMatches[matchIndex].firstPlayer = playersList[i];
      } else {
        newMatches[matchIndex].secondPlayer = playersList[i];
      }
    }

    this.matches.next(newMatches);
  }

  private shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  incrementMatchScore(matchNumber: number, playerNumber: number) {
    let matchIndex = matchNumber - 1;
    let newMatches: Match[] = this.matches.value;
    if (
      newMatches[matchIndex].winner ||
      newMatches[matchIndex].firstPlayer.username == 'TBD' ||
      newMatches[matchIndex].secondPlayer.username == 'TBD'
    ) {
      return;
    }
    let winner = false;
    if (playerNumber == 1) {
      if (++newMatches[matchIndex].scoreFirstPlayer >= scoreToWin) {
        winner = true;
        newMatches[matchIndex].winner = newMatches[matchIndex].firstPlayer;
      }
    } else {
      if (++newMatches[matchIndex].scoreSecondPlayer >= scoreToWin) {
        winner = true;
        newMatches[matchIndex].winner = newMatches[matchIndex].secondPlayer;
      }
    }
    this.matches.next(newMatches);
    if (winner) {
      this.processWinner(matchIndex);
    }
  }

  private processWinner(matchIndex: number) {
    let newMatches = this.matches.value;
    let nextMatchIndex = newMatches[matchIndex].nextMatch;
    if (nextMatchIndex && +nextMatchIndex <= 0) {
      return;
    }
    let winner: Player = newMatches[matchIndex].winner!;

    if (nextMatchIndex) {
      if (newMatches[+nextMatchIndex - 1].firstPlayer.username === 'TBD') {
        newMatches[+nextMatchIndex - 1].firstPlayer = { ...winner };
      } else {
        newMatches[+nextMatchIndex - 1].secondPlayer = { ...winner };
      }
    }
  }

  getTournaments() {
    return this.http.get<{ tournaments: Tournament[] }>(`${api}/tournaments`);
  }

  getTournament(id: string) {
    return this.http
      .get<{ tournament: Tournament }>(`${api}/tournaments/${id}`, {
        headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }),
      })
      .pipe(
        tap((data) => {
          this.matches.next(data.tournament.matches);
        })
      );
  }

  createTournament(size: number, name: string) {
    return this.http.post<{ tournament: Tournament }>(`${api}/tournaments`, {
      size: size,
      name: name,
    });
  }

  
}
