import React, { useState, useEffect } from "react";
import './App.css'
import axios from 'axios'
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
function App() {
    const [items,setItems] = useState({});
    const [center,setCenter] = useState({lat:50, lng:4});
    const maptiler = {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
    
    useEffect(() => {
      
      const fetching = async () => {
        let fullData = {};
        const res = await fetch('http://localhost:3001/read')
        let dater = await res.json();
        dater.map(item => {
          const {address,bank,latitude,longitude} = item
          fullData[bank] = {address,bank,latitude,longitude}
        })
        return setItems(fullData)
      }
   
      fetching()
    },[])
    console.log(items)
  
  return (
    <>
      <MapContainer center={[50.6318,3.77575]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          Object.values(items).map((data,index) => {
            <Marker key={index} position={data.latitude,data.longitude}>
              <div className="marker" style={{height:500,width:500}}>ICI</div>
              <Popup>
                <p>ICI</p>
              </Popup>
            </Marker>
          })
        }
       

      </MapContainer>
    </>
  );
}

export default App;
