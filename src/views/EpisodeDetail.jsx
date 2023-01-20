import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Episode from "../components/Episode";
import Character from "../components/Character";


export function EpisodeDetail(props) {

    const history = useHistory();
    const [hasCalledAPI, sethasCalledAPI] = useState(false);
    const [episodes, setEpisodeList] = useState([]);
    const [page, setPage] = useState(1);

    const { episode } = props;

    const { id: episodeId } = useParams();
    const episodeIdInt = parseInt(episodeId);

    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
    }, [history.location.key]);


    const handlePageChange = (event, value) => {
        setPage(value);
        llamaApi(value);
    };

    const location = useLocation();

    const axiosGetCharacters = (characterIdList) => {
        let listaPersonajes = null;
        let url = `https://rickandmortyapi.com/api/character/${characterIdList}`;
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
        let episodeList = null;
        let url = `https://rickandmortyapi.com/api/episode/${episodeIdInt}`;

        axios
            .get(url)
            .then(function (response) {
                console.log("*********************")
                console.log(response.data)
                console.log(response.data.results)
                // handle success

                episodeList = response.data.results;

                console.log(episodeList);

                //setEpisodeList([...episodeList]);

                console.log("location.pathname: " + location.pathname);

                // var parts = location.pathname.split('/');
                // var linkId = parts.pop() || parts.pop();

                console.log(episodeIdInt);

                // let linkId = [];

                // const splitted = location.pathname.split('/');
                // linkId.push(splitted[splitted.length]);

                // console.log("linkId: " + linkId);

                let characterIdList = []

                // const mimapper = (character) =>{
                //     console.log("Estamos en mapper de character: "+character)
                //     //const splitted = character.split('/');
                //     //characterIdList.push(splitted[splitted.length - 1]);
                // }
                // response.data.characters.map(mimapper)

                // response.data.characters.map((character) => mimapper(character))


                // function mifunc(character){
                //     console.log("Estamos en mapper de character: "+character)
                //     //const splitted = character.split('/');
                //     //characterIdList.push(splitted[splitted.length - 1]);
                // }
                // response.data.characters.map(mifunc)

                response.data.characters.map((character) => {
                    // console.log("Estamos en mapper de character: "+character)
                    const splitted = character.split('/');
                    characterIdList.push(splitted[splitted.length - 1]);
                })
                console.log(characterIdList);
                axiosGetCharacters(characterIdList);

                // console.log(response.data.results[linkId-1].characters);
                // const personajes = response.data.results[linkId-1].characters;
                // console.log(personajes);

                //console.log(response.data.results[episodeIdInt-1].characters);
                //const personajes = response.data.results[episodeIdInt-1].characters;

                // console.log(personajes);

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

    }, [episodes, hasCalledAPI, history.location.key]);

    return (
        <section className="showcase" key={history.location.key}>
            {personajes !== null &&
                <div>
                    <Grid container className='GridContainer' sx={{
                        px: '3.5%', py: '10px', //Contenedor Padre
                        '@media screen and (max-width: 1536px)': { px: '5%' },
                        '@media screen and (max-width: 1200px)': { px: '5%' },
                        '@media screen and (max-width: 900px)': { px: '5%' },
                        '@media screen and (max-width: 600px)': { px: '8%' },
                    }}
                    >
                        {personajes.map((character) => (
                            <Character character={character} key={character.id} />
                        ))}
                    </Grid>
                </div>}
        </section>
    );
}

export default EpisodeDetail;