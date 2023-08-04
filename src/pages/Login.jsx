import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuth } from '../hooks/useAuth';
import Overlay from '../components/Overlay';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleLogin(email, password);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Overlay>
      <div style={{ width: 'min(40ch, 100% - 2rem)', marginInline: 'auto' }}>
        <h3 style={{ textAlign: 'center' }}>Log in</h3>
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Login
          </Button>
        </form>
      </div>
    </Overlay>
  );
}
