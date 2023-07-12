import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Auth = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await axios.post('/auth/login', {
      email: formValues.email,
      password: formValues.password
    })
    console.log(result.data)
    setFormValues({ email: '', password: '' })
    navigate('/feed')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const result = await axios.post('/auth/register', {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    console.log(result.data)
    setFormValues({ name: '', email: '', password: '', confirmPassword: '' })
    navigate('/signin')
  }

  return (
    <div className="signin col">
      <h2>Login</h2>
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button disabled={!formValues.email || !formValues.password}>
            Login
          </button>
        </form>
      </div>

      <h2>Register</h2>
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleRegister}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.confirmPassword !== formValues.password
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
