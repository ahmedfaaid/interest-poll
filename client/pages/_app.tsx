import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { createClient, Provider } from 'urql';
import { customTheme } from '../styles/theme';

const client = createClient({
  url: 'http://localhost:5051/graphql'
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
