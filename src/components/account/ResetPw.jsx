import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNotification } from '../../hooks/useNotification';
import { useAccount } from '../../hooks/useAccount';

export default function ResetPw() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const { handleUserPasswordReset } = useAccount();

  let token = searchParams.get('token');
  const { handleError } = useNotification();

  useEffect(() => {
    console.log('lol! the token is ', token);
    fetch(`http://localhost:3001/api/user/validate-token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Token is valid') {
          setIsValidToken(true);
        } else {
          handleError(
            'Invalid or expired token. Please request a new password reset link.'
          );
        }
      })
      .catch((err) => {
        handleError('An error occurred.');
      });
  }, [token]);

  const handleNewPasswordChange = (e) => {
    setError(false);
    setHelperText('');
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setError(false);
    setHelperText('');
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        setError(true);
        setHelperText('Passwords do not match');
        return;
      }
      const passwordChanged = await handleUserPasswordReset({
        token,
        newPassword,
      });
      if (passwordChanged) {
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isValidToken) {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          required
          fullWidth
          value={newPassword}
          onChange={handleNewPasswordChange}
          sx={{ marginBlock: '.5rem' }}
        ></TextField>
        <TextField
          label="Confirm new Password"
          type="password"
          error={error}
          helperText={helperText}
          required
          fullWidth
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
          sx={{ marginBlock: '.5rem' }}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 3 }}
        >
          Change Password
        </Button>
      </form>
    );
  }
  return <div>Incorrect token</div>;
}
