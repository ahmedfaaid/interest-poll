import React from 'react';
import { Box, Divider, Flex } from '@chakra-ui/core';

export default function Categories() {
  return (
    <Flex borderBottom='1px' borderBottomColor='gray.100' my={4}>
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
  );
}
