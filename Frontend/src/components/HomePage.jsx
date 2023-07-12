import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('fantasy')

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get(
        `http://openlibrary.org/search.json?title=${query}`
      )
      setBooks(result.data.docs.slice(0, 10))
    }

    fetchBooks()
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(e.target.elements.search.value)
  }

  const constructImageURL = (book) => {
    return book.cover_i
      ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150'
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search for a book:
          <input type="text" name="search" />
        </label>
        <button type="submit">Search</button>
      </form>

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
