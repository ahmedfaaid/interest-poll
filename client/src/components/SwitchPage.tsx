import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface SwitchPageProps {
  text: string;
  page: string;
  direction: string;
}

export default function SwitchPage({ text, page, direction }: SwitchPageProps) {
  let link;

  if (direction === 'right') {
    link = (
      <>
        <Link to={page}>{text}</Link>
        <Icon name='arrow-forward' ml={1} />
      </>
    );
  } else if (direction === 'left') {
    link = (
      <>
        <Icon name='arrow-back' mr={1} />
        <Link to={page}>{text}</Link>
      </>
    );
  }

  return (
    <Box textAlign='center' color='pink.500' mt={4}>
      <Text>{link}</Text>
    </Box>
  );
}
