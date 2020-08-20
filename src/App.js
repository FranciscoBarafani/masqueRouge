import React from "react";
//Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <MainLayout />
          </Route>
          <Route path="/admin"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
