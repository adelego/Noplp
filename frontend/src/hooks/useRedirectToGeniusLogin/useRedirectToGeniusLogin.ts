import { useCallback } from 'react';
import { stringify as stringifyQueryParams } from 'qs';

const redirectUrl = process.env.REACT_APP_GENIUS_REDIRECT_URL ?? '';
const geniusClientId = process.env.REACT_APP_GENIUS_CLIENT_ID ?? '';

const getGeniusLoginUrl = () => {
  const queryParams = stringifyQueryParams({
    client_id: geniusClientId,
    redirect_uri: encodeURI(redirectUrl),
    scope: 'me',
    response_type: 'code',
  });
  return `https://api.genius.com/oauth/authorize?${queryParams}`;
};

export const useRedirectToGeniusLogin = () => {
  const redirectToGeniusLogin = useCallback((): string | null => {
    const token = window.localStorage.getItem('geniusToken');
    if (token === null) {
      window.location.href = getGeniusLoginUrl();
      return null;
    }
    return token;
  }, []);
  return { redirectToGeniusLogin };
};
