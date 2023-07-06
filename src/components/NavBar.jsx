import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
export default function NavBar() {
  return (
    <AppBar
      component="nav"
      position="relative"
      sx={{ backgroundColor: 'grey' }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}
      >
        <Link to="/">Home</Link>
        <Link to="/signup">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/account">Account</Link>
      </Toolbar>
    </AppBar>
  );
}
