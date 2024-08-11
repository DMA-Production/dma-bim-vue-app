// netlify/functions/aps-auth-callback.mjs
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;
  const redirectUri = process.env.APS_REDIRECT_URI;
  const code = event.queryStringParameters.code;
  var basicHeader = String('\'Basic ', btoa(clientId,':',clientSecret),'\'');

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization code not provided' }),
    };
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await fetch('https://developer.api.autodesk.com/authentication/v2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader,
    },
    data: {
      'grant_type': 'authorization_code',
      'code': code,
      'redirectUri': redirectUri,
    },
  });

  const tokenData = await tokenResponse.json();
  
  if (tokenData.error) {
    return {
      statusCode: 400,
      body: JSON.stringify(tokenData),
    };
  }

  const accessToken = tokenData.access_token;
  setAccessTokenCookie(accessToken, 60);

  return {
    statusCode: 200,
    body: JSON.stringify({ user: userData }),
  };
}

function setAccessTokenCookie(token, minutesToExpire = 60) {
  const now = new Date();
  now.setTime(now.getTime() + (minutesToExpire * 60 * 1000));
  const expires = "expires=" + now.toUTCString();

  // Set the cookie with attributes
  document.cookie = `access_token=${token}; ${expires}; path=/; Secure; HttpOnly; SameSite=Lax`;
}