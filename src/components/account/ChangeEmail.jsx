import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAccount } from '../../hooks/useAccount';

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const { handleUserEmailChange } = useAccount();

  const handleNewEmailChange = (e) => {
    setError(false);
    setHelperText('');
    setNewEmail(e.target.value);
  };

  const handleConfirmNewEmailChange = (e) => {
    setError(false);
    setHelperText('');
    setConfirmNewEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (newEmail !== confirmNewEmail) {
        setError(true);
        setHelperText('Emails do not match');
        return;
      }
      setNewEmail((newEmail) => {
        const trimmedEmail = newEmail.trim();
        const lowercaseEmail = trimmedEmail.toLowerCase();
        return lowercaseEmail;
      });
      await handleUserEmailChange({ email: newEmail });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="New email"
        required
        fullWidth
        value={newEmail}
        onChange={handleNewEmailChange}
      ></TextField>
      <TextField
        label="Confirm new email"
        error={error}
        helperText={helperText}
        required
        fullWidth
        value={confirmNewEmail}
        onChange={handleConfirmNewEmailChange}
      ></TextField>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 3 }}>
        Change email
      </Button>
    </form>
  );
}
