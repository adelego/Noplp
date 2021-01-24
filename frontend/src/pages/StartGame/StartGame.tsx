import React, { useEffect } from 'react';
import { useRedirectToGeniusLogin } from '../../hooks/useRedirectToGeniusLogin/useRedirectToGeniusLogin';

const StartGame = (): JSX.Element => {
  const { redirectToGeniusLogin } = useRedirectToGeniusLogin();
  useEffect(() => {
    redirectToGeniusLogin();
  }, [redirectToGeniusLogin]);
  return <div>Start Game</div>;
};

export default StartGame;
