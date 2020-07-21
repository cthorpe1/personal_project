import React, { useState, useEffect } from 'react';
import {getMarkers} from '../../handlers/markerHandlers';
import Marker from './Marker/Marker';
import MarkerDetail from './MarkerDetail/MarkerDetail';
import countries from '../../utils/countries.json';

const MarkersContainer = props => {
  const [markersData, setMarkersData] = useState([])

  useEffect(() => {
    getMarkers()
      .then(data => {
        setMarkersData(data.markers);
      })
  },[props.showModal]);

  const handleMarkerClick = marker => {
    let countryInfo = countries[marker.details];
    console.log(countryInfo);
    props.setModalContent({
      'title': `${marker.name}`,
      'body': `This is the marker detail modal for ${marker.name}`,
      'component': <MarkerDetail details={countryInfo}/>
    })
    props.setShowModal(true);
  };

  return (
    <div>
      {markersData.map((marker, index) => {
        return <Marker key={index} latlng={[marker.lat, marker.lng]} click={() => handleMarkerClick(marker)}/>
      })}
    </div>
  )
};

export default MarkersContainer;