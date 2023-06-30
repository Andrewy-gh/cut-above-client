import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLoginMutation } from '../features/auth/authApiSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login({
        email: email.toLowerCase(),
        password,
      }).unwrap();
      if (loggedInUser.success) console.log('User successfully logged in');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        required
        fullWidth
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      ></TextField>
      <TextField
        error={error}
        label="Password"
        type="password"
        required
        fullWidth
        margin="normal"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      ></TextField>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 3 }}>
        Register
      </Button>
    </form>
  );
}
