import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { customTheme } from '../styles/theme';

// imports for date picker styles
import '../styles/date-picker.css';
import 'react-datepicker/dist/react-datepicker.css';

const client = new ApolloClient({
  uri: 'http://localhost:5051/graphql',
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined'
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <CSSReset />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
