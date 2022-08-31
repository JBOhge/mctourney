import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements OnInit {
  tournaments!: Tournament[];
  user!: User;

  constructor(
    private tDataService: TournamentDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tDataService.getTournaments().subscribe((data) => {
      this.tournaments = data.tournaments;
    });
    this.authService.userSubject.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}
