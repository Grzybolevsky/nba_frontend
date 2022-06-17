import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Delete, Info } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Player } from '../../Interfaces/Player';
import axios from 'axios';
import { FavoritePlayer } from '../../Interfaces/FavoritePlayer';

type FavoriteProps = {
  favoritePlayer: FavoritePlayer;
  removeFavorite: (player: FavoritePlayer) => void;
};

export const FavoritePlayerSummary: FunctionComponent<FavoriteProps> = ({ favoritePlayer, removeFavorite }) => {
  const [playerData, setPlayer] = useState<Player>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/players/${favoritePlayer.favoritePlayerId}`)
      .then((response) => {
        setPlayer(response.data);
        setIsLoading(false);
      });
  }, [favoritePlayer.favoritePlayerId]);
  if(playerData === undefined)
    return (
      <></>
    )
  return (
    <Card>
      {!isLoading && <CardMedia
        component='img'
        height='300'
        image={playerData.image_url || `https://nba-players.herokuapp.com/players/${playerData.last_name}/${playerData.first_name}`}
        alt={'Player'}
      />}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {playerData.first_name + ' ' + playerData.last_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {playerData.team.full_name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton component={Link} to={`/players/${playerData.id}`}>
          <Info />
        </IconButton>
        <IconButton onClick={() => removeFavorite(favoritePlayer)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};
