import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-public-list',
  templateUrl: './public-list.component.html',
  styleUrls: ['./public-list.component.css'],
})
export class PublicListComponent implements OnInit {
  tournaments!: Tournament[];

  constructor(private tDataService: TournamentDataService) {}

  ngOnInit(): void {
    this.tDataService.getTournaments().subscribe((data) => {
      this.tournaments = data.tournaments;
    });
  }
}
