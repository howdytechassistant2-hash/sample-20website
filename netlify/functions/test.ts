import type { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: "Test function is working!",
      method: event.httpMethod,
      path: event.path,
      environment: {
        SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
          ? "SET"
          : "NOT SET",
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET" : "NOT SET",
      },
    }),
  };
};

export { handler };
