import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})
export class MatchListComponent implements OnInit, OnDestroy {
  matches!: Match[];
  matchSub!: Subscription;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.matchSub = this.tService.matches.subscribe((matches) => {
      this.matches = matches;
    });
  }

  ngOnDestroy(): void {
    this.matchSub.unsubscribe();
  }

}
