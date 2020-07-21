import React from 'react';
import AddMarkerForm from '../Forms/AddMarkerForm/AddMarkerForm';

const Nav = props => {
  const handleAddMarkerClick = () => {
    props.setModalContent({
      'title': 'Add Marker',
      'body': 'Add a new marker to your map by selecting a country below and clicking submit',
      'component' : <AddMarkerForm username={props.username} setShowModal={props.setShowModal}/>
    })
    props.setShowModal(true);
  }

  const loggedOutLinks = (
    <ul>
      <li onClick={() => props.displayForm('login')}>Login</li>
      <li onClick={() => props.displayForm('signup')}>Sign Up</li>
    </ul>
  )

  const loggedInLinks = (
    <ul>
      <li><a onClick={e => props.handleLogout(props.setters)}>Logout</a></li>
      <li><a onClick={handleAddMarkerClick}>Add New Marker</a></li>
    </ul>
  )
  return <div>{props.loggedIn ? loggedInLinks : loggedOutLinks}</div>
};

export default Nav;