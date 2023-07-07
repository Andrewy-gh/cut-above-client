import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllEmployees,
  useGetEmployeesQuery,
} from '../../features/employeeSlice';
import { selectEmployee, setEmployee } from '../../features/filterSlice';
import EmployeeSelect from './EmployeeSelect';

export default function Employee() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
  const employees = useSelector(selectAllEmployees);
  const employee = useSelector(selectEmployee);
  const handleEmployeeChange = (employeeId) =>
    dispatch(setEmployee(employeeId));

  let content;
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <EmployeeSelect
        employee={employee}
        employees={employees}
        handleEmployeeChange={handleEmployeeChange}
      />
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <>{content}</>;
}
