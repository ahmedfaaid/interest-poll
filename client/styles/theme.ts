import { theme } from '@chakra-ui/core';

// Let's say you want to add custom colors
export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    500: '#ED008C',
    300: '#999B9E'
  }
};
