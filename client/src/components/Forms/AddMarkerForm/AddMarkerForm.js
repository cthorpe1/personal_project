import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import countries from '../../../utils/countries.json';
import {addMarker} from '../../../handlers/markerHandlers';
import styles from './AddMarkerForm.module.css';

const AddMarkerForm = props => {
  const [selectedCountry, setSelectedCountry] = useState(0);
  const handleChange = e => {
    setSelectedCountry(parseInt(e.target.value));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const country = countries[selectedCountry];
    const newMarker = {
      username: props.username,
      name: country.name.common,
      lat: country.latlng[0],
      lng: country.latlng[1],
      details: selectedCountry
    }
    addMarker(newMarker).then(data => {
      props.setShowModal(false);
    })
  }
  return (
    <Form className={styles.Form} onSubmit={handleSubmit} >
      <Form.Group controlId="formCountry">
        <Form.Label >Country:</Form.Label>
        <Form.Control as="select" onChange={handleChange}>
        {countries.map((country, i) => {
          return (
            <option key={i} value={i}>
              {country.name.common}
            </option>
          );
        })}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  )
}

export default AddMarkerForm;