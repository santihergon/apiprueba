import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";  
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Location from "../components/Location";


export function Locations() {
  const history = useHistory()
  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [locations, setLocations] = useState([]);
  const [showElement, setShowElement] = useState("character");
  const [page, setPage] = useState(1);
  const [nPages, setNPages] = useState(1);

  useEffect(() => {
  }, [history.location.key]);


  const handlePageChange = (event, value) => {
    setPage(value);
    llamaApi(value);
  };

  const llamaApi = () => {

    let locationList = null;
    let url = `https://rickandmortyapi.com/api/location`;

    axios
      .get(url)

      .then(function (response) {
        // handle success
        console.log('**Llama Api Locations**')

        console.log("⬇ response.data.results ⬇");
        console.log(response.data.results);
        locationList = response.data.results;
        setLocations([...locationList]);

        console.log('FIN**')

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
  }, [locations, hasCalledAPI, history.location.key]);


  return (
    <main >
      <section id="section2" className="section2">
        <Container>
          <Grid container spacing={2}>
            {showElement === "character" &&
            locations !== null &&
            locations.map((location) => (
                <Location location={location} key={location.id} />
              ))}
          </Grid>
          <Stack spacing={2} className="paginacion">
            <div className="tituloPaginacion">Page: {page}</div>
            <Pagination className="Elementospaginacion" count={nPages} page={page} onChange={handlePageChange} />
          </Stack>
        </Container>
      </section>
    </main>
  );
}

export default Locations;
