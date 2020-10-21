import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import Link from 'next/link';

type Inputs = {
  BAN: string;
  model: string;
  quantity: number;
  startedProcess: boolean;
};

const CreatePollEntry = `
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
  const [_, createPollEntry] = useMutation(CreatePollEntry);
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const toast = useToast();

  const submitInterest = async (
    { BAN, model, quantity, startedProcess },
    e
  ) => {
    e.target.reset();

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

    await createPollEntry({ input: variables }).then(result => {
      if (result.error) {
        toast({
          position: 'bottom',
          render: () => (
            <Box m={3} color='white' p={3} bg='gray.500'>
              There was an error
            </Box>
          )
        });
      } else {
        toast({
          position: 'bottom',
          render: () => (
            <Box m={3} color='white' p={3} bg='pink.500'>
              Upgrade interest successfully submitted
            </Box>
          )
        });
      }
    });
  };

  return (
    <div>
      <Box bg='pink.500' p={4} textAlign='center'>
        <Heading size='lg' color='white' as='h1'>
          TMO iPhone 12 Interest Poll
        </Heading>
      </Box>
      <Box textAlign='center' color='pink.500' mt={4}>
        <Text>
          <Link href='/interests'>
            <a>View All Interests</a>
          </Link>
          <Icon name='arrow-forward' ml={1} />
        </Text>
      </Box>
      <Box d='flex' alignItems='center' justifyContent='center'>
        <form onSubmit={handleSubmit(submitInterest)}>
          <Stack spacing={8} mt={8}>
            <FormControl isInvalid={errors.BAN}>
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
            <FormControl isInvalid={errors.quantity}>
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
    </div>
  );
}
