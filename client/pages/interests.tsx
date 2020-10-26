import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  List,
  Select,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber
} from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { useQuery } from 'urql';
import { useForm } from 'react-hook-form';
import Categories from '../components/Categories';
import DataItem from '../components/DataItem';
import Layout from '../components/Layout';
import SwitchPage from '../components/SwitchPage';
import MyDatePicker from '../components/MyDatePicker';

type Inputs = {
  model: string;
  startedProcess: boolean;
  date: Date;
};

const InterestPolls = `
  query($limit: Int!, $skip: Int, $filter: iPhonePollFilter, $date: DateTime) {
    iphonePolls(limit: $limit, skip: $skip, filter: $filter, date: $date) {
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
  const [variables, setVariables] = useState({
    limit: 15,
    skip: 0
  });
  const [startDate, setStartDate] = useState(new Date());
  const [result, reexecuteQuery] = useQuery({
    query: InterestPolls,
    variables
  });
  const { register, handleSubmit } = useForm<Inputs>();

  const { data, fetching, error } = result;

  const refetch = () => {
    reexecuteQuery({ requestPolicy: 'network-only' });
    setVariables(prev => ({ ...prev, skip: 0 }));
  };

  const loadMore = () => {
    setVariables(prev => ({ ...prev, skip: prev.skip + prev.limit }));
  };

  const filterResults = ({ model, startedProcess }) => {
    let newStartedProcess;

    if (startedProcess === 'true') {
      newStartedProcess = true;
    } else if (startedProcess === 'false') {
      newStartedProcess = false;
    }

    setVariables(prev => ({
      ...prev,
      filter: { model, startedProcess: newStartedProcess },
      date: startDate
    }));
  };

  if (fetching) {
    return (
      <Layout>
        <Spinner color='pink.500' />
      </Layout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Layout>
        <div>Error</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SwitchPage text='Back to Home' page='/' direction='left' />
      <Box d='flex' alignItems='center' justifyContent='center'>
        <form onSubmit={handleSubmit(filterResults)}>
          <Stack spacing={8} mt={8}>
            <FormControl>
              <FormLabel htmlFor='model'>Model</FormLabel>
              <Select name='model' ref={register}>
                <option value='iPhone 12'>iPhone 12</option>
                <option value='iPhone 12 Mini'>iPhone 12 Mini</option>
                <option value='iPhone 12 Pro'>iPhone 12 Pro</option>
                <option value='iPhone 12 Pro Max'>iPhone 12 Pro Max</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='startedProcess'>Started Process</FormLabel>
              <Select name='startedProcess' ref={register}>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </Select>
            </FormControl>
            <MyDatePicker
              selectedDate={startDate}
              handleChange={date => setStartDate(date as any)}
              isClearable
              placeholderText='No date selected'
            />
            <Button bg='pink.500' color='white' mt={4} type='submit'>
              Filter
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack justify='center' align='center' my={8}>
        <IconButton
          icon='repeat'
          size='lg'
          aria-label='Refetch Interest Polls'
          onClick={refetch}
        />
        <StatGroup d='flex' w='40%' justifyContent='center' my={8}>
          <Stat bg='pink.500' borderRadius='md' p={4} color='white' mx={4}>
            <StatLabel>Total Devices</StatLabel>
            <StatNumber>
              {data.iphonePolls.reduce((acc, curr) => {
                return acc + curr.quantity;
              }, 0)}
            </StatNumber>
          </Stat>
          <Stat bg='pink.500' borderRadius='md' p={4} color='white' mx={4}>
            <StatLabel>Total Accounts</StatLabel>
            <StatNumber>{data.iphonePolls.length}</StatNumber>
          </Stat>
        </StatGroup>
        <Categories />
        <List as='ol'>
          {data.iphonePolls.map(
            ({ id, BAN, model, quantity, startedProcess, createdAt }) => (
              <DataItem
                key={id}
                BAN={BAN}
                model={model}
                quantity={quantity}
                startedProcess={startedProcess}
                createdAt={createdAt}
              />
            )
          )}
        </List>
        <Button
          bg='pink.500'
          color='white'
          onClick={loadMore}
          isDisabled={data.iphonePolls.length < variables.limit || fetching}
        >
          Load More
        </Button>
      </Stack>
    </Layout>
  );
}

export default withUrqlClient(() => ({
  url: 'http://localhost:5051/graphql'
}))(Interests);
