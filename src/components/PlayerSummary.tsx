import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { FunctionComponent } from "react";

export type Player = {
  name: string;
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
        image="https://icon-library.com/images/basketball-player-icon/basketball-player-icon-1.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {player.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onBuy(player)}>
          Dodaj do ulubionych
        </Button>
      </CardActions>
    </Card>
  );
};
