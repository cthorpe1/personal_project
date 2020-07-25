import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

const SignupForm = props => {
  const [fields, setFields] = useState({
    'username': '',
    'password': ''
  })

  const handleChange = e => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={e => props.handleSignup(e, fields, props.setters)}>
      <h4>Sign Up</h4>
      <Form.Group>
        <label htmlFor="username">Username</label>
        <Form.Control type="text" name="username" value={fields.username} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="password">Password</label>
        <Form.Control type="password" name="password" value={fields.password} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </form>
  )
}

export default SignupForm;