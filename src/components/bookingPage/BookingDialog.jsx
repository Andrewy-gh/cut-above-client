import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Employee from '../employee';

import { useSelector } from 'react-redux';
import { selectEmployee } from '../../features/filterSlice';

export default function BookingDialog({ children, handleAgree, handleClose }) {
  const employee = useSelector(selectEmployee);
  return (
    <>
      <DialogContentText>
        Pick an employee and confirm appointment.
        <div>DEBUG employee: {employee}</div>
      </DialogContentText>
      {children}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </>
  );
}
