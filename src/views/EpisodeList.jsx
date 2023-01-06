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
        console.log('**Llama Api Episodes**')

        console.log("⬇ response.data.results ⬇");
        console.log(response.data.results);

        setNPages(response.data.info.pages)

        episodeList = response.data.results;
        setEpisodeList([...episodeList]);

        console.log('FIN console.log Episodes**')

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
      <Container>
        <Grid container spacing={2}>
          {showElement === "character" &&
            episodes !== null &&
            episodes.map((episode) => (
              <Episode episode={episode} key={episode.id} />
            ))}
        </Grid>
        <Stack spacing={2} className="paginacion">
          <div className="tituloPaginacion">Page: {page}</div>
          <Pagination className="Elementospaginacion" count={nPages} page={page} onChange={handlePageChange} />
        </Stack>
      </Container>
    </section>
  );
}

export default EpisodeList;