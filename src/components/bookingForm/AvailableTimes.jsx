import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formatTimeAlt } from '../../utils/date';

const containerStyle = {};

const AvailableTime = ({ children, handleOpen }) => {
  return (
    <Button variant="contained" onClick={handleOpen}>
      {children}
    </Button>
  );
};

export default function AvailableTimes({ timeSlots, openDialog }) {
  const handleOpen = (data) => openDialog(data);

  let content;
  if (timeSlots.length > 0) {
    content = (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowX: 'scroll',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {timeSlots.map((slot) => {
          const startTime = formatTimeAlt(slot.start);
          return (
            <AvailableTime
              key={slot.id}
              handleOpen={() => handleOpen(slot)}
            >{`${startTime} ${slot.available.length} left`}</AvailableTime>
          );
        })}
      </div>
    );
  } else {
    content = (
      <Typography variant="h6" align="center">
        No Times Available
      </Typography>
    );
  }

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      {content}
    </div>
  );
}
