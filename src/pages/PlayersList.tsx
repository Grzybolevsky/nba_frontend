import Grid from '@mui/material/Grid'
import {styled} from '@mui/material/styles'
import {Player, PlayerSummary} from '../components/PlayerSummary'
import {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import {useFavourites} from "../contexts/useFavourites";
import axios from "axios";
import {Pagination, Typography} from "@mui/material";

const ItemList = styled(Grid)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3)
}))

let PlayersList = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const [pages, setPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error] = useState<string | null>(null)
    const {addPlayer: removePlayer} = useFavourites()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/players`,
            {params: {page: searchParams.get('page'), 'per_page': 24}})
            .then((response) => {
                setPlayers(response.data.data);
                setPages(response.data.meta.total_pages)
                setIsLoading(false);
            })
    }, [searchParams])

    return (
        <>
            <h2>Gracze</h2>
            {error
                && (<p>{error}</p>)}
            {isLoading && <p>Loading...</p>}
            {!isLoading && !error &&
                <>
                    <Typography>Page: {searchParams.get('page') || 0 + 1}</Typography>
                    <Pagination count={pages} page={Number(searchParams.get('page')) || 0}
                                onChange={(e, page) => setSearchParams({page: String(page)}, {replace: true})}/>
                    <ItemList container spacing={4}>
                        {players.map(player =>
                            <Grid item xs={3} key={player.first_name + player.last_name}>
                                <PlayerSummary key={player.id} player={player} onBuy={removePlayer}/>
                            </Grid>
                        )}
                    </ItemList>
                </>
            }
        </>
    )
}
export default PlayersList
