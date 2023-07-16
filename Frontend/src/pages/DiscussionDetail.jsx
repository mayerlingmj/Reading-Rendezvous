import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetDiscussions, UpdateDiscussion } from '../services/Discussion'

const DiscussionDetails = () => {
  const { discussionId } = useParams()
  const [discussion, setDiscussion] = useState(null)

  useEffect(() => {
    const fetchDiscussion = async () => {
      const result = await GetDiscussions(discussionId)
      setDiscussion(result.data)
    }

    fetchDiscussion()
  }, [discussionId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await UpdateDiscussion(discussionId, discussion)
  }

  return (
    <div>
      <h1>{discussion?.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={discussion?.text}
          onChange={(e) =>
            setDiscussion({ ...discussion, text: e.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default DiscussionDetails
