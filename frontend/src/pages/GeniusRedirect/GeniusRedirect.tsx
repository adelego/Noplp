import React from 'react';
import { useCompleteLoginToGenius } from '../../hooks/useLoginToGenius/useLoginToGenius';

const GeniusRedirect = (): JSX.Element => {
  const { error, loading, isSuccessful } = useCompleteLoginToGenius();
  return (
    <div>
      {loading && 'Logging you in with Genius...'}
      {error !== undefined && (
        <>
          Logging failed
          <br />
          <a href="/game">Try again</a>
        </>
      )}
      {isSuccessful === true && (
        <>
          You were successfully logged in !<br />
          <a href="/game">Start a game</a>
        </>
      )}
    </div>
  );
};

export default GeniusRedirect;
