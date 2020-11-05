import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? process.env.INTEREST_API
      : 'http://localhost:5051/graphql',
  cache: new InMemoryCache()
});
