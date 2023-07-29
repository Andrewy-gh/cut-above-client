import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import { useDateSelection } from '../../hooks/useDateSelection';
import { formatDateFull, formatTimeAlt } from '../../utils/date';
import { useServiceSelection } from '../../hooks/useServiceSelection';
import { theme } from '../../styles/styles';

const flex = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  marginBottom: '3rem',
};

const BookingDialogTitle = ({ children, onClose }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <DialogTitle>{children}</DialogTitle>
      <div style={{ padding: '.25rem' }}>
        {onClose ? (
          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.secondary.light,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </div>
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
          <div>{formatTimeAlt(selection.start)}</div>
        </div>
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
