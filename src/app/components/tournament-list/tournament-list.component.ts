import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
})
export class TournamentListComponent implements OnInit {
  tournaments!: Tournament[];

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.tService.getTournaments().subscribe((data) => {
      this.tournaments = data.tournaments;
    });
  }
}
