import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useToast
} from '@chakra-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import Layout from '../components/Layout';
import SwitchPage from '../components/SwitchPage';

type Inputs = {
  BAN: string;
  model: string;
  quantity: string;
  startedProcess: string;
};

const CreatePollEntry = gql`
  mutation($input: iPhonePollInput!) {
    createPollEntry(input: $input) {
      id
      BAN
      model
      quantity
      startedProcess
    }
  }
`;

export default function Home() {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [createPollEntry] = useMutation(CreatePollEntry, {
    onCompleted: poll => poll,
    onError: err => err
  });
  const toast = useToast();

  const submitInterest: SubmitHandler<Inputs> = async (
    { BAN, model, quantity, startedProcess },
    e
  ) => {
    let newStartedProcess;

    if (startedProcess === 'true') {
      newStartedProcess = true;
    } else if (startedProcess === 'false') {
      newStartedProcess = false;
    }

    const variables = {
      BAN,
      model,
      quantity: parseInt(quantity),
      startedProcess: newStartedProcess
    };

    const createdPoll = await createPollEntry({
      variables: { input: variables }
    });

    if (!createdPoll) {
      toast({
        position: 'bottom',
        render: () => (
          <Box m={3} color='white' p={3} bg='gray.500'>
            There was an error
          </Box>
        )
      });
    } else {
      e!.target.reset();
      toast({
        position: 'bottom',
        render: () => (
          <Box m={3} color='white' p={3} bg='pink.500'>
            Upgrade interest successfully submitted
          </Box>
        )
      });
    }
  };

  return (
    <Layout>
      <SwitchPage
        text='View All Interests'
        page='/interests'
        direction='right'
      />
      <Box d='flex' alignItems='center' justifyContent='center'>
        <form onSubmit={handleSubmit(submitInterest)}>
          <Stack spacing={8} mt={8}>
            <FormControl isInvalid={errors.BAN ? true : false}>
              <FormLabel htmlFor='BAN'>BAN</FormLabel>
              <Input
                name='BAN'
                placeholder='BAN'
                type='text'
                id='BAN'
                ref={register({ required: true, minLength: 9, maxLength: 9 })}
              />
              {errors.BAN && (
                <FormErrorMessage>Please enter a 9-digit BAN</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='model'>Model</FormLabel>
              <RadioGroup name='model'>
                <Radio value='iPhone 12' name='model' ref={register}>
                  iPhone 12
                </Radio>
                <Radio value='iPhone 12 Mini' name='model' ref={register}>
                  iPhone 12 Mini
                </Radio>
                <Radio value='iPhone 12 Pro' name='model' ref={register}>
                  iPhone 12 Pro
                </Radio>
                <Radio value='iPhone 12 Pro Max' name='model' ref={register}>
                  iPhone 12 Pro Max
                </Radio>
              </RadioGroup>
            </FormControl>
            <FormControl isInvalid={errors.quantity ? true : false}>
              <FormLabel htmlFor='quantity'>Quantity</FormLabel>
              <Input
                name='quantity'
                placeholder='quantity'
                type='number'
                id='quantity'
                ref={register({ required: true })}
              />
              {errors.quantity && (
                <FormErrorMessage>
                  Enter the interested quantity
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='startedProcess'>Started Process</FormLabel>
              <Select name='startedProcess' ref={register({ required: true })}>
                <option value='true'>True</option>
                <option value='false'>False</option>
              </Select>
            </FormControl>
            <Button variant='outline' variantColor='pink' type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
