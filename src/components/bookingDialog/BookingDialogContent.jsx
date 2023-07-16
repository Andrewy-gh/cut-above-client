import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import { useDateSelection } from '../../hooks/useDateSelection';
import { formatDateFull, formatTime } from '../../utils/date';
import { useServiceSelection } from '../../hooks/useServiceSelection';

const flex = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  marginBottom: '3rem',
};

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
  const { date } = useDateSelection();
  const { service } = useServiceSelection();
  console.log('selection', selection);
  return (
    <>
      <BookingDialogTitle onClose={handleClose}>
        Complete your Booking
      </BookingDialogTitle>
      <DialogContent>
        <div style={flex}>
          <ContentCutIcon />
          <div>{service.name}</div>
          <div>{service.duration} minutes</div>
        </div>
        <div style={flex}>
          <CalendarMonthIcon />
          <div>{formatDateFull(date)}</div>
          <div>{formatTime(selection.start)}</div>
        </div>
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
