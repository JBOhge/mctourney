import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-sixteen-player',
  templateUrl: './sixteen-player.component.html',
  styleUrls: ['./sixteen-player.component.scss'],
})
export class SixteenPlayerComponent implements OnInit, OnDestroy {
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
      case i <= 8:
        x = i;
        rowStart = x * 2 - 1;
        rowEnd = x * 2 + 1;
        return rowStart + '/' + rowEnd;

      case i <= 12 && i > 8:
        x = i % 8;
        rowStart = x * 4 - 2;
        rowEnd = x * 4;

        return rowStart + '/' + rowEnd;
      case i === 13:
        return '4/6';
      case i === 14:
        return '12/14';
      case i === 15:
        return '8/10';
      default:
        return '';
    }
  }
}
