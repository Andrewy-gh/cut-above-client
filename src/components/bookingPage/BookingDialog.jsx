import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Employee from '../employee';

import { useSelector } from 'react-redux';
import { selectEmployee } from '../../features/filterSlice';

import CustomDialog from '../CustomDialog';

const BookingDialogTitle = ({ children, onClose }) => {
  return (
    <DialogTitle>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function BookingDialog({
  children,
  handleBooking,
  handleClose,
  selection,
}) {
  const handleAgree = (data) => {
    handleBooking(data);
  };
  return (
    <>
      <BookingDialogTitle onClose={handleClose}>
        Complete your Booking
      </BookingDialogTitle>
      <DialogContent dividers>
        <div>{selection.start}</div>
        <div>{selection.end}</div>
        <div>{JSON.stringify(selection.available)}</div>
      </DialogContent>
      {children}
      <DialogActions>
        <Button onClick={handleAgree} autoFocus>
          Book Now
        </Button>
      </DialogActions>
    </>
  );
}
