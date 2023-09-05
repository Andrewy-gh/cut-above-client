import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

export default function ResetPw() {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false);
  console.log('====================================');
  console.log(token);
  console.log('====================================');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    // Validate the token when the component mounts
    // fetch(`/api/validate-token/${token}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.message === 'Token is valid') {
    //       setIsValidToken(true);
    //     } else {
    //       setMessage(
    //         'Invalid or expired token. Please request a new password reset link.'
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     setMessage('An error occurred.');
    //   });
    setIsValidToken(true);
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
      const passwordChanged = await handleUserPasswordChange({
        password: newPassword,
      });
      if (passwordChanged) {
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (token) {
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
