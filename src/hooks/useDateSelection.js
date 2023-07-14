import { useState } from 'react';
import { currentDate } from '../utils/date';

// TODO: remove date from filter slice
export function useDateSelection() {
  const [date, setDate] = useState(currentDate);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return {
    date,
    handleDateChange,
  };
}
