import React, { useState, useEffect,useRef } from "react";
import './App.css'
import axios from 'axios'
import {MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import icon from "./components/Icone";
import useGeoLocation from "./components/useGeoLocation";
/*delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});*/
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);

    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}



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
