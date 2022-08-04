import { Player } from './player.model';

export class Match {
  public scoreFirstPlayer: number = 0;
  public scoreSecondPlayer: number = 0;
  public winner?: Player;
  public nextMatch?: number;

  constructor(
    public firstPlayer: Player,
    public secondPlayer: Player,
    public matchNumber: number
  ) {}
}
