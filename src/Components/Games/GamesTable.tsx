import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Game } from '../../Interfaces/Game';

export const GamesTable: FunctionComponent<{ games: Game[] }> = ({ games }) => {
  const extractScore = (game: Game) => {
    return game.home_team_score + ' : ' + game.visitor_team_score;
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Gospodarz</TableCell>
          <TableCell>Gość</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Wynik</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>{game.home_team.full_name}</TableCell>
            <TableCell>{game.visitor_team.full_name}</TableCell>
            <TableCell>{game.date}</TableCell>
            <TableCell>
              {game.status !== 'Final' ? game.status : extractScore(game)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};