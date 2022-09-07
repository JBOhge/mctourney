import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  tournaments!: Tournament[];

  constructor(private tDataService: TournamentDataService) {}

  ngOnInit(): void {
    this.tDataService.getMyTournaments().subscribe((data) => {
      this.tournaments = data.tournaments;
    });
  }
}
