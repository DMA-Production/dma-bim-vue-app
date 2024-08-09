// netlify/functions/github-callback.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;
  const code = event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization code not provided' }),
    };
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return {
      statusCode: 400,
      body: JSON.stringify(tokenData),
    };
  }

  const accessToken = tokenData.access_token;

  // Use the access token to access protected resources
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await userResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ user: userData }),
  };
};
