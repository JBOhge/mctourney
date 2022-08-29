import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/tournament/services/tournament-data.service';

@Component({
  selector: 'app-overview-four-player',
  templateUrl: './overview-four-player.component.html',
  styleUrls: ['./overview-four-player.component.scss'],
})
export class OverviewFourPlayerComponent implements OnInit {
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
