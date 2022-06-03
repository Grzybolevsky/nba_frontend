import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Player, PlayerSummary } from "../components/PlayerSummary";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFavourites } from "../contexts/useFavourites";
import axios from "axios";
import { InputAdornment, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ItemList = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
}));

let PlayersList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const { addPlayer: removePlayer } = useFavourites();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/players`, {
        params: {
          page: searchParams.get("page"),
          per_page: 24,
          search: searchParams.get("name"),
        },
      })
      .then((response) => {
        setPlayers(response.data.data);
        setPages(response.data.meta.total_pages);
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <h2>Gracze</h2>
      <TextField
        id="input-with-icon-textfield"
        label="Wyszukiwanie"
        fullWidth
        value={searchParams.get("name")}
        onChange={(e) =>
          setSearchParams({ name: String(e.target.value) }, { replace: false })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Pagination
            count={pages}
            page={Number(searchParams.get("page")) || 1}
            onChange={(e, page) =>
              setSearchParams({ page: String(page) }, { replace: true })
            }
          />
          <ItemList container spacing={4}>
            {players.map((player) => (
              <Grid item xs={3} key={player.id}>
                <PlayerSummary
                  key={player.id}
                  player={player}
                  onBuy={removePlayer}
                />
              </Grid>
            ))}
          </ItemList>
        </>
      )}
    </>
  );
};
export default PlayersList;
