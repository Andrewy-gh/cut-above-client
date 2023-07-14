import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonDialog from '../ButtonDialog';
import BookingDialog from './BookingDialog';
import EmployeeAccordion from '../employee/EmployeeAccordion';
import EmployeeRadio from '../employee/EmployeeRadio';
import { useDispatch, useSelector } from 'react-redux';
import { chooseEmployeePref, selectEmployee } from '../../features/filterSlice';

// Enabled horizontal scrolling on small screens
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '2rem 0',
  padding: { sm: '0 1rem', md: '0' },
  overflowX: 'scroll',
  overflow: { md: 'visible' },
  flexWrap: { md: 'wrap' },
  justifyContent: { md: 'center' },
};

const TimeSlot = ({ children, handleOpen }) => {
  // const dispatch = useDispatch();
  // const employeePref = useSelector(selectEmployee);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   if (employeePref === 'any') dispatch(chooseEmployeePref(slot.available));
  //   setOpen(true);
  // };
  // const handleClose = () => setOpen(false);
  // const handleBooking = () => {
  //   const { start, end } = slot;
  //   handleAgree({ start, end });
  // };
  return (
    <Button variant="contained" onClick={handleOpen}>
      {children}
    </Button>
  );
};

export default function TimeSlots({ timeSlots, openDialog }) {
  const handleOpen = (data) => openDialog(data);
  return (
    <>
      {timeSlots.length > 0 ? (
        <div style={{ marginBlock: '2rem' }}>
          <Typography variant="h6" align="center">
            Times Available
          </Typography>
          <Box sx={containerStyle}>
            {timeSlots.map((slot) => (
              <TimeSlot
                key={slot.id}
                handleOpen={() => handleOpen(slot)}
              >{`${slot.start} ${slot.available.length} left`}</TimeSlot>
              // <TimeSlot slot={slot} key={slot.id} handleAgree={handleAgree} />
            ))}
          </Box>
        </div>
      ) : (
        <Typography variant="h6" align="center">
          No Times Available
        </Typography>
      )}
    </>
  );
}

// const TimeSlot = ({ slot, handleAgree }) => {
//   const dispatch = useDispatch();
//   const employeePref = useSelector(selectEmployee);
//   console.log(employeePref);
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     if (employeePref === 'any') dispatch(chooseEmployeePref(slot.available));
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);
//   const handleBooking = () => {
//     const { start, end } = slot;
//     handleAgree({ start, end });
//   };
//   return (
//     <Box>
//       <ButtonDialog
//         buttonText={`${slot.start} ${slot.available.length} left`}
//         open={open}
//         handleClose={handleClose}
//         handleOpen={handleOpen}
//       >
//         <BookingDialog handleAgree={handleBooking} handleClose={handleClose}>
//           {employeePref === 'any' && (
//             <EmployeeAccordion>
//               <EmployeeRadio employees={slot.available} />
//             </EmployeeAccordion>
//           )}
//         </BookingDialog>
//       </ButtonDialog>
//     </Box>
//   );
// };
