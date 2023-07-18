import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import SignIn from './pages/Signin'
import Register from './pages/Register'
import Books from './pages/Books'
import AddDiscussions from './components/AddDiscussions'
import DiscussionList from './pages/DiscussionList'
import DiscussionDetails from './pages/DiscussionDetail'
import ReviewList from './pages/ReviewList'
import Comments from './components/Comments'
import HomePage from './components/HomePage'
import BookDetails from './pages/BookDetails'
import AddBook from './components/AddBook'
import BookList from './pages/BookList'
import ReviewDetail from './pages/ReviewDetails'
import AddReview from './components/AddReview'

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
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books user={user} />} />
          <Route path="/discussions" element={<AddDiscussions user={user} />} />
          <Route path="/discussions" element={<DiscussionList />} />
          <Route
            path="/discussions/:discussionId"
            element={<DiscussionDetails />}
          />
          <Route path="/reviews" element={<ReviewList user={user} />} />
          <Route path="/comments" element={<Comments user={user} />} />
          <Route path="/reviews/:reviewId" element={<AddReview />} />
          <Route path="/reviewdetails/:reviewId" element={<ReviewDetail />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/myBooks" element={<BookList user={user} />} />
          <Route path="/books/:id" element={<AddDiscussions user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
