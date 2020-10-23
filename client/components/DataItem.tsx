import { Box, Divider, Flex, ListItem } from '@chakra-ui/core';

interface DataItemProps {
  BAN: number;
  model: string;
  quantity: number;
  startedProcess: boolean;
  createdAt: Date;
}

export default function DataItem({
  BAN,
  model,
  quantity,
  startedProcess,
  createdAt
}: DataItemProps) {
  return (
    <ListItem mb={4}>
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
  );
}
