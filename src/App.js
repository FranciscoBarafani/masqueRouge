import React from "react";
//Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainLayout />
          </Route>
          <Route path="/admin">
            <AdminLayout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
