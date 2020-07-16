import React from 'react';

const Nav = props => {
  const loggedOutLinks = (
    <ul>
      <li onClick={() => props.displayForm('login')}>Login</li>
      <li onClick={() => props.displayForm('signup')}>Sign Up</li>
    </ul>
  )

  const loggedInLinks = (
    <ul>
      <li><button onClick={e => props.handleLogout(props.setters)}>Logout</button></li>
    </ul>
  )
  return <div>{props.loggedIn ? loggedInLinks : loggedOutLinks}</div>
};

export default Nav;