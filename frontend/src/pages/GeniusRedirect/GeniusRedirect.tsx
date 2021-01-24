import React from 'react'
import { useCompleteLoginToGenius } from '../../hooks/useLoginToGenius/useLoginToGenius'

interface Props {
    
}

const GeniusRedirect = (props: Props) => {
    const {error, loading, isSuccessful} =useCompleteLoginToGenius()
    return (
        <div>
            {loading && "Logging you in with Genius..."}
            {error && <>
            Logging failed
            <br/>
            <a href="/game">Try again</a>
            </>}
            {isSuccessful && <>You were successfully logged in !<br/><a href="/game">Start a game</a></>}
        </div>
    )
}

export default GeniusRedirect
