import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Discussions = () => {
  const [discussions, setDiscussions] = useState([])

  useEffect(() => {
    const fetchDiscussions = async () => {
      const result = await axios.get('/discussions')
      setDiscussions(result.data)
    }

    fetchDiscussions()
  }, [])

  return (
    <div>
      {discussions.map((discussion, index) => (
        <p key={index}>{discussion.title}</p>
      ))}
    </div>
  )
}
export default Discussions
