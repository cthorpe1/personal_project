import React from "react";
import styles from "./SplashScreen.module.css";
import { propTypes } from "react-bootstrap/esm/Image";

const SplashScreen = props => {
  return (
      <div className={styles.Jumbotron}>
        <div className={styles.BackgroundImage}></div>
        {props.form === null 
        ? <div className={styles.SplashContent}>
            <h1>Welcome to Mapshot!</h1>
            <p>
              We make it easy to organize and store all of your favorite travel
              memories
            </p>
            <hr />
            <h4>Please register or login above</h4>
          </div>
        : <div className={styles.SplashContent}>{props.form}</div>
        }

      </div>
  );
};

export default SplashScreen;