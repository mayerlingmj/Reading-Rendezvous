import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reviews from '../components/Reviews'

const BookDetails = ({ book }) => {
  const [bookSummary, setBookSummary] = useState('')

  useEffect(() => {
    const fetchBookSummary = async () => {
      if (book && book.cover_i) {
        try {
          const response = await axios.get(
            `https://covers.openlibrary.org/b/id/${book.cover_i}-M.json`
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

  const coverUrl = `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

  return (
    <div>
      <h1>{book.title}</h1>
      {book.authors && <p>Author: {book.author_name.join(', ')}</p>}
      {book.first_publish_year && (
        <p>First Published: {book.first_publish_year}</p>
      )}
      {book.subject && <p>Subjects: {book.subject.join(', ')}</p>}
      {book.publish_date && <p>Publish Date: {book.publish_date}</p>}
      {book.publisher && <p>Publishers: {book.publisher.join(', ')}</p>}
      {bookSummary && (
        <div>
          <h2>About</h2>
          <p>{bookSummary}</p>
        </div>
      )}
      {book.cover_i && <img src={coverUrl} alt={book.title} />}
      <Reviews bookId={book._id} />
    </div>
  )
}

export default BookDetails
