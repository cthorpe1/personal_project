import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {Container, Carousel, Image} from 'react-bootstrap';
import styles from './PhotoList.module.css';

const PhotoList = props => {
  const storageRef = firebase.storage().ref();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let links = [];
    props.photos.map(photo => {
      let imageRef = storageRef.child(photo.url);
      imageRef.getDownloadURL()
        .then(url => {
          links.push(url);
        })
        .catch(err => {
          console.log(err);
        });
    })
    setUrls(links);
  }, [props.photos])
  
  return (
    <div>
      <Container>
        <Carousel className={styles.Gallery} controls={true} interval={null}>
        {urls.map((url,index) => {
        return <Carousel.Item key={index} className={styles.ImgContainer}><Image src={url} className={styles.Image}/></Carousel.Item>
      })}
        </Carousel>
      </Container>
    </div>
  )
};

export default PhotoList;