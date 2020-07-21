import React from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';

const Marker = props => {
  return (
    <LeafletMarker position={[props.latlng[0], props.latlng[1]]} onClick={props.click}/>
  )
};

export default Marker;