import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { theme } from '../../styles/styles';
import { selectEmployee, setEmployee } from '../../features/filterSlice';
import { selectEmployeeById } from '../../features/employeeSlice';

const EmployeeOption = ({ employeeId }) => {
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  return (
    <option value={employee.id} key={employee.id}>
      {employee.firstName}
    </option>
  );
};

export default function EmployeeSelect({
  // employee,
  employees,
}) {
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  console.log(employee);
  console.log('id: ', employee.id);
  console.log('firsName: ', employee.firstName);
  const handleEmployeeChange = (id) => {
    dispatch(setEmployee(id));
  };
  return (
    // <FormControl fullWidth>
    //   <InputLabel>Choose a barber</InputLabel>
    <select
      label="Barber"
      value={employee}
      // fullWidth
      onChange={(e) => handleEmployeeChange(e.target.value)}
      // sx={{ color: theme.palette.secondary.main }}
    >
      <option value="any">No preference</option>
      {employees.map((employeeId) => (
        <EmployeeOption key={employeeId} employeeId={employeeId} />
      ))}
    </select>
    // </FormControl>
  );
}
