import { Team } from './Team';

export interface Game {
  gameId: number;
  date: Date;
  homeTeam: Team;
  visitorTeam: Team;
  homeTeamScore: number;
  visitorTeamScore: number;
  period: number;
  season: number;
  status: string;
}