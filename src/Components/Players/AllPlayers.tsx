import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { InputAdornment, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Player } from '../../Interfaces/Player';
import { useFavorites } from '../Favorites/ManageFavorites';
import { PlayerSummary } from './PlayerSummary';

const ItemList = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3)
}));

const PER_PAGE = 24;

export default function AllPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const { addPlayer: removePlayer } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api-balldontlie/players`, {
        params: {
          page: searchParams.get("page"),
          per_page: PER_PAGE,
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
        id='input-with-icon-textfield'
        label='Wyszukiwanie'
        fullWidth
        value={searchParams.get('name')}
        onChange={(e) =>
          setSearchParams({ name: String(e.target.value) }, { replace: false })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant='standard'
      />
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Pagination
            count={pages}
            page={Number(searchParams.get('page')) || 1}
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
}