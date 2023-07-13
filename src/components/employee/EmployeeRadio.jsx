import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { selectEmployeeById } from '../../features/employeeSlice';
import { selectEmployee, setEmployee } from '../../features/filterSlice';

const EmployeeRadioOption = ({ employeeId }) => {
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  return (
    <FormControlLabel
      value={employee.id}
      control={<Radio />}
      label={employee.firstName}
    />
  );
};

export default function EmployeeRadio({ employees }) {
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const handleChange = (id) => {
    dispatch(setEmployee(id));
  };

  return (
    <FormControl>
      <FormLabel>Available Barbers:</FormLabel>
      <RadioGroup
        value={employee}
        onChange={(e) => handleChange(e.target.value)}
      >
        {employees.map((employeeId) => (
          <EmployeeRadioOption key={employeeId} employeeId={employeeId} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
