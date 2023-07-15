import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  let availableTimes;
  if (timeSlots.length > 0) {
    availableTimes = (
      <Box sx={containerStyle}>
        {timeSlots.map((slot) => (
          <AvailableTime
            key={slot.id}
            handleOpen={() => handleOpen(slot)}
          >{`${slot.start} ${slot.available.length} left`}</AvailableTime>
        ))}
      </Box>
    );
  } else {
    availableTimes = (
      <Typography variant="h6" align="center">
        No Times Available
      </Typography>
    );
  }

  return (
    <>
      {availableTimes}
      {/* {timeSlots.length > 0 ? (
        <div style={{ marginBlock: '2rem' }}>
          <Typography variant="h6" align="center">
            Times Available
          </Typography>
          <Box sx={containerStyle}>
            {timeSlots.map((slot) => (
              <AvailableTime
                key={slot.id}
                handleOpen={() => handleOpen(slot)}
              >{`${slot.start} ${slot.available.length} left`}</AvailableTime>
            ))}
          </Box>
        </div>
      ) : (
        <Typography variant="h6" align="center">
          No Times Available
        </Typography>
      )} */}
    </>
  );
}
