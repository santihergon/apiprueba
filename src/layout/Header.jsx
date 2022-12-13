import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import RickandMortyHeaderSvg from "../components/icons/RickandMortyHeaderSvg";

const pages = {
  'Characters': { 'url': 'characters' },
  'Locations': { 'url': 'locations' },
  'Episodes': { 'url': 'episodes' }
}

function Header() {

  const history = useHistory();

  return <AppBar position="static" style={{ backgroundColor: '#202329'}}>
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
              {Object.keys(pages).map((page) => (
                <Button
                  className="btnHeader"
                  key={page}
                  onClick={() => history.push(pages[page].url)}
                  sx={{
                    my: 2, color: 'white', display: 'block'
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  </AppBar>
}
export default Header;
