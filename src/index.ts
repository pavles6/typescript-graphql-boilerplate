import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import dotenv from "dotenv";

import { createTypeormConn } from "./utils/create-typeorm-conn";
import { authCookieName } from "./utils/constants/other";
import { createSchema } from "./utils/create-graphql-schema";

dotenv.config();

const main = async () => {
  try {
    await createTypeormConn();
  } catch (error) {
    console.log(error);
  }

  const schema = await createSchema;

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000", // probably a react app running on port 3000
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: authCookieName, // edit in src/utils/constants/other.ts
      secret: process.env.COOKIE_SECRET || "dwadwa123",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 8080;
  app.listen(port, async () => {
    console.log(
      `🚀 Running on http://localhost:${port} in ${process.env.NODE_ENV}`
    );
  });
};

main();
