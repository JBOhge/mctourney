import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
  }

  create4PT() {
    this.tService.createFourPlayerTournament();
  }
  create8PT() {
    this.tService.createEightPlayerTournament();
  }
  create16PT() {
    this.tService.createSixteenPlayerTournament();
  }


  onStart() {
    this.tService.startTournament();
  }
}
