import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import axios from "axios";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getPreviousDay, getYMDFormat} from "./MatchesList";
import {Match, MatchesTable} from "../components/MatchesTable";
import {Stats, StatsTable} from "../components/StatsTable";

export const Dashboard: FunctionComponent = () => {
    const [matches, setMatches] = useState<Match[]>([])
    const [stats, setStats] = useState<Stats[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoadingStats, setIsLoadingStats] = useState(false)

    useEffect(() => {
        setIsLoadingMatches(true);
        axios.get(`/games`,
            {params: {"dates[]": getYMDFormat(getPreviousDay(new Date()))}})
            .then((response) => {
                setMatches(response.data.data);
                setIsLoadingMatches(false);
            })

        setIsLoadingStats(true);
        axios.get(`/stats`,
            {params: {"dates[]": getYMDFormat(getPreviousDay(new Date()))}})
            .then((response) => {
                setStats(response.data.data);
                setIsLoadingStats(false);
            })
    }, [])

    return (
        <>
            <h1>Witaj w NBA APP!</h1>
            <h2>Wczorajsze mecze:</h2>
            {isLoadingMatches && <p>Ładowanie...</p>}
            {!isLoadingMatches && <MatchesTable matches={matches} />}
            <h2>Statystyki z wczoraj</h2>
            {isLoadingStats && <p>Ładowanie...</p>}
            {!isLoadingStats && <StatsTable stats={stats}/>}

        </>
    )
}
