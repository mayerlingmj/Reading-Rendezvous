import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Auth from './components/Auth'
import Books from './components/Books'
import Discussions from './components/Discussions'
import Reviews from './components/Reviews'
import Comments from './components/Comments'
import HomePage from './components/HomePage'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/books" element={<Books user={user} />} />
          <Route path="/discussions" element={<Discussions user={user} />} />
          <Route path="/reviews" element={<Reviews user={user} />} />
          <Route path="/comments" element={<Comments user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
