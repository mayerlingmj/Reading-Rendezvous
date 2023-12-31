import React, { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await SignInUser(formValues)
    setUser(user)
    // if (user) {
    //   setUser(user)
    navigate('/')
    // } else {
    //   alert('Invalid credentials, please try again!')
    // }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'pink',
        backgroundImage: 'url("https://i.imgur.com/e7EP3R8.jpg")',
        backgroundSize: 'cover'
      }}
    >
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
