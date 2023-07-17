import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookDetails from './BookDetails'
import { GetBooks } from '../services/Book'

const BookList = ({ user }) => {
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
    <div
      style={{
        backgroundImage: 'url(https://i.imgur.com/1SMy1Ow.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '10px'
        }}
      >
        <h2 style={{ color: '#fff' }}>Book List</h2>
        {books.map((book) => (
          <BookDetails user={user} key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookList
