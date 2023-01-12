import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Episode from "../components/Episode";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";


export function EpisodeDetail(props) {

    const history = useHistory();
    const [hasCalledAPI, sethasCalledAPI] = useState(false);
    const [episodes, setEpisodeList] = useState([]);
    const [page, setPage] = useState(1);
    const [nPages, setNPages] = useState(1);

    const { episode } = props;
    const { personajes } = props;


    useEffect(() => {
    }, [history.location.key]);


    const handlePageChange = (event, value) => {
        setPage(value);
        llamaApi(value);
    };

    const location = useLocation();

    const llamaApi = (apiPage) => {
        let episodeList = null;
        let url = `https://rickandmortyapi.com/api/episode/?page=${apiPage}`;

        axios
            .get(url)
            .then(function (response) {
                // handle success


                episodeList = response.data.results;

                console.log(episodeList);

                setEpisodeList([...episodeList]);



                console.log("location.pathname: " + location.pathname);


                var parts = location.pathname.split('/');
                var linkId = parts.pop() || parts.pop();

                console.log(linkId);


                // let linkId = [];

                // const splitted = location.pathname.split('/');
                // linkId.push(splitted[splitted.length]);

                // console.log("linkId: " + linkId);


                let characterIdList = []
                response.data.results[0].characters.map((character) => {
                    const splitted = character.split('/');
                    characterIdList.push(splitted[splitted.length - 1]);
                })

                console.log(characterIdList);

                console.log(response.data.results[linkId-1].characters);
                const personajes = response.data.results[linkId-1].characters;
                console.log(personajes);

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

    const MiCard = styled(Card)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    return (
        <section key={Episode.id}>
            <h1>Episode
           
            {personajes}
            </h1>
            
        </section>
    );
}

export default EpisodeDetail;