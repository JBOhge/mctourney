import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  playerForm!: FormGroup;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.playerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      playerId: new FormControl('', [Validators.required]),
    });
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

  addPlayer() {
    let player = {
      username: this.playerForm.value.username,
      playerId: this.playerForm.value.playerId,
      score: 0,
    };
    this.tService.addPlayer(player);
    this.playerForm.reset();
  }
}
