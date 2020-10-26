import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { createClient, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';
import { customTheme } from '../styles/theme';

// imports for date picker styles
import '../styles/date-picker.css';
import 'react-datepicker/dist/react-datepicker.css';

const client = createClient({
  url: 'http://localhost:5051/graphql',
  exchanges: [
    cacheExchange({
      resolvers: {
        Query: {
          iphonePolls: simplePagination()
        }
      }
    })
  ]
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Provider value={client}>
        <CSSReset />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
