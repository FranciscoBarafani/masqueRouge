import React from "react";
//Components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import "antd/dist/antd.less";
import "./App.less";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/home">
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
