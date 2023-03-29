import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NavBar = () => {
  const removeLinkStyle = {
    color: 'black',
    textDecoration: 'none',
    display: 'inline'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1em',
      paddingBottom: '1em',
      borderBottom: 'solid 1px black'
    }}
    >
      <Link to={'/'} style={removeLinkStyle} >
        <h1>ProductTracker</h1>
      </Link>
      <Button
        component={Link}
        to={'/product/new'}
        variant='contained'
        sx={{
          marginTop: '2em',
        }}
      >+ Add Product</Button>
    </div>
  );
}

export default NavBar;
