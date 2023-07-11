import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { services } from "../../data/data";

const ServiceCard = ({ service }) => {
  return (
    <Grid container sx={{ marginInline: "auto", mt: 4, mb: 4 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Grid
          item
          md={6}
          lg={7}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1, padding: 4 }}>
            <Typography gutterBottom component="h4" variant="h5" align="center">
              {service.name}
            </Typography>
            <Typography variant="body2" align="center">
              {service.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ marginInline: "auto", mb: 2 }}>
            <Link
              to="/bookings"
              //   onClick={() => dispatch(setService(service.name))}
            >
              <Button size="small" variant="contained">
                {`Schedule ${service.name}`}
              </Button>
            </Link>
          </CardActions>
        </Grid>
        <Grid item md={6} lg={5}>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "16 / 9",
            }}
            image={service.image}
            alt={service.name}
          />
        </Grid>
      </Card>
    </Grid>
  );
};

export default function Services() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        marginInline: "auto",
        paddingInline: "4rem",
      }}
    >
      <Typography component="h3" variant="h4" align="center" gutterBottom>
        Our Services
      </Typography>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
