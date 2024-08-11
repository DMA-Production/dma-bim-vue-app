// netlify/functions/aps-redirect-to-auth.js
export async function handler(event, context) {
    // eslint-disable-next-line no-undef
    const clientId = process.env.APS_CLIENT_ID;
    // eslint-disable-next-line no-undef
    const redirectUri = process.env.APS_REDIRECT_URI;
    var encodeRedirectUri = encodeURIComponent(redirectUri);
  
    // Redirect the user to Autodesk Platform Service's (APS) authentication page
    return {
      statusCode: 302,
      headers: {
        Location: `https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeRedirectUri}&scope=data:read`
      },
    };
  }
  