import { Team } from './Team';

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: Team;
  position: string;
  image_url: string;
}