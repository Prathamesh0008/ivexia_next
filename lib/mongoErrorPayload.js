export function getMongoErrorPayload(error, fallbackCode = "DB_ERROR") {
  const message =
    typeof error?.message === "string" ? error.message : "Unknown error";

  if (error?.code === "MONGODB_URI_MISSING") {
    return {
      error: "MongoDB connection failed",
      code: "MONGODB_URI_MISSING",
      hint: "Set MONGODB_URI in Vercel Project Settings > Environment Variables.",
    };
  }

  if (/not authorized|authentication failed|bad auth/i.test(message)) {
    return {
      error: "MongoDB connection failed",
      code: "DB_AUTH_FAILED",
      hint: "Check the username and password in MONGODB_URI.",
    };
  }

  if (/ip address|etimedout|querysrv|enotfound|econnrefused|server selection/i.test(message)) {
    return {
      error: "MongoDB connection failed",
      code: "DB_NETWORK_BLOCKED",
      hint: "Allow Vercel/serverless access in MongoDB Atlas Network Access.",
    };
  }

  return {
    error: "MongoDB connection failed",
    code: fallbackCode,
  };
}
