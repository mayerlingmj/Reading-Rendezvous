import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import SignIn from './pages/Signin'
import Register from './pages/Register'
import Books from './components/Books'
import Discussions from './components/Discussions'
import Reviews from './components/Reviews'
import Comments from './components/Comments'
import HomePage from './components/HomePage'
import BookDetails from './pages/BookDetails'
import AddBook from './components/AddBook'
import BookList from './pages/BookList'

import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([]) // new state for the books

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleAddBook = (book) => {
    // function to add a book
    setBooks((prevBooks) => [...prevBooks, book])
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
          <Route path="/discussions" element={<Discussions user={user} />} />
          <Route path="/reviews" element={<Reviews user={user} />} />
          <Route path="/comments" element={<Comments user={user} />} />
          <Route exact path="/" element={<BookList books={books} />} />
          <Route
            exact
            path="/add"
            element={<AddBook onAddBook={handleAddBook} />}
          />
          <Route path="/book/:bookId" element={<BookDetails books={books} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
