import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.scss'],
})
export class TournamentEditComponent implements OnInit {
  tournament!: Tournament;
  id!: string;
  tournamentForm!: FormGroup;
  playerForm!: FormGroup;

  constructor(
    private tDataService: TournamentDataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tournamentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl(4, Validators.required),
    });

    this.playerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      playerId: new FormControl(''),
    });

    this.tDataService.tournamentSubject.subscribe((tournament) => {
      this.tournament = tournament;
      this.tournamentForm.setValue({
        name: tournament.name,
        size: tournament.size,
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tDataService.getTournament(this.id).subscribe();
    });
  }

  onUpdateSize() {
    this.tDataService
      .updateTournamentSize(this.tournamentForm.value.size, this.tournament._id)
      .subscribe({
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
        },
      });
  }

  onAddPlayer() {
    this.tDataService
      .addPlayer(
        this.playerForm.value.username,
        this.playerForm.value.playerId,
        this.tournament._id
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
        },
      });
  }

  onRemovePlayer() {
    let player = this.tournament.players.filter((player) => {
      return player.username == this.playerForm.value.username;
    });
    if (player[0]) {
      this.tDataService
        .removePlayer(player[0]._id, this.tournament._id)
        .subscribe({
          error: (err) => {
            console.log(err);
            this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
          },
        });
    }
  }

  onGenerateTournament() {
    this.tDataService.generateTournament(this.tournament._id).subscribe({
      error: (err) => {
        console.log(err);
        this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
      },
    });
  }

  onStartTournament() {
    this.tDataService.startTournament(this.tournament._id).subscribe({
      error: (err) => {
        console.log(err);
        this.snackBar.open(err.error.message, 'OK', { duration: 10000 });
      },
    });
  }

  onDelete() {
    this.tDataService.deleteTournament(this.tournament._id).subscribe({
      next: () => {
        this.router.navigate(['/tournaments']);
      },
    });
  }
}
