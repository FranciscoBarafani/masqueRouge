import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import ProductForm from "../../forms/ProductForm";
import AddForm from "../../forms/AddForm";
import SlideForm from "../../forms/SlideForm";

export default function AdminRoutes() {
  return (
    <div>
      <Switch>
        <Route path="/admin/products" exact>
          <ProductForm />
        </Route>
        <Route path="/admin/slides" exact>
          <SlideForm />
        </Route>
        <Route path="/admin/adds" exact>
          <AddForm />
        </Route>
      </Switch>
    </div>
  );
}
