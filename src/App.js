import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import Home from "./components/Home";
import "./App.css";
import Counters from "./components/counters";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/counters" component={Counters} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
