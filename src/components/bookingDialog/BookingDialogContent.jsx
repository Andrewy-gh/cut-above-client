import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

function BookingDialogContent({
  children,
  handleAgree,
  handleClose,
  selection,
}) {
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

export default BookingDialogContent;
