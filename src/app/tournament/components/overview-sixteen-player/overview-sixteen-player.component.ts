import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/tournament/services/tournament-data.service';

@Component({
  selector: 'app-overview-sixteen-player',
  templateUrl: './overview-sixteen-player.component.html',
  styleUrls: ['./overview-sixteen-player.component.scss'],
})
export class OverviewSixteenPlayerComponent implements OnInit, OnDestroy {
  @Input() editMode!:boolean;
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
