import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { TournamentService } from 'src/app/offline-tournament-tool/services/tournament.service';

@Component({
  selector: 'app-eight-player',
  templateUrl: './eight-player.component.html',
  styleUrls: ['./eight-player.component.scss'],
})
export class EightPlayerComponent implements OnInit, OnDestroy {
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
      case i <= 4:
        x = i;
        rowStart = x * 2 - 1;
        rowEnd = x * 2 + 1;
        return rowStart + '/' + rowEnd;

      case i == 5 || i == 6:
        x = i % 4;
        rowStart = x * 4 - 2;
        rowEnd = x * 4;

        return rowStart + '/' + rowEnd;
      case i === 7:
        return '4/6';
      default:
        return '';
    }
  }
}
