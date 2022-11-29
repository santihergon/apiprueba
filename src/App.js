import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import "./App.css";
import Header from './layout/Header'
import Users from "./views/Users.jsx";
import About from "./views/About.jsx";
import CharacterList from "./views/CharacterList.jsx";
import Alive from "./views/Alive.jsx";


function App() {


  return (

    <Router>
      <div>
      <Header />
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="alive">Alive</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/alive">
            <Alive />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users"> 
            <Users />
          </Route>
          <Route exact path="/">
            <CharacterList />
          </Route>
          <Route exact path="/characters">
            <CharacterList />
          </Route>
          {/* <Route exact path="/characters/:live_status/">
            <CharacterList />
          </Route> */}
          <Route path="*">
            <h1>No encontrado</h1>
          </Route>
        </Switch>
      </div>
    </Router>

    // <div className="App">
    // <main>
    //   <section id="section1" className="section1">
    //     <h1 className="tituloSection1">The Rick and Morty API</h1>
    //     <div className='fotoSection1'><RickandMorty style={{ fill: '#f5f5f5', width: '100%', height: '100%' }} /></div>
    //   </section>

    //   <section id="section2" className="section2">

    //     <ToggleButtonGroup
    //       color="primary"
    //       value={showElement}
    //       exclusive
    //       onChange={handleChange}
    //       aria-label="Platform"
    //     >
    //       <ToggleButton value="character" className='btnEposideSection2'>Characters</ToggleButton>
    //       <ToggleButton value="episode" className='btnEposideSection2'>Episodes</ToggleButton>
    //       <ToggleButton value="ios" className='btnEposideSection2'>iOS</ToggleButton>
    //     </ToggleButtonGroup>

    //   </section>  

    //   <section id="section3" className="section3">

    //   <Container>
    //       <Grid container spacing={2}>
    //             {
    //             showElement==="episode" &&
    //             episodes !== null &&
    //             episodes.map((episode) => (
    //             <Grid item xs={1} sm={2} md={4} key={episode.id}>
    //               {/* <Personaje>xs=8</Personaje> */}
    //               <MiCard sx={{ minWidth: 275 }}>
    //                 <CardContent>
    //                   <div className='characterCardContent'>
    //                     <div className='section1CardContent'>
    //                       <Typography variant="h5" component="div">
    //                       {episode.name}
    //                         </Typography>
    //                     </div>
    //                   </div>
    //                 </CardContent>
    //               </MiCard>
    //             </Grid>
    //           ))}
    //       </Grid>
    //     </Container>

    //     <Container>
    //       <Grid container spacing={2}>
    //         {
    //           showElement==="character" &&
    //           characters !== null &&
    //           characters.map((character) => (
    //             <Grid item xs={1} sm={2} md={4} key={character.id}>
    //               {/* <Personaje>xs=8</Personaje> */}
    //               <MiCard sx={{ minWidth: 275 }}>
    //                 <CardContent>
    //                   <div className='characterCardImg'>
    //                     <img src={character.image} alt="characterCard__Img" />
    //                   </div>
    //                   <div className='characterCardContent'>
    //                     <div className='section1CardContent'>
    //                       <Typography variant="h5" component="div">
    //                         {character.name}
    //                       </Typography>
    //                       <Typography variant="h5" component="div">
    //                       <span className="status">
    //                         <span  className={"status__icon " + (character.status === "Alive"? "vivo" : character.status === "Dead"? "muerto" : "desconocido") }></span>
    //                         {character.status}
    //                       </span>
    //                       </Typography>
    //                     </div>
    //                     <div className='section2CardContent'>

    //                     </div>
    //                     <div className='section3CardContent'>

    //                     </div>


    //                   </div>
    //                 </CardContent>
    //                 <CardActions>
    //                   <Button size="small">Learn More</Button>
    //                 </CardActions>
    //               </MiCard>
    //             </Grid>
    //           ))}
    //       </Grid>
    //     </Container>
    //   </section>
    // </main>
    // </div>
  );
}

export default App;
