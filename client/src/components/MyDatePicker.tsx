/* tslint:disable */
import React from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface MyDatePickerProps {
  selectedDate: Date;
  handleChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void;
  isClearable: boolean;
  placeholderText: string;
}

export default function MyDatePicker({
  selectedDate,
  handleChange,
  isClearable,
  placeholderText,
  ...props
}: MyDatePickerProps) {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      isClearable
      placeholderText={placeholderText}
      {...props}
    />
  );
}
