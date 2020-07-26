import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {Form, Button, Row,Col, Container} from 'react-bootstrap';
import {getPhotos, addPhotoRef} from '../../handlers/photoHandlers';

const TripPhotosContainer = props => {
  const [file, setFile] = useState({
    selected: null
  });
  const storageRef = firebase.storage().ref();
  let imageRef = null;
  
  const fileSelectHandler = e => {
    let files = e.target.files;
    setFile({
      selected: files[0]
    });
  }

  const uploadHandler = e => {
    e.preventDefault();
    imageRef = storageRef.child(file.selected.name);
    imageRef.put(file.selected).then(snapshot => {
      let photoObj = {
        tripName: props.tripName,
        username: props.username,
        url: snapshot.metadata.name
      }
      addPhotoRef(photoObj)
        .then(data => {
          props.downloadPhotos();
        })
    })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col><p><strong>Upload Photos:</strong></p></Col>
        </Row>
        <Row className="mb-5">
        <Col>
            <Form onSubmit={uploadHandler} inline>
              <Form.File id='photo-upload' onChange={fileSelectHandler}/>
              <Button type="submit" disabled={file.selected === null ? true : false}>Upload</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default TripPhotosContainer;