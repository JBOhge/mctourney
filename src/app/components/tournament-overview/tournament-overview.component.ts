import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.css'],
})
export class TournamentOverviewComponent implements OnInit {
  @Input() editMode = false;
  id!: string;
  tournament!: Tournament;

  constructor(
    private tDataService: TournamentDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tDataService.tournamentSubject.subscribe((tournament) => {
        this.tournament = tournament;
      });
      this.tDataService.getTournament(this.id).subscribe({
        next: (body) => {
          console.log(body);
        },
      });
    });
  }
}
