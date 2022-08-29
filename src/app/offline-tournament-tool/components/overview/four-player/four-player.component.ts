import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { TournamentService } from 'src/app/offline-tournament-tool/services/tournament.service';

@Component({
  selector: 'app-four-player',
  templateUrl: './four-player.component.html',
  styleUrls: ['./four-player.component.scss'],
})
export class FourPlayerComponent implements OnInit {
  matches!: Match[];
  matchSub!: Subscription;

  constructor(private tSerivce: TournamentService) {}

  ngOnInit(): void {
    this.matchSub = this.tSerivce.matches.subscribe((matches) => {
      this.matches = matches;
    });
  }

  ngOnDestroy(): void {
    this.matchSub.unsubscribe();
  }

  getRow(i: number) {
    let x: number;
    let rowStart: number;
    let rowEnd: number;
    switch (true) {
      case i <= 2:
        x = i;
        rowStart = x * 2 - 1;
        rowEnd = x * 2 + 1;
        return rowStart + '/' + rowEnd;
      case i === 3:
        return '2/4';
      default:
        return '';
    }
  }
}
