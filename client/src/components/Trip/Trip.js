import React, { useState } from 'react';
import {Collapse} from 'react-bootstrap';
import styles from './Trip.module.css';

const Trip = props => {
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
    <div className={styles.Details}>
      <h4 onClick={() => setDetailsOpen(!detailsOpen)} aria-controls="trip-details" aria-expanded={detailsOpen}>{props.details.name}</h4>
      <Collapse in={detailsOpen}>
        <div id="trip-details">
          <p>Starts: {new Date(props.details.start_date).toLocaleDateString()}</p>
          <p>Ends: {new Date(props.details.end_date).toLocaleDateString()}</p>
          <p>Details: {props.details.description}</p>
        </div>
      </Collapse>
    </div>
  )
};

export default Trip