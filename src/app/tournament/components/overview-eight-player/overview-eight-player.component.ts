import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/tournament/services/tournament-data.service';

@Component({
  selector: 'app-overview-eight-player',
  templateUrl: './overview-eight-player.component.html',
  styleUrls: ['./overview-eight-player.component.scss'],
})
export class OverviewEightPlayerComponent implements OnInit, OnDestroy {
  @Input() editMode!: boolean;
  tournament!: Tournament;

  constructor(private tDataSerivce: TournamentDataService) {}

  ngOnInit(): void {
    this.tDataSerivce.tournamentSubject.subscribe((tournament) => {
      this.tournament = tournament;
    });
  }

  ngOnDestroy(): void {}

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
