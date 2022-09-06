import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss'],
})
export class TournamentCreateComponent implements OnInit {
  tournamentForm!: FormGroup;

  constructor(
    private tDataService: TournamentDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tournamentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      matchPointsToWin: new FormControl('', Validators.required),
      finalMatchPointsToWin: new FormControl('', Validators.required),
      isPublic: new FormControl('true', Validators.required),
    });
  }

  onCreate() {
    if (this.tournamentForm.valid) {
      this.tDataService
        .createTournament(
          this.tournamentForm.value.size,
          this.tournamentForm.value.name,
          this.tournamentForm.value.matchPointsToWin,
          this.tournamentForm.value.finalMatchPointsToWin,
          this.tournamentForm.value.isPublic
        )
        .subscribe({
          next: (body) => {
            this.router.navigate([`/tournaments/${body.tournament._id}/edit`]);
          },
        });
    }
  }
}
