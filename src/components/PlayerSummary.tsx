import {Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import React, {FunctionComponent} from 'react'
import {isNumberObject} from "util/types";
export type Team = {
    id: number
    full_name: string
}
export type Player = {
    id: number
    first_name: string
    last_name: string
    position: string
    height_feet: number
    height_inches: number
    weight_pounds: number
    team: Team
}
type PlayerSummaryProps = {
    player: Player
    onBuy: (player: Player) => void
}
export const PlayerSummary: FunctionComponent<PlayerSummaryProps> = ({player, onBuy}) => {

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${101162}.png`}
                alt="green iguana"
            />
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {player.first_name + " " + player.last_name}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {player.team.full_name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onBuy(player)}>Dodaj do ulubionych</Button>
            </CardActions>
        </Card>
    )
}
