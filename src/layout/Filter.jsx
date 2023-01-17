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
import TextField from "@mui/material/TextField";


import Container from "@mui/material/Container";

const statusList = ["Alive", "Dead", "Unknown"];

const speciesList = ["Human", "Alien", "Humanoid", "Poopybutthole", "Mythological", "Unknown", "Animal", "Disease", "Robot", "Cronenberg", "Planet",];

const gendersList = ["Female", "Male", "Genderless", "Unknown"];

function Filter({ filters, setFilters, sethasCalledAPI }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, filterName) => {
    filters[filterName] = event.target.value;
    setFilters(Object.assign({}, filters));
    diccionarioToUrl("filterName", event.target.value);
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

      // // let url = `https://rickandmortyapi.com/api/character/?`;
      // let url = `https://rickandmortyapi.com/api/character/?status=${filters.status}&species=${filters.species}&gender=${filters.gender}`;

      // // url += `status=${filters.status}&species=${filters.species}&gender=${filters.gender}`;

      // // if (statusList.includes(filters.status)) {
      // //   url += `status=${filters.status}&species=${filters.species}&gender=${filters.gender}`;
      // // } else {
      // //   console.log("filters no contiene");
      // // }
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
    <Container>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.status} label="Status" onChange={(e) => handleChange(e, "status")}
          //     renderInput={(params) => (
          //   <TextField
          //     {...params}
          //     style={{ borderRadius: '1.5em' }}
          //     placeholder="Search..."
          //     InputProps={{
          //       ...params.InputProps,
          //       endAdornment: ( 
          //         <>
          //           {params.InputProps.endAdornment}

          //           <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconSmall MuiChip-deleteIconColorDefault MuiChip-deleteIconFilledColorDefault css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>

          //         </>
          //       ),
          //     }}
          //   />
          // )}
          >
            <MenuItem value="">None</MenuItem>

            {statusList.map((status) => (
              <MenuItem key={status} value={status} className={"filterBtn " + (filters.status === status ? "active" : "")}
              //onClick={() => diccionarioToUrl('status', status)}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Species</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.species} label="Species" onChange={(e) => handleChange(e, "species")}>
            {speciesList.map((species) => (
              <MenuItem key={species} value={species} className={"filterBtn " + (filters.species === species ? "active" : "")}>
                {species}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filters.gender} label="Gender" onChange={(e) => handleChange(e, "gender")}>
            {gendersList.map((gender) => (
              <MenuItem key={gender} value={gender} className={"filterBtn " + (filters.gender === gender ? "active" : "")}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Stack>

    </Container>
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
