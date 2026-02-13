// Minimal test endpoint to verify Vercel serverless is working
export default function handler(req, res) {
  res.status(200).json({
    message: "Serverless function is working!",
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    envCheck: {
      MONGO_URI_SET: !!process.env.MONGO_URI,
      NODE_ENV: process.env.NODE_ENV || "not set",
    },
  });
}
