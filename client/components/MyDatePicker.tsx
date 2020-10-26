import { FormEventHandler } from 'react';
import dynamic from 'next/dynamic';
import { BoxProps } from '@chakra-ui/core';
// const ReactDatePicker = dynamic(() => import('react-datepicker'));
import ReactDatePicker from 'react-datepicker';

interface MyDatePickerProps {
  selectedDate: Date;
  handleChange: FormEventHandler;
  isClearable: boolean;
  placeholderText: string;
}

export default function MyDatePicker({
  selectedDate,
  handleChange,
  isClearable,
  ...props
}: MyDatePickerProps & BoxProps) {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      isClearable
      placeholderText
      {...props}
    />
  );
}
