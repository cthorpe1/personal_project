import React, { useState, useEffect } from 'react';
import {Collapse, Card, Container, Row, Col} from 'react-bootstrap';
import {getTrips} from '../../../handlers/tripHandlers';
import Trip from'../../Trip/Trip';

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
      <Card className="m-2">
        <Card.Header onClick={() => setDetailsOpen(!detailsOpen)} aria-controls="country-details" aria-expanded={detailsOpen}>Country Info</Card.Header>
        <Card.Body>
          <Collapse in={detailsOpen}>
            <div id="country-details">
              <Container>
                <Row>
                  <Col><Card.Text><strong>Capital</strong>: {props.details.capital[0]}</Card.Text></Col>
                  <Col><Card.Text><strong>Region</strong>: {props.details.region}</Card.Text></Col>
                  <Col><Card.Text><strong>Subregion</strong>: {props.details.subregion}</Card.Text></Col>
                </Row>
                <Row>
                  <Col><Card.Text><strong>Currencies: </strong>{currencies.map((currency,index) => {
                return <span key={index}>-{currency.name}-</span>
              })}</Card.Text></Col>
                </Row>
                <Row>
                  <Col> <Card.Text><strong>Description</strong>: {props.details.desc}</Card.Text></Col>
                </Row>
              </Container>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
      {tripInfo !== null ? <Trip details={tripInfo} username={props.filters.username} /> : null}
    </>
  )
};

export default MarkerDetail;