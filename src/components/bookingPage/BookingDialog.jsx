import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Employee from '../employee';

export default function BookingDialog({ handleAgree, handleClose }) {
  return (
    <>
      <DialogContentText>
        Pick an employee and confirm appointment.
      </DialogContentText>
      <Employee />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </>
  );
}
