import { useEffect, useState } from 'react';
import axios from 'axios';
import { Team } from '../../Interfaces/Team';
import Grid from '@mui/material/Grid';
import { TeamSummary } from './TeamSummary';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ItemList = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3)
}));

export default function AllTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/teams`)
      .then((response) => {
        setTeams(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h2>Zespoły w NBA</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <ItemList container spacing={4}>
          {teams.map((team) => (
            <Grid item xs={3} key={team.id} component={Link} to={`/teams/${team.id}`}>
              <TeamSummary
                key={team.id}
                team={team}
              />
            </Grid>
          ))}
        </ItemList>
      )};
    </>
  );
}