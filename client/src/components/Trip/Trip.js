import React, { useState } from 'react';
import {Collapse, Card, Container, Row, Col} from 'react-bootstrap';
import TripPhotosContainer from '../TripPhotosContainer/TripPhotosContainer';

const Trip = props => {
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
      <Card className="m-2">
        <Card.Header onClick={() => setDetailsOpen(!detailsOpen)} aria-controls="trip-details" aria-expanded={detailsOpen}>{props.details.name}</Card.Header>
        <Card.Body>
        <Collapse in={detailsOpen}>
          <div id="trip-details">
            <Container>
              <Row>
                <Col><Card.Text><strong>Starts:</strong> {new Date(props.details.start_date).toLocaleDateString()}</Card.Text></Col>
              </Row>
              <Row>
                <Col><Card.Text><strong>Ends:</strong> {new Date(props.details.end_date).toLocaleDateString()}</Card.Text></Col>
              </Row>
              <Row>
                <Col><Card.Text><strong>Details: </strong>{props.details.description}</Card.Text></Col>
              </Row>
            </Container>
            <TripPhotosContainer tripName={props.details.name} username={props.username} />
          </div>
        </Collapse>
        </Card.Body>
      </Card>
  )
};

export default Trip