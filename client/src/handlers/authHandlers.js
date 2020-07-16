export const handleLogin = (e,data, [setDisplayedForm,setUsername, setLoggedIn]) => {
  e.preventDefault();
  console.log(setDisplayedForm);
  fetch('http://localhost:8000/token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setDisplayedForm('');
      setUsername(data.user.username);
    })
}

export const handleSignup = (e, data, [setDisplayedForm,setUsername, setLoggedIn]) => {
  e.preventDefault();
  fetch('http://localhost:8000/app/user/new/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setDisplayedForm('');
      setUsername(data.username);
    })
}

export const handleLogout = ([setLoggedIn,setUsername]) => {
  localStorage.removeItem('token');
  setLoggedIn(false);
  setUsername('');
}