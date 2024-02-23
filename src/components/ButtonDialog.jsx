import Button from '@mui/material/Button';
import CustomDialog from './CustomDialog';
import { theme } from '@/styles/styles';

const buttonStyle = {
  color: theme.palette.secondary.dark,
};

export default function ButtonDialog(props) {
  const {
    children,
    buttonText,
    open,
    handleClose,
    variant = 'contained',
    ...buttonProps
  } = props;
  return (
    <>
      <Button variant={variant} sx={buttonStyle} {...buttonProps}>
        {buttonText}
      </Button>
      <CustomDialog open={open} handleClose={handleClose}>
        {children}
      </CustomDialog>
    </>
  );
}
