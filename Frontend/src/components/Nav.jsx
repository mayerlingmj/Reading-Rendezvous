import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/books">Books</Link>
          <Link to="/discussions">Discussions</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/comments">Comments</Link>
          <button onClick={handleLogOut}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/auth">Sign In / Sign Up</Link>
        </>
      )}
    </nav>
  )
}

export default Nav
