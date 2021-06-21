
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker,Popup} from 'react-map-gl';
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 50,
    longitude: 50,
    zoom: 2
  });
  return (
    <>
       <div className="map">
       <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/light-v10">   
    </ReactMapGL>
    </div>
    </>
  );
}

export default App;
