import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import RickandMorty from "../components/icons/RickandMortySvg";
import RickandMortyHeaderSvg from "../components/icons/RickandMortyHeaderSvg";

const pages = {
  'characters': { 'url': 'characters', 'color': 'red' },
  'Pricing': { 'url': 'pricing', 'color': 'blue' },
  'Blog': { 'url': 'Blog', 'color': 'green' }
}

function Header() {

  const history = useHistory();

  return <>
    <AppBar position="static" style={{ backgroundColor: '#202329' }}>
      <Container  >
        <Toolbar disableGutters>
          <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center" >
            <Grid item>
              <Link to='/'>
                <RickandMortyHeaderSvg sx={{ mr: 1 }} />
              </Link>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                {Object.keys(pages).map((page) => (
                  <Button
                    key={page}
                    onClick={() => history.push(pages[page].url)}
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                      //backgroundColor: pages[page].color
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

    <section id="section1" className="section1">
        <h1 className="tituloSection1">The Rick and Morty API</h1>
        <div className="fotoSection1">
          <RickandMorty
            style={{ fill: "#f5f5f5", width: "100%", height: "100%" }}
          />
        </div>
      </section>
      </>
}
export default Header;
