import {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'

let MatchesList = () => {
    const [matches, setMatches] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setMatches(["Mecz a", "Mecz b", "Mecz c"])
        setIsLoading(false)
    }, [])
    return (
        <>
            <h2>Mecze</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error &&
            <div>
                {matches.map(match =>
                    <Button key={match} component={Link} to={"/matches?id=" + match}>
                        {match}
                    </Button>)}
            </div>
            }
        </>
    )
}
export default MatchesList
