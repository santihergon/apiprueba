import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import Character from "../components/Character";
import Search from "../layout/Search";

/*
0. investiga como mandar parametros con rrd v5
1. imprimir el parametro live_status
2. si el parametro live_status es uno de los 3 que deberia ser, llamo a la api filtrando por eso
3. si no es ninguno de los 3, hago un redirect a home o  a characters
4. actualizo los botones para que me lleven a characters/alive characters/dead y characters/unknown
*/
const validLiveStatus = ['alive', 'dead', 'unknown']

export function CharacterList() {
  const history = useHistory()
  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [characters, setCharacters] = useState([]);
  // const [episodes, setEpisodes] = useState([]);
  const [showElement, setShowElement] = useState("character");
  const [statusFilter, setStatusFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [dead, setDead] = useState(false);

  const [search, setSearch] = useState("");
  const [fetchedData, updateFetchedData] = useState([]);

  useEffect(() => {
    // Business logic to run when eleId updates
  }, [history.location.key]);

  const { live_status } = useParams();

  const handlePageChange = (event, value) => {
    setPage(value);
    llamaApi(value);
  };
  const handleChange = (event, newShowElement) => {
    setShowElement(newShowElement);
  };

  const llamaApi = (apiPage) => {
    // let characterList = JSON.parse(localStorage.getItem("characterList"));
    // let episodeList = JSON.parse(localStorage.getItem("episodeList"));

    let characterList = null;
    let url = `https://rickandmortyapi.com/api/character/?page=${apiPage}&name=${search}`;

    if (validLiveStatus.includes(live_status)) {
      url += `&status=${live_status}`
    } else {
      history.push('/')
    }

    console.log('la url es: ')
    console.log(url)


    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(JSON.stringify(response));
        console.log(JSON.stringify(response.data.info.pages));

        console.log('==========================')
        setNPages(response.data.info.pages)
        console.log(response.data.results);
        characterList = response.data.results;
        setCharacters([...characterList]);
        console.log('==========================')
        console.log('==========================')
        console.log('==========================')
        console.log('==========================')
        console.log('==========================')

        //localStorage.setItem("characterList", JSON.stringify(characterList));
        //localStorage.setItem("name", JSON.stringify(characterList[0].name));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


    // axios.get("https://rickandmortyapi.com/api/episode")
    //   .then(function (response) {
    //     // handle success
    //     console.log(JSON.stringify(response));
    //     episodeList = (response.data.results);

    //     localStorage.setItem("episodeList", JSON.stringify(episodeList));
    //     localStorage.setItem("nameEpisode", JSON.stringify(episodeList[0].name));

    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });


    // setEpisodes(episodeList);

    // setCharacters(prevProducts => ([...prevProducts, []]));

    //let nameCharacter = JSON.parse(localStorage.getItem("nameCharacter"));
    //console.log("nameCharacter: " + nameCharacter);

    let nameEpisode = JSON.parse(localStorage.getItem("nameEpisode"));
    //console.log("nameEpisode: " + nameEpisode);
  };

  useEffect(() => {
    console.log("Estamos en useEfect");

    if (!hasCalledAPI) {
      sethasCalledAPI(true);
      llamaApi(1);
    }
  }, [characters, hasCalledAPI, history.location.key]);

  const MiCard = styled(Card)(({ theme }) => ({
    backgroundColor: "#3c3e44",
    color: "#f5f5f5",
  }));

  return (
    //Esto de la key que es?
    <section className="showcase" key={history.location.key}>

      <Search setSearch={setSearch} search={search} setNPages={setNPages} sethasCalledAPI={sethasCalledAPI}/>

      <Grid container //Contenedor Padre
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ px: '2em' }} //Pading a los lados del Grid
        spacing={4}>
        {/* {showElement === "episode" &&
          episodes !== null &&
          episodes.map((episode) => (
            <div key={episode.id}>
              <MiCard >
                <CardContent>
                  <div className="characterCardContent">
                    <div className="section1CardContent">
                      <Typography variant="h5" component="div">
                        {episode.name}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </MiCard>
            </div>
          ))} */}

        {showElement === "character" &&
          characters !== null &&
          characters.map((character) => (
            <Character character={character} key={character.id} />
          ))}
      </Grid>
      <Stack spacing={2} className="paginacion">
        <div className="tituloPaginacion">Page: {page}</div>
        <Pagination className="elementospaginacion" count={nPages} page={page} onChange={handlePageChange} />
      </Stack>
    </section>
  );
}

export default CharacterList;