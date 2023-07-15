import CustomDialog from '../CustomDialog';
import BookingDialogContent from './BookingDialogContent';
import { useEmployeeSelection } from '../../hooks/useEmployeeSelection';
import EmployeeAccordion from './EmployeeAccordion';
import EmployeeRadio from './EmployeeRadio';
import EmployeeEdit from './EmployeeEdit';

export default function BookingDialog({
  open,
  selection,
  handleAgree,
  handleClose,
}) {
  const { employee, handleEmployeeChange } = useEmployeeSelection();
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
        employeeId={employee}
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
      >
        {employeeOptions}
      </BookingDialogContent>
    </CustomDialog>
  );
}
