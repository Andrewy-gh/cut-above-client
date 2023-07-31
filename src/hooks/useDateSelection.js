import { useDispatch, useSelector } from 'react-redux';
import { selectDate, setDate } from '../features/filterSlice';

// TODO: remove date from filter slice
export function useDateSelection() {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const handleDateChange = (newDate) => {
    console.log(newDate.toISOString());
    dispatch(setDate(newDate.toISOString()));
  };

  return {
    date,
    handleDateChange,
  };
}
