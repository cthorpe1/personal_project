import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import AddMarkerForm from '../Forms/AddMarkerForm/AddMarkerForm';

const AppNav = props => {
  const handleAddMarkerClick = () => {
    props.setModalContent({
      'title': 'Add Marker',
      'body': 'Add a new marker to your map by selecting a country below and clicking submit',
      'component' : <AddMarkerForm username={props.username} setShowModal={props.setShowModal}/>
    })
    props.setShowModal(true);
  }

  const loggedOutLinks = (
    <Nav>
      <Nav.Link onClick={() => props.displayForm('login')}>Login</Nav.Link>
      <Nav.Link onClick={() => props.displayForm('signup')}>Sign Up</Nav.Link>
    </Nav>
  )

  const loggedInLinks = (
    <Nav>
      <Nav.Link><a onClick={handleAddMarkerClick}>Add New Marker</a></Nav.Link>
      <Nav.Link><a onClick={e => props.handleLogout(props.setters)}>Logout</a></Nav.Link>
    </Nav>
  )
  return(
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Mapshot</Navbar.Brand>
      {props.loggedIn ? <Navbar.Text>Logged In As: {props.username}</Navbar.Text> : null}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.loggedIn ? loggedInLinks : loggedOutLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  ) 
};

export default AppNav;