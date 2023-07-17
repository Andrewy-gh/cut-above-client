import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      console.log('login result: ', loggedInUser);
      if (loggedInUser.success) {
        dispatch(
          setCredentials({
            user: loggedInUser.user,
            role: loggedInUser.role,
            token: loggedInUser.token,
          })
        );
        navigate('/account');
      }
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
        Login
      </Button>
    </form>
  );
}
