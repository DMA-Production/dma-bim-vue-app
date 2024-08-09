// netlify/functions/redirect-to-github.js
exports.handler = async function(event, context) {
    const clientId = process.env.APS_CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
  
    // Redirect the user to GitHub's authorization page
    return {
      statusCode: 302,
      headers: {
        Location: `https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=data:read`
      },
    };
  };
  