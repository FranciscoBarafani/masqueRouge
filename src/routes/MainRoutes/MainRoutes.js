import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages
import Home from "../../pages/home";
import CheckOut from "../../pages/checkOut";

export default function MainRoutes() {
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/home/checkout" exact>
        <CheckOut />
      </Route>
    </Switch>
  );
}
