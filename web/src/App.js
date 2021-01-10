import "./App.sass";
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import ChooseUsername from "./ChooseUsername";
import Authentication from "./Authentication";

function App() {
  return (
    <BrowserRouter>
      <h1>hastygram</h1>
      <aside>
        <ChooseUsername/>
        <Authentication/>
      </aside>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:username" component={Feed}/>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
