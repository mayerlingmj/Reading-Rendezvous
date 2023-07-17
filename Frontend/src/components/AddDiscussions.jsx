import React, { useState, useEffect } from 'react'
import { PostDiscussion, UpdateDiscussion } from '../services/Discussion.js'

const AddDiscussion = ({ discussionId, initialData, onSuccess }) => {
  const [discussionData, setDiscussionData] = useState({
    title: '',
    content: '',
    book: bookId
  })

  useEffect(() => {
    if (initialData) {
      setDiscussionData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    setDiscussionData({
      ...discussionData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (discussionId) {
        await UpdateDiscussion(discussionId, discussionData)
      } else {
        await PostDiscussion(discussionData)
      }
      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{discussionId ? 'Edit Discussion' : 'Add Discussion'}</h2>
      <input
        type="text"
        name="title"
        value={discussionData.title}
        onChange={handleChange}
        placeholder="Discussion Title"
        required
      />
      <textarea
        name="content"
        value={discussionData.content}
        onChange={handleChange}
        placeholder="Discussion Content"
        required
      ></textarea>
      <button type="submit">
        {discussionId ? 'Update Discussion' : 'Post Discussion'}
      </button>
    </form>
  )
}

export default AddDiscussion
