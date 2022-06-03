import { Team } from './Team';

export interface Player {
  playerId: number;
  firstName: string;
  lastName: string;
  heightFeet: number;
  heightInches: number;
  weightPounds: number;
  team: Team;
  position: string;
  imageUrl: string;
}