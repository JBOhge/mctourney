import { Match } from './match.model';
import { Player } from './player.model';

export interface Tournament {
  _id: string;
  isStarted: boolean;
  isComplete: boolean;
  name: string;
  size: number;
  players: Player[];
  matches: Match[];
  winner: Player;
  owner: Player;
}
