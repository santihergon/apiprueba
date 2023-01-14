import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./layout/Header";
import Hero from "./layout/Hero";
import Footer from "./layout/Footer";
import LocationList from "./views/LocationList.jsx";
import EpisodeList from "./views/EpisodeList.jsx";
import CharacterList from "./views/CharacterList.jsx";
import GoTop from "./components/GoTop.jsx";
import EpisodeDetail from "./views/EpisodeDetail.jsx";
import LocationDetail from "./views/LocationDetail.jsx";


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Hero />
        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/episodes/">
            <EpisodeList />
          </Route>
          <Route exact path="/episodes/:id/">
            <EpisodeDetail />
          </Route>
          <Route exact path="/locations/">
            <LocationList />
          </Route>
          <Route exact path="/locations/:id/">
            <LocationDetail />
          </Route>
          <Route exact path="/">
            <CharacterList />
          </Route>
          <Route exact path="/characters/">
            <CharacterList />
          </Route>
          <Route exact path="/characters/:live_status/">
            <CharacterList />
          </Route>
          <Route path="*">
            <h1>No encontrado</h1>
          </Route>
        </Switch>
      </main>
      <GoTop />

      <Footer />
    </Router>
  );
}

export default App;
