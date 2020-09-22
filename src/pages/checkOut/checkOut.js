import React, { useState } from "react";
//Forms
import ComplaintForm from "../../forms/ComplaintForm";

export default function CheckOut() {
  const [location, setLocation] = useState("");
  return (
    <div>
      <ComplaintForm setLocation={setLocation} />
    </div>
  );
}
