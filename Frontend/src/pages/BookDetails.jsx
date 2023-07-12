import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${bookId}.json`
        )
        setBook(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBookDetails()
  }, [bookId])

  if (!book) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{book.title}</h1>
      {book.authors && (
        <p>Author: {book.authors.map((author) => author.name).join(', ')}</p>
      )}
      {book.first_publish_year && (
        <p>First Published: {book.first_publish_year}</p>
      )}
      {book.description && <p>Description: {book.description.value}</p>}
      {book.cover && (
        <img
          src={`http://covers.openlibrary.org/b/olid/${book.cover.edition_key}-L.jpg`}
          alt={book.title}
        />
      )}
    </div>
  )
}

export default BookDetails
