import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Player, PlayerSummary } from "../components/PlayerSummary";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFavourites } from "../contexts/useFavourites";

const ItemList = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
}));

let PlayersList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const { addPlayer: removePlayer } = useFavourites();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setPlayers([
      { name: "LeBron James" },
      { name: "Shaquille O’Neal" },
      { name: "Michael Jordan" },
      { name: "Kobe Brayant" },
      { name: "Marcin Gortat" },
      { name: "Stephen Curry" },
    ]);
    setIsLoading(false);
  }, [searchParams]);

  return (
    <>
      <h2>Gracze</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <ItemList container spacing={4}>
          {players.map((player) => (
            <Grid item xs={3} key={player.name}>
              <PlayerSummary
                key={player.name}
                player={player}
                onBuy={removePlayer}
              />
            </Grid>
          ))}
        </ItemList>
      )}
    </>
  );
};
export default PlayersList;
