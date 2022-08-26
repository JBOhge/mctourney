import { Player } from './player.model';

export class Match {
  public _id: string = '';
  public scoreFirstPlayer: number = 0;
  public scoreSecondPlayer: number = 0;
  public winner?: Player;
  public pointsToWin?: number;
  public nextMatch?: string;
  public nextMatchPosition?: string;
  public tournament?: string;
  public previousMatchFirstPlayer?: string;
  public previousMatchSecondPlayer?: string;



  constructor(
    public firstPlayer: Player,
    public secondPlayer: Player,
    public matchNumber: number
  ) {}
}
