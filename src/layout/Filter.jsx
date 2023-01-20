import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

const statusList = ["Alive", "Dead", "Unknown"];

const speciesList = ["Human", "Alien", "Humanoid", "Poopybutthole", "Mythological", "Unknown", "Animal", "Disease", "Robot", "Cronenberg", "Planet",];

const gendersList = ["Female", "Male", "Genderless", "Unknown"];

function Filter({ filters, setFilters, sethasCalledAPI }) {
  // const [expanded, setExpanded] = useState(false);

  const handleChange = (filterValue, filterName) => {
    //filterValue = filterValue.target.value
    console.log(filters[filterName])
    console.log(filterValue)
    if (filters[filterName] === filterValue) {
      filters[filterName] = ''
    } else {
      filters[filterName] = filterValue
    }

    setFilters(Object.assign({}, filters));
    sethasCalledAPI(false);
    //diccionarioToUrl("filterName", event.target.value);
  };

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // }

  const diccionarioToUrl = (filterName, filterValue) => {
    sethasCalledAPI(false);

    if (filters[filterName] === filterValue) {
      console.log("Se repite, voy dejarlo en comillas vacias");
      filterValue = "";
      filters[filterName] = filterValue;
      console.log("lo he cambiado, ahora es:");
      console.log(filters);
      console.log("fin");
    } else {
      filters[filterName] = filterValue;
      setFilters(filters);
      console.log(filters);
      console.log("filters contiene");

    }

    let url = `https://rickandmortyapi.com/api/character/?status=${filters.status}&species=${filters.species}&gender=${filters.gender}`;

    axios
      .get(url)
      .then(function (response) {
        console.log(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} className="FilterSection">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.status} label="Status" onChange={(e) => handleChange(e.target.value, "status")}
          endAdornment={<IconButton className="clearFilterBtn" sx={{ visibility: filters.status !== '' ? "visible" : "hidden" }}
            onClick={() => handleChange('', 'status')}><ClearIcon /></IconButton>}>
          {statusList.map((status) => (
            <MenuItem key={status} value={status} className={filters.status === status ? "active" : ""}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Species</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.species} label="Status" onChange={(e) => handleChange(e.target.value, "species")}
          endAdornment={<IconButton className="clearFilterBtn" sx={{ visibility: filters.species !== '' ? "visible" : "hidden" }}
            onClick={() => handleChange('', 'species')}><ClearIcon /></IconButton>}>
          {speciesList.map((species) => (
            <MenuItem key={species} value={species} className={filters.species === species ? "active" : ""}>
              {species}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.gender} label="Gender" onChange={(e) => handleChange(e.target.value, "gender")}
          endAdornment={<IconButton className="clearFilterBtn" sx={{ visibility: filters.gender !== '' ? "visible" : "hidden" }}
            onClick={() => handleChange('', 'gender')}><ClearIcon /></IconButton>}>
          {gendersList.map((gender) => (
            <MenuItem key={gender} value={gender} className={filters.gender === gender ? "active" : ""}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Stack>

    /* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {statusList.map((status) => (
              <button key={status} className={"filterBtn " + (filters.status === status ? 'active': '')} onClick={() => diccionarioToUrl('status', status)} >{status}</button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {speciesList.map((species) => (
              <button key={species} className={"filterBtn " + (filters.species === species ? 'active': '')} onClick={() => diccionarioToUrl('species', species)} >{species}</button>
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
              <button key={gender} className={"filterBtn " + (filters.gender === gender ? 'active': '')} onClick={() => diccionarioToUrl('gender', gender)} >{gender}</button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion> */
  );
}

export default Filter;
