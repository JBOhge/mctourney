import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Match } from 'src/app/models/match.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-match',
  templateUrl: './tournament-match.component.html',
  styleUrls: ['./tournament-match.component.scss'],
})
export class TournamentMatchComponent implements OnInit {
  @Input() match!: Match;
  @Input() editMode!: boolean;

  constructor(
    private tDataService: TournamentDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  incrementScore(playerNumber: number) {
    this.tDataService
      .incrementMatchScore(
        this.match._id,
        playerNumber == 1
          ? this.match.firstPlayer._id
          : this.match.secondPlayer._id
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
        },
      });
  }

  decrementScore(playerNumber: number) {
    this.tDataService
      .decrementMatchScore(
        this.match._id,
        playerNumber == 1
          ? this.match.firstPlayer._id
          : this.match.secondPlayer._id
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
        },
      });
  }

  undoWinner(playerNumber: number) {
    this.tDataService
      .undoMatchWinner(
        this.match._id,
        playerNumber == 1
          ? this.match.firstPlayer._id
          : this.match.secondPlayer._id
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
        },
      });
  }
}
