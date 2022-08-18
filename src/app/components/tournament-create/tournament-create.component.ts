import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css'],
})
export class TournamentCreateComponent implements OnInit {
  tournamentForm!: FormGroup;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl('4', Validators.required),
    });
  }

  onCreate() {
    if (this.tournamentForm.valid) {
      this.tService
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
