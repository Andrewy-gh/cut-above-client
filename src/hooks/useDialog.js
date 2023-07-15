import { useState } from 'react';

export function useDialog() {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState({});

  const handleSelectAndOpen = (data) => {
    setSelection(data);
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return {
    open,
    selection,
    handleOpen,
    handleSelectAndOpen,
    handleClose,
  };
}
