import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GameContext } from "./context/GameContext";
import Achievements from "./pages/Achievements";
import Backlog from "./pages/Backlog";
import Game from "./pages/Game";
import Games from "./pages/Games";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Milestone from "./pages/Milestone";
import Next from "./pages/Next";
import Random from "./pages/Random";

export default function App() {
  const [navLeftOpen, setNavLeftOpen] = useState(false);
  const [navRightOpen, setNavRightOpen] = useState(false);

  const data = { navLeftOpen, setNavLeftOpen, navRightOpen, setNavRightOpen };

  return (
    <>
      <GameContext.Provider value={data}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Games />
            </Route>
            <Route exact path='/games'>
              <Games />
            </Route>
            <Route exact path='/achievements'>
              <Achievements />
            </Route>
            <Route exact path='/history'>
              <History />
            </Route>
            <Route exact path='/game'>
              <Game />
            </Route>
            <Route exact path='/backlog'>
              <Backlog />
            </Route>
            <Route exact path='/milestone'>
              <Milestone />
            </Route>
            <Route exact path='/settings'>
              <Settings />
            </Route>
            <Route exact path='/next'>
              <Next />
            </Route>
            <Route exact path='/random'>
              <Random />
            </Route>
          </Switch>
        </Router>
      </GameContext.Provider>
    </>
  );
}
