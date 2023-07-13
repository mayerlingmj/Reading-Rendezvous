import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [books, setBooks] = useState([])
  const author = 'Maya Angelou' // Replace this with your author of interest

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get(
        `http://openlibrary.org/search.json?author=${author}`
      )
      setBooks(result.data.docs.slice(0, 10))
    }

    fetchBooks()
  }, [author])

  const constructImageURL = (book) => {
    return book.cover_i
      ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150'
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}
    >
      {books.map((book, index) => (
        <div key={index}>
          <img src={constructImageURL(book)} alt={book.title_suggest} />
          <p>{book.title_suggest}</p>
          <p>{book.author_name && book.author_name[0]}</p>
          <p>{book.first_publish_year}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
