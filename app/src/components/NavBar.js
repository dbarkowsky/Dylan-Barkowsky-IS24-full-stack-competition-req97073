import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const NavBar = () => {
  const removeLinkStyle = {
    color: 'black',
    textDecoration: 'none',
    display: 'inline'
  };
  return (
    <Grid container style={{
      borderBottom: 'solid black 1px',
      justifyContent: 'space-between'
    }}>
      <Grid xs="auto">
        <Link to={'/'} style={removeLinkStyle} >
          <h1>ProductTracker</h1>
        </Link>
      </Grid>
      <Grid xs="auto"></Grid>
      <Grid xs={3} alignSelf={'right'}
        sx={{
          display: 'grid',
          alignItems: 'end',
          textAlign: 'end'
        }}>
        <Button
          component={Link}
          to={'/product/new'}
          variant='outlined'
          sx={{
            marginBottom: '1em',
            width: '200px'
          }}
        >+ Add Product</Button>
      </Grid>
    </Grid >
  );
}

export default NavBar;