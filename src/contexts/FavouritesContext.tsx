import React, { FunctionComponent, useState } from "react";
import { Player } from "../components/PlayerSummary";

interface Favourites {
  children: React.ReactNode;
}

export const FavouritesContext = React.createContext({
  favourites: new Set<string>(),
  addPlayer: (player: Player) => {},
  removePlayer: (player: string) => {},
});

const FavouritesProvider: FunctionComponent<Favourites> = ({ children }) => {
  const [favourites, setFavourites] = useState<Set<string>>(new Set<string>());
  const addPlayer = (player: Player) => {
    let newFavourites = new Set<string>([...favourites, player.name]);
    setFavourites(newFavourites);
  };
  const removePlayer = (playerName: string) => {
    let newFavourites = [...favourites];
    newFavourites = newFavourites.filter(
      (favPlayer) => favPlayer !== playerName
    );
    setFavourites(new Set<string>(newFavourites));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addPlayer, removePlayer }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
