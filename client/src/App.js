import React, { useState,useEffect } from 'react';
import Nav from './components/Nav/Nav';
import LoginForm from './components/Forms/LoginForm/LoginForm';
import SignupForm from './components/Forms/SignupForm/SignupForm';
import {handleLogin, handleSignup, handleLogout} from './handlers/authHandlers';
import MapContainer from './components/MapContainer/MapContainer';
import ModalContainer from './components/ModalContainer/ModalContainer';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Set JWT
  useEffect(() => {
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
      <Nav 
        loggedIn={loggedIn} displayForm={displayForm} 
        handleLogout={handleLogout} setters={[setLoggedIn,setUsername]} 
        setShowModal={setShowModal} setModalContent={setModalContent} username={username}
      />
      {form}
      {loggedIn 
      ? <MapContainer showModal={showModal} setShowModal={setShowModal} setModalContent={setModalContent} username={username} /> 
      : <h1>Please Log In...</h1>}
    </div>
  );
}

export default App;
