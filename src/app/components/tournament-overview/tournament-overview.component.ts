import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.css'],
})
export class TournamentOverviewComponent implements OnInit {
  id!: string;
  tournamentObs!: Observable<any>;

  constructor(
    private tService: TournamentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentObs = this.tService.getTournament(this.id);
    });
  }
}
