import React from 'react'
import { useCompleteLoginToGenius } from '../../hooks/useLoginToGenius/useLoginToGenius'

interface Props {
    
}

const GeniusRedirect = (props: Props) => {
    useCompleteLoginToGenius()
    return (
        <div>
            Logging you in with Genius...
        </div>
    )
}

export default GeniusRedirect
