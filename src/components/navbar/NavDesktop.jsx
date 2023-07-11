import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NavDesktop() {
  return (
    <div>
      <div>
        <Link to="/bookings">
          <Button variant="contained">Book now</Button>
        </Link>
      </div>
      <div>
        <Link to="/">
          <Typography variant="h5">Cut Above</Typography>
        </Link>
      </div>
      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
    </div>
  );
}
