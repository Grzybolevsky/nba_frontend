import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Favorite, Info } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Player } from '../../Interfaces/Player';
import axios from 'axios';

type PlayerSummaryProps = {
  player: Player;
  onBuy: (player: Player) => void;
};

export const PlayerSummary: FunctionComponent<PlayerSummaryProps> = ({ player, onBuy }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/players/${player.id}`)
      .then((response) => {
        setIsLoading(false);
        setImageUrl(response.data.imageUrl)
      });
  }, [player.id]);
  return (
    <Card>
      {!isLoading && <CardMedia
        component='img'
        height='300'
        image={imageUrl || 'https://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/celtics/media/generic-player-1040x760.png'}
        alt={'Player'}
      /> }
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {player.first_name + ' ' + player.last_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
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
