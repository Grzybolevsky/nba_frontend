import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';
import * as React from 'react';
import { FunctionComponent } from 'react';

interface ContentProps {
  children: React.ReactNode
}

const Content: FunctionComponent<ContentProps> = ({children}) => (
  <Box component='main' sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
    <Toolbar />
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  </Box>
)

export default Content;