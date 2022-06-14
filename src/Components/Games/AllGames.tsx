import React, { useEffect, useState } from 'react';
import { Game } from '../../Interfaces/Game';
import axios from 'axios';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GamesTable } from './GamesTable';

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
  return date.toISOString().split('T')[0];
};

export default function AllGames() {
  const [Games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);
  const [date, setDate] = useState(getPreviousDay(new Date()));

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api-balldontlie/games`, {
        params: { 'dates[]': getYMDFormat(date), per_page: 40 }
      })
      .then((response) => {
        setGames(response.data.data);
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
            <Stack direction='row' spacing={'auto'}>
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
          <GamesTable games={Games} />
          {Games.length === 0 && <p>Brak zaplanowanych meczy tego dnia.</p>}
        </>
      )}
    </>
  );
}