import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams , useHistory} from "react-router-dom";

import "../App.css";
import { StyledEngineProvider } from '@mui/material/styles';
//import Header from "../layout/Header";
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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Chip from "@mui/material/Chip";

import RickandMorty from "../components/icons/RickandMortySvg";
import Character from "../components/Character";

/* 
0. investiga como mandar parametros con rrd v5
1. imprimir el parametro live_status
2. si el parametro live_status es uno de los 3 que deberia ser, llamo a la api filtrando por eso
3. si no es ninguno de los 3, hago un redirect a home o  a characters
4. actualizo los botones para que me lleven a characters/alive characters/dead y characters/unknown
*/
const validLiveStatus = ['alive','dead','unknown']

export function CharacterList() {
  const history = useHistory()
  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [showElement, setShowElement] = useState("character");
  const [statusFilter, setStatusFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    // Business logic to run when eleId updates
  }, [history.location.key]);

  const { live_status } = useParams();
  console.log(history.location.key);

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
    let url = `https://rickandmortyapi.com/api/character/?page=${apiPage}`;
    
    if(validLiveStatus.includes(live_status)){
      url += `&status=${live_status}`
    }else{
      history.push('/')
    }
    
    console.log('la url es: ')
    console.log(url)

    // if (url+"alive") {

    //   axios.get(url)

    //     .then(function (response) {
    //       // handle success
    //       console.log(JSON.stringify(response));
    //       characterList = (response.data.results);
    //       setCharacters(characterList);

    //       setNPages(response.data.info.pages) 
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });

    // }if (url+"dead") {

    //   axios.get(`https://rickandmortyapi.com/api/character/?page=${apiPage}&status=dead`)

    //     .then(function (response) {
    //       // handle success
    //       console.log(JSON.stringify(response));
    //       characterList = (response.data.results);
    //       setCharacters(characterList);

    //       setNPages(response.data.info.pages) 
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });

    // }



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

    /*
      axios.get("https://rickandmortyapi.com/api/episode")

        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response));
          episodeList = (response.data.results);

          localStorage.setItem("episodeList", JSON.stringify(episodeList));
          localStorage.setItem("nameEpisode", JSON.stringify(episodeList[0].name));

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

        */


    //setEpisodes(episodeList);

    // setCharacters(prevProducts => ([...prevProducts, []]));

    //let nameCharacter = JSON.parse(localStorage.getItem("nameCharacter"));
    //console.log("nameCharacter: " + nameCharacter);

    //let nameEpisode = JSON.parse(localStorage.getItem("nameEpisode"));
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

  // const Personaje = () => {
  //   return <strong>prueba</strong>;
  // };

  return (
    <main key={history.location.key}>
      <section id="section2" className="section2">
        <ToggleButtonGroup
          color="primary"
          value={showElement}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="character" className="btnEposideSection2">
            Characters
          </ToggleButton>
          <ToggleButton value="episode" className="btnEposideSection2">
            Episodes
          </ToggleButton>
          <ToggleButton value="ios" className="btnEposideSection2">
            iOS
          </ToggleButton>
        </ToggleButtonGroup>
      </section>

      <section id="section3" className="section3">
        <Container>
          <Grid container spacing={2} >
            {showElement === "episode" &&
              episodes !== null &&
              episodes.map((episode) => (
                <Grid item spacing={{ xs: 2, md: 2 }} key={episode.id}>
                  {/* <Personaje>xs=8</Personaje> */}
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
                </Grid>
              ))}
          </Grid>
        </Container>

        <Container>
          <Grid container spacing={2}>
            {showElement === "character" &&
              characters !== null &&
              characters.map((character) => (
                <Character character={character} key={character.id} />
              ))}
          </Grid>
          <Stack spacing={2} style={{ backgroundColor: "white" }}>
            <Typography>Page: {page}</Typography>
            <Pagination count={nPages} page={page} onChange={handlePageChange} />
          </Stack>
        </Container>
      </section>
    </main>
  );
}

export default CharacterList;
