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
      setBooks(result.data.docs)
    }

    fetchBooks()
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(e.target.elements.search.value)
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
        <p key={index}>{book.title_suggest}</p>
      ))}
    </div>
  )
}

export default HomePage
