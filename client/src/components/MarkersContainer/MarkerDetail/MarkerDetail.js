import React, { useState, useEffect } from 'react';
import {Collapse} from 'react-bootstrap';
import {getTrips} from '../../../handlers/tripHandlers';
import Trip from'../../Trip/Trip';
import styles from './MarkerDetail.module.css';

const MarkerDetail = props => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [tripInfo, setTripInfo] = useState(null);
  let currencies = Object.values(props.details.currencies);

  useEffect(() => {
    getTrips(props.filters)
      .then(data => {
        if(data.trips !== 'none') {
          setTripInfo(data.trips[0]);
        } 
      })

    return () => {
      setTripInfo(null);
    }
  }, [props.filters])

  return (
    <>
      <div className={styles.Details}>
        <h4 onClick={() => setDetailsOpen(!detailsOpen)} aria-controls="country-details" aria-expanded={detailsOpen}>Country Details</h4>
        <Collapse in={detailsOpen}>
          <div id="country-details">
            <p><strong>Capital</strong>: {props.details.capital[0]}</p>
            <p><strong>Region</strong>: {props.details.region}</p>
            <p><strong>Subregion</strong>: {props.details.subregion}</p>
            <p><strong>Currencies: </strong>{currencies.map((currency,index) => {
              return <span key={index}>-{currency.name}-</span>
            })}</p>
            <p><strong>Description</strong>: {props.details.desc}</p>
          </div>
        </Collapse>
      </div>
      {tripInfo !== null ? <Trip details={tripInfo} /> : null}
    </>
  )
};

export default MarkerDetail;