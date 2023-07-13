import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { theme } from '../../styles/styles';
import { selectEmployee, setEmployee } from '../../features/filterSlice';
import { selectAllEmployees } from '../../features/employeeSlice';

export default function EmployeeSelect() {
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const employees = useSelector(selectAllEmployees);
  const handleEmployeeChange = (id) => {
    dispatch(setEmployee(id));
  };
  return (
    <FormControl
      sx={{
        width: '100%',
      }}
    >
      <InputLabel>Choose a barber</InputLabel>
      <Select
        label="Barber"
        value={employee}
        fullWidth
        onChange={(e) => handleEmployeeChange(e.target.value)}
        sx={{ color: theme.palette.secondary.main }}
      >
        <MenuItem value="any">No preference</MenuItem>
        {employees.map((employee) => {
          return (
            <MenuItem value={employee.id} key={employee.id}>
              {employee.firstName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
