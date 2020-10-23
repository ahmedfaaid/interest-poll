import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  List,
  Select,
  Spinner,
  Stack
} from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { useQuery } from 'urql';
import DatePicker from 'react-datepicker';
import Categories from '../components/Categories';
import DataItem from '../components/DataItem';
import Layout from '../components/Layout';
import SwitchPage from '../components/SwitchPage';

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
  const [startDate, setStartDate] = useState(new Date());
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
    return (
      <Layout>
        <Spinner color='pink.500' />
      </Layout>
    );
  }

  return (
    <Layout>
      <SwitchPage text='Back to Home' page='/' direction='left' />
      <form>
        <FormControl>
          <FormLabel htmlFor='model'>Model</FormLabel>
          <Select name='model'>
            <option value='iPhone 12'>iPhone 12</option>
            <option value='iPhone 12 Mini'>iPhone 12 Mini</option>
            <option value='iPhone 12 Pro'>iPhone 12 Pro</option>
            <option value='iPhone 12 Pro Max'>iPhone 12 Pro Max</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='startedProcess'>Started Process</FormLabel>
          <Select name='startedProcess'>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </Select>
        </FormControl>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
      </form>
      <Stack justify='center' align='center' mt={8}>
        <IconButton
          icon='repeat'
          size='lg'
          aria-label='Refetch Interest Polls'
          onClick={refetch}
        />
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
          isDisabled={data.iphonePolls.length < variables.limit}
        >
          Load More
        </Button>
      </Stack>
    </Layout>
  );
}

export default withUrqlClient(() => ({ url: 'http://localhost:5051/graphql' }))(
  Interests
);
