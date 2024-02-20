import ButtonDialog from '@/components/ButtonDialog';
import CustomDialogContent from '@/components/CustomDialogContent';
import { useAppointment } from '@/hooks/useAppointment';
import { useDialog } from '@/hooks/useDialog';
import { theme } from '@/styles/styles';
import PropTypes from 'prop-types';

const dialog = (appointment) => {
  return {
    button: 'Cancel',
    title: `Are you sure you want to cancel your ${appointment.service}?`,
    content: `With ${appointment.employee.firstName} on ${appointment.date} at ${appointment.start}?`,
  };
};

const buttonStyle = {
  color: theme.palette.secondary.dark,
};

export default function CancelAppointment({ appointment }) {
  const { open, handleOpen, handleClose } = useDialog();
  const { handleCancel } = useAppointment();

  const dialogProps = dialog(appointment);

  return (
    <ButtonDialog
      buttonText={dialogProps.button}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      color={'error'}
      buttonStyle={buttonStyle}
    >
      <CustomDialogContent
        dialog={dialogProps}
        handleAgree={() => handleCancel(appointment.id)}
        handleClose={handleClose}
      />
    </ButtonDialog>
  );
}

CancelAppointment.propTypes = {
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
