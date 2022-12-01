import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import axios from "axios";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Chip from "@mui/material/Chip";

export function Character(props) {
    //console.log('Estamos en character y recibimos');
    //console.log(props);

    const history = useHistory();
    
    const { character } = props;

    const MiCard = styled(Card)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    const handleClick = () => {
        console.log(history);
        history.push(`/characters/${character.status.toLowerCase()}`);
    };


    return (
        <Grid item   key={character.id}>
            {/* <Personaje>xs=8</Personaje> */}
            <MiCard sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className="characterCardImg">
                        <img src={character.image} alt="characterCard__Img" />
                    </div>
                    <div className="characterCardContent">
                        <div className="section1CardContent">
                            <Typography variant="h5" component="div">
                                {character.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                <span className="status">
                                    <span className={"status__icon " + (character.status === "Alive" ? "vivo" : character.status === "Dead" ? "muerto" : "desconocido") } ></span>
                                    <Chip label={character.status} onClick={handleClick} />
                                </span>
                            </Typography>
                        </div>
                        <div className="section2CardContent"></div>
                        <div className="section3CardContent"></div>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </MiCard>
        </Grid>
    );
}

export default Character;
