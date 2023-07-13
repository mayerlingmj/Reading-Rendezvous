import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddBook from './AddBook'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get('/books')
      setBooks(result.data)
    }

    fetchBooks()
  }, [])

  return (
    <div>
      <AddBook />
      {books.map((book, index) => (
        <p key={index}>{book.title}</p>
      ))}
    </div>
  )
}

export default Books
