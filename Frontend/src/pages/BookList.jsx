import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookDetails from './BookDetails'

const BookList = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books')
        setBooks(response.data.books)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBooks()
  }, [])

  return (
    <div>
      <h2>Book List</h2>
      {books.map((book) => (
        <BookDetails key={book._id} bookId={book._id} />
      ))}
    </div>
  )
}

export default BookList
