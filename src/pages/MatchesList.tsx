import {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import {Link, useSearchParams} from 'react-router-dom'
import axios from "axios";
import {Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

type Match = {
    id: number
    home_team_score: number
    visitor_team_score: number
    home_team: {
        id: number
        full_name: string
    }
    visitor_team: {
        id: number
        full_name: string
    }
}
let MatchesList = () => {
    const [matches, setMatches] = useState<Match[]>([])
    const [pages, setPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/games`,
            {params: {page: searchParams.get('page'), 'per_page': 40}})
            .then((response) => {
                setMatches(response.data.data);
                setPages(response.data.meta.total_pages)
                setIsLoading(false);
            })
    }, [searchParams])
    return (
        <>
            <h2>Mecze</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error &&
                <>
                    <Typography>Page: {(Number(searchParams.get('page')) || 0) + 1}</Typography>
                    <Pagination count={pages} page={Number(searchParams.get('page')) || 0}
                                onChange={(e, page) => setSearchParams({page: String(page)})}/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Gospodarz</TableCell>
                                <TableCell>Gość</TableCell>
                                <TableCell>Wynik</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches.map(match => (
                                <TableRow key={match.id}>
                                    <TableCell>{match.home_team.full_name}</TableCell>
                                    <TableCell>{match.visitor_team.full_name}</TableCell>
                                    <TableCell>{match.home_team_score + " : " + match.visitor_team_score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            }
        </>
    )
}
export default MatchesList
