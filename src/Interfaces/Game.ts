import { Team } from './Team';

export interface Game {
  id: number;
  date: string;
  home_team: Team;
  visitor_team: Team;
  home_team_score: number;
  visitor_team_score: number;
  period: number;
  season: number;
  status: string;
}