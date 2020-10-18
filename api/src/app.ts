import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as path from 'path';
import { PollResolver } from './resolvers/Poll';

const main = async () => {
  const app = express();

  await createConnection().then(() =>
    console.log('Connection to database established')
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PollResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 5051;

  app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
  });
};

main().catch(err => console.log(err));
