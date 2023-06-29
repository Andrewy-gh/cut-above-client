import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
    } catch (error) {
      console.error(error);
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
