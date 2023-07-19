import React, { useState, useEffect } from 'react'
import { PostDiscussion, GetDiscussions } from '../services/Discussion'
import { GetBook } from '../services/Book'
import { useParams } from 'react-router-dom'

const AddDiscussion = ({ user }) => {
  const [book, setBook] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [toggle, setToggle] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await GetBook(id)
        setBook(response.book)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBooks()

    const fetchDiscussions = async () => {
      try {
        const response = await GetDiscussions(id)
        console.log(response)
        setDiscussions(response.discussions)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDiscussions()
  }, [toggle])

  const handlePostDiscussion = async () => {
    try {
      const discussionData = {
        title,
        content,
        user: user.id,
        book: id
      }
      await PostDiscussion(discussionData)
      setToggle((prevToggle) => (prevToggle = !prevToggle))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://i.imgur.com/Ijazwxb.jpg)'
    document.body.style.backgroundSize = 'cover'

    return () => {
      document.body.style.backgroundImage = null
    }
  }, [])

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <h2 style={{ width: '100%', textAlign: 'center' }}>Add Discussion</h2>
      <div
        style={{
          width: '200px',
          margin: '10px',
          backgroundColor: 'lightpink',
          borderRadius: '5px',
          padding: '10px',
          boxSizing: 'border-box'
        }}
      >
        <img
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          style={{ width: '100%', height: 'auto' }}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Discussion Title"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Discussion Content"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <button
          style={{
            backgroundColor: 'hotpink',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%'
          }}
          onClick={handlePostDiscussion}
        >
          Post Discussion
        </button>
        {discussions?.map((discussion) => (
          <div key={discussion._id}>
            <h2>{discussion.title}</h2>
            <p>{discussion.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddDiscussion
