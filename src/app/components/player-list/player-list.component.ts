import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  playerList!: Player[];
  playersSub!: Subscription;
  playerForm!: FormGroup;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.playersSub = this.tService.players.subscribe((playerList) => {
      this.playerList = playerList;
    });

    this.playerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      playerId: new FormControl('', [Validators.required]),
    });
  }
  ngOnDestroy(): void {
    this.playersSub.unsubscribe();
  }

  addPlayer() {
    let player = {
      _id: '',
      username: this.playerForm.value.username,
      playerId: this.playerForm.value.playerId,
    };
    this.tService.addPlayer(player);
    this.playerForm.reset();
  }

  removePlayer() {
    let playerName = this.playerForm.value.username;
    this.tService.removePlayer(playerName);
    this.playerForm.reset();
  }
}
