import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Location from "../components/Location";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import Character from "../components/Character";


export function LocationDetail(props) {

    const history = useHistory();
    const [hasCalledAPI, sethasCalledAPI] = useState(false);
    const [locations, setlocationList] = useState([]);

    const { id: locationId } = useParams();
    const locationIdInt = parseInt(locationId);

    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
    }, [history.location.key]);

    const location = useLocation();

    const axiosGetResidents = (residentIdList) => {
        let listaPersonajes = null;
        let url = `https://rickandmortyapi.com/api/character/${residentIdList}`;
        axios
            .get(url)
            .then(function (response) {
                console.log(response.data);
                listaPersonajes = response.data;
                setPersonajes([...listaPersonajes]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    const llamaApi = () => {
        let locationList = null;
        let url = `https://rickandmortyapi.com/api/location/${locationIdInt}`;

        axios
            .get(url)
            .then(function (response) {
                console.log("*********************")
                console.log(response.data)
                console.log(response.data.results)
                // handle success

                locationList = response.data.results;

                console.log(locationList);
                console.log("location.pathname: " + location.pathname);
                console.log(locationIdInt);

                let residentIdList = []

                response.data.residents.map((resident) => {
                    // console.log("Estamos en mapper de resident: "+resident)
                    const splitted = resident.split('/');
                    residentIdList.push(splitted[splitted.length - 1]);
                })

                console.log(residentIdList);
                axiosGetResidents(residentIdList);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        console.log("Estamos en useEfect");
        if (!hasCalledAPI) {
            sethasCalledAPI(true);
            llamaApi(1);
        }
        console.log('FIN useEfect**')

    }, [locations, hasCalledAPI, history.location.key]);

    return (
        <section className="showcase" key={history.location.key}>
            {personajes !== null &&
                <div> {/* Creo este div para después poder mostrar el mensaje de no se han encontrado caracteres */}
                    <Grid container className='GridContainer' sx={{
                        px: '1%', py: '10px',
                        '@media screen and (max-width: 64em)': { px: '10px' }
                    }}//Contenedor Padre
                    >
                        {personajes.map((character) => (
                            <Character character={character} key={character.id} />
                        ))}
                    </Grid>
                </div>}
        </section>
    );
}

export default LocationDetail;