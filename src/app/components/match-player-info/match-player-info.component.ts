import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-match-player-info',
  templateUrl: './match-player-info.component.html',
  styleUrls: ['./match-player-info.component.scss'],
})
export class MatchPlayerInfoComponent implements OnInit {
  @Input() player!: Player; // { username: '', playerId: '', score: 0 };

  constructor() {}

  ngOnInit(): void {}

  getUrl() {
    if (this.player.username === 'TBD') {
      return 'https://mc-heads.net/avatar';
    }
    return `https://mc-heads.net/avatar/${
      this.player.playerId ? this.player.playerId : this.player.username
    }`;
  }
}
