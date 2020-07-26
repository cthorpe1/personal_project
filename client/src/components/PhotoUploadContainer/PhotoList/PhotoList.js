import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {Container, Carousel, Image} from 'react-bootstrap';
import styles from './PhotoList.module.css';

const PhotoList = props => {
  return (
      <Container>
        <Carousel className={styles.Gallery} controls={true} interval={null}>
        {props.photos.map((url,index) => {
        return <Carousel.Item key={index} className={styles.ImgContainer}><Image src={url} className={styles.Image}/></Carousel.Item>
        })}
        </Carousel>
      </Container>
  )
};

export default PhotoList;