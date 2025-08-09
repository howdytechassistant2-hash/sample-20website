import type { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Import server only when needed to reduce cold start bundle size
  const { createServer } = await import('../../server');
  const serverless = await import('serverless-http');
  
  const app = createServer();
  const handler = serverless.default(app);
  
  return handler(event, context);
};

export { handler };
