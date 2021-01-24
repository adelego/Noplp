import React, { useEffect } from 'react';
import { useRedirectToGeniusLogin } from '../../hooks/useRedirectToGeniusLogin/useRedirectToGeniusLogin';

interface Props {}

const StartGame = (props: Props) => {
  const { redirectToGeniusLogin } = useRedirectToGeniusLogin();
  useEffect(() => {
    redirectToGeniusLogin();
  }, [redirectToGeniusLogin]);
  return <div>Start Game</div>;
};

export default StartGame;
