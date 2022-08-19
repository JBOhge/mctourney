import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
})
export class TournamentListComponent implements OnInit {
  tournaments!: Tournament[];

  constructor(private tDataService: TournamentDataService) {}

  ngOnInit(): void {
    this.tDataService.getTournaments().subscribe((data) => {
      this.tournaments = data.tournaments;
    });
  }
}
