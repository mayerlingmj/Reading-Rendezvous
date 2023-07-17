import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddReview from '../components/AddReview'
import AddDiscussion from '../components/AddDiscussions'
import { Link } from 'react-router-dom'

const BookDetails = ({ book, user, key }) => {
  const [bookSummary, setBookSummary] = useState('')
  const coverUrl = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

  const handleAddBookToList = async () => {
    try {
      await axios.post('/api/books', {
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
            `https://openlibrary.org/api/books?bibkeys=OLID:${book.cover_i}&format=json&jscmd=data`
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
  console.log(book)
  return (
    <div>
      <Link to={`/books/${book._id}`}>
        <h1>{book.title}</h1>
      </Link>
      <img src={coverUrl} alt={book.title} />
      {book.author_name && <p>Author: {book.author_name.join(', ')}</p>}
      <AddReview bookId={book._id} user={user} />
      <AddDiscussion bookId={book.id} user={user} />
    </div>
  )
}

export default BookDetails
