import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formatTimeAlt } from '../../utils/date';

// Enabled horizontal scrolling on small screens
const containerStyle = {
  display: 'flex',
  gap: '.5rem',
  alignItems: 'center',
  margin: '2rem 0',
  padding: { sm: '0 1rem', md: '0' },
  overflowX: 'scroll',
  overflow: { md: 'visible' },
  flexWrap: { md: 'wrap' },
  justifyContent: { md: 'center' },
  // hides horizontal scrollbar on browsers
  scrollbarWidth: 'none', // for Firefox
  msOverflowStyle: 'none', // for Internet Explorer, Edge
  '&::-webkit-scrollbar': {
    display: 'none', // for Chrome, Safari, and Opera
  },
};

const AvailableTime = ({ children, handleOpen }) => {
  return (
    <Button variant="contained" onClick={handleOpen}>
      {children}
    </Button>
  );
};

export default function AvailableTimes({ timeSlots, openDialog }) {
  const handleOpen = (data) => openDialog(data);

  let title;
  let availableTimes;
  if (timeSlots.length > 0) {
    title = (
      <Typography variant="h6" align="center">
        Times Available
      </Typography>
    );
    availableTimes = (
      <Box sx={containerStyle}>
        {timeSlots.map((slot) => {
          const startTime = formatTimeAlt(slot.start);
          return (
            <AvailableTime
              key={slot.id}
              handleOpen={() => handleOpen(slot)}
            >{`${startTime} ${slot.available.length} left`}</AvailableTime>
          );
        })}
      </Box>
    );
  } else {
    title = (
      <Typography variant="h6" align="center">
        No Times Available
      </Typography>
    );
  }

  return (
    <>
      {title}
      {availableTimes}
    </>
  );
}
