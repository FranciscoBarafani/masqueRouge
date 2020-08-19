import React from "react";
import "./App.css";
//Components
import { Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/"></Route>
          <Route path="/admin"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
