import React, { useEffect } from 'react'
import { useGetGeniusToken } from '../../hooks/useRedirectToGeniusLogin/useRedirectToGeniusLogin'

interface Props {
    
}

const StartGame = (props: Props) => {
    const {getGeniusToken} = useGetGeniusToken()
    useEffect(() => {getGeniusToken()}, [getGeniusToken])
    return (
        <div>
            Start Game
        </div>
    )
}

export default StartGame
