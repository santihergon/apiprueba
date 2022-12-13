import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./layout/Header";
import Hero from "./layout/Hero";
import Footer from "./layout/Footer";
import LocationList from "./views/LocationList.jsx";
import Episodes from "./views/Episodes.jsx";
import CharacterList from "./views/CharacterList.jsx";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Hero />
        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/episodes">
            <Episodes />
          </Route>
          <Route path="/locations">
            <LocationList />
          </Route>
          <Route exact path="/">
            <CharacterList />
          </Route>
          <Route exact path="/characters">
            <CharacterList />
          </Route>
          <Route exact path="/characters/:live_status">
            <CharacterList />
          </Route>
          <Route path="*">
            <h1>No encontrado</h1>
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
