import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookDetails from './BookDetails'
import { GetBooks } from '../services/Book'

const BookList = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await GetBooks()
        setBooks(response.books)
        console.log(response)
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
        <BookDetails key={book._id} book={book} />
      ))}
    </div>
  )
}

export default BookList
