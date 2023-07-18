import React, { useState, useEffect } from 'react'
import {
  PostDiscussion,
  UpdateDiscussion,
  GetDiscussions
} from '../services/Discussion'
import { GetBook } from '../services/Book'
import { useParams } from 'react-router-dom'

const AddDiscussion = ({ user }) => {
  const [book, setBook] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [toggle, setToggle] = useState(false)
  const [updateDiscussion, setUpdateDiscussion] = useState({ title, content })
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
      // const response = await GetDiscussions()
      // setDiscussions(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateDiscussion = async () => {
    try {
      await UpdateDiscussion(id, updateDiscussion)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <img
        src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={book.title}
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Discussion Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Discussion Content"
      />
      <button onClick={handlePostDiscussion}>Post Discussion</button>
      <button onClick={handleUpdateDiscussion}>Update Discussion</button>
      <div>
        {discussions?.map((discussion) => (
          <div
            key={discussion._id}
            onClick={() => setDiscussionToUpdate(discussion.id)}
          >
            <h2>{discussion.title}</h2>
            <p>{discussion.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddDiscussion
