import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFavorites } from './ManageFavorites';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { FavoritePlayerSummary } from './FavoritePlayerSummary';
import { FavoritePlayer } from '../../Interfaces/FavoritePlayer';
import {useSearchParams} from "react-router-dom";

const ItemList = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3)
}));

export default function Favorites() {
  const [players, setPlayers] = useState<FavoritePlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const { removePlayer } = useFavorites();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nba-heroku.herokuapp.com/api/favorites/players`)
      .then((response) => {
        setPlayers(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <ItemList container spacing={4}>
            {players.map((player) => (
              <Grid item xs={3} key={player.favoritePlayerId}>
                <FavoritePlayerSummary
                  key={player.favoritePlayerId}
                  favoritePlayer={player}
                  removeFavorite={removePlayer}
                />
              </Grid>
            ))}
          </ItemList>
        </>
      )}
    </>);
}
