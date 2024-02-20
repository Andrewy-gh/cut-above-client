import ButtonDialog from '../../ButtonDialog';
import CustomDialogContent from '../../CustomDialogContent';
import { useAppointment } from '@/hooks/useAppointment';
import { useDialog } from '@/hooks/useDialog';
import PropTypes from 'prop-types';

const dialog = (appointment) => {
  return {
    button: 'Modify',
    title: `Are you sure you want to modify your ${appointment.service}?`,
    content: `With ${appointment.employee.firstName} on ${appointment.date} at ${appointment.start}?`,
  };
};

export default function ModifyAppointment({ appointment }) {
  const { open, handleOpen, handleClose } = useDialog();
  const { handleBeginRescheduling } = useAppointment();

  const dialogProps = dialog(appointment);

  return (
    <ButtonDialog
      buttonText={dialogProps.button}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
    >
      <CustomDialogContent
        dialog={dialogProps}
        handleAgree={() => handleBeginRescheduling(appointment.id)}
        handleClose={handleClose}
      />
    </ButtonDialog>
  );
}

ModifyAppointment.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    employee: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
    start: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
  }),
};
