import { useHistory, Link, NavLink, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import RickandMortyHeaderSvg from "../components/icons/RickandMortyHeaderSvg";


// const pages = {
//   'Characters': { 'url': '/characters/' },
//   'Locations': { 'url': '/locations/' },
//   'Episodes': { 'url': '/episodes/' }
// }

function Header() {

  const history = useHistory();

  // console.log(history);
  const { pathname } = useLocation();

  return <AppBar position="static" style={{ backgroundColor: 'var(--dark)' }}>
    <Container className='header'>
      <Toolbar disableGutters>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center" >
          <Grid className="hoverable" item onClick={() => window.location = '/'}>
            <RickandMortyHeaderSvg sx={{ mr: 1 }} />
          </Grid>
          <Grid item>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                {/* <NavLink to="/about">About</NavLink> */}
                <NavLink
                  to='/characters/'
                  isActive={ () => ['/characters/', '/'].includes(pathname) }
                  className="btnHeader"
                // onClick={() => history.push(pages[page].url)} //onClick se usa cuando en vez de ser Link es Button por ejemplo 
                // style={{ margin: 2, color: 'white', display: 'block' }}
                >
                  Characters
                </NavLink>
                <NavLink to='/locations/'className="btnHeader">
                Locations
                </NavLink>
                <NavLink to='/episodes/' className="btnHeader">
                Episodes
                </NavLink>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  </AppBar>
}
export default Header;
