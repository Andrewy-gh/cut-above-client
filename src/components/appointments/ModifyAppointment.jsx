import ButtonDialog from '../ButtonDialog';
import CustomDialogContent from '../CustomDialogContent';
import { useAppointment } from '../../hooks/useAppointment';
import { useDialog } from '../../hooks/useDialog';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';

const dialog = (appt, employee) => {
  return {
    button: 'Modify',
    title: `Are you sure you want to modify your ${appt.service}?`,
    content: `With ${employee.firstName} on ${appt.date} at ${appt.start}?`,
  };
};

export default function ModifyAppointment({ appt }) {
  const { open, handleOpen, handleClose } = useDialog();
  const { employee } = useEmployeesQuery(appt.employee);
  const { handleModify } = useAppointment();

  if (!employee) return <div>Loading...</div>;

  const dialogProps = dialog(appt, employee);

  return (
    <ButtonDialog
      buttonText={dialogProps.button}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
    >
      <CustomDialogContent
        dialog={dialogProps}
        handleAgree={() => handleModify(appt.id)}
        handleClose={handleClose}
      />
    </ButtonDialog>
  );
}
