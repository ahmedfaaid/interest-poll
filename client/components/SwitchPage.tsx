import { Box, Icon, Text } from '@chakra-ui/core';
import Link from 'next/link';

interface SwitchPageProps {
  text: string;
  page: string;
  direction: string;
}

export default function SwitchPage({ text, page, direction }) {
  let link;

  if (direction === 'right') {
    link = (
      <>
        <Link href={page}>
          <a>{text}</a>
        </Link>
        <Icon name='arrow-forward' ml={1} />
      </>
    );
  } else if (direction === 'left') {
    link = (
      <>
        <Icon name='arrow-back' mr={1} />
        <Link href={page}>
          <a>{text}</a>
        </Link>
      </>
    );
  }

  return (
    <Box textAlign='center' color='pink.500' mt={4}>
      <Text>{link}</Text>
    </Box>
  );
}
