import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages
import Home from "../../pages/home";

export default function MainRoutes() {
  return (
    <Switch>
      <Route>
        <Home />
      </Route>
    </Switch>
  );
}
