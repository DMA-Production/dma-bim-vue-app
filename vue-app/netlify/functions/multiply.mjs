// Netlify function to perform a simple math calculation: 2 * 2
exports.handler = async function(event, context) {
    // Calculate 2 * 2
    const result = 2 * 2;
  
    // Return the result as a JSON response
    return {
      statusCode: 200, // HTTP status code 200 means "OK"
      body: JSON.stringify({ result: result }) // Send the result in JSON format
    };
  };