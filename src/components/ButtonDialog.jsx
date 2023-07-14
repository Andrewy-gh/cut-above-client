import Button from '@mui/material/Button';
import CustomDialog from './CustomDialog';

export default function ButtonDialog({
  children,
  buttonStyle,
  variant = 'contained',
  buttonText,
  handleOpen,
  handleClose,
  open,
}) {
  return (
    <>
      <Button variant={variant} onClick={handleOpen} sx={buttonStyle}>
        {buttonText}
      </Button>
      <CustomDialog open={open} handleClose={handleClose}>
        {children}
      </CustomDialog>
    </>
  );
}
