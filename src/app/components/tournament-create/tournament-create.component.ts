import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss'],
})
export class TournamentCreateComponent implements OnInit {
  tournamentForm!: FormGroup;

  constructor(private tDataService: TournamentDataService) {}

  ngOnInit(): void {
    this.tournamentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      matchPointsToWin: new FormControl('', Validators.required),
      finalMatchPointsToWin: new FormControl('', Validators.required),
    });
  }

  onCreate() {
    if (this.tournamentForm.valid) {
      this.tDataService
        .createTournament(
          this.tournamentForm.value.size,
          this.tournamentForm.value.name
        )
        .subscribe((body) => {
          console.log(body.tournament);
        });
    }
  }
}
