import React, { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = ({ setUser }) => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.password === formValues.confirmPassword) {
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/signin')
    } else {
      alert('Passwords do not match!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundImage: 'url(https://i.imgur.com/2mY7EVk.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <input
        onChange={handleChange}
        name="name"
        type="text"
        placeholder="Name"
        value={formValues.name}
        required
      />
      <input
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Email"
        value={formValues.email}
        required
      />
      <input
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="Password"
        value={formValues.password}
        required
      />
      <input
        onChange={handleChange}
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formValues.confirmPassword}
        required
      />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
