import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import { formatDateFull, formatTimeAlt } from '../../utils/date';
import { useFilter } from '../../hooks/useFilter';
import { theme } from '../../styles/styles';

const flex = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  marginBottom: '1rem',
};

const BookingDialogTitle = ({ children, onClose }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
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
  const { date, service } = useFilter();
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
