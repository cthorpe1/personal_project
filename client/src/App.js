import React, { useState,useEffect } from 'react';
import Nav from './components/Nav/Nav';
import LoginForm from './components/Forms/LoginForm/LoginForm';
import SignupForm from './components/Forms/SignupForm/SignupForm';
import {handleLogin, handleSignup, handleLogout} from './handlers/authHandlers';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:8000/app/current_user', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
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
  return (
    <div className="App">
      <Nav loggedIn={loggedIn} displayForm={displayForm} handleLogout={handleLogout} setters={[setLoggedIn,setUsername]}/>
      {form}
      <h3>{loggedIn ? `Hi ${username}` : 'Please Log In'}</h3>
    </div>
  );
}

export default App;
