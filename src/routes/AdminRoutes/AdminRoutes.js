import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import ProductForm from "../../forms/ProductForm";

export default function AdminRoutes() {
  return (
    <div>
      <Switch>
        <Route path="/admin/products" exact>
          <ProductForm />
        </Route>
      </Switch>
    </div>
  );
}
