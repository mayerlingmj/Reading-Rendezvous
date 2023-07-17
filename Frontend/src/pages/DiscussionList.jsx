import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetDiscussion } from '../services/Discussion'

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([])

  useEffect(() => {
    const fetchDiscussions = async () => {
      const result = await GetDiscussion()
      setDiscussions(result.data)
    }

    fetchDiscussions()
  }, [])

  return (
    <div>
      {discussions.map((discussion, index) => (
        <Link key={index} to={`/discussiondetails/${discussion.id}`}>
          <p>{discussion.title}</p>
        </Link>
      ))}
    </div>
  )
}

export default DiscussionList
