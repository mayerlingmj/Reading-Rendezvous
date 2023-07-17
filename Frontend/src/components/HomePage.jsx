import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [books, setBooks] = useState([])
  const author = 'Maya Angelou'

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get(
        `http://openlibrary.org/search.json?author=${author}`
      )
      setBooks(result.data.docs.slice(0, 4))
    }

    fetchBooks()
  }, [author])

  const constructImageURL = (book) => {
    return book.cover_i
      ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150'
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: 'lightpink',
          padding: '10px',
          marginBottom: '20px'
        }}
      >
        <h2>About Reading Rendezvous Book Club</h2>
        <p>
          Reading Rendezvous is a book club for those who love to immerse
          themselves in literature. Our community is made up of passionate
          readers and thinkers. We focus on exploring the works of a variety of
          authors, from classic literature to contemporary pieces, and from
          well-known writers to up-and-coming authors. We believe that reading
          is a journey, and each book is an adventure that broadens our
          perspective and enriches our understanding of the world. Our members
          come from all walks of life, united by a common love for books. Join
          us on this exciting literary journey and be a part of the Reading
          Rendezvous Book Club!
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          backgroundColor: 'pink'
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
    </div>
  )
}

export default HomePage
