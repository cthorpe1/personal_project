import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from "firebase/app";
import "firebase/storage";
import * as serviceWorker from './serviceWorker';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCQKonuvlcWicP7WTNCEtd7eta_WJGRTKU",
  authDomain: "mapshot-e6cc9.firebaseapp.com",
  databaseURL: "https://mapshot-e6cc9.firebaseio.com",
  projectId: "mapshot-e6cc9",
  storageBucket: "mapshot-e6cc9.appspot.com",
  messagingSenderId: "488701513097",
  appId: "1:488701513097:web:99a648af7c304213b6e558"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
