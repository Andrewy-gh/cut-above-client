import { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { navigation } from '../../data/data';

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);
  // const handleLogout = async () => {
  //   try {
  //     // await logout();
  //     // dispatch(logoutUser());
  //     console.log('logging out...');
  //   } catch (error) {
  //     console.error('Error logging out: ', error);
  //   }
  // };
  const getList = () => (
    <div
      onClick={() => setOpen(false)}
      style={{
        height: '100vh',
        height: '100dvh',
        backgroundColor: theme.palette.primary.main,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <IconButton
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          mb: 2,
          paddingRight: 2,
        }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
      <div>
        {navigation.map((link) => (
          <Link
            to={link.path}
            key={link.id}
            style={{ fontFamily: 'Corben', fontWeight: 700 }}
          >
            <div>{link.name}</div>
          </Link>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 'clamp(200px, 60%, 300px)',
        }}
      >
        <img src="https://placehold.co/1600x900" alt="placeholder image" />
      </div>
    </div>
  );
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setOpen(true)}
        sx={{
          mr: 2,
          display: { sm: 'none' },
          color: theme.palette.secondary.dark,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </>
  );
}
