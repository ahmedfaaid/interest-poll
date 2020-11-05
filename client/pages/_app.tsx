import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apolloClient';
import { customTheme } from '../styles/theme';

// imports for date picker styles
import '../styles/date-picker.css';
import 'react-datepicker/dist/react-datepicker.css';

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

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
