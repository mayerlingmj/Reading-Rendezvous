import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reviews from '../components/Reviews'

const BookDetails = ({ book }) => {
  const [bookSummary, setBookSummary] = useState('')
  const [review, setReview] = useState('')

  const handleReviewChange = (event) => {
    setReview(event.target.value)
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post('/reviews', {
        bookId: book._id,
        review
      })

      setReview('')
    } catch (error) {
      console.error(error)
    }
  }
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
      <button onClick={handleAddBookToList}>Add to My List</button>
      <form onSubmit={handleReviewSubmit}>
        <label htmlFor="review">Add Review:</label>
        <input id="review" value={review} onChange={handleReviewChange} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default BookDetails
