import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {Form, Button} from 'react-bootstrap';
import PhotoList from './PhotoList/PhotoList';
import {getPhotos, addPhotoRef} from '../../handlers/photoHandlers';

const TripPhotosContainer = props => {
  const [file, setFile] = useState({
    selected: null
  });
  const [photos, setPhotos] = useState([]);
  const storageRef = firebase.storage().ref();
  let imageRef;

  useEffect(() => {
    let filters = {
      username: props.username,
      tripName: props.tripName
    }
    getPhotos(filters)
      .then(data => {
        setPhotos(data.photos);
      })
  }, [])
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
          console.log(data);
        })
    })
  }

  return (
    <div>
      <p>Photos:</p>
      {photos.length && <PhotoList photos={photos} />}
      <Form onSubmit={uploadHandler}>
        <Form.File id='photo-upload' label='Upload New Photo' onChange={fileSelectHandler}/>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  )
};

export default TripPhotosContainer;