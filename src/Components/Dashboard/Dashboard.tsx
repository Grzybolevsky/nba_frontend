import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import axios from "axios";
import {getPreviousDay, getYMDFormat} from "../Games/AllGames";
import {GamesTable} from "../Games/GamesTable";
import {Stats, StatsTable} from "./StatsTable";
import {Game} from "../../Interfaces/Game";

export const Dashboard: FunctionComponent = () => {
    const [matches, setMatches] = useState<Game[]>([])
    const [stats, setStats] = useState<Stats[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoadingStats, setIsLoadingStats] = useState(false)

    useEffect(() => {
        setIsLoadingMatches(true);
        axios.get(`/api-balldontlie/games`,
            {params: {"dates[]": getYMDFormat(getPreviousDay(new Date()))}})
            .then((response) => {
                setMatches(response.data.data);
                setIsLoadingMatches(false);
            })

        setIsLoadingStats(true);
        axios.get(`/api-balldontlie/stats`,
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
            {!isLoadingMatches && <GamesTable games={matches} />}
            <h2>Statystyki z wczoraj</h2>
            {isLoadingStats && <p>Ładowanie...</p>}
            {!isLoadingStats && <StatsTable stats={stats}/>}

        </>
    )
}
