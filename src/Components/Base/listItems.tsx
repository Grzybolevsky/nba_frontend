import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Favorite, Groups, SportsBaseball } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Główna' />
    </ListItemButton>
    <ListItemButton component={Link} to="/players">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Gracze' />
    </ListItemButton>
    <ListItemButton component={Link} to="/games">
      <ListItemIcon>
        <SportsBaseball />
      </ListItemIcon>
      <ListItemText primary='Mecze' />
    </ListItemButton>
    <ListItemButton component={Link} to="/teams">
      <ListItemIcon><Groups /></ListItemIcon>
      <ListItemText primary='Zespoły' />
    </ListItemButton>
    <ListItemButton component={Link} to="/favorites">
      <ListItemIcon>
        <Favorite />
      </ListItemIcon>
      <ListItemText primary='Ulubieni' />
    </ListItemButton>
  </React.Fragment>
);
