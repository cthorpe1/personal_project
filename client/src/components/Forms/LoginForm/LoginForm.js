import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const LoginForm = props => {
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
    <form onSubmit={e => props.handleLogin(e, fields, props.setters)}>
      <h4>Log In</h4>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={fields.username} onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={fields.password} onChange={handleChange} />
      <Button type="submit">Log In</Button>
    </form>
  )
}

export default LoginForm;