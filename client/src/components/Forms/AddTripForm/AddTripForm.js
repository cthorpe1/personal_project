import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Card } from 'react-bootstrap';
import {addTrip} from '../../../handlers/tripHandlers';
import styles from './AddTripForm.module.css';

const AddTripForm = props => {
  const [fields, setFields] = useState({
    'name': '',
    'description': '',
    'start': '',
    'end': ''
  })

  const handleChange = e => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newTrip = {
      'username': props.filters.username,
      'marker': props.filters.marker,
      'name': fields.name,
      'description': fields.description,
      'start_date': fields.start,
      'end_date': fields.end
    }
    addTrip(newTrip)
      .then(data => {
        props.close();
      })
  }
  return (
    <Card className="m-2">
      <Card.Header>Add A New Trip</Card.Header>
      <Card.Body>
        <Form className={styles.Form} onSubmit={handleSubmit} >
          <Form.Group controlId="formCountry">
            <Form.Label>Name: </Form.Label>
            <Form.Control name="name" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Description: </Form.Label>
            <Form.Control as="textarea" name="description" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Start Date: </Form.Label>
            <Form.Control type="date" name="start" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>End Date: </Form.Label>
            <Form.Control type="date" name="end" onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
    </Form>
      </Card.Body>
    </Card>
  )
}

export default AddTripForm;