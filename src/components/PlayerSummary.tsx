import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { Favorite, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";

export type Team = {
  id: number;
  full_name: string;
};

export type Player = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: Team;
};

type PlayerSummaryProps = {
  player: Player;
  onBuy: (player: Player) => void;
};
export const PlayerSummary: FunctionComponent<PlayerSummaryProps> = ({
  player,
  onBuy,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${101162}.png`}
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {player.first_name + " " + player.last_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {player.team.full_name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton component={Link} to={`/players/${player.id}`}>
          <Info />
        </IconButton>
        <IconButton onClick={() => onBuy(player)}>
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
};
