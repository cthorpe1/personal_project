import React, { useState} from 'react';
import {Map, TileLayer} from 'react-leaflet';
import styles from './MapContainer.module.css';
import MarkersContainer from '../MarkersContainer/MarkersContainer';


const MapContainer = props => {
  const [position, setPosition] = useState([38.954354, 22.099391]);
  const [zoom,setZoom] = useState(2.5);
  const MAPBOX_URL = `https://api.mapbox.com/styles/v1/cthorpe4/ck18dwcl84w1l1dqturfu8dfw/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX}`;

  return (
    <div className={styles.MapContainer}>
      <Map 
        center={position} 
        zoom={zoom} 
        className={styles.Map} 
        minZoom={2}
        zoomSnap={.5}
        wheelPxPerZoomLevel={80}
        zoomDelta={0.5}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={MAPBOX_URL}
        />
        <MarkersContainer showModal={props.showModal} setShowModal={props.setShowModal} setModalContent={props.setModalContent} username={props.username}/>
      </Map>
    </div>
  )
};

export default MapContainer;