import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Team } from '../../Interfaces/Team';
import axios from 'axios';

export default function SingleTeam() {
  const [team, setTeam] = useState<Team>({} as Team);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/teams/${params.id}`).then((response) => {
      setTeam(response.data);
      setIsLoading(false);
    });
  }, [params.id]);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <h1>
            {team.name}
          </h1>
          <h2>
            {team.full_name}
          </h2>
          <p>Skrót: {team.abbreviation}</p>
          <p>Miasto: {team.city}</p>
          <p>Konferencja: {team.conference}</p>
          <p>Dywizja: {team.division}</p>
        </>
      )}
    </>
  );
}