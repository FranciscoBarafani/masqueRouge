import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import ProductForm from "../../forms/ProductForm";
import AddForm from "../../forms/AddForm";
import SlideForm from "../../forms/SlideForm";
import Complaints from "../../pages/complaints";
import ComplaintsLocation from "../../pages/complaintsLocation";

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
        <Route path="/admin/complaints-map" exact>
          <ComplaintsLocation />
        </Route>
        <Route path="/admin/adds" exact>
          <AddForm />
        </Route>
        <Route path="/admin/complaints">
          <Complaints />
        </Route>  
      </Switch>
    </div>
  );
}
