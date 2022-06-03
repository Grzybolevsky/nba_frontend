import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { FunctionComponent } from "react";

export type Stats = {
  id: number;
  ast: number;
  pts: number;
  reb: number;
  player: {
    id: number;
    first_name: string;
    last_name: string;
  };
  team: {
    id: number;
    full_name: string;
  };
};
export const StatsTable: FunctionComponent<{ stats: Stats[] }> = ({
  stats,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Gracz</TableCell>
          <TableCell>Drużyna</TableCell>
          <TableCell>Punkty</TableCell>
          <TableCell>Asysty</TableCell>
          <TableCell>Zbiórki</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats
          .sort((n1, n2) => n2.pts - n1.pts)
          .map((stat) => (
            <TableRow key={stat.id}>
              <TableCell>
                {stat.player.first_name + " " + stat.player.last_name}
              </TableCell>
              <TableCell>{stat.team.full_name}</TableCell>
              <TableCell>{stat.pts}</TableCell>
              <TableCell>{stat.ast}</TableCell>
              <TableCell>{stat.reb}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
