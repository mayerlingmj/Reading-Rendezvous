import React, { useState, useEffect } from 'react'
import { PostDiscussion, UpdateDiscussion } from '../services/Discussion.js'
import { Link, useParams } from 'react-router-dom'

const GetBook = async (bookId) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=data`
    )
    const data = await response.json()
    return data[`OLID:${bookId}`]
  } catch (error) {
    throw error
  }
}

const AddDiscussion = ({ discussionId, initialData, user }) => {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  console.log(user)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await GetBook(id)
        console.log(bookData)
        setBook(bookData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBook()
  }, [id])

  if (!book) return <div>Loading...</div>

  const constructImageURL = (book) => {
    return book.cover_i
      ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150'
  }

  const imageURL = constructImageURL(book)

  return (
    <div>
      <h1>Discussions</h1>
      <Link to={`/books/${book.key}`}>
        <img src={imageURL} alt={book.title} />
        <h2>{book.title}</h2>
        {book.authors &&
          book.authors.map((author, index) => <p key={index}>{author.name}</p>)}
      </Link>
    </div>
  )
}

export default AddDiscussion
