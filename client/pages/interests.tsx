import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'urql';

const InterestPolls = `
  query($limit: Int!, $skip: Int) {
    iphonePolls(limit: $limit, skip: $skip) {
      id
      BAN
      model
      quantity
      startedProcess
      createdAt
    }
  }
`;

function Interests() {
  const [variables, setVariables] = useState({ limit: 15, skip: 0 });
  const [result, reexecuteQuery] = useQuery({
    query: InterestPolls,
    variables
  });

  const { data, fetching, error } = result;

  const refetch = () => {
    reexecuteQuery({ requestPolicy: 'network-only' });
    setVariables(prev => ({ ...prev, skip: 0 }));
  };

  const loadMore = () => {
    setVariables(prev => ({ ...prev, skip: prev.skip + prev.limit }));
  };

  if (fetching) {
    return <Spinner color='pink.500' />;
  }

  return (
    <div>
      <Box bg='pink.500' p={4} textAlign='center'>
        <Heading size='lg' color='white' as='h1'>
          TMO iPhone 12 Interest Poll
        </Heading>
      </Box>
      <Box textAlign='center' color='pink.500' mt={4}>
        <Text>
          <Icon name='arrow-back' mr={1} />
          <Link href='/'>
            <a>Back to home</a>
          </Link>
        </Text>
      </Box>
      <Stack justify='center' align='center' mt={8} spacing={4}>
        <IconButton icon='repeat' size='lg' onClick={refetch} />
        <Flex borderBottom='1px' borderBottomColor='gray.100'>
          <Box w={40} textAlign='center' fontWeight='bold'>
            BAN
          </Box>
          <Divider orientation='vertical' />
          <Box w={40} textAlign='center' fontWeight='bold'>
            MODEL
          </Box>
          <Divider orientation='vertical' />
          <Box w={40} textAlign='center' fontWeight='bold'>
            QUANTITY
          </Box>
          <Divider orientation='vertical' />
          <Box w={40} textAlign='center' fontWeight='bold'>
            STARTED PROCESS
          </Box>
          <Divider orientation='vertical' />
          <Box w={40} textAlign='center' fontWeight='bold'>
            DATE
          </Box>
        </Flex>
        <List as='ol' spacing={4}>
          {data.iphonePolls.map(
            ({ id, BAN, model, quantity, startedProcess, createdAt }) => (
              <ListItem key={id}>
                <Flex borderBottom='1px' borderBottomColor='gray.100'>
                  <Box w={40} textAlign='center'>
                    {BAN}
                  </Box>
                  <Divider orientation='vertical' />
                  <Box w={40} textAlign='center'>
                    {model}
                  </Box>
                  <Divider orientation='vertical' />
                  <Box w={40} textAlign='center'>
                    {quantity}
                  </Box>
                  <Divider orientation='vertical' />
                  <Box w={40} textAlign='center'>
                    {startedProcess === true ? 'Yes' : 'No'}
                  </Box>
                  <Divider orientation='vertical' />
                  <Box w={40} textAlign='center'>
                    {new Date(createdAt).toDateString()}
                  </Box>
                </Flex>
              </ListItem>
            )
          )}
        </List>
        <Button
          bg='pink.500'
          color='white'
          onClick={loadMore}
          isDisabled={data.iphonePolls.length < variables.limit}
        >
          Load More
        </Button>
      </Stack>
    </div>
  );
}

export default withUrqlClient(() => ({ url: 'http://localhost:5051/graphql' }))(
  Interests
);
