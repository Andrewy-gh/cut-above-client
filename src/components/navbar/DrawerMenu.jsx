import { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../hooks/useAuth';
import { navigation } from '../../data/data';
import { renderLink } from '../../utils/navigation';
import { theme } from '../../styles/styles';

export default function DrawerMenu() {
  const { role, token, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div
      onClick={() => setOpen(false)}
      style={{
        height: '100vh',
        height: '100dvh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <div>
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
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.75rem',
        }}
      >
        {navigation.map((link) =>
          renderLink(link, token, role) ? (
            <div
              key={link.id}
              style={{ fontFamily: 'Corben', fontWeight: 700 }}
            >
              <Link to={link.path}>{link.name}</Link>
            </div>
          ) : null
        )}
        {token && (
          <div
            onClick={handleLogout}
            style={{ fontFamily: 'Corben', fontWeight: 700, cursor: 'pointer' }}
          >
            Logout
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // width: "clamp(200px, 60%, 300px)",
          height: '30px',
          width: '30px',
        }}
      >
        <img src="https://placehold.co/1600x900" alt="placeholder image" />
      </div>
    </div>
  );
  return (
    <>
      <IconButton
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
