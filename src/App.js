import { useState, useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RickandMorty from "./RickandMorty";

function App() {

  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [showElement, setShowElement] = useState("character");

  const handleChange = (event, newShowElement) => {
    setShowElement(newShowElement);
  };


  const llamaApi = () => {

    let characterList = JSON.parse(localStorage.getItem("characterList"));
    let episodeList = JSON.parse(localStorage.getItem("episodeList"));

    if (!characterList) {
      axios.get("https://rickandmortyapi.com/api/character")

        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response));
          characterList = (response.data.results);

          localStorage.setItem("characterList", JSON.stringify(characterList));
          localStorage.setItem("name", JSON.stringify(characterList[0].name));

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }

    if (!episodeList) {
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
    }



    setCharacters(characterList);
    setEpisodes(episodeList);

    // setCharacters(prevProducts => ([...prevProducts, []]));


    let nameCharacter = JSON.parse(localStorage.getItem("nameCharacter"));
    console.log("nameCharacter: " + nameCharacter);

    let nameEpisode = JSON.parse(localStorage.getItem("nameEpisode"));
    console.log("nameEpisode: " + nameEpisode);
  };


  useEffect(() => {
    console.log("Estamos en useEfect");

    if (!hasCalledAPI) {
      llamaApi();
      sethasCalledAPI(true);

    }
  }, [characters, hasCalledAPI]);





  const MiCard = styled(Card)(({ theme }) => ({
    backgroundColor: "#3c3e44",
    color: "#f5f5f5",
  }));

  // const Personaje = () => {
  //   return <strong>prueba</strong>;
  // };

  return (
    <div className="App">
      <main>
        <section id="section1" className="section1">
          <h1 className="tituloSection1">The Rick and Morty API</h1>
          <div className='fotoSection1'><RickandMorty style={{ fill: '#f5f5f5', width: '100%', height: '100%' }} /></div>
        </section>

        <section id="section2" className="section2">

          <ToggleButtonGroup
            color="primary"
            value={showElement}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="character" className='btnEposideSection2'>Characters</ToggleButton>
            <ToggleButton value="episode" className='btnEposideSection2'>Episodes</ToggleButton>
            <ToggleButton value="ios" className='btnEposideSection2'>iOS</ToggleButton>
          </ToggleButtonGroup>

        </section>  

        <section id="section3" className="section3">
        
        <Container>
            <Grid container spacing={2}>
                  {
                  showElement==="episode" &&
                  episodes !== null &&
                  episodes.map((episode) => (
                  <Grid item xs={1} sm={2} md={4} key={episode.id}>
                    {/* <Personaje>xs=8</Personaje> */}
                    <MiCard sx={{ minWidth: 275 }}>
                      <CardContent>
                        <div className='characterCardContent'>
                          <div className='section1CardContent'>
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
              {
                showElement==="character" &&
                characters !== null &&
                characters.map((character) => (
                  <Grid item xs={1} sm={2} md={4} key={character.id}>
                    {/* <Personaje>xs=8</Personaje> */}
                    <MiCard sx={{ minWidth: 275 }}>
                      <CardContent>
                        <div className='characterCardImg'>
                          <img src={character.image} alt="characterCard__Img" />
                        </div>
                        <div className='characterCardContent'>
                          <div className='section1CardContent'>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                              {character.name}
                            </Typography>
                          </div>
                          <div className='section2CardContent'>

                          </div>
                          <div className='section3CardContent'>

                          </div>


                        </div>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </MiCard>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default App;
