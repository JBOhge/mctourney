import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.css'],
})
export class TournamentEditComponent implements OnInit {
  tournamentObs!: Observable<{ tournament: Tournament }>;
  id!: string;
  tournamentForm!: FormGroup;

  constructor(
    private tService: TournamentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tournamentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl(4, Validators.required),
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentObs = this.tService.getTournament(this.id);
      this.tournamentObs
        .pipe(
          tap((body) => {
            this.tournamentForm.setValue({
              name: body.tournament.name,
              size: body.tournament.size,
            });
          })
        )
        .subscribe();
    });
  }

  onCreate() {
    console.log(this.tournamentForm);
  }
}
