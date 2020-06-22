import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.NODE_ENV === "production" ? "redis" : "localhost",
});
