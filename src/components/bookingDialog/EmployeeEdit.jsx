import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployeeById } from '../../features/employeeSlice';

export default function EmployeeEdit({ employeeId, handleClick }) {
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6">{employee.firstName}</Typography>
      <Button onClick={handleClick}>Edit</Button>
    </div>
  );
}
