const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const ZAPIER_WEBHOOK_URL = process.env.COMPANYCONSENT_WEBHOOK_URL; // Use environment variable

  const params = event.queryStringParameters || {}; // Capture GET query parameters

  try {
    // Forward the GET params to Zapier
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    // Redirect to external success page
    return {
      statusCode: 302,
      headers: {
        Location: "https://www.damaswiss.org/success"  // External redirect
      },
      body: ""
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Something went wrong while forwarding to Zapier."
    };
  }
};