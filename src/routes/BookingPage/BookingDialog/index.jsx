import DialogContent from '@mui/material/DialogContent';
import CustomDialog from '../../../components/CustomDialog';
import BookingDialogContent from '../BookingDialogContent';
import { useFilter } from '@/hooks/useFilter';
import EmployeeAccordion from '../EmployeeAccordion';
import EmployeeRadio from '../EmployeeRadio';
import EmployeeEdit from '../EmployeeEdit';

export default function BookingDialog({
  open,
  selection,
  handleAgree,
  handleClose,
  user,
}) {
  const { employee, handleEmployeeChange } = useFilter();
  let employeeOptions;
  if (employee === 'any') {
    employeeOptions = (
      <EmployeeAccordion>
        <EmployeeRadio employees={selection.available} />
      </EmployeeAccordion>
    );
  } else {
    employeeOptions = (
      <EmployeeEdit
        employee={employee}
        handleClick={() => handleEmployeeChange('any')}
      />
    );
  }
  return (
    <CustomDialog open={open}>
      <BookingDialogContent
        selection={selection}
        handleAgree={handleAgree}
        handleClose={handleClose}
        user={user}
      >
        <DialogContent>{employeeOptions}</DialogContent>
      </BookingDialogContent>
    </CustomDialog>
  );
}
