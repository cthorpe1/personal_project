import React, { useState, useEffect } from 'react';
import {Collapse, Card, Container, Row, Col} from 'react-bootstrap';
import PhotoUploadContainer from '../PhotoUploadContainer/PhotoUploadContainer';
import {getPhotos} from '../../handlers/photoHandlers';
import firebase from 'firebase';
import PhotoList from '../PhotoUploadContainer/PhotoList/PhotoList';

const Trip = props => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [photos, setPhotos] = useState();
  const storageRef = firebase.storage().ref();

  const downloadPhotos = async () => {
    let filters = {
      username: props.username,
      tripName: props.details.name
    }
    let links = [];
    let photosFromDb = await getPhotos(filters);
    if (photosFromDb.photos !== 'none') {
      const promises = photosFromDb.photos.map(async photo => {
        let imageRef = storageRef.child(photo.url);
        let url = await imageRef.getDownloadURL();

        return url;
      })
      links = await Promise.all(promises);
      setPhotos(links);
    }
  }

  useEffect(() => {
    downloadPhotos();
  }, [])

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
            <PhotoUploadContainer tripName={props.details.name} username={props.username} downloadPhotos={downloadPhotos}/>
            {photos && <PhotoList photos={photos} />}
          </div>
        </Collapse>
        </Card.Body>
      </Card>
  )
};

export default Trip