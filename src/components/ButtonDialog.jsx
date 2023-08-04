import Button from '@mui/material/Button';
import CustomDialog from './CustomDialog';

export default function ButtonDialog({
  children,
  buttonStyle,
  buttonText,
  fullWidth,
  open,
  handleOpen,
  handleClose,
  variant = 'contained',
}) {
  return (
    <>
      <Button
        variant={variant}
        onClick={handleOpen}
        fullWidth={fullWidth}
        sx={buttonStyle}
      >
        {buttonText}
      </Button>
      <CustomDialog open={open} handleClose={handleClose}>
        {children}
      </CustomDialog>
    </>
  );
}
