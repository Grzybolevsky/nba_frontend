import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../Components/Base/listItems';
import { Login } from '@mui/icons-material';
import Drawer from '../Components/Base/Drawer';
import { AppBar } from '../Components/Base/AppBar';
import Content from '../Components/Base/Content';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import AllPlayers from '../Components/Players/AllPlayers';
import SinglePlayer from '../Components/Players/SinglePlayer';
import AllGames from '../Components/Games/AllGames';
import Favorites from '../Components/Favorites/Favorites';
import AllTeams from '../Components/Teams/AllTeams';
import SingleGame from '../Components/Games/SingleGame';
import SingleTeam from '../Components/Teams/SingleTeam';

const mdTheme = createTheme();

export default function BasePage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleDrawer}
                        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <img src={'logo.png'} style={{ width: 30, height: 60 }} alt={""}/>
            <Typography component='h1'
                        variant='h6'
                        color='inherit'
                        noWrap
                        sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color='inherit'>
              <Login />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
      <Content>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<AllPlayers />} />
          <Route path="/players/:id" element={<SinglePlayer />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:id" element={<SingleGame />} />
          <Route path="/teams" element={<AllTeams />} />
          <Route path="/teams/:id" element={<SingleTeam />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Content>
      </Box>
    </ThemeProvider>
  );
};
