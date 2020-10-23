import { Box, Heading } from '@chakra-ui/core';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Box bg='pink.500' p={4} textAlign='center'>
        <Heading size='lg' color='white' as='h1'>
          TMO iPhone 12 Interest Poll
        </Heading>
      </Box>
      {children}
    </div>
  );
}
