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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundImage: 'url(https://i.imgur.com/2mY7EVk.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <h2
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'hotpink',
          fontSize: '4em',
          textShadow: '2px 2px 2px #ff69b4'
        }}
      >
        Book List
      </h2>
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            width: '200px',
            margin: '10px',
            backgroundColor: 'lavenderblush',
            borderRadius: '5px',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        >
          <BookDetails user={user} book={book} />
        </div>
      ))}
    </div>
  )
}

export default BookList
