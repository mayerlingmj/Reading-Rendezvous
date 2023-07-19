import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DiscussionDetails = () => {
  const { discussionId } = useParams()
  const [discussion, setDiscussion] = useState(null)

  useEffect(() => {
    const fetchDiscussion = async () => {
      const result = await axios.get(`/discussions/${discussionId}`)
      setDiscussion(result)
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
        <textarea
          value={discussion?.content}
          onChange={(e) =>
            setDiscussion({ ...discussion, content: e.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default DiscussionDetails
