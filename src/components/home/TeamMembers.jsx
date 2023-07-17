import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MemberCard = ({ employee }) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ marginInline: "auto" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={employee.image}
          alt={employee.firstName}
          sx={{
            aspectRatio: "9 / 16",
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom component="h4" variant="h5" align="center">
            {employee.firstName}
          </Typography>
          <Typography variant="body2" align="center">
            {employee.profile}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginInline: "auto", mb: 2 }}>
          <Link
            to="/bookings"
            // state={{ employee: employee.id }}
            //   onClick={() => dispatch(setEmployee(employeeId))}
          >
            <Button
              size="small"
              variant="contained"
            >{`Book with ${employee.firstName}`}</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default function TeamMembers({ employees }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        marginInline: "auto",
        paddingInline: "4rem",
      }}
    >
      <Typography component="h3" variant="h4" align="center" gutterBottom>
        Our Team
      </Typography>
      <Grid container spacing={4}>
        {employees.map((employee) => (
          <MemberCard key={employee.id} employee={employee} />
        ))}
      </Grid>
    </div>
  );
}
