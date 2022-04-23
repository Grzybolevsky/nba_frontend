import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import {FunctionComponent} from "react";

type FavouritePlayerProps = {
    player: string,
    onRemove: () => void
}
const FavouritePlayer: FunctionComponent<FavouritePlayerProps> = ({player, onRemove}) => {

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image="https://icon-library.com/images/basketball-player-icon/basketball-player-icon-1.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {player}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onRemove}>Usuń</Button>
            </CardActions>
        </Card>
    )
}

export default FavouritePlayer