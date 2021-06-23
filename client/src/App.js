import React, { useState, useEffect,useRef } from "react";
import './App.css'
import axios from 'axios'
import {MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import icon from "./components/Icone";
import LocationMarker from "./components/LocationMarker";

function App() {
    const [items,setItems] = useState([]);
    useEffect(() => {  
      const fetching = async () => {
        const response = await axios.get('http://localhost:3001/read')
        console.log(response.data);
        return setItems(response.data)
      }
      fetching()
    },[])

    return (
    <>
      <MapContainer center={[50.4167 ,4.4333]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {
          items.map((terminal,index) => (
            <Marker key={index} position={[terminal.latitude, terminal.longitude]}>
              <Popup>
                <p>ICI</p>
              </Popup>
            </Marker>
          ))
          }
          <LocationMarker/>
      </MapContainer>
    </>
  );
}

export default App;
