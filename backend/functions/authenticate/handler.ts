import inputSchema from './schema';
import { FromSchema } from 'json-schema-to-ts';
import axios from 'axios';
import { getSSMParameters } from 'helpers/getSSMParameters';

export const main = async (event: FromSchema<typeof inputSchema>) => {
  // Call https://api.genius.com/oauth/token

  const stage = event.context?.stage ?? 'dev';

  const ssmParameters = await getSSMParameters([
    {
      name: `noplp-${stage}-genius-client-id`,
      withDecryption: true,
    },
    { name: `noplp-${stage}-genius-client-secret`, withDecryption: true },
    { name: `noplp-${stage}-genius-redirect-url`, withDecryption: true },
  ]);

  let response;
  try {
    const geniusReponse = await axios.post(
      'https://api.genius.com/oauth/token',
      {
        code: event.queryStringParameters?.userCode,
        client_id: ssmParameters[`noplp-${stage}-genius-client-id`] ?? '',
        client_secret:
          ssmParameters[`noplp-${stage}-genius-client-secret`] ?? '',
        redirect_uri: ssmParameters[`noplp-${stage}-genius-redirect-url`] ?? '',
        response_type: 'code',
        grant_type: 'authorization_code',
      },
    );
    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        token: geniusReponse.data.access_token,
      }),
    };
  } catch (error) {
    console.warn('Authentication with Genius failed', error);
    response = {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        response: `Could not authenticate you to Genius.`,
      }),
    };
  }

  console.log('Response', response);
  return response;
};
