import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import styles from './PhotoList.module.css';

const PhotoList = props => {
  const storageRef = firebase.storage().ref();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    for (let i = 0; i < props.photos.length; i++) {
      let currentPhoto = props.photos[i];
      let imageRef = storageRef.child(currentPhoto.url);
      imageRef.getDownloadURL()
        .then(url => {
          setUrls([
            ...urls,
            url
          ]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props.photos])
  return (
    <div className={styles.Gallery}>
      {urls.map((url,index) => {
        return <div key={index} className={styles.ImgContainer}><img src={url} className={styles.Image}/></div>
      })}
    </div>
  )
};

export default PhotoList;