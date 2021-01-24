import { useLocation } from 'react-router';
import { parse as parseQueryString } from 'qs';
import { useRedirectToGeniusLogin } from '../useRedirectToGeniusLogin/useRedirectToGeniusLogin';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import axios from 'axios';

const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL;

export const useCompleteLoginToGenius = () => {
  const location = useLocation();
  const { redirectToGeniusLogin } = useRedirectToGeniusLogin();

  const [
    { loading, error, value: isSuccessful },
    completeLoginToGenius,
  ] = useAsyncFn(async (userCode: string) => {
    const response = await axios.get(`${API_GATEWAY_URL}/login`, {
      params: { userCode },
    });
    const token = response.data.token;
    window.localStorage.setItem('geniusToken', token);
    return true;
  });

  useEffect(() => {
    const strippedSearch = location.search.replace('?', '');
    const userCode =
      parseQueryString(strippedSearch).code?.toString() ?? undefined;
    if (userCode === undefined) {
      redirectToGeniusLogin();
      return;
    }
    completeLoginToGenius(userCode);
  }, [location, redirectToGeniusLogin, completeLoginToGenius]);

  useEffect(() => {
    if (error) {
      window.localStorage.removeItem('geniusToken');
    }
  }, [error]);

  return { loading, error, isSuccessful };
};
