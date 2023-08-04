import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { theme } from '../styles/styles';
// import logoSide from '../assets/cover-logo-side.png';

const Copyright = () => {
  return (
    <p style={{ fontSize: '14px', fontWeight: '500' }}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </p>
    // <Typography variant="body2" color="text.secondary">
    //   {'Copyright © '}
    //   {new Date().getFullYear()}
    //   {'.'}
    // </Typography>
  );
};

export default function Footer() {
  return (
    <footer
      style={{
        padding: '.75rem .75rem',
        margintTop: '2rem',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Copyright />
        <div>Image placeholder</div>
        {/* <CardMedia
          component="img"
          sx={{
            width: 'clamp(100px, 40%, 200px)',
          }}
          image={logoSide}
          alt="logo"
        /> */}
      </div>
    </footer>
  );
}
