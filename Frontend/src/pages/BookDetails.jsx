import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reviews from '../components/Reviews'

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null)
  const [bookSummary, setBookSummary] = useState('')

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

  useEffect(() => {
    const fetchBookSummary = async () => {
      if (book && book.cover_edition_key) {
        try {
          const response = await axios.get(
            `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.json`
          )
          setBookSummary(response.data.description || '')
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchBookSummary()
  }, [book])

  if (!book) {
    return <div>Loading...</div>
  }

  const coverUrl = `http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`

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
      {book.subjects && <p>Subjects: {book.subjects.join(', ')}</p>}
      {book.publish_date && <p>Publish Date: {book.publish_date}</p>}
      {book.publishers && <p>Publishers: {book.publishers.join(', ')}</p>}
      {bookSummary && (
        <div>
          <h2>About</h2>
          <p>{bookSummary}</p>
        </div>
      )}
      {book.cover_edition_key && <img src={coverUrl} alt={book.title} />}
      <Reviews bookId={bookId} />
    </div>
  )
}

export default BookDetails
