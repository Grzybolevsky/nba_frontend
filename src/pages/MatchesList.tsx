import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Match, MatchesTable } from "../components/MatchesTable";
import { Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";

export const getPreviousDay = (forDate: Date) => {
  let date = new Date();
  date.setDate(forDate.getDate() - 1);
  return date;
};
const getNextDay = (forDate: Date) => {
  let date = new Date();
  date.setDate(forDate.getDate() + 1);
  return date;
};
export const getYMDFormat = (date: Date) => {
  return date.toISOString().split("T")[0];
};

let MatchesList = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);
  const [date, setDate] = useState(getPreviousDay(new Date()));

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/games`, {
        params: { "dates[]": getYMDFormat(date), per_page: 40 },
      })
      .then((response) => {
        setMatches(response.data.data);
        setIsLoading(false);
      });
  }, [date]);
  return (
    <>
      <h2>Mecze</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <>
          <Container>
            <Stack direction="row" spacing={"auto"}>
              <IconButton
                sx={{ p: 0 }}
                onClick={() => setDate(getPreviousDay(date))}
              >
                <ArrowBackIos />
              </IconButton>
              <Typography>Date: {getYMDFormat(date)}</Typography>
              <IconButton
                sx={{ p: 0 }}
                onClick={() => setDate(getNextDay(date))}
              >
                <ArrowForwardIos />
              </IconButton>
            </Stack>
          </Container>
          <MatchesTable matches={matches} />
          {matches.length === 0 && <p>Brak zaplanowanych meczy tego dnia.</p>}
        </>
      )}
    </>
  );
};
export default MatchesList;
