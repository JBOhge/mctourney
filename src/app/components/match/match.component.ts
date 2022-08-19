import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  @Input() match!: Match;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {}

  incrementScore(playerNumber: number) {
    this.tService.incrementMatchScore(this.match.matchNumber, playerNumber);
  }
}
