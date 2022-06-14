import React from 'react';
import { Player } from '../../Interfaces/Player';

export const FavoritesContext = React.createContext({
  favourites: new Set<string>(),
  addPlayer: (player: Player) => {
  },
  removePlayer: (player: string) => {
  }
});


export const useFavorites = () => {
  return React.useContext(FavoritesContext);
};
