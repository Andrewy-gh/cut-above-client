import { useDispatch, useSelector } from 'react-redux';
import { selectEmployee, setEmployee } from '../features/filterSlice';

export function useEmployeeSelection() {
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const handleEmployeeChange = (id) => {
    dispatch(setEmployee(id));
  };
  return { employee, handleEmployeeChange };
}
