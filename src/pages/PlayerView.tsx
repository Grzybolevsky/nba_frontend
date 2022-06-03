import { Player } from "../components/PlayerSummary";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Stat: FunctionComponent<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  return (
    <p>
      {name}: {value}
    </p>
  );
};

export const PlayerView: FunctionComponent = () => {
  const [player, setPlayer] = useState<Player>({} as Player);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingStats(true);
    axios.get(`/players/${params.id}`).then((response) => {
      setPlayer(response.data);
      setIsLoading(false);
    });
    axios
      .get("https://www.balldontlie.io/api/v1/season_averages", {
        params: {
          "player_ids[]": params.id,
        },
      })
      .then((response) => {
        setStats(response.data.data[0]);
        setIsLoadingStats(false);
      });
  }, [params.id]);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <h2>
            {player.first_name} {player.last_name}
          </h2>
          <p>Pozycja: {player.position}</p>
          {player.height_feet && player.height_inches && (
            <p>
              Wzrost: {player.height_feet}'{player.height_inches}"
            </p>
          )}
          {player.weight_pounds && <p>Waga: {player.weight_pounds}lb</p>}
          <p>Zespół: {player.team.full_name}</p>
        </>
      )}
      <h2>Stats</h2>
      {!isLoadingStats && !stats && <p>Nie gra w aktualnym sezonie.</p>}
      {!isLoadingStats && stats && (
        <>
          <Stat name="Season" value={stats.season} />
          <Stat name="Zagrane gry" value={stats.games_played} />
          <Stat name="Minuty" value={stats.min} />
          <Stat name="Trafione rzuty" value={stats.fgm} />
          <Stat name="Wykonane rzuty" value={stats.fga} />
          <Stat name="Trafione rzuty za 3" value={stats.fg3m} />
          <Stat name="Wykonane rzuty za 3" value={stats.fg3a} />
          <Stat name="Trafione rzuty wolne" value={stats.ftm} />
          <Stat name="Wykonane rzuty wolne" value={stats.fta} />
          <Stat name="Zbiórki ofensywne" value={stats.oreb} />
          <Stat name="Zbiórki defensywne" value={stats.dreb} />
          <Stat name="Zbiórki" value={stats.reb} />
          <Stat name="Asysty" value={stats.ast} />
          <Stat name="Przejęcia" value={stats.stl} />
          <Stat name="Bloki" value={stats.blk} />
          <Stat name="Straty" value={stats.turnover} />
          <Stat name="Punkty" value={stats.pts} />
          <Stat name="Celność" value={stats.fg_pct} />
          <Stat name="Celność za 3" value={stats.fg3_pct} />
          <Stat name="Celność rzutów wolnych" value={stats.ft_pct} />
        </>
      )}
    </>
  );
};
