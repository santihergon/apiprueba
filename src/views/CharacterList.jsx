import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
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
import Filter from "../layout/Filter";

const validLiveStatus = ["alive", "dead", "unknown"];

export function CharacterList(props) {
  const history = useHistory();
  const [hasCalledAPI, sethasCalledAPI] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [dead, setDead] = useState(false);
  const [search, setSearch] = useState("");
  const [characterFound, setCharacterFound] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
  });

  // useEffect(() => {
  //   // Business logic to run when eleId updates
  // }, [history.location.key]);

  const { live_status } = useParams();

  const handlePageChange = (event, value) => {
    setPage(value);
    llamaApi(value);
    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  };

  const llamaApi = (apiPage) => {
    let url = `https://rickandmortyapi.com/api/character/?page=${apiPage}`
    let characterList = null;

    if (live_status) {
      if (validLiveStatus.includes(live_status)) {
        url += `&status=${live_status}`;
      } else {
        history.push("/");
      }
    }else{
      url += `&name=${search}&status=${filters.status}&species=${filters.species}&gender=${filters.gender}`; //Esto es un query parameter o GET parameter
    }

    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(JSON.stringify(response));
        setNPages(response.data.info.pages);
        console.log(response.data.results);
        characterList = response.data.results;
        setCharacters([...characterList]);
        setCharacterFound(true);
        //localStorage.setItem("characterList", JSON.stringify(characterList));
        //localStorage.setItem("name", JSON.stringify(characterList[0].name));
        console.log(filters);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setCharacterFound(false);
      })
      .finally(function () {
        // always executed
      });
    // setCharacters(prevProducts => ([...prevProducts, []]));
    //let nameCharacter = JSON.parse(localStorage.getItem("nameCharacter"));
    //console.log("nameCharacter: " + nameCharacter);
  };

  useEffect(() => {
    console.log("Estamos en useEfect");
    if (!hasCalledAPI) {
      sethasCalledAPI(true);
      llamaApi(1);
    }
    console.log("FIN useEfect**");
  }, [characters, hasCalledAPI, history.location.key]);

  // const minWidth = window.matchMedia("(min-width: 768px)").matches;

  return (
    //Esto de la key que es?
    <section className="showcase" key={history.location.key}>
      <Search
        setSearch={setSearch}
        search={search}
        setNPages={setNPages}
        sethasCalledAPI={sethasCalledAPI}
      />
      {!live_status && <Filter
        setFilters={setFilters}
        filters={filters}
        sethasCalledAPI={sethasCalledAPI}
      />}
      

      {characters !== null && characterFound === true && (
        <div>
          {" "}
          {/* Creo este div para después poder mostrar el mensaje de no se han encontrado caracteres */}
          <Grid
            container
            className="GridContainer"
            sx={{
              px: "3.5%",
              py: "10px", //Contenedor Padre
              "@media screen and (max-width: 1536px)": { px: "5%" },
              "@media screen and (max-width: 1200px)": { px: "5%" },
              "@media screen and (max-width: 900px)": { px: "5%" },
              "@media screen and (max-width: 600px)": { px: "8%" },
            }}
          >
            {characters.map((character) => (
              <Character character={character} key={character.id} />
            ))}
          </Grid>
          <Stack spacing={2} className="paginacion">
            <div className="tituloPaginacion">Page: {page}</div>
            {/* {minWidth === true ? <Pagination className="elementospaginacion" count={nPages} page={page} onChange={handlePageChange} /> : <Pagination className="elementospaginacion" siblingCount={0} count={nPages} page={page} onChange={handlePageChange} />
            } */}
            <Pagination
              className="elementospaginacion largePagination"
              count={nPages}
              page={page}
              onChange={handlePageChange}
            />
            <Pagination
              className="elementospaginacion shortPagination"
              siblingCount={0}
              count={nPages}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      )}
      {characterFound === false ? (
        <div className="characterNotFound">
          <h1>No se han encontrado personajes con ese nombre</h1>
        </div>
      ) : null}
      {/* Si no se encuetran caracteres muestro el h1 y si no, muestro null. Mostrar null es como no mostrar nada */}
    </section>
  );
}

export default CharacterList;
