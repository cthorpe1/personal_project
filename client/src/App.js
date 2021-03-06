import React, { useState,useEffect } from 'react';
import AppNav from './components/AppNav/AppNav';
import LoginForm from './components/Forms/LoginForm/LoginForm';
import SignupForm from './components/Forms/SignupForm/SignupForm';
import {handleLogin, handleSignup, handleLogout} from './handlers/authHandlers';
import MapContainer from './components/MapContainer/MapContainer';
import ModalContainer from './components/ModalContainer/ModalContainer';
import SplashScreen from './components/SplashScreen/SplashScreen';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // localStorage.getItem('token') ? true : false
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Set JWT
  useEffect(() => {
    localStorage.removeItem('token');
    if (loggedIn) {
      fetch('http://localhost:8000/app/current_user', {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
        });
    }
  }, [])

  const displayForm = form => {
    setDisplayedForm(form);
  }

  let form;
  switch (displayedForm) {
    case 'login':
      form = <LoginForm handleLogin={handleLogin} setters={[setDisplayedForm,setUsername,setLoggedIn]}/>
      break;
    case 'signup':
      form = <SignupForm handleSignup={handleSignup} setters={[setDisplayedForm,setUsername,setLoggedIn]}/>
      break;
    default:
      form = null;
  }
  console.log('running');
  return (
    <div className="App">
      <ModalContainer 
        showModal={showModal} 
        setShowModal={setShowModal} 
        modalContent={modalContent} 
        setModalContent={setModalContent} 
      />
      <AppNav 
        loggedIn={loggedIn} displayForm={displayForm} 
        handleLogout={handleLogout} setters={[setLoggedIn,setUsername]} 
        setShowModal={setShowModal} setModalContent={setModalContent} username={username}
      />
      {loggedIn 
      ? <MapContainer showModal={showModal} setShowModal={setShowModal} setModalContent={setModalContent} username={username} /> 
      : <SplashScreen form={form}/>}
    </div>
  );
}

export default App;
