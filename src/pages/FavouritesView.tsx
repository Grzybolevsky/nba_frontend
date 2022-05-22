import { Snackbar } from "@mui/material";
import FavouritePlayer from "../components/FavouritePlayer";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useFavourites } from "../contexts/useFavourites";

let FavouritesView = () => {
  const { favourites, removePlayer } = useFavourites();
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  const ItemList = styled(Grid)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
  }));

  const handleSnackbarClose = () => {
    setSnackbarMsg(null);
  };

  return (
    <>
      <h2>Ulubione</h2>
      {favourites.size === 0 && <p>Brak</p>}
      <ItemList container spacing={4}>
        {[...favourites].map((player: string) => (
          <Grid item xs={3} key={player}>
            <FavouritePlayer
              player={player}
              onRemove={() => removePlayer(player)}
            />
          </Grid>
        ))}
      </ItemList>
      <Snackbar
        open={!!snackbarMsg}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMsg}
      />
    </>
  );
};
export default FavouritesView;
