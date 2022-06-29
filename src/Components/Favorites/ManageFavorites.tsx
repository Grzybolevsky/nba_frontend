import React from 'react';
import { Player } from '../../Interfaces/Player';
import axios from 'axios';
import { FavoritePlayer } from '../../Interfaces/FavoritePlayer';

export const FavoritesContext = React.createContext({
  favourites: new Set<string>(),
  addPlayer: (player: Player) => {
    axios
      .post(`/api/favorites/players/${player.id}`)
      .then(r => console.log('Favorite added'));
  },
  removePlayer: (player: FavoritePlayer) => {
    axios
      .delete(`/api/favorites/players/${player.favoritePlayerId}`)
      .then(r => console.log('Favorite removed'));
  }
});


export const useFavorites = () => {
  return React.useContext(FavoritesContext);
};
