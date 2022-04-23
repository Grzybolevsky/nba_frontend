import React from 'react';
import {FavouritesContext} from './FavouritesContext'

export const useFavourites = () => {
    const favouritesContext = React.useContext(FavouritesContext)
    return favouritesContext;
}
