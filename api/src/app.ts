import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as path from 'path';
import cors from 'cors';
import { PollResolver } from './resolvers/Poll';

const main = async () => {
  const app = express();

  app.use(cors());

  const conn = await createConnection(
    process.env.NODE_ENV === 'production'
      ? {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: ['src/entities/*.ts']
        }
      : null
  );

  // await conn.runMigrations();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PollResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      validate: false
    }),
    playground: true
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 5051;

  app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
  });
};

main().catch(err => console.log(err));
