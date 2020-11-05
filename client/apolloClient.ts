import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  NormalizedCacheObject
} from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? process.env.API_URL
          : 'http://localhost:5051/graphql'
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined'
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
