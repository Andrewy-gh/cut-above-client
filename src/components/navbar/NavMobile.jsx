import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import DrawerMenu from "./DrawerMenu";

export default function NavMobile() {
  return (
    <>
      <DrawerMenu />
      <Link to="/*">
        <Typography variant="h5">Cut Above</Typography>
      </Link>
    </>
  );
}
