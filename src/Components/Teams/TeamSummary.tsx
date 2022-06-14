import React, { FunctionComponent } from 'react';
import { Team } from '../../Interfaces/Team';
import { Card, CardContent, Typography } from '@mui/material';

type TeamSummaryProps = {
  team: Team;
}

export const TeamSummary: FunctionComponent<TeamSummaryProps> = ({ team }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {team.full_name}
        </Typography>
      </CardContent>
    </Card>
  );
};