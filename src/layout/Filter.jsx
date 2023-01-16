import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

function Filter() {

  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({ status: "", specie: "", gender: "" });


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const diccionarioToUrl = (filterName, filterValue) => {


    // statestatus = alive y status == alive;
    // state status = '';
    // si el filtro ya esta aplicado, pongo comillas vacias sino, pongo el, usa if()

    if (filters[filterName] === filterValue) {
      console.log("Se repite");
      filterValue = "";
      filters[filterName] = filterValue;
      console.log("lo he cambiado, ahora es:");
      console.log(filters);
      console.log("fin");
    } else {
      filters[filterName] = filterValue;
      setFilters(filters);
      console.log(filters);
    }
  }







  // let url = `https://rickandmortyapi.com/api/character/?status=${status}`;
  // axios
  //     .get(url)
  //     .then(function (response) {
  //         console.log(response.data);
  //         // listaPersonajes = response.data;
  //         // setPersonajes([...listaPersonajes]);
  //     })
  //     .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //     })
  //     .finally(function () {
  //         // always executed
  // });




  const statusList = [
    "Alive",
    "Dead",
    "Unknown",
  ];

  const gendersList = [
    "Female",
    "Male",
    "Genderless",
    "Unknown",
  ];

  const speciesList = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];



  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {statusList.map((status) => <>
              <button className="searchBarBtn" onClick={() => diccionarioToUrl('status', status)} >{status}</button>
            </>)}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {speciesList.map((specie) => (
              <button className="searchBarBtn" onClick={() => diccionarioToUrl('specie', specie)} >{specie}</button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography>Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {gendersList.map((gender) => (
              <button className="searchBarBtn" onClick={() => diccionarioToUrl('gender', gender)} >{gender}</button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Filter;
