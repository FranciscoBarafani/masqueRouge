import React from 'react'
//Components
import ComplaintsMap from "../../components/ComplaintsMap";

import "./complaintsLocation.scss";

export default function ComplaintsLocation() {
    return (
        <div className="complaints-location">
            <h2>Mapa de Denuncias</h2>
            <ComplaintsMap />
        </div>
    )
}
