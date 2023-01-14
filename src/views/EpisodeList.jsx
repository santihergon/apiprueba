import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Episode from "../components/Episode";


export function EpisodeList() {
  const history = useHistory();
  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [episodes, setEpisodeList] = useState([]);
  const [showElement, setShowElement] = useState("character");
  const [page, setPage] = useState(1);
  const [nPages, setNPages] = useState(1);


  useEffect(() => {
  }, [history.location.key]);


  const handlePageChange = (event, value) => {
    setPage(value);
    llamaApi(value);
  };

  const llamaApi = (apiPage) => {
    let episodeList = null;
    let url = `https://rickandmortyapi.com/api/episode/?page=${apiPage}`;

    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log('**Llama Api Episodes**');

        console.log("⬇ response.data.results ⬇");
        console.log(response.data.results);

        setNPages(response.data.info.pages)

        episodeList = response.data.results;
        setEpisodeList([...episodeList]);

        console.log("**********************************************")
        console.log(response.data.results)
        console.log(response.data.results[0])

        // let characterIdList = []
        // response.data.results[0].characters.map((character) => {
        //   const splitted = character.split('/')
        //   characterIdList.push(splitted[splitted.length - 1])
        // })

        // console.log(characterIdList)

        console.log('FIN console.log Episodes**');

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
    <section className="showcase">
      {/* <Grid container spacing={2} sx={{
        px: '1%',
        '@media screen and (max-width: 64em)': { px: '10px' }
      }}> */}
      <Grid container className='GridContainer' sx={{ px: '3.5%', py: '10px', //Contenedor Padre
        '@media screen and (max-width: 1536px)': { px: '5%' },
        '@media screen and (max-width: 1200px)': { px: '5%' },
        '@media screen and (max-width: 900px)': { px: '5%' },
        '@media screen and (max-width: 600px)': { px: '8%' },
      }}
      >
        {showElement === "character" &&
          episodes !== null &&
          episodes.map((episode) => (
            <Episode episode={episode} key={episode.id} />
          ))}
      </Grid>
      <Stack spacing={2} className="paginacion">
        <div className="tituloPaginacion">Page: {page}</div>
        {/* <Pagination className="Elementospaginacion" count={nPages} page={page} onChange={handlePageChange} /> */}
        <Pagination className="elementospaginacion largePagination" count={nPages} page={page} onChange={handlePageChange} />
        <Pagination className="elementospaginacion shortPagination" siblingCount={0} count={nPages} page={page} onChange={handlePageChange} />
      </Stack>
    </section>
  );
}

export default EpisodeList;