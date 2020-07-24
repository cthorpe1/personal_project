import React, { useState, useEffect } from 'react';
import {getMarkers} from '../../handlers/markerHandlers';
import Marker from './Marker/Marker';
import MarkerDetail from './MarkerDetail/MarkerDetail';
import countries from '../../utils/countries.json';

const MarkersContainer = props => {
  const [markersData, setMarkersData] = useState([])

  useEffect(() => {
    if(props.username !== '') {
      getMarkers({'username': props.username})
      .then(data => {
        setMarkersData(data.markers);
      })
    }
  },[props.showModal, props.username]);

  const handleMarkerClick = marker => {
    let tripFilters = {
      'username': props.username,
      'marker': marker.name
    }
    let countryInfo = countries[marker.details];
    props.setModalContent({
      'title': `${marker.name}`,
      'body': `This is the marker detail modal for ${marker.name}`,
      'component': <MarkerDetail details={countryInfo} filters={tripFilters}/>
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