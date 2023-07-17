import React, { useState } from 'react'
import axios from 'axios'
import { PostBook } from '../services/Book'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  let navigate = useNavigate()
  const handleSearch = async () => {
    try {
      const olResponse = await axios.get(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      )
      console.log(olResponse)
      setSearchResult(olResponse.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/books', selectedBook)
      if (response.data && response.data.success) {
        setSearchTerm('')
        setSearchResult([])
        setSelectedBook(null)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const addBook = async (book) => {
    await PostBook(book)
    navigate('/myBooks')
  }

  return (
    <div>
      <h2>Add a Book</h2>
      <input
        name="searchTerm"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Book Title"
        required
      />
      <button onClick={handleSearch}>Search Books</button>
      {searchResult &&
        searchResult.map((book, index) => (
          <div key={index}>
            <p>
              {book.title} ({book.first_publish_year})
            </p>
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt="Book Cover"
              />
            )}
            <button
              onClick={(e) => {
                e.preventDefault()
                addBook(book)
              }}
            >
              Select This Book
            </button>
          </div>
        ))}
      {selectedBook && (
        <form onSubmit={handleSubmit}>
          <p>Selected Book: {selectedBook.title}</p>
          {selectedBook.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`}
              alt="Book Cover"
            />
          )}
          <button type="submit">Add Book</button>
        </form>
      )}
    </div>
  )
}

export default AddBook
