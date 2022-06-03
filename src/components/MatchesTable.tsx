import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { FunctionComponent } from "react";

export type Match = {
  id: number;
  home_team_score: number;
  visitor_team_score: number;
  date: string;
  status: string;
  home_team: {
    id: number;
    full_name: string;
  };
  visitor_team: {
    id: number;
    full_name: string;
  };
};
export const MatchesTable: FunctionComponent<{ matches: Match[] }> = ({
  matches,
}) => {
  const extractScore = (match: Match) => {
    return match.home_team_score + " : " + match.visitor_team_score;
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
        {matches.map((match) => (
          <TableRow key={match.id}>
            <TableCell>{match.home_team.full_name}</TableCell>
            <TableCell>{match.visitor_team.full_name}</TableCell>
            <TableCell>{match.date}</TableCell>
            <TableCell>
              {match.status !== "Final" ? match.status : extractScore(match)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
