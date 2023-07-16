import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reviews from './ReviewList'
import AddReview from '../components/AddReview'

const BookDetails = ({ book, user }) => {
  const [bookSummary, setBookSummary] = useState('')
  const coverUrl = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

  const handleAddBookToList = async () => {
    try {
      await axios.post('/add-book-to-list', {
        userId: user._id,
        bookId: book._id
      })
    } catch (error) {
      console.error(error)
    }
  }

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

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={coverUrl} alt={book.title} />
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
      <AddReview bookId={book._id} user={user} />
      {/* <button onClick={handleAddBookToList}>Add to My List</button> */}
    </div>
  )
}

export default BookDetails
