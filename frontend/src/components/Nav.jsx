import React from 'react'
import SignIn from '../pages/Signin'
import Register from '../pages/Register'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = ({ user, handleLogOut }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/books">Books</Link>
          <Link to="/myBooks">My Books</Link>
          <Link to="/reviews">Reviews</Link>
          {/* <Link to="/discussions">Discussions</Link> */}
          <button onClick={handleLogOut}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  )
}

export default Nav
